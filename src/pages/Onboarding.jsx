import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ui/ProgressBar';
import OptionButton from '../components/onboarding/OptionButton';
import { QUESTIONS } from '../data/questions';
import { classifyProfile, extractUserInfo } from '../utils/profiler';
import { generateRecommendations } from '../data/recommendations';
import useUserStore from '../store/useUserStore';

/**
 * Pantalla de Onboarding (Cuestionario) de Semilla.
 */
export default function Onboarding() {
  const navigate = useNavigate();
  const { answers, setAnswer, setProfile, setRecommendations, setUserInfo } = useUserStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = QUESTIONS[currentIndex];
  const totalQuestions = QUESTIONS.length;
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  // Manejador de selección para preguntas simples
  const handleSingleSelect = (optionId) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: optionId };

    // Guardar respuesta en Zustand
    setAnswer(currentQuestion.id, optionId);

    // Pequeño delay de 250ms para que el usuario aprecie visualmente su selección
    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        handleFinish(nextAnswers);
      }
    }, 250);
  };

  // Volver a la pregunta anterior
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      navigate('/');
    }
  };

  // Procesar final del cuestionario
  const handleFinish = (finalAnswers = answers) => {
    // 1. Clasificar perfil
    const userProfile = classifyProfile(finalAnswers);
    
    // 2. Extraer info de remesas/deudas/metas
    const userInfo = extractUserInfo(finalAnswers);

    // 3. Generar recomendaciones priorizadas
    const recs = generateRecommendations(userProfile, finalAnswers);

    // 4. Guardar todo en Zustand
    setProfile(userProfile);
    setUserInfo(userInfo);
    setRecommendations(recs);

    // 5. Redirigir a pantalla de revelación de perfil
    navigate('/mi-perfil');
  };

  return (
    <div className="min-h-dvh semilla-canvas flex flex-col p-4 md:p-8 justify-between overflow-x-hidden">
      {/* Header del Quiz */}
      <header className="max-w-2xl w-full mx-auto flex items-center justify-between py-2">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-slate-500 hover:text-ink font-bold text-sm transition-colors py-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Atrás
        </button>

        <span className="text-[11px] font-extrabold text-primary-800 bg-primary-50 border border-primary-100 px-3 py-1 rounded-md uppercase tracking-wider">
          {currentQuestion.seccion} · {currentIndex + 1}/{totalQuestions}
        </span>
      </header>

      {/* Cuerpo de la pregunta con transiciones animadas */}
      <main className="max-w-2xl w-full mx-auto my-auto py-6">
        <div key={currentQuestion.id} className="space-y-6 animate-slide-in-right">
          
          {/* Indicador visual de Sección */}
          <div className="text-center space-y-1">
            <span className="text-xs font-extrabold text-primary-700 tracking-[0.18em] uppercase">
              {currentQuestion.seccionTitulo}
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-ink leading-tight">
              {currentQuestion.pregunta}
            </h2>
            {currentQuestion.descripcion && (
              <p className="text-slate-500 text-xs md:text-sm max-w-md mx-auto">
                {currentQuestion.descripcion}
              </p>
            )}
          </div>

          {/* Opciones de Respuesta */}
          <div className="space-y-3.5">
            {currentQuestion.opciones.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.id;

              return (
                <OptionButton
                  key={option.id}
                  option={option}
                  isSelected={isSelected}
                  onClick={() => handleSingleSelect(option.id)}
                />
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer del Quiz: Barra de progreso */}
      <footer className="max-w-2xl w-full mx-auto py-4">
        <ProgressBar
          progress={progressPercent}
          color="primary"
          height="h-2"
        />
      </footer>
    </div>
  );
}
