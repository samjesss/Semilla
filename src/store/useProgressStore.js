import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProgressStore = create(
  persist(
    (set, get) => ({
      // Lista de IDs de lecciones completadas: ['l1_1', 'l1_2', ...]
      completedLessons: [],

      // Lista de IDs de módulos completados: ['modulo_1', ...]
      completedModules: [],

      // Puntuaciones de los quizzes por módulo: { 'modulo_1': 3, 'modulo_2': 2 }
      quizScores: {},

      // Lista de IDs de insignias (badges) ganadas: ['badge_organizador', ...]
      earnedBadges: [],

      // Acciones
      completeLesson: (lessonId) => set(state => {
        if (state.completedLessons.includes(lessonId)) return {};
        return { completedLessons: [...state.completedLessons, lessonId] };
      }),

      completeModule: (moduleId) => set(state => {
        if (state.completedModules.includes(moduleId)) return {};
        return { completedModules: [...state.completedModules, moduleId] };
      }),

      setQuizScore: (moduleId, score) => set(state => ({
        quizScores: { ...state.quizScores, [moduleId]: score }
      })),

      earnBadge: (badgeId) => set(state => {
        if (state.earnedBadges.includes(badgeId)) return {};
        return { earnedBadges: [...state.earnedBadges, badgeId] };
      }),

      resetProgress: () => set({
        completedLessons: [],
        completedModules: [],
        quizScores: {},
        earnedBadges: []
      }),

      /**
       * Obtiene el porcentaje de lecciones completadas de un módulo específico.
       * @param {string} moduleId 
       * @param {Array} lessonsList - Lista de lecciones del módulo
       * @returns {number} Porcentaje de 0 a 100
       */
      getModuleProgress: (moduleId, lessonsList = []) => {
        if (!lessonsList || lessonsList.length === 0) {
          // Si el módulo está completado directamente, es 100
          return get().completedModules.includes(moduleId) ? 100 : 0;
        }
        const { completedLessons } = get();
        const moduleLessonIds = lessonsList.map(l => l.id);
        const completedInModule = moduleLessonIds.filter(id => completedLessons.includes(id));
        return Math.round((completedInModule.length / moduleLessonIds.length) * 100);
      }
    }),
    {
      name: 'semilla-progress-data', // Clave de localStorage
    }
  )
);

export default useProgressStore;
