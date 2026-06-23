import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProgressStore from '../store/useProgressStore';
import { getModuleById } from '../data/modules';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle,
  Play, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

/**
 * Detalle del Módulo Educativo. Lista las lecciones e integra el Quiz Final
 * con celebración de Insignia.
 */
export default function ModuleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const modulo = getModuleById(id);

  const { 
    completedLessons, 
    completedModules, 
    completeModule, 
    earnBadge, 
    setQuizScore
  } = useProgressStore();

  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]); // Array de índices de opciones marcadas
  const [quizScoreResult, setQuizScoreResult] = useState(null); // { correct: X, total: Y, passed: true/false }
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  if (!modulo) {
    return (
      <div className="p-6 text-center space-y-4">
        <p className="text-slate-500">Módulo no encontrado.</p>
        <Button onClick={() => navigate('/modulos')}>Regresar</Button>
      </div>
    );
  }

  if (modulo.estado !== 'publicado') {
    return (
      <div className="min-h-screen pb-20 md:pb-8 p-4 md:p-6 flex items-center justify-center">
        <Card className="max-w-lg w-full p-6 border border-slate-100 text-center space-y-4 bg-white">
          <div className="w-16 h-16 rounded-lg bg-accent-50 border border-accent-100 flex items-center justify-center text-3xl mx-auto">
            {modulo.emoji}
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-primary-600 uppercase tracking-wider bg-primary-50 px-3 py-1 rounded-full">
              Próximamente
            </span>
            <h2 className="text-xl font-black text-ink tracking-tight">{modulo.titulo}</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Este tema está reservado para una siguiente etapa. Por ahora Semilla se enfoca en ordenar tu dinero, crear un escudo de emergencia y entender opciones seguras de ahorro.
            </p>
          </div>
          <Button variant="primary" fullWidth onClick={() => navigate('/modulos')}>
            Volver a Aprender
          </Button>
        </Card>
      </div>
    );
  }

  const { lecciones = [], quiz = [], badge = {} } = modulo;
  const isModuleCompleted = completedModules.includes(modulo.id);

  // Verificar si todas las lecciones del módulo han sido completadas
  const totalLessonsCount = lecciones.length;
  const completedInModule = lecciones.filter(l => completedLessons.includes(l.id)).length;
  const allLessonsRead = completedInModule === totalLessonsCount;

  // Lógica del Quiz
  const startQuiz = () => {
    if (quiz.length === 0) {
      // Si el módulo no tiene quiz (ej. Módulo 3, 4, 5 de momento), completamos el módulo automáticamente
      handleCompleteModuleDirectly();
      return;
    }
    setQuizAnswers([]);
    setCurrentQuizIndex(0);
    setQuizScoreResult(null);
    setIsQuizActive(true);
  };

  const handleCompleteModuleDirectly = () => {
    completeModule(modulo.id);
    if (badge && badge.id) {
      earnBadge(badge.id);
      setShowBadgeModal(true);
    }
  };

  const handleSelectQuizOption = (optionIdx) => {
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuizIndex] = optionIdx;
    setQuizAnswers(newAnswers);
  };

  const nextQuizQuestion = () => {
    if (currentQuizIndex < quiz.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      // Calificar examen
      let correct = 0;
      quiz.forEach((q, idx) => {
        if (q.respuestaCorrecta === quizAnswers[idx]) {
          correct++;
        }
      });
      const total = quiz.length;
      const passed = correct / total >= 0.67;

      setQuizScore(modulo.id, correct);
      setQuizScoreResult({ correct, total, passed });

      if (passed) {
        completeModule(modulo.id);
        if (badge && badge.id) {
          earnBadge(badge.id);
          // Retardo de 500ms antes de mostrar el modal del badge para permitir ver la calificación
          setTimeout(() => {
            setShowBadgeModal(true);
          }, 400);
        }
      }
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 p-4 md:p-6 space-y-6">
      
      {/* Botón de regreso */}
      <button
        onClick={() => navigate('/modulos')}
        className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 font-semibold text-sm transition-colors py-1"
      >
        <ArrowLeft className="w-4.5 h-4.5" />
        Volver a la lista
      </button>

      {/* ─── VISTA DEL DETALLE ─── */}
      {!isQuizActive ? (
        <div className="space-y-6">
          
          {/* Ficha técnica del módulo */}
          <Card className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{ backgroundColor: modulo.color }}
            />
            {/* Emoji gigante */}
            <div className="w-20 h-20 rounded-lg bg-accent-50 border border-accent-100 flex items-center justify-center text-4xl flex-shrink-0 mx-auto md:mx-0 shadow-sm">
              {modulo.emoji}
            </div>

            {/* Información del módulo */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
                <Badge variant="neutral">{modulo.nivel}</Badge>
                <span className="text-xs text-slate-400 font-semibold">⏱️ Duración: {modulo.duracion}</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-ink tracking-tight leading-tight">
                {modulo.titulo}
              </h2>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                {modulo.subtitulo}
              </p>
            </div>
          </Card>

          {/* Listado de Lecciones */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Lecciones del módulo ({completedInModule}/{totalLessonsCount})
            </h3>
            
            <div className="space-y-2.5">
              {lecciones.map((leccion, index) => {
                const isRead = completedLessons.includes(leccion.id);
                return (
                  <Card
                    key={leccion.id}
                    hoverEffect
                    onClick={() => navigate(`/leccion/${leccion.id}`)}
                    className="p-4 border border-slate-100 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Check de estado */}
                      {isRead ? (
                        <CheckCircle2 className="w-5.5 h-5.5 text-primary-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5.5 h-5.5 text-slate-300 flex-shrink-0" />
                      )}

                      <div className="min-w-0 text-left">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Lección {index + 1}
                        </span>
                        <h4 className="font-bold text-ink text-sm md:text-base leading-snug truncate">
                          {leccion.titulo}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 font-semibold text-xs flex-shrink-0">
                      <span>{leccion.duracion || '4 min'}</span>
                      <Play className="w-3.5 h-3.5 text-primary-500 fill-primary-500" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sección de práctica / completado */}
          <Card className="p-6 text-center border border-slate-100 bg-white space-y-4">
            {isModuleCompleted ? (
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center mx-auto text-2xl shadow-sm text-primary-600">
                  🏆
                </div>
                <h4 className="font-black text-ink text-base">¡Felicidades, completaste este módulo!</h4>
                <p className="text-slate-500 text-xs px-6">
                  Has aprendido los conceptos clave y desbloqueado la insignia de <strong>{badge.nombre}</strong>.
                </p>
                {quiz.length > 0 && (
                  <Button variant="outline" size="sm" onClick={startQuiz}>
                    Repetir práctica
                  </Button>
                )}
              </div>
            ) : quiz.length > 0 ? (
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center mx-auto text-2xl shadow-sm text-primary-600">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="font-black text-ink text-base">
                  {allLessonsRead ? '¡Lecciones completadas!' : 'Practica cuando te sintás listo'}
                </h4>
                <p className="text-slate-500 text-xs px-6">
                  Son pocas preguntas para reforzar ideas clave. Si te equivocás, Semilla te explica el porqué sin castigarte.
                </p>
                <Button variant="primary" className="font-bold" onClick={startQuiz}>
                  Practicar con preguntas
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-700 text-sm">Sin práctica disponible todavía</h4>
                <p className="text-slate-500 text-xs">
                  Lee las lecciones y marca tu avance para continuar.
                </p>
              </div>
            )}
          </Card>
        </div>
      ) : (
        /* ─── VISTA DEL QUIZ ACTIVO ─── */
        <div className="max-w-xl mx-auto space-y-6">
          
          {/* Header del examen */}
          <div className="flex justify-between items-center bg-white border border-primary-100 p-4 rounded-lg">
            <h3 className="font-bold text-ink text-sm">
              Práctica: {modulo.titulo}
            </h3>
            <span className="text-xs text-primary-600 font-bold bg-primary-50 px-3 py-1 rounded-full">
              Pregunta {currentQuizIndex + 1} de {quiz.length}
            </span>
          </div>

          {/* Resultado parcial de la práctica */}
          {quizScoreResult === null ? (
            <Card className="p-6 border border-slate-100 space-y-6 animate-slide-in-right" key={currentQuizIndex}>
              {/* Enunciado */}
              <h4 className="text-base md:text-lg font-black text-ink leading-snug">
                {quiz[currentQuizIndex].pregunta}
              </h4>

              {/* Opciones */}
              <div className="space-y-2.5">
                {quiz[currentQuizIndex].opciones.map((opcion, idx) => {
                  const isSelected = quizAnswers[currentQuizIndex] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizOption(idx)}
                      className={`w-full p-4 text-left border rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 ${
                        isSelected 
                          ? 'border-primary-700 bg-primary-50 text-ink shadow-sm'
                          : 'border-primary-100 bg-white text-slate-600 hover:bg-primary-50/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-primary-500 bg-primary-500 text-white' : 'border-slate-200'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="flex-1">{opcion}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Botón de continuar */}
              <Button
                variant="primary"
                fullWidth
                size="lg"
                disabled={quizAnswers[currentQuizIndex] === undefined}
                onClick={nextQuizQuestion}
                className="font-bold py-3"
              >
                {currentQuizIndex < quiz.length - 1 ? 'Siguiente pregunta' : 'Terminar práctica'}
              </Button>
            </Card>
          ) : (
            /* ─── VISTA DEL RESULTADO DEL EXAMEN ─── */
            <Card className="p-6 border border-slate-100 text-center space-y-6 animate-scale-bounce">
              <div className="space-y-2">
                <div className="text-4xl">
                  {quizScoreResult.passed ? '🎉' : '😟'}
                </div>
                <h4 className="text-lg font-black text-ink">
                  {quizScoreResult.passed ? '¡Vas muy bien!' : 'Casi listo, repasemos juntos'}
                </h4>
                <p className="text-slate-500 text-xs">
                  Tu puntuación: <strong className="text-slate-700">{quizScoreResult.correct} de {quizScoreResult.total}</strong> correctas.
                </p>
              </div>

              {/* Listado de explicaciones si fallaron */}
              {!quizScoreResult.passed && (
                <div className="text-left bg-surface border border-primary-100 p-4 rounded-lg space-y-3">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Revisa las preguntas:</p>
                  {quiz.map((q, idx) => {
                    const isCorrect = q.respuestaCorrecta === quizAnswers[idx];
                    return (
                      <div key={idx} className="text-xs space-y-1 pb-2 border-b border-slate-200/55 last:border-b-0 last:pb-0">
                        <p className="font-bold text-slate-700">
                          {idx + 1}. {q.pregunta}
                        </p>
                        <p className={isCorrect ? 'text-primary-600 font-bold' : 'text-rose-600 font-bold'}>
                          {isCorrect ? '✓ Correcto' : `✗ Tu respuesta: "${q.opciones[quizAnswers[idx]]}"`}
                        </p>
                        <p className="text-slate-500 leading-relaxed italic bg-white/70 p-2 rounded-xl mt-1 border border-slate-100">
                          <strong>Explicación:</strong> {q.explicacion}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Acciones */}
              <div className="flex gap-3">
                <Button
                  variant={quizScoreResult.passed ? 'outline' : 'primary'}
                  fullWidth
                  onClick={startQuiz}
                >
                  {quizScoreResult.passed ? 'Repetir práctica' : 'Reintentar'}
                </Button>
                <Button
                  variant={quizScoreResult.passed ? 'primary' : 'ghost'}
                  fullWidth
                  className="font-bold"
                  onClick={() => setIsQuizActive(false)}
                >
                  Regresar al Módulo
                </Button>
              </div>
            </Card>
          )}

        </div>
      )}

      {/* ─── MODAL DE BADGE GANADO (Celebración) ─── */}
      <Modal
        isOpen={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
        title="¡Nueva Insignia Ganada! 🏆"
      >
        <div className="text-center space-y-5 py-4">
          {/* Badge Grande Animado */}
          <div className="inline-flex w-24 h-24 rounded-full items-center justify-center text-5xl shadow-xl shadow-slate-200/50 bg-white border-2 border-primary-500 animate-scale-bounce mx-auto">
            {badge.emoji}
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-full">
              Logro Desbloqueado
            </span>
            <h3 className="text-xl font-black text-ink tracking-tight pt-1.5">
              {badge.nombre}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed px-4">
              {badge.descripcion}
            </p>
          </div>

          <div className="bg-surface p-3.5 border border-primary-100 rounded-lg text-xs text-slate-500 max-w-sm mx-auto">
            Puedes ver todas tus insignias ganadas visitando la sección de Mi Perfil.
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              fullWidth
              className="font-bold py-3"
              onClick={() => {
                setShowBadgeModal(false);
                setIsQuizActive(false); // Salir del quiz
              }}
            >
              ¡Seguir aprendiendo! 🌱
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
