import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set, get) => ({
      // Respuestas del quiz de onboarding: { A1: 'semana', A2: 'menos100', ... }
      answers: {},

      // Perfil clasificado: { id, nombre, emoji, color, descripcion, mensajePrincipal, prioridades }
      profile: null,

      // Recomendaciones generadas para el usuario (ordenadas por prioridad)
      recommendations: [],

      // Información derivada del quiz para facilitar lógica de negocio
      userInfo: {
        remesaMensualNIO: 0,
        sobranteEstimadoNIO: 0,
        tieneCuentaBancaria: false,
        tieneAhorros: false,
        tieneDeudas: false,
        quiereEmprender: false,
        nivelConocimiento: 'poco',
        meta: null
      },

      hasSeenTour: false,

      // Acciones
      setAnswer: (questionId, value) => {
        set(state => ({
          answers: { ...state.answers, [questionId]: value }
        }));
      },

      setProfile: (profile) => set({ profile }),

      setRecommendations: (recs) => set({ recommendations: recs }),

      setUserInfo: (info) => set({ userInfo: info }),

      completeTour: () => set({ hasSeenTour: true }),

      resetTour: () => set({ hasSeenTour: false }),

      resetAll: () => set({
        answers: {},
        profile: null,
        recommendations: [],
        hasSeenTour: false,
        userInfo: {
          remesaMensualNIO: 0,
          sobranteEstimadoNIO: 0,
          tieneCuentaBancaria: false,
          tieneAhorros: false,
          tieneDeudas: false,
          quiereEmprender: false,
          nivelConocimiento: 'poco',
          meta: null
        }
      }),

      isOnboardingComplete: () => {
        const { answers, profile } = get();
        // Comprobar que hay respuestas para el diagnóstico corto.
        const requiredKeys = ['A1', 'A2', 'A4', 'B1', 'B2', 'B3', 'C1'];
        return Boolean(profile) && requiredKeys.every(key => answers[key] !== undefined);
      }
    }),
    {
      name: 'semilla-user-data', // Clave de localStorage
    }
  )
);

export default useUserStore;
