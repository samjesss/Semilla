# SEMILLA — Plan de Desarrollo Completo
## Herramienta de Educación Financiera para Receptores de Remesas en Nicaragua
**Versión**: 1.0 | **Contexto**: Proyecto Social — Investigación de Mercados

> **Tagline**: *"Planta hoy, cosecha mañana"*
> 
> Esta herramienta web educa financieramente a receptores de remesas nicaragüenses que tienen dinero sobrante después de cubrir sus necesidades básicas, guiándolos hacia decisiones inteligentes de ahorro e inversión.

---

## TABLA DE CONTENIDOS

1. [Visión del Proyecto](#1-visión-del-proyecto)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Arquitectura de Archivos](#3-arquitectura-de-archivos)
4. [Flujo de Usuario (User Flow)](#4-flujo-de-usuario)
5. [Cuestionario de Onboarding](#5-cuestionario-de-onboarding)
6. [Motor de Perfiles y Recomendaciones](#6-motor-de-perfiles-y-recomendaciones)
7. [Módulos Educativos](#7-módulos-educativos)
8. [Calculadoras Financieras](#8-calculadoras-financieras)
9. [Datos Financieros Nicaragüenses](#9-datos-financieros-nicaragüenses)
10. [Diseño UI/UX](#10-diseño-uiux)
11. [Modelo de Datos (localStorage)](#11-modelo-de-datos)
12. [Fases de Implementación](#12-fases-de-implementación)
13. [Instrucciones para el AI Coding Assistant](#13-instrucciones-para-el-ai-coding-assistant)

---

## 1. VISIÓN DEL PROYECTO

### 1.1 Problema que resuelve
Una porción significativa de los receptores de remesas en Nicaragua cubre sus necesidades básicas y destina el sobrante al consumo inmediato o lo guarda en casa. La falta de educación financiera y de orientación personalizada y accesible les impide construir patrimonio a largo plazo.

### 1.2 Propuesta de valor
Una aplicación web conversacional que:
- **Escucha primero**: evalúa la situación económica y el nivel educativo del usuario con preguntas sencillas y visuales.
- **Recomienda personalizado**: genera un plan de acción priorizado y adaptado a su realidad.
- **Educa de forma progresiva**: explica conceptos financieros en lenguaje llano, sin jerga, con ejemplos del contexto nicaragüense.
- **Conecta con opciones reales**: muestra productos y servicios de bancos y cooperativas existentes en Nicaragua.

### 1.3 Usuario objetivo
| Característica | Descripción |
|---|---|
| Edad | 20–55 años |
| Perfil | Receptor/a de remesas del exterior (EE.UU., Costa Rica, España) |
| Educación | Variable: desde primaria hasta bachillerato |
| Sobrante mensual | C$500 – C$6,000 después de gastos básicos |
| Dispositivo | Principalmente móvil (Android) |
| Conectividad | Internet móvil (datos o WiFi doméstico) |

### 1.4 Lo que esta herramienta NO es
- No es una app de banco ni maneja dinero real.
- No es un asesor financiero certificado.
- Siempre recomienda al usuario validar con una institución financiera real.

---

## 2. STACK TECNOLÓGICO

### Frontend (todo en uno, sin backend)
```
React 18 + Vite          → Framework principal
Tailwind CSS             → Estilos (mobile-first)
shadcn/ui                → Componentes UI base
React Router v6          → Navegación entre páginas
Zustand                  → Estado global (perfil de usuario, progreso)
Recharts                 → Gráficas de ahorro e inversión
Lucide React             → Íconos
```

### Almacenamiento
```
localStorage             → Persistencia local (MVP, sin backend)
```
> **Por qué sin backend**: Es un proyecto social/académico. Con localStorage el usuario puede regresar y retomar su progreso sin crear cuenta. Simple, rápido de desarrollar.

### Despliegue
```
Vercel                   → Hosting gratuito, deploy automático desde GitHub
GitHub                   → Control de versiones
```

### Instalación inicial del proyecto
```bash
npm create vite@latest semilla -- --template react
cd semilla
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-router-dom
npm install zustand
npm install recharts
npm install lucide-react
npm install @radix-ui/react-progress @radix-ui/react-tooltip
```

---

## 3. ARQUITECTURA DE ARCHIVOS

```
semilla/
├── public/
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── Tooltip.jsx
│   │   │   └── Modal.jsx
│   │   ├── onboarding/
│   │   │   ├── QuestionCard.jsx       ← Tarjeta de pregunta individual
│   │   │   ├── OptionButton.jsx       ← Botón de opción de respuesta
│   │   │   ├── OnboardingProgress.jsx ← Barra de progreso del quiz
│   │   │   └── SectionHeader.jsx      ← Título de sección (A/B/C)
│   │   ├── dashboard/
│   │   │   ├── ProfileSummary.jsx     ← Resumen del perfil asignado
│   │   │   ├── RecommendationCard.jsx ← Tarjeta de recomendación
│   │   │   ├── ModuleGrid.jsx         ← Grid de módulos disponibles
│   │   │   └── QuickStats.jsx         ← Datos rápidos del usuario
│   │   ├── modules/
│   │   │   ├── LessonContent.jsx      ← Renderizador de lección
│   │   │   ├── QuizQuestion.jsx       ← Pregunta del quiz final
│   │   │   ├── BadgeEarned.jsx        ← Modal de badge ganado
│   │   │   └── GlossaryTerm.jsx       ← Término del glosario con tooltip
│   │   └── calculators/
│   │       ├── CompoundInterestCalc.jsx
│   │       ├── EmergencyFundCalc.jsx
│   │       ├── LoanCalc.jsx
│   │       ├── BudgetCalc.jsx         ← Regla 50/30/20
│   │       └── ProductComparator.jsx  ← CD vs ahorro vs cooperativa
│   ├── pages/
│   │   ├── Landing.jsx                ← Pantalla de bienvenida
│   │   ├── Onboarding.jsx             ← Flujo del cuestionario
│   │   ├── ProfileResult.jsx          ← Resultado del perfil asignado
│   │   ├── Dashboard.jsx              ← Panel principal
│   │   ├── ModuleList.jsx             ← Lista de módulos educativos
│   │   ├── ModuleDetail.jsx           ← Módulo específico con lecciones
│   │   ├── LessonDetail.jsx           ← Lección individual
│   │   ├── Calculators.jsx            ← Hub de calculadoras
│   │   ├── Glossary.jsx               ← Glosario financiero
│   │   └── Profile.jsx                ← Perfil del usuario + resetear
│   ├── store/
│   │   ├── useUserStore.js            ← Perfil + respuestas del quiz
│   │   └── useProgressStore.js        ← Progreso en módulos y badges
│   ├── data/
│   │   ├── questions.js               ← Las 13 preguntas del onboarding
│   │   ├── profiles.js                ← Definición de los 4 perfiles
│   │   ├── recommendations.js         ← Motor de recomendaciones
│   │   ├── modules.js                 ← Estructura de módulos y lecciones
│   │   ├── institutions.js            ← Bancos y cooperativas de Nicaragua
│   │   ├── concepts.js                ← Glosario de términos financieros
│   │   └── badges.js                  ← Definición de logros/badges
│   ├── utils/
│   │   ├── profiler.js                ← Algoritmo de clasificación de perfil
│   │   ├── calculator.js              ← Funciones matemáticas financieras
│   │   ├── currency.js                ← Formateo C$/USD, tasa de cambio
│   │   └── storage.js                 ← Helpers de localStorage
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 4. FLUJO DE USUARIO

```
┌─────────────────────────────────────────────────────────────────┐
│                        FLUJO COMPLETO                           │
└─────────────────────────────────────────────────────────────────┘

[Landing Page]
    │  CTA: "Empezar ahora →"
    ▼
[Onboarding — Sección A: Situación económica] (4 preguntas)
    │  Barra de progreso: ████░░░░░░ 30%
    ▼
[Onboarding — Sección B: Situación financiera] (4 preguntas)
    │  Barra de progreso: ████████░░ 60%
    ▼
[Onboarding — Sección C: Metas y conocimientos] (5 preguntas)
    │  Barra de progreso: ██████████ 100%
    ▼
[Resultado del Perfil]
    │  "Eres un/a [nombre de perfil]"
    │  Resumen de situación + próximo paso clave
    │  CTA: "Ver mi plan personalizado →"
    ▼
[Dashboard Principal]
    ├── Recomendaciones priorizadas (1 a 5 tarjetas)
    ├── Módulos sugeridos según perfil
    ├── Acceso a calculadoras
    └── Progreso general
         │
         ├──→ [Módulo Educativo]
         │         → Lección 1 → Lección 2 → Quiz → Badge
         │
         ├──→ [Calculadora]
         │         → Simulación visual interactiva
         │
         └──→ [Glosario]
                   → Términos financieros con ejemplos
```

---

## 5. CUESTIONARIO DE ONBOARDING

> **Principio de diseño**: Todas las preguntas son de opción múltiple con íconos. Nunca texto libre. Máximo 4 opciones por pregunta. Lenguaje de vecindad, no corporativo.

---

### SECCIÓN A — Tu Situación con las Remesas

**Pregunta A1 — ¿Con qué frecuencia te mandan dinero del exterior?**
```
🗓 Cada semana
📅 Cada quincena
📆 Cada mes
🎲 De vez en cuando (no hay fecha fija)
```

**Pregunta A2 — ¿Cuánto recibes normalmente? (en dólares)**
```
💵 Menos de $100
💵💵 Entre $100 y $200
💵💵💵 Entre $200 y $400
💰 Más de $400
```
*Mostrar equivalencia: "C$ ≈ [monto × 36.5]"*

**Pregunta A3 — ¿Cuántas personas en tu hogar viven con ese dinero?**
```
🧍 Solo yo
👫 2 – 3 personas
👨‍👩‍👧‍👦 4 – 5 personas
🏘 Más de 5 personas
```

**Pregunta A4 — Después de pagar comida, luz, agua y transporte, ¿cuánto te queda normalmente?**
```
😟 Casi nada (menos de C$500)
🙂 Un poquito (C$500 – C$2,000)
😊 Algo (C$2,000 – C$5,000)
😄 Bastante (más de C$5,000)
```

---

### SECCIÓN B — Tu Situación Financiera Actual

**Pregunta B1 — ¿Tienes cuenta en un banco o cooperativa?**
```
🏦 Sí, en un banco (BANPRO, BAC, BDF, LAFISE, Avanz...)
🤝 Sí, en una cooperativa
🏠 No, guardo el dinero en casa
🤔 No tengo, pero me gustaría tener una
```

**Pregunta B2 — ¿Tienes algún dinero ahorrado en este momento?**
```
❌ No, no tengo ningún ahorro
🪙 Tengo algo guardado (menos de C$5,000)
💰 Tengo ahorros (C$5,000 – C$20,000)
🏦 Sí, tengo bastante guardado (más de C$20,000)
```

**Pregunta B3 — ¿Tienes deudas en este momento?**
```
✅ No debo nada
👥 Le debo a familiares o amigos
🏦 Tengo un préstamo en banco, cooperativa o financiera
⚠️ Tengo varias deudas a la vez
```

**Pregunta B4 — ¿Tienes o estás pensando en tener un negocio propio?**
```
🏪 Sí, ya tengo un negocio
💡 Estoy planeando emprender pronto
🌱 Me gustaría en el futuro, pero no todavía
🚫 No me interesa un negocio
```

---

### SECCIÓN C — Tus Metas y Conocimientos

**Pregunta C1 — ¿Cuál es lo más importante que quieres hacer con el dinero que te sobra?**
```
🛡 Tener un colchón para emergencias
🏠 Ahorrar para algo grande (casa, carro, estudio)
📈 Hacer que mi dinero crezca con el tiempo
🏪 Invertir en un negocio
```

**Pregunta C2 — ¿Cuánto sabes sobre el manejo del dinero?**
```
🌱 Poco, prefiero que me expliquen simple
📖 Sé lo básico, pero quiero aprender más
📊 Me manejo bien, busco estrategias nuevas
🎓 Tengo buenos conocimientos financieros
```

**Pregunta C3 — ¿Cuál de estos términos conoces? (selecciona todos los que conozcas)**
```
□ Tasa de interés
□ Certificado de depósito (CD)
□ Interés compuesto
□ Cooperativa de ahorro y crédito
□ Inflación
□ Ninguno de estos
```

**Pregunta C4 — ¿Cuánto tiempo estás dispuesto/a a no tocar tus ahorros?**
```
🔴 Necesito poder retirarlos cuando quiera
🟡 Puedo esperar entre 1 y 6 meses
🟢 Puedo esperar de 6 meses a 1 año
🔵 Puedo esperar más de 1 año
```

**Pregunta C5 — ¿Cómo prefieres aprender?**
```
📱 Leyendo en el teléfono, paso a paso
🎯 Con ejemplos y situaciones reales
🔢 Con cálculos y números concretos
🏆 Jugando, con retos y logros
```

---

## 6. MOTOR DE PERFILES Y RECOMENDACIONES

### 6.1 Los 4 Perfiles

Implementar en `src/utils/profiler.js`:

```javascript
/**
 * Clasifica al usuario en uno de 4 perfiles según sus respuestas.
 * @param {Object} answers - Objeto con respuestas A1-C5
 * @returns {Object} Perfil con nombre, nivel, descripción y color
 */
export function classifyProfile(answers) {
  let score = 0;

  // Puntos por sobrante (A4)
  if (answers.A4 === 'algo') score += 2;
  if (answers.A4 === 'bastante') score += 4;
  if (answers.A4 === 'poquito') score += 1;

  // Puntos por cuenta bancaria (B1)
  if (answers.B1 === 'banco') score += 3;
  if (answers.B1 === 'cooperativa') score += 2;

  // Puntos por ahorros (B2)
  if (answers.B2 === 'algo') score += 2;
  if (answers.B2 === 'bastante') score += 3;
  if (answers.B2 === 'mucho') score += 4;

  // Penalizar deudas múltiples (B3)
  if (answers.B3 === 'varias') score -= 2;
  if (answers.B3 === 'banco') score += 1; // tener acceso a crédito formal es positivo

  // Puntos por conocimiento (C2)
  const conocimientoMap = { 'poco': 0, 'basico': 1, 'bien': 2, 'experto': 3 };
  score += conocimientoMap[answers.C2] || 0;

  // Puntos por términos conocidos (C3) — cuenta de términos marcados
  const terminosConocidos = (answers.C3 || []).filter(t => t !== 'ninguno').length;
  score += Math.min(terminosConocidos, 3);

  // Clasificar
  if (score <= 4)  return PROFILES.principiante;
  if (score <= 9)  return PROFILES.guardador;
  if (score <= 14) return PROFILES.planificador;
  return PROFILES.inversionista;
}

export const PROFILES = {
  principiante: {
    id: 'principiante',
    nombre: 'El Principiante',
    emoji: '🌱',
    color: '#16A34A',
    descripcion: 'Estás dando tus primeros pasos. Lo más importante ahora es ordenar tu dinero y tener un lugar seguro donde guardarlo.',
    mensajePrincipal: 'Cada gran árbol empezó siendo una pequeña semilla.',
    prioridades: ['cuenta_bancaria', 'fondo_emergencia', 'presupuesto']
  },
  guardador: {
    id: 'guardador',
    nombre: 'El Guardador',
    emoji: '🪙',
    color: '#2563EB',
    descripcion: 'Ya ahorras algo, pero el dinero guardado en casa puede perder valor. Es momento de que tu dinero empiece a trabajar para vos.',
    mensajePrincipal: 'Guardar está bien. Hacer crecer ese ahorro es el siguiente paso.',
    prioridades: ['fondo_emergencia', 'cuenta_ahorro', 'interes_compuesto']
  },
  planificador: {
    id: 'planificador',
    nombre: 'El Planificador',
    emoji: '📊',
    color: '#7C3AED',
    descripcion: 'Tenés una base sólida. Ahora se trata de hacer que tu dinero rinda más con productos financieros inteligentes.',
    mensajePrincipal: 'El que planifica hoy, cosecha mañana.',
    prioridades: ['certificado_deposito', 'cooperativas', 'diversificacion']
  },
  inversionista: {
    id: 'inversionista',
    nombre: 'El Inversionista en Formación',
    emoji: '📈',
    color: '#EA580C',
    descripcion: 'Tenés conocimiento y recursos. Es momento de diversificar y pensar en metas de largo plazo.',
    mensajePrincipal: 'Tu dinero puede trabajar en varios lugares a la vez.',
    prioridades: ['diversificacion', 'microempresa', 'largo_plazo']
  }
};
```

---

### 6.2 Árbol de Recomendaciones

Implementar en `src/data/recommendations.js`:

```javascript
/**
 * Genera lista priorizada de recomendaciones según el perfil y respuestas.
 * @param {Object} profile - Perfil clasificado
 * @param {Object} answers - Respuestas del onboarding
 * @returns {Array} Lista ordenada de recomendaciones
 */
export function generateRecommendations(profile, answers) {
  const recs = [];

  // ─── PRIORIDAD 1: Sin cuenta bancaria ─────────────────────────────
  if (answers.B1 === 'casa' || answers.B1 === 'quiero') {
    recs.push({
      id: 'abrir_cuenta',
      prioridad: 1,
      icono: '🏦',
      titulo: 'Abrí tu primera cuenta de ahorro',
      resumen: 'Guardar el dinero en casa es un riesgo. Una cuenta bancaria es segura, gratis o muy barata, y te da acceso a más herramientas.',
      pasos: [
        'Elegí un banco: BANPRO, BDF o Avanz tienen opciones sin costo mínimo.',
        'Llevá tu cédula de identidad y una dirección.',
        'Pedí una cuenta de ahorro básica (muchas son gratis).',
        'Podés empezar con cualquier monto, incluso C$100.'
      ],
      modulo_sugerido: 'modulo_2',
      institucion_sugerida: 'banpro'
    });
  }

  // ─── PRIORIDAD 2: Sin fondo de emergencia ─────────────────────────
  if (answers.B2 === 'nada' || answers.B2 === 'algo') {
    const gastosMensuales = estimarGastosMensuales(answers);
    recs.push({
      id: 'fondo_emergencia',
      prioridad: 2,
      icono: '🛡',
      titulo: 'Construí tu fondo de emergencia',
      resumen: `Tu meta: tener al menos ${gastosMensuales * 3} córdobas guardados para imprevistos (3 meses de gastos). Nadie está exento de emergencias.`,
      pasos: [
        'Calculá cuánto gastas en lo básico al mes.',
        'Multiplicá eso por 3: esa es tu meta.',
        'Apartá un monto fijo cada vez que recibís la remesa (aunque sea C$200).',
        'No lo toques a menos que sea una emergencia real.'
      ],
      calculadora: 'fondo_emergencia',
      modulo_sugerido: 'modulo_1'
    });
  }

  // ─── PRIORIDAD 3: Deudas múltiples o de alto costo ─────────────────
  if (answers.B3 === 'varias' || answers.B3 === 'banco') {
    recs.push({
      id: 'manejar_deudas',
      prioridad: 3,
      icono: '⚖️',
      titulo: 'Manejá tus deudas de forma inteligente',
      resumen: 'No todas las deudas son malas, pero pagarlas con orden te libera dinero para ahorrar. Existe una estrategia simple: empezar por la más cara.',
      pasos: [
        'Hacé una lista de todas tus deudas con su tasa de interés.',
        'Pagá el mínimo en todas, pero mandá lo extra a la de tasa más alta.',
        'Cuando pagás una, usá ese dinero en la siguiente.',
        'Una vez libre de deudas, ese dinero puede ir al ahorro.'
      ],
      calculadora: 'deuda',
      modulo_sugerido: 'modulo_4'
    });
  }

  // ─── PRIORIDAD 4: Tiene cuenta + algo ahorrado → CD ────────────────
  if (
    (answers.B1 === 'banco' || answers.B1 === 'cooperativa') &&
    (answers.B2 === 'bastante' || answers.B2 === 'mucho') &&
    answers.B3 !== 'varias'
  ) {
    recs.push({
      id: 'certificado_deposito',
      prioridad: 4,
      icono: '📄',
      titulo: 'Hacé crecer tu ahorro con un Certificado de Depósito',
      resumen: 'Un CD te permite depositar un monto por un plazo fijo (3, 6 o 12 meses) y ganar más interés que una cuenta normal. Es seguro y está regulado por SIBOIF.',
      pasos: [
        'Definí cuánto podés dejar sin tocar por 3 a 12 meses.',
        'Comparí tasas: BANPRO, BDF y BAC tienen CDs desde C$1,000.',
        'Elegí el plazo más largo que puedas para ganar más.',
        'Al vencer, podés reinvertir el capital + intereses ganados.'
      ],
      calculadora: 'interes_compuesto',
      modulo_sugerido: 'modulo_2'
    });
  }

  // ─── PRIORIDAD 5: Quiere emprender → microcrédito ──────────────────
  if (answers.B4 === 'tiene_negocio' || answers.B4 === 'pronto') {
    recs.push({
      id: 'microempresa',
      prioridad: 5,
      icono: '🏪',
      titulo: 'Financiá tu negocio con microcrédito',
      resumen: 'En Nicaragua existen opciones de crédito para pequeños negocios con requisitos más accesibles que los bancos tradicionales. CONAMI regula estas instituciones.',
      pasos: [
        'Primero, escribí tu idea de negocio y cuánto necesitás.',
        'Revisá microfinancieras supervisadas por CONAMI.',
        'Pedí información sobre créditos para MIPYME o emprendimiento.',
        'Compará tasas: están reguladas y no pueden ser abusivas.'
      ],
      modulo_sugerido: 'modulo_5'
    });
  }

  // ─── PRIORIDAD 6: Perfil avanzado → Cooperativa ─────────────────────
  if (profile.id === 'planificador' || profile.id === 'inversionista') {
    recs.push({
      id: 'cooperativa',
      prioridad: 6,
      icono: '🤝',
      titulo: 'Considerá unirte a una cooperativa de ahorro',
      resumen: 'Las cooperativas ofrecen tasas de ahorro más altas que los bancos (hasta un 7% anual) y también dan acceso a crédito con mejores condiciones para sus socios.',
      pasos: [
        'Buscá una cooperativa afiliada a FENACOOP en tu zona.',
        'Pedí información sobre los requisitos para ser socio/a.',
        'Empezar suele requerir un aporte mínimo y una cédula.',
        'Como socio/a, podés ahorrar Y acceder a crédito solidario.'
      ],
      modulo_sugerido: 'modulo_3'
    });
  }

  return recs.sort((a, b) => a.prioridad - b.prioridad);
}

// Función auxiliar para estimar gastos según perfil
function estimarGastosMensuales(answers) {
  const remesaMap = { 'menos100': 3500, 'cien200': 6500, 'dos400': 12000, 'mas400': 18000 };
  const remesa = remesaMap[answers.A2] || 7000;
  const personas = { 'solo': 1, 'dos3': 2.5, 'cuatro5': 4, 'mas5': 6 };
  const factor = personas[answers.A3] || 2;
  return Math.round(remesa * 0.7); // Estimado: 70% de la remesa en gastos básicos
}
```

---

## 7. MÓDULOS EDUCATIVOS

### 7.1 Estructura de Datos de Módulos (`src/data/modules.js`)

```javascript
export const MODULES = [
  {
    id: 'modulo_1',
    titulo: 'Ordena tu Dinero',
    subtitulo: 'El primer paso para cualquier meta financiera',
    nivel: 'basico',
    emoji: '📋',
    color: '#16A34A',
    duracion: '15 min',
    perfiles: ['principiante', 'guardador'],
    lecciones: [
      {
        id: 'l1_1',
        titulo: '¿Por qué la mayoría gasta más de lo que planea?',
        contenido: `...` // Ver sección 7.2
      },
      {
        id: 'l1_2',
        titulo: 'La Regla del 50/30/20: simple y efectiva',
        contenido: `...`,
        calculadora: 'presupuesto'
      },
      {
        id: 'l1_3',
        titulo: 'Tu Fondo de Emergencia: el colchón que salva',
        contenido: `...`,
        calculadora: 'fondo_emergencia'
      },
      {
        id: 'l1_4',
        titulo: 'Por qué guardar el dinero en casa es un error',
        contenido: `...`
      }
    ],
    quiz: [/* Ver sección 7.3 */],
    badge: {
      id: 'badge_organizador',
      nombre: 'Organizador Financiero',
      emoji: '📋',
      descripcion: 'Aprendiste a ordenar tu dinero con la regla 50/30/20'
    }
  },

  {
    id: 'modulo_2',
    titulo: 'Haz Que Tu Dinero Trabaje',
    subtitulo: 'El poder del interés compuesto',
    nivel: 'basico_intermedio',
    emoji: '💰',
    color: '#2563EB',
    duracion: '20 min',
    perfiles: ['guardador', 'planificador'],
    lecciones: [
      { id: 'l2_1', titulo: '¿Qué es el interés? Simple vs. Compuesto' },
      { id: 'l2_2', titulo: 'Cuentas de ahorro en Nicaragua: cómo elegir', calculadora: 'comparador' },
      { id: 'l2_3', titulo: 'Certificados de Depósito: qué son y cómo funcionan', calculadora: 'interes_compuesto' },
      { id: 'l2_4', titulo: 'La magia de reinvertir: el dinero que se multiplica solo' }
    ],
    quiz: [],
    badge: {
      id: 'badge_ahorrista',
      nombre: 'Ahorrista Inteligente',
      emoji: '💡',
      descripcion: 'Entendés cómo el interés trabaja para vos'
    }
  },

  {
    id: 'modulo_3',
    titulo: 'Cooperativas: El Poder de lo Colectivo',
    subtitulo: 'Una alternativa a los bancos que muchos desconocen',
    nivel: 'intermedio',
    emoji: '🤝',
    color: '#7C3AED',
    duracion: '15 min',
    perfiles: ['planificador', 'inversionista'],
    lecciones: [
      { id: 'l3_1', titulo: '¿Qué es una cooperativa de ahorro y crédito?' },
      { id: 'l3_2', titulo: 'Cooperativas vs. Bancos: ¿cuál te conviene?' },
      { id: 'l3_3', titulo: 'Cooperativas en Nicaragua: FENACOOP y otras' },
      { id: 'l3_4', titulo: 'Cómo unirte: requisitos y pasos concretos' }
    ],
    quiz: [],
    badge: {
      id: 'badge_solidario',
      nombre: 'Miembro Solidario',
      emoji: '🤝',
      descripcion: 'Conocés el poder de las cooperativas de ahorro'
    }
  },

  {
    id: 'modulo_4',
    titulo: 'Entiende el Crédito',
    subtitulo: 'La deuda puede ser herramienta o trampa',
    nivel: 'intermedio',
    emoji: '⚖️',
    color: '#DC2626',
    duracion: '20 min',
    perfiles: ['guardador', 'planificador', 'inversionista'],
    lecciones: [
      { id: 'l4_1', titulo: 'Deuda buena vs. deuda mala: ¿cómo distinguirlas?' },
      { id: 'l4_2', titulo: 'Cómo leer una tasa de interés sin que te engañen', calculadora: 'deuda' },
      { id: 'l4_3', titulo: 'Dos estrategias para salir de deudas: Avalancha y Bola de Nieve' },
      { id: 'l4_4', titulo: 'Cuándo pedir un préstamo y cuándo no' }
    ],
    quiz: [],
    badge: {
      id: 'badge_credito',
      nombre: 'Maestro del Crédito',
      emoji: '⚖️',
      descripcion: 'Sabés usar el crédito a tu favor'
    }
  },

  {
    id: 'modulo_5',
    titulo: 'Piensa en Tu Futuro',
    subtitulo: 'Construí riqueza, no solo ingresos',
    nivel: 'avanzado',
    emoji: '🔭',
    color: '#EA580C',
    duracion: '25 min',
    perfiles: ['planificador', 'inversionista'],
    lecciones: [
      { id: 'l5_1', titulo: 'La inflación: por qué C$100 de hoy valen menos mañana' },
      { id: 'l5_2', titulo: 'No pongas todos los huevos en una canasta: diversificación' },
      { id: 'l5_3', titulo: 'Microfinanzas y crédito para emprender en Nicaragua' },
      { id: 'l5_4', titulo: 'Metas financieras: corto, mediano y largo plazo' }
    ],
    quiz: [],
    badge: {
      id: 'badge_visionario',
      nombre: 'Visionario Financiero',
      emoji: '🔭',
      descripcion: 'Pensás en grande y en largo plazo'
    }
  }
];
```

---

### 7.2 Ejemplo de Contenido de Lección (en `modules.js`)

```javascript
// Lección: La Regla del 50/30/20
{
  id: 'l1_2',
  titulo: 'La Regla del 50/30/20: simple y efectiva',
  duracion: '4 min',
  contenido: {
    intro: `¿Alguna vez llegó la remesa y a los pocos días ya no había nada? No es falta de disciplina, es falta de un plan. La Regla del 50/30/20 es la forma más sencilla de ordenar tu dinero.`,
    secciones: [
      {
        titulo: '¿Qué dice la regla?',
        texto: `De cada C$100 que recibes, dividís el dinero en tres partes:`,
        lista: [
          '50% para lo que NECESITAS: comida, luz, agua, transporte, alquiler.',
          '30% para lo que QUIERES: salidas, ropa, entretenimiento.',
          '20% para AHORRAR e invertir tu futuro.'
        ]
      },
      {
        titulo: 'Ejemplo real en Nicaragua',
        texto: `Si recibes C$5,000 al mes de remesas:`,
        tabla: [
          { categoria: 'Necesidades (50%)', monto: 'C$2,500', ejemplos: 'Comida, luz, agua, transporte' },
          { categoria: 'Deseos (30%)', monto: 'C$1,500', ejemplos: 'Salidas, ropa, subscripciones' },
          { categoria: 'Ahorro (20%)', monto: 'C$1,000', ejemplos: 'Cuenta de ahorro, fondo emergencia' }
        ]
      },
      {
        titulo: '¿Qué pasa si no alcanza para el 20%?',
        texto: `No te preocupés. Si estás empezando, guardá el 5% o el 10%. Lo importante es el hábito, no el porcentaje. Cuando el hábito esté, aumentá poco a poco.`
      }
    ],
    conclusión: `La regla es flexible. Lo que no es flexible es tener un plan. Usá la calculadora aquí abajo para ver cómo quedaría con tus ingresos reales.`,
    cta_calculadora: 'presupuesto'
  }
}
```

---

### 7.3 Ejemplo de Quiz

```javascript
// Quiz del Módulo 1
quiz: [
  {
    id: 'q1_1',
    pregunta: '¿Qué porcentaje recomienda la regla 50/30/20 para el ahorro?',
    opciones: ['10%', '20%', '30%', '50%'],
    respuestaCorrecta: 1, // índice de '20%'
    explicacion: 'El 20% va al ahorro. Aunque no llegues a ese número de inmediato, tenerlo como meta te ayuda a progresar.'
  },
  {
    id: 'q1_2',
    pregunta: '¿Por qué NO es buena idea guardar el dinero en casa?',
    opciones: [
      'Porque el dinero puede deteriorarse',
      'Porque la inflación lo hace valer menos con el tiempo',
      'Porque los bancos lo necesitan',
      'Porque es ilegal'
    ],
    respuestaCorrecta: 1,
    explicacion: 'La inflación hace que el mismo billete compre menos cosas cada año. En una cuenta de ahorro, al menos ganás intereses que compensan parte de eso.'
  },
  {
    id: 'q1_3',
    pregunta: '¿Para qué sirve el fondo de emergencia?',
    opciones: [
      'Para comprar lo que querés sin culpa',
      'Para cubrir gastos inesperados sin caer en deudas',
      'Para invertir en la bolsa de valores',
      'Para pagar las deudas más rápido'
    ],
    respuestaCorrecta: 1,
    explicacion: 'El fondo de emergencia es tu escudo. Cuando llega un imprevisto (enfermedad, desempleo, reparación), lo cubrís sin pedir prestado.'
  }
]
```

---

## 8. CALCULADORAS FINANCIERAS

### 8.1 Calculadora de Interés Compuesto (`CompoundInterestCalc.jsx`)

**Inputs:**
- Ahorro inicial (C$ o USD, con toggle)
- Aporte mensual adicional (C$)
- Tasa de interés anual (%) — con valores predefinidos de bancos NI
- Plazo en meses (slider: 6 – 60 meses)

**Outputs:**
- Total acumulado al final
- Interés ganado (en C$)
- Gráfica de barras mensual (Recharts: BarChart)
- Comparación: "sin interés vs. con interés"

**Fórmula a implementar en `calculator.js`:**
```javascript
/**
 * Calcula el valor futuro con aportes periódicos (interés compuesto mensual)
 * @param {number} principal - Monto inicial
 * @param {number} monthlyContrib - Aporte mensual
 * @param {number} annualRate - Tasa anual en %
 * @param {number} months - Plazo en meses
 * @returns {Array} Datos mes a mes para la gráfica
 */
export function compoundInterestData(principal, monthlyContrib, annualRate, months) {
  const r = annualRate / 100 / 12; // tasa mensual
  const data = [];
  let balance = principal;

  for (let i = 1; i <= months; i++) {
    balance = balance * (1 + r) + monthlyContrib;
    data.push({
      mes: i,
      saldo: Math.round(balance),
      sinInteres: Math.round(principal + monthlyContrib * i),
    });
  }
  return data;
}
```

---

### 8.2 Calculadora de Fondo de Emergencia (`EmergencyFundCalc.jsx`)

**Inputs:**
- Gasto mensual en comida (C$)
- Gasto mensual en servicios (luz, agua, etc.) (C$)
- Gasto mensual en transporte (C$)
- Otros gastos esenciales (C$)
- Meses de cobertura deseados (toggle: 3 / 6 meses)
- ¿Cuánto podés ahorrar al mes? (C$)

**Output:**
- Meta total del fondo
- Tiempo estimado para alcanzarla
- Barra de progreso hacia la meta
- Recomendación de institución donde guardarlo

---

### 8.3 Comparador de Productos (`ProductComparator.jsx`)

Mostrar tabla comparativa con datos reales (ver sección 9):

| Producto | Institución | Tasa anual | Mínimo | Liquidez | Regulado por |
|---|---|---|---|---|---|
| Cuenta de Ahorro | BANPRO | 2.5% | C$100 | Inmediata | SIBOIF |
| CD 12 meses | BAC | 6.8% | C$1,000 | Al vencimiento | SIBOIF |
| Ahorro Cooperativa | COOPEMUJER | 5.5% | C$200 | Mensual | CONAMI |

Con gráfica de comparación de crecimiento a 12 meses (Recharts: LineChart).

---

### 8.4 Calculadora de Préstamo (`LoanCalc.jsx`)

**Inputs:**
- Monto del préstamo (C$)
- Tasa de interés anual (%)
- Plazo en meses

**Outputs:**
- Cuota mensual
- Total a pagar
- Total de intereses pagados
- Tabla de amortización (primeras 6 cuotas + resumen)

**Fórmula:**
```javascript
export function monthlyPayment(principal, annualRate, months) {
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}
```

---

### 8.5 Calculadora 50/30/20 (`BudgetCalc.jsx`)

**Input:** Remesa mensual total (C$)
**Output:** Distribución visual con donut chart + montos en C$

---

## 9. DATOS FINANCIEROS NICARAGÜENSES

### 9.1 Instituciones Bancarias (`src/data/institutions.js`)

```javascript
// ⚠️ NOTA PARA EL DESARROLLADOR:
// Las tasas son aproximadas al momento de redactar este plan (2024).
// El usuario debe verificar las tasas vigentes directamente con cada institución.

export const BANCOS = [
  {
    id: 'banpro',
    nombre: 'BANPRO',
    nombreCompleto: 'Banco de la Producción S.A.',
    tipo: 'banco',
    logo: '/logos/banpro.png', // agregar logo
    regulador: 'SIBOIF',
    website: 'https://banpro.com.ni',
    telefono: '1800-BANPRO',
    productos: {
      cuenta_ahorro: {
        nombre: 'Cuenta de Ahorro Básica',
        monedas: ['NIO', 'USD'],
        tasaAnualNIO: 2.5,
        tasaAnualUSD: 1.2,
        minimoApertura: 100, // C$
        comisionMantenimiento: 0,
        liquidez: 'inmediata',
        descripcion: 'Cuenta sin costo de mantenimiento. Disponible en sucursales y app móvil.'
      },
      certificado_deposito: {
        nombre: 'Certificado de Depósito',
        plazos: [
          { meses: 3, tasaNIO: 4.5, tasaUSD: 2.0 },
          { meses: 6, tasaNIO: 5.5, tasaUSD: 2.8 },
          { meses: 12, tasaNIO: 6.5, tasaUSD: 3.5 },
          { meses: 24, tasaNIO: 7.2, tasaUSD: 4.0 }
        ],
        minimoCDNIO: 1000,
        liquidez: 'al_vencimiento',
      }
    }
  },
  {
    id: 'bac',
    nombre: 'BAC Credomatic',
    tipo: 'banco',
    regulador: 'SIBOIF',
    website: 'https://bac.net/nicaragua',
    productos: {
      cuenta_ahorro: { tasaAnualNIO: 2.0, minimoApertura: 500 },
      certificado_deposito: {
        plazos: [
          { meses: 6, tasaNIO: 5.0 },
          { meses: 12, tasaNIO: 6.8 }
        ]
      }
    }
  },
  {
    id: 'bdf',
    nombre: 'BDF',
    nombreCompleto: 'Banco de Finanzas',
    tipo: 'banco',
    regulador: 'SIBOIF',
    website: 'https://bdf.com.ni',
    productos: {
      cuenta_ahorro: { tasaAnualNIO: 2.2, minimoApertura: 200 },
      certificado_deposito: {
        plazos: [
          { meses: 6, tasaNIO: 5.2 },
          { meses: 12, tasaNIO: 6.3 }
        ]
      }
    }
  },
  {
    id: 'lafise',
    nombre: 'LAFISE Bancentro',
    tipo: 'banco',
    regulador: 'SIBOIF',
    website: 'https://bancentro.com.ni',
    productos: {
      cuenta_ahorro: { tasaAnualNIO: 2.3, minimoApertura: 300 },
      certificado_deposito: {
        plazos: [
          { meses: 12, tasaNIO: 6.0 }
        ]
      }
    }
  },
  {
    id: 'avanz',
    nombre: 'Avanz',
    nombreCompleto: 'Avanz (anteriormente Ficohsa Nicaragua)',
    tipo: 'banco',
    regulador: 'SIBOIF',
    website: 'https://avanz.com.ni',
    productos: {
      cuenta_ahorro: { tasaAnualNIO: 2.5, minimoApertura: 100 },
      certificado_deposito: {
        plazos: [
          { meses: 6, tasaNIO: 5.0 },
          { meses: 12, tasaNIO: 6.5 }
        ]
      }
    }
  }
];

export const COOPERATIVAS = [
  {
    id: 'coopemujer',
    nombre: 'COOPEMUJER',
    tipo: 'cooperativa',
    enfoque: 'Mujeres emprendedoras y microempresas',
    regulador: 'CONAMI',
    website: 'https://coopemujer.com.ni',
    tasaAhorro: 5.5,
    tasaCreditoMinima: 18,
    requisitos: ['Ser mujer mayor de 18 años', 'Cédula de identidad', 'Aporte de admisión']
  },
  {
    id: 'fenacoop',
    nombre: 'FENACOOP',
    tipo: 'red_cooperativas',
    enfoque: 'Red de cooperativas agropecuarias y de ahorro',
    regulador: 'CONAMI',
    website: 'https://fenacoop.org.ni',
    descripcion: 'Red que agrupa múltiples cooperativas. Consultá cuál está más cerca de tu zona.'
  }
];

// Tasa de cambio de referencia (actualizar periódicamente)
export const TASA_CAMBIO = {
  USD_TO_NIO: 36.5,
  fuente: 'BCN (Banco Central de Nicaragua)',
  fecha_referencia: '2024-Q4',
  nota: 'El córdoba tiene deslizamiento programado. Esta tasa es referencial.'
};

// Reguladores
export const REGULADORES = {
  SIBOIF: {
    nombre: 'Superintendencia de Bancos y de Otras Instituciones Financieras',
    website: 'https://siboif.gob.ni',
    descripcion: 'Regula y supervisa bancos, financieras y aseguradoras en Nicaragua.'
  },
  CONAMI: {
    nombre: 'Comisión Nacional de Microfinanzas',
    website: 'https://conami.gob.ni',
    descripcion: 'Regula y supervisa las instituciones de microfinanzas en Nicaragua.'
  }
};
```

---

### 9.2 Glosario Financiero (`src/data/concepts.js`)

```javascript
export const GLOSSARY = [
  {
    id: 'tasa_interes',
    termino: 'Tasa de interés',
    definicion_simple: 'El "precio" del dinero. Si pedís prestado, la tasa es lo que pagás de más. Si ahorrás, es lo que te pagan a vos.',
    definicion_tecnica: 'Porcentaje que se aplica a un capital por unidad de tiempo, generalmente expresado de forma anual.',
    ejemplo: 'Si depositás C$10,000 en una cuenta con 5% anual, al año tenés C$10,500.',
    relacionados: ['tasa_nominal', 'tasa_efectiva', 'interes_compuesto'],
    modulo: 'modulo_2'
  },
  {
    id: 'interes_compuesto',
    termino: 'Interés compuesto',
    definicion_simple: 'Es cuando los intereses que ganaste también generan intereses. Tu dinero crece cada vez más rápido.',
    ejemplo: 'C$1,000 al 6% anual: primer año ganás C$60 (total C$1,060). Segundo año ganás C$63.6 sobre los C$1,060. El dinero se multiplica solo.',
    dato_curiosidad: 'Einstein supuestamente lo llamó "la octava maravilla del mundo".',
    modulo: 'modulo_2'
  },
  {
    id: 'certificado_deposito',
    termino: 'Certificado de Depósito (CD)',
    definicion_simple: 'Es como un contrato con el banco: vos le prestás tu dinero por un tiempo fijo (3, 6, 12 meses) y ellos te pagan más interés que en una cuenta normal.',
    ejemplo: 'Depositás C$5,000 en un CD a 12 meses al 6.5%. Al año retirás C$5,325.',
    ventaja: 'Tasa más alta que cuenta de ahorro.',
    desventaja: 'No podés retirar el dinero antes sin perder intereses.',
    modulo: 'modulo_2'
  },
  {
    id: 'inflacion',
    termino: 'Inflación',
    definicion_simple: 'Cuando los precios suben con el tiempo y el mismo dinero compra menos cosas.',
    ejemplo: 'Si la inflación es del 5% anual, lo que hoy cuesta C$100, el próximo año costará C$105. Si tu dinero está guardado en casa, "perdés" poder adquisitivo.',
    modulo: 'modulo_5'
  },
  {
    id: 'fondo_emergencia',
    termino: 'Fondo de emergencia',
    definicion_simple: 'Dinero apartado solo para imprevistos: enfermedad, reparación del hogar, pérdida de trabajo. No se toca para nada más.',
    meta_recomendada: 'Entre 3 y 6 meses de tus gastos básicos.',
    donde_guardarlo: 'En una cuenta de ahorro con fácil acceso (liquidez inmediata).',
    modulo: 'modulo_1'
  },
  {
    id: 'cooperativa',
    termino: 'Cooperativa de ahorro y crédito',
    definicion_simple: 'Una organización donde un grupo de personas se une para ahorrar juntas y prestarse dinero entre sí con mejores condiciones que en un banco.',
    ventaja: 'Tasas de ahorro más altas, crédito más accesible para socios.',
    regulacion: 'Supervisadas por CONAMI en Nicaragua.',
    modulo: 'modulo_3'
  },
  {
    id: 'liquidez',
    termino: 'Liquidez',
    definicion_simple: 'Qué tan rápido podés convertir tu dinero o inversión en efectivo. Una cuenta de ahorro tiene alta liquidez; un terreno, muy poca.',
    ejemplo: 'Una cuenta de ahorro: podés retirar hoy (alta liquidez). Un CD: tenés que esperar a que venza (baja liquidez por ese período).',
    modulo: 'modulo_2'
  },
  {
    id: 'presupuesto',
    termino: 'Presupuesto personal',
    definicion_simple: 'Un plan escrito de cuánto dinero vas a recibir y en qué lo vas a gastar cada mes. Es el primer paso del control financiero.',
    herramienta: 'Regla 50/30/20',
    modulo: 'modulo_1'
  },
  {
    id: 'diversificacion',
    termino: 'Diversificación',
    definicion_simple: 'No poner todo el dinero en un solo lugar. Si un ahorro falla, los otros te cubren.',
    ejemplo: 'En vez de poner todo en un CD, podés tener: algo en cuenta de ahorro (emergencias), algo en un CD (crecimiento), y algo en una cooperativa (mayor rendimiento).',
    modulo: 'modulo_5'
  },
  {
    id: 'microcredito',
    termino: 'Microcrédito',
    definicion_simple: 'Préstamos de monto pequeño para personas con negocios o emprendimientos que no califican para crédito bancario tradicional.',
    regulacion: 'En Nicaragua los regula CONAMI.',
    modulo: 'modulo_5'
  }
];
```

---

## 10. DISEÑO UI/UX

### 10.1 Principios de diseño
1. **Mobile-first absoluto**: Todo diseñado para pantallas de 375px primero.
2. **Lenguaje de vecindad**: Sin tecnicismos sin explicar. "Hacé crecer tu dinero" en vez de "maximizá el rendimiento de tu cartera".
3. **Progresivo y no abrumador**: La información llega en capas. Primero lo esencial, luego los detalles.
4. **Celebratorio**: Cada logro se celebra visualmente (badges, confetti, mensajes positivos).
5. **Sin condescendencia**: El usuario es inteligente. Solo necesita la información correcta.

### 10.2 Paleta de colores (en `tailwind.config.js`)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',  // ← Main brand green
          700: '#15803d',
        },
        secondary: {
          500: '#3b82f6',
          600: '#2563eb',  // ← Trust blue
        },
        accent: {
          500: '#f97316',
          600: '#ea580c',  // ← Achievement orange
        },
        surface: '#F9FAFB',
        card: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    }
  }
}
```

### 10.3 Componentes clave y su comportamiento

```
OnboardingQuestion:
  - Pregunta centrada, texto grande (text-xl)
  - Opciones como botones full-width con ícono emoji
  - Al seleccionar: fondo verde suave + check mark
  - Animación de slide: pregunta entra desde la derecha

RecommendationCard:
  - Ícono grande centrado (emoji o SVG)
  - Prioridad indicada con número o badge "Primero esto"
  - Título (text-lg bold) + resumen (2 líneas)
  - Botón "Ver cómo hacerlo →"
  - Expansible para ver pasos detallados

ModuleCard:
  - Color de fondo según módulo
  - Nivel (Básico / Intermedio / Avanzado) como badge
  - Barra de progreso si ya empezado
  - Duración estimada

BadgeEarned (modal):
  - Fondo oscuro con overlay
  - Badge grande animado (scale bounce)
  - Confetti animation (CSS o canvas)
  - Mensaje personalizado
  - Botón "¡Seguir aprendiendo!"

BottomNav (móvil):
  - 4 tabs: Inicio / Módulos / Calculadoras / Mi Perfil
  - Íconos con label debajo
  - Activo: color verde principal
```

### 10.4 Tipografía (Google Fonts — agregar al `index.html`)
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 10.5 Animaciones sugeridas (Tailwind + CSS)
- Transición entre preguntas del quiz: `slide-in-right`
- Tarjetas de recomendación: `fade-in-up` con delay escalonado
- Gráficas: animación de entrada en Recharts (isAnimationActive={true})
- Badge ganado: `scale-bounce` + confetti

---

## 11. MODELO DE DATOS

### `useUserStore.js` (Zustand)

```javascript
// src/store/useUserStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set, get) => ({
      // Respuestas del quiz
      answers: {},             // { A1: 'mensual', A2: 'cien200', ... }
      
      // Perfil clasificado
      profile: null,           // { id, nombre, emoji, color, descripcion, ... }
      
      // Recomendaciones generadas
      recommendations: [],     // Array de recomendaciones priorizadas
      
      // Info del usuario (derivada del quiz)
      userInfo: {
        remesaMensualNIO: 0,
        sobranteEstimadoNIO: 0,
        tieneCuentaBancaria: false,
        tieneAhorros: false,
        tieneDeudas: false,
        quiereEmprender: false,
        nivelConocimiento: 'poco',  // 'poco' | 'basico' | 'bien' | 'experto'
        meta: null
      },
      
      // Acciones
      setAnswer: (questionId, value) => set(state => ({
        answers: { ...state.answers, [questionId]: value }
      })),
      
      setProfile: (profile) => set({ profile }),
      setRecommendations: (recs) => set({ recommendations: recs }),
      setUserInfo: (info) => set({ userInfo: info }),
      
      resetAll: () => set({
        answers: {},
        profile: null,
        recommendations: [],
        userInfo: {}
      }),
      
      isOnboardingComplete: () => {
        const { answers } = get();
        return Object.keys(answers).length >= 12; // 13 preguntas (C3 puede ser múltiple)
      }
    }),
    {
      name: 'semilla-user-data', // clave en localStorage
    }
  )
);

export default useUserStore;
```

### `useProgressStore.js` (Zustand)

```javascript
// src/store/useProgressStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProgressStore = create(
  persist(
    (set) => ({
      // Módulos
      completedLessons: [],      // ['l1_1', 'l1_2', 'l2_1', ...]
      completedModules: [],      // ['modulo_1', 'modulo_2', ...]
      quizScores: {},            // { 'modulo_1': 3, 'modulo_2': 2 } (de 3)
      
      // Badges ganados
      earnedBadges: [],          // ['badge_organizador', 'badge_ahorrista', ...]
      
      // Acciones
      completeLesson: (lessonId) => set(state => ({
        completedLessons: [...new Set([...state.completedLessons, lessonId])]
      })),
      
      completeModule: (moduleId) => set(state => ({
        completedModules: [...new Set([...state.completedModules, moduleId])]
      })),
      
      setQuizScore: (moduleId, score) => set(state => ({
        quizScores: { ...state.quizScores, [moduleId]: score }
      })),
      
      earnBadge: (badgeId) => set(state => ({
        earnedBadges: [...new Set([...state.earnedBadges, badgeId])]
      })),
      
      getModuleProgress: (moduleId, totalLessons) => {
        // Implementar: retorna % completado de un módulo
      }
    }),
    {
      name: 'semilla-progress-data',
    }
  )
);

export default useProgressStore;
```

---

## 12. FASES DE IMPLEMENTACIÓN

### Estimado de tiempo total: 20–30 horas de desarrollo supervisado

---

### FASE 0 — Setup del proyecto (1–2 horas)
- [ ] Crear proyecto con Vite + React
- [ ] Configurar Tailwind CSS
- [ ] Instalar todas las dependencias
- [ ] Crear estructura de carpetas completa
- [ ] Configurar React Router con rutas base
- [ ] Configurar Zustand stores (vacíos)
- [ ] Agregar fuente Inter desde Google Fonts
- [ ] Crear colores del tema en `tailwind.config.js`
- [ ] Verificar que el proyecto corra correctamente

---

### FASE 1 — Datos base (1–2 horas)
- [ ] Crear `questions.js` con las 13 preguntas
- [ ] Crear `profiles.js` con los 4 perfiles
- [ ] Crear `institutions.js` con bancos y cooperativas
- [ ] Crear `concepts.js` con glosario (mínimo 10 términos)
- [ ] Crear `modules.js` con estructura de módulos (sin contenido de lecciones aún)
- [ ] Crear `badges.js`
- [ ] Crear `currency.js` con función de conversión NIO/USD

---

### FASE 2 — Componentes UI base (1–2 horas)
- [ ] `Button.jsx` (variantes: primary, secondary, outline, ghost)
- [ ] `Card.jsx` (con variantes)
- [ ] `ProgressBar.jsx` (con animación)
- [ ] `Badge.jsx` (para niveles y logros)
- [ ] `OptionButton.jsx` (botón grande con emoji para el quiz)
- [ ] `BottomNav.jsx` (navegación móvil)

---

### FASE 3 — Onboarding (3–4 horas)
- [ ] Página `Landing.jsx` con CTA
- [ ] Página `Onboarding.jsx` con lógica de flujo
- [ ] Componente `QuestionCard.jsx`
- [ ] Animaciones de transición entre preguntas
- [ ] Sección headers (A / B / C)
- [ ] Manejo de pregunta C3 (multi-selección)
- [ ] Guardado de respuestas en Zustand + localStorage
- [ ] Navegación: adelante / atrás entre preguntas

---

### FASE 4 — Motor de recomendaciones y perfil (2–3 horas)
- [ ] Implementar `profiler.js` (función `classifyProfile`)
- [ ] Implementar `recommendations.js` (función `generateRecommendations`)
- [ ] Página `ProfileResult.jsx`
- [ ] Componente `RecommendationCard.jsx`
- [ ] Pruebas manuales con diferentes combinaciones de respuestas

---

### FASE 5 — Dashboard (2–3 horas)
- [ ] Página `Dashboard.jsx` con layout responsivo
- [ ] Componente `ProfileSummary.jsx`
- [ ] Lista de recomendaciones priorizadas
- [ ] `ModuleGrid.jsx` con módulos sugeridos
- [ ] Acceso rápido a calculadoras
- [ ] Indicador de progreso general

---

### FASE 6 — Módulos educativos (4–5 horas)
- [ ] Página `ModuleList.jsx`
- [ ] Página `ModuleDetail.jsx` (lista de lecciones)
- [ ] Página `LessonDetail.jsx` (renderizar contenido)
- [ ] Componente `LessonContent.jsx` (soporte para texto, listas, tablas, CTA a calculadora)
- [ ] Sistema de quiz: `QuizQuestion.jsx` + lógica de puntuación
- [ ] Modal de badge ganado con animación
- [ ] Seguimiento de progreso en `useProgressStore`
- [ ] Escribir contenido de al menos Módulo 1 y Módulo 2 completos

---

### FASE 7 — Calculadoras (3–4 horas)
- [ ] Hub `Calculators.jsx`
- [ ] `CompoundInterestCalc.jsx` con gráfica Recharts
- [ ] `EmergencyFundCalc.jsx`
- [ ] `BudgetCalc.jsx` (50/30/20) con donut chart
- [ ] `LoanCalc.jsx` con tabla de amortización
- [ ] `ProductComparator.jsx` con datos reales de bancos
- [ ] Implementar todas las fórmulas en `calculator.js`
- [ ] Toggle NIO/USD en calculadoras relevantes

---

### FASE 8 — Glosario y perfil de usuario (1–2 horas)
- [ ] Página `Glossary.jsx` con búsqueda
- [ ] Componente `GlossaryTerm.jsx` (expandible)
- [ ] Página `Profile.jsx` (ver perfil + badges ganados + opción de resetear)
- [ ] Tooltips en términos técnicos dentro de lecciones

---

### FASE 9 — Polish, accesibilidad y deploy (2–3 horas)
- [ ] Revisión responsive en 375px, 390px, 768px
- [ ] Mensaje de disclaimer en calculadoras y recomendaciones
- [ ] Manejo de estado vacío (primera vez, sin datos)
- [ ] Loader/skeleton cuando carga desde localStorage
- [ ] Favicon y meta tags (título, descripción, OG image)
- [ ] Crear repositorio en GitHub
- [ ] Deploy en Vercel
- [ ] Probar en dispositivo Android real

---

## 13. INSTRUCCIONES PARA EL AI CODING ASSISTANT

### 13.1 Principios generales
- Implementar en el orden exacto de las fases (0 → 9)
- Completar cada fase completamente antes de pasar a la siguiente
- Después de cada fase, el proyecto debe correr sin errores (`npm run dev`)
- Usar exactamente el stack definido en la sección 2; no añadir dependencias no listadas
- Todo comentario de código en **español**
- No usar TypeScript; el proyecto es JavaScript plano

### 13.2 Convenciones de código
```
Componentes React:    PascalCase    (RecommendationCard.jsx)
Funciones/variables:  camelCase     (classifyProfile, userAnswers)
Constantes:           SCREAMING     (TASA_CAMBIO, PROFILES)
Clases CSS:           Solo Tailwind utilities (no CSS personalizado salvo animaciones)
IDs de datos:         snake_case    ('modulo_1', 'badge_organizador', 'l1_2')
```

### 13.3 Estilo de los componentes
- Usar Tailwind exclusivamente para estilos
- Todos los componentes deben tener propTypes o comentario JSDoc si reciben props
- Componentes funcionales con hooks; no usar clases
- Extraer lógica compleja a hooks personalizados en `src/hooks/`

### 13.4 Manejo de errores importantes
- Si localStorage no está disponible: manejar con try/catch en `storage.js`
- Si el usuario entra a `/dashboard` sin completar el onboarding: redirigir a `/`
- Si el usuario ya completó el onboarding y entra a `/`: redirigir a `/dashboard`
- La tasa de cambio NIO/USD es un valor hardcoded (C$36.5); indicar claramente que es referencial

### 13.5 Responsive design
- Breakpoints: `sm:` (640px), `md:` (768px)
- El 90% del uso será en móvil, priorizar esa experiencia
- La `BottomNav` solo debe verse en mobile (oculta en `md:` y superior)
- En desktop, usar una sidebar en lugar de BottomNav

### 13.6 Disclaimer legal (agregar en todas las calculadoras y recomendaciones)
```
⚠️ Aviso: Esta herramienta es educativa y no constituye asesoría financiera profesional.
Las tasas mostradas son orientativas. Consultá directamente con tu institución financiera.
```

### 13.7 Prioridades si el tiempo es limitado
Si hay restricciones de tiempo, implementar en este orden de prioridad:
1. Onboarding completo (secciones A, B, C)
2. Motor de perfiles + resultado de perfil
3. Al menos 3 recomendaciones funcionales
4. Dashboard básico
5. Módulo 1 completo (4 lecciones + quiz + badge)
6. Calculadora de interés compuesto
7. Glosario básico (10 términos)

---

## APÉNDICE: RUTAS DE LA APLICACIÓN

```javascript
// App.jsx
<Routes>
  <Route path="/"                element={<Landing />} />
  <Route path="/quiz"            element={<Onboarding />} />
  <Route path="/mi-perfil"       element={<ProfileResult />} />
  <Route path="/inicio"          element={<Dashboard />} />
  <Route path="/modulos"         element={<ModuleList />} />
  <Route path="/modulos/:id"     element={<ModuleDetail />} />
  <Route path="/leccion/:id"     element={<LessonDetail />} />
  <Route path="/calculadoras"    element={<Calculators />} />
  <Route path="/glosario"        element={<Glossary />} />
  <Route path="/perfil"          element={<Profile />} />
  <Route path="*"                element={<Navigate to="/" />} />
</Routes>
```

---

## APÉNDICE: CHECKLIST FINAL ANTES DE ENTREGAR

- [ ] El quiz completo funciona sin errores en móvil
- [ ] El perfil se asigna correctamente para distintas combinaciones de respuestas
- [ ] Las recomendaciones varían según el perfil
- [ ] Al menos 2 módulos completos con quiz y badge
- [ ] Al menos 2 calculadoras funcionales con gráficas
- [ ] El glosario tiene mínimo 10 términos
- [ ] Los datos de instituciones nicaragüenses están completos
- [ ] El disclaimer aparece en calculadoras y recomendaciones
- [ ] El progreso persiste al cerrar y abrir el navegador (localStorage)
- [ ] La app se ve bien en un teléfono Android de 375px
- [ ] Deploy en Vercel funciona correctamente
- [ ] No hay errores en consola del navegador

---

*Documento preparado como brief de desarrollo para AI coding assistant. Versión 1.0.*
*Proyecto Social — Clase de Investigación de Mercados*
