export const TWEAK_DEFAULTS = {
  showAlerts: true,
  softMode: false,
  showTeams: true,
}

export const CHAT_SOURCE_NAME = 'Negreira Boys Fantasy Cup ⚽️🤡'

const fragment = (at, author, text) => ({
  at,
  author,
  text,
  source: CHAT_SOURCE_NAME,
})

export const MEMBERS = [
  {
    id: 'gabriel',
    name: 'Gabriel Gutiérrez',
    initials: 'GB',
    nickname: '"Barry"',
    role: 'El Gatekeeper',
    roleShort: 'Admin',
    color: 'oklch(72% 0.18 60)',
    colorHex: '#c4850a',
    team: 'Real Madrid',
    activity: 8,
    warning: false,
    scores: [
      { label: 'Agresión', val: 4, color: 'oklch(62% 0.22 25)' },
      { label: 'Colaboración', val: 7, color: 'oklch(70% 0.16 145)' },
      { label: 'Humor', val: 8, color: 'oklch(72% 0.18 60)' },
      { label: 'Apertura', val: 6, color: 'oklch(68% 0.18 200)' },
    ],
    patterns: [
      'Admin que ejerce autoridad con silencios y expulsiones estratégicas',
      'Humor lacónico - dice mucho en pocas palabras',
      'Sale voluntariamente del grupo en oct 2025 por la toxicidad',
      'Sus análisis de política del fútbol son los más lúcidos del grupo',
    ],
    quotes: [
      { text: '"El circo es ir a jugar a la pelota."', ctx: 'Sobre Copa del Rey y política del fútbol, abr 2025' },
      { text: '"Desde que se fue Gustavo me quedé sin amigos. Todo es culpa de Gustavo."', ctx: 'Después de expulsarlo del grupo, con humor' },
      { text: '"¿Es en serio que estamos teniendo esta discusión? JAJAJAJA"', ctx: 'Reacción cuando Javier justificó llamar "mono" a Vinicius' },
    ],
    relations: [
      { who: 'Francisco', type: '🤝 Alianza', desc: 'Principal aliado. Debate con él en privado cuando el grupo escala.' },
      { who: 'Gustavo', type: '😂 Tensión cómica', desc: 'Lo expulsa y readmite en minutos. El grupo lo llama "Gabriel J. Trump".' },
      { who: 'Javier', type: '⚡ Autoridad', desc: 'Lo expulsó durante la final de Copa del Rey sin previo aviso.' },
      { who: 'Jesús', type: '🤫 Complicidad', desc: 'Silencio cómplice. Humor compartido sin palabras.' },
    ],
    arc: 'Consistente y medido. Más callado hacia dic 2025. Sale del grupo en octubre - regresa sin drama. Su mayor acto de juicio es reaccionar con incredulidad cuando Javier minimiza el racismo contra Vinicius.',
  },
  {
    id: 'francisco',
    name: 'Francisco Arteaga',
    initials: 'FA',
    nickname: '"Paquito"',
    role: 'El Motor del Grupo',
    roleShort: 'Motor',
    color: 'oklch(66% 0.22 32)',
    colorHex: '#d04820',
    team: 'Real Madrid',
    activity: 10,
    warning: false,
    scores: [
      { label: 'Agresión', val: 7, color: 'oklch(62% 0.22 25)' },
      { label: 'Colaboración', val: 8, color: 'oklch(70% 0.16 145)' },
      { label: 'Humor', val: 6, color: 'oklch(72% 0.18 60)' },
      { label: 'Apertura', val: 4, color: 'oklch(68% 0.18 200)' },
    ],
    patterns: [
      'Genera el 40%+ de los mensajes - el motor indiscutible del chat',
      'Argumenta con fuentes y datos, pero su frustración escala rápido',
      'Tiene newsletter propio, vive en Madrid - el más "dentro" del tema',
      'Sus temas favoritos: VAR, árbitros, política del fútbol, fichajes',
    ],
    quotes: [
      { text: '"Creer en el VAR es creer en Santa Claus."', ctx: 'Mayo 2025, debate VAR' },
      { text: '"Es difícil hablar con alguien que no entiende de fútbol o de la vida real."', ctx: 'A Javier, mayo 2025' },
      { text: '"Los quiero muchachos." - Antes de que su avión despegara.', ctx: 'Feb 2026, caso Prestiani - humor negro en momentos tensos' },
    ],
    relations: [
      { who: 'Gabriel', type: '🤝 Alianza', desc: 'Su árbitro personal cuando se pasa de la raya.' },
      { who: 'Gustavo', type: '⚡ Conflicto', desc: 'Sparring principal. Lo acusa de trolear sistemáticamente.' },
      { who: 'Javier', type: '🔥 Máxima tensión', desc: '"Pura paja Javier. Hablas por fastidiar."' },
      { who: 'Jesús', type: '🤝 Respeto', desc: 'Lo cita como autoridad: "cuando Jesús interviene, tira factos".' },
    ],
    arc: 'Constante a lo largo del año. Su frustración con Javier crece progresivamente. En dic 2025 sus argumentos se vuelven más elaborados y filosóficos (caso Negreira).',
  },
  {
    id: 'gustavo',
    name: 'Gustavo Torres',
    initials: 'GT',
    nickname: '"Guguito"',
    role: 'El Abogado del Diablo',
    roleShort: 'Contrapunto',
    color: 'oklch(68% 0.18 195)',
    colorHex: '#0a9d8f',
    team: 'Barcelona',
    activity: 7,
    warning: false,
    scores: [
      { label: 'Agresión', val: 3, color: 'oklch(62% 0.22 25)' },
      { label: 'Colaboración', val: 6, color: 'oklch(70% 0.16 145)' },
      { label: 'Humor', val: 9, color: 'oklch(72% 0.18 60)' },
      { label: 'Apertura', val: 9, color: 'oklch(68% 0.18 200)' },
    ],
    patterns: [
      'El único barcelonista declarado en un grupo dominado por madridistas',
      'Se retracta públicamente cuando se excede - el más honesto del grupo en eso',
      'Ironía quirúrgica - inocente en forma, letal en fondo',
      'Admite en sep 2025 que el grupo tiene un echo chamber',
    ],
    quotes: [
      { text: '"Ah ok, ¿está ganando el Madrid? ¡Que bien que todo está siendo muy justo!"', ctx: 'Final Copa del Rey, abr 2025' },
      { text: '"Perdón, de nuevo me pasé de tóxico. Retiro ese comentario."', ctx: 'May 2025, autocorrección pública' },
      { text: '"Todos aquí somos jodidos por el algoritmo. Al menos yo lo admito."', ctx: 'Sobre el echo chamber del grupo, sep 2025' },
    ],
    relations: [
      { who: 'Francisco', type: '⚡ Sparring', desc: 'La dinámica más entretenida. Se pican y se ríen.' },
      { who: 'Gabriel', type: '😂 Víctima cómica', desc: 'Regularmente expulsado y readmitido con humor.' },
      { who: 'Javier', type: '🤔 Aliado paradójico', desc: 'Coincide con él accidentalmente - irrita más a Francisco.' },
      { who: 'Jesús', type: '✅ Respeto', desc: 'Debates más tranquilos, reconoce sus argumentos.' },
    ],
    arc: 'Comienza el año muy provocador. Hacia oct-dic 2025 tiene momentos de genuina reflexión. El más evolucionado del grupo en apertura.',
  },
  {
    id: 'jesus',
    name: 'Jesús Burgos',
    initials: 'JB',
    nickname: '"Jesús Ignacio"',
    role: 'El Árbitro Invisible',
    roleShort: 'El Analítico',
    color: 'oklch(70% 0.16 145)',
    colorHex: '#2da860',
    team: 'Real Madrid',
    activity: 6,
    warning: false,
    scores: [
      { label: 'Agresión', val: 2, color: 'oklch(62% 0.22 25)' },
      { label: 'Colaboración', val: 9, color: 'oklch(70% 0.16 145)' },
      { label: 'Humor', val: 9, color: 'oklch(72% 0.18 60)' },
      { label: 'Apertura', val: 8, color: 'oklch(68% 0.18 200)' },
    ],
    patterns: [
      'Cuando habla, la conversación cambia - sus argumentos son los más escuchados',
      'El sticker como veredicto definitivo: vale más que un párrafo',
      'Humor oscuro y certero que todo el grupo celebra',
      'El compass moral: condena el racismo con naturalidad cuando el grupo lo silencia',
    ],
    quotes: [
      { text: '"Lo de el hate a Vinicius es de estudio."', ctx: 'Feb 2026, incidente Prestiani' },
      { text: '"Solo Francisco hace un comentario así antes de que su avión despegue. 😂"', ctx: 'Reacción a un comentario extremo de Francisco' },
      { text: '"Trato de no opinar ya de los árbitros. Pero es descarado."', ctx: 'Dic 2025 - autocontención con punch final' },
    ],
    relations: [
      { who: 'Francisco', type: '🤝 Respeto mutuo', desc: 'Francisco lo cita como autoridad en el grupo.' },
      { who: 'Gabriel', type: '🤫 Complicidad', desc: 'Silencio cómplice y humor compartido.' },
      { who: 'Javier', type: '😒 Veredicto frío', desc: 'Responde con el sticker 😒 - el juicio más lapidario del grupo.' },
      { who: 'Gustavo', type: '✅ Debate limpio', desc: 'Debates más calmados que con otros miembros.' },
    ],
    arc: 'Consistente y estable todo el año. Su credibilidad crece. En dic 2025 decide "no opinar más de los árbitros" - pero añade el punch. El miembro con mayor inteligencia social del grupo.',
  },
  {
    id: 'javier',
    name: 'Javier Gimenez',
    initials: 'JG',
    nickname: '"Javito"',
    role: 'La Manzana Podrida',
    roleSoft: 'El Provocador',
    roleShort: '⚠ Alerta',
    color: 'oklch(60% 0.25 15)',
    colorHex: '#cc2200',
    team: 'Sin equipo fijo',
    activity: 5,
    warning: true,
    scores: [
      { label: 'Agresión', val: 8, color: 'oklch(62% 0.22 25)' },
      { label: 'Colaboración', val: 2, color: 'oklch(70% 0.16 145)' },
      { label: 'Humor', val: 3, color: 'oklch(72% 0.18 60)' },
      { label: 'Apertura al diálogo', val: 1, color: 'oklch(68% 0.18 200)' },
    ],
    patterns: [
      'Borra sus propios mensajes constantemente - múltiples veces por semana',
      'Argumentos circulares: vuelve al mismo punto ignorando lo que le respondiste',
      'Condescendente: "creo que entiendo más de fútbol que varios acá"',
      'Pasivo-agresivo: amenaza con salirse del grupo y luego dice que era broma',
      'Minimizó el racismo: justificó que llamaran "mono" a Vinicius en feb 2026',
      'Cambia la descripción del grupo sin consenso en plenos debates tensos',
    ],
    quotes: [
      { text: '"Capaz para los argentinos decirle mono no tiene connotación racista. A lo mejor le dijo que se deje de comportarse como mono."', ctx: '23 feb 2026 - Gabriel respondió: "¿Es en serio que estamos teniendo esta discusión?"' },
      { text: '"Creo que veo fútbol y entiendo un poquito más que varios acá. Y seguramente jugando también."', ctx: 'May 2025 - condescendencia argumentativa directa' },
      { text: '"Creo que es menos grave discriminar por orientación sexual que por origen étnico."', ctx: '18 feb 2026 - creando una jerarquía de discriminaciones para minimizar el caso' },
      { text: '"Por cierto debería salirme de este grupo antes de que Gabriel llore de nuevo."', ctx: 'May 2025 - inmediatamente cambia la descripción del grupo' },
    ],
    relations: [
      { who: 'Francisco', type: '🔥 Máxima tensión', desc: '"Pura paja Javier. Hablas por fastidiar." - el más afectado por su estilo argumentativo.' },
      { who: 'Gabriel', type: '⚡ Poder admin', desc: 'Fue expulsado del grupo durante la final de Copa del Rey sin aviso.' },
      { who: 'Gustavo', type: '🤔 Paradoja', desc: 'Aliado involuntario. Cuando coinciden, Francisco explota más.' },
      { who: 'Jesús', type: '😒 El veredicto', desc: 'Jesús lo silencia con un sticker - el juicio más definitivo del grupo.' },
    ],
    arc: 'Constante en sus patrones negativos. Alcanza su punto más grave en feb 2026 minimizando el racismo contra Vinicius durante el incidente Benfica. El propio Francisco lo identifica como el miembro que habría que "sacar del echo chamber".',
  },
  {
    id: 'luis',
    name: 'Luís Torrado',
    initials: 'LT',
    nickname: '"Torradinchis"',
    role: 'El Corresponsal',
    roleShort: 'Corresponsal',
    color: 'oklch(65% 0.16 260)',
    colorHex: '#3f5cc4',
    team: 'Real Madrid',
    activity: 3,
    warning: false,
    scores: [
      { label: 'Agresión', val: 2, color: 'oklch(62% 0.22 25)' },
      { label: 'Colaboración', val: 7, color: 'oklch(70% 0.16 145)' },
      { label: 'Humor', val: 6, color: 'oklch(72% 0.18 60)' },
      { label: 'Apertura', val: 8, color: 'oklch(68% 0.18 200)' },
    ],
    patterns: [
      'Participación ocasional pero siempre oportuna y bien fundamentada',
      'Aporta perspectiva desde España - ve el fútbol europeo de primera mano',
      'Sus entradas suelen bajar la temperatura del debate',
      'Tono directo y venezolano sin pretensiones filosóficas',
    ],
    quotes: [
      { text: '"Marico no bajo a defender ni él ni Mbappe con 9 jugadores el último tiro libre."', ctx: 'Champions, ene 2026' },
      { text: '"No marico, confundes las cosas. Ser canchero es diferente a que te estén diciendo vainas todo el tiempo."', ctx: 'Debate racismo vs. picardía, feb 2026' },
    ],
    relations: [
      { who: 'Francisco', type: '✅ Aliado técnico', desc: 'Coinciden en análisis del fútbol europeo.' },
      { who: 'Gabriel', type: '✅ Complicidad', desc: 'Visión compartida, ambos desde España.' },
      { who: 'Grupo', type: '🧊 Moderador natural', desc: 'Su entrada suele calmar los debates.' },
    ],
    arc: 'Consistente. Participa más cuando tiene contexto de primera mano desde España. Su comentario durante el debate de Vinicius/Prestiani fue uno de los más equilibrados.',
  },
  {
    id: 'andres',
    name: 'Andrés Eduardo Pinto',
    initials: 'AP',
    nickname: '"Pintin"',
    role: 'El Pacifista',
    roleShort: 'Pacifista',
    color: 'oklch(65% 0.15 90)',
    colorHex: '#7a9a10',
    team: 'Atlético de Madrid',
    activity: 3,
    warning: false,
    scores: [
      { label: 'Agresión', val: 1, color: 'oklch(62% 0.22 25)' },
      { label: 'Colaboración', val: 8, color: 'oklch(70% 0.16 145)' },
      { label: 'Humor', val: 7, color: 'oklch(72% 0.18 60)' },
      { label: 'Apertura', val: 9, color: 'oklch(68% 0.18 200)' },
    ],
    patterns: [
      'El miembro más tranquilo - raramente entra en conflictos directos',
      'Fan del Atlético: la rareza en un grupo dominado por madridistas',
      'Ha querido salirse del grupo "5567 veces" por la toxicidad acumulada',
      'Su ausencia en los debates más tensos es en sí misma un mensaje',
    ],
    quotes: [
      { text: '"Que tóxico este grupo."', ctx: 'Mayo 2025 - reacción directa a uno de los debates' },
      { text: '"Me he querido salir 5567 veces. Jajajaja."', ctx: 'Uno de sus mensajes más recordados' },
      { text: '"Un padre responsable." - sobre por qué no participa más', ctx: 'Con humor sobre sus ausencias estratégicas' },
    ],
    relations: [
      { who: 'Grupo', type: '🕊️ Ancla', desc: 'Su presencia tranquila equilibra la toxicidad colectiva.' },
      { who: 'Francisco', type: '😄 Víctima cómica', desc: 'Blanco ocasional de sus bromas afectuosas.' },
    ],
    arc: 'Consistente y pacificador todo el año. Participa menos cuando los debates se vuelven más tóxicos - su versión discreta de protestar.',
  },
  {
    id: 'gerardo',
    name: 'Gerardo Vitale Errico',
    initials: 'GE',
    nickname: 'Gerardo',
    role: 'El Filósofo',
    roleShort: 'Filósofo',
    color: 'oklch(70% 0.18 52)',
    colorHex: '#c07a00',
    team: 'Neutral / Italia',
    activity: 3,
    warning: false,
    scores: [
      { label: 'Agresión', val: 3, color: 'oklch(62% 0.22 25)' },
      { label: 'Colaboración', val: 7, color: 'oklch(70% 0.16 145)' },
      { label: 'Humor', val: 7, color: 'oklch(72% 0.18 60)' },
      { label: 'Apertura', val: 8, color: 'oklch(68% 0.18 200)' },
    ],
    patterns: [
      'Aparece en debates de principios - libertad de expresión, privacidad, ética',
      'Sus argumentos sorprenden con perspectivas que nadie anticipó',
      'Llega tarde a conversaciones y lo admite con humor',
      'Perspectiva ítalo-venezolana única en el grupo',
    ],
    quotes: [
      { text: '"Aquí tirando un comentario sin saber de qué coño están hablando 😂"', ctx: 'Debate Prestiani/Vinicius, feb 2026' },
      { text: '"Me parece peligroso que una acusación verbal pueda parar partidos."', ctx: 'Debate privacidad vs. anti-racismo, feb 2026' },
      { text: '"Siento la necesidad de enviar una nota de voz."', ctx: 'Cuando el debate se pone filosófico' },
    ],
    relations: [
      { who: 'Francisco', type: '⚡ Debate filosófico', desc: 'Uno de sus debates más interesantes sobre privacidad y libre expresión.' },
      { who: 'Grupo', type: '🔭 Perspectiva única', desc: 'Aporta ángulos que nadie más plantea en el grupo.' },
    ],
    arc: 'Aparece más en 2026. El caso Prestiani/Vinicius fue su participación más notable. Su postura generó uno de los debates más inesperados del período analizado.',
  },
  {
    id: 'espana34',
    name: 'Contacto España (+34)',
    shortName: 'España',
    initials: '+34',
    nickname: '"El +34"',
    role: 'El Refuerzo Peninsular',
    roleShort: 'Refuerzo',
    color: 'oklch(72% 0.18 335)',
    colorHex: '#cb4b8d',
    team: 'Real Madrid',
    activity: 4,
    warning: false,
    scores: [
      { label: 'Agresión', val: 3, color: 'oklch(62% 0.22 25)' },
      { label: 'Colaboración', val: 7, color: 'oklch(70% 0.16 145)' },
      { label: 'Humor', val: 6, color: 'oklch(72% 0.18 60)' },
      { label: 'Apertura', val: 7, color: 'oklch(68% 0.18 200)' },
    ],
    patterns: [
      'Entra desde España con tono relajado, madridista y bastante integrado al humor local',
      'Aporta comentarios de fantasy, fichajes y vida futbolera en Madrid sin monopolizar la discusión',
      'Suele responder con emojis y frases cortas - participa más como refuerzo constante que como polemista principal',
      'En el material fuente su contacto no está guardado con nombre, así que aquí queda anonimizado como "El +34"',
    ],
    quotes: [
      { text: '"Con esa rueda de prensa claramente ya no hay neutralidad en los árbitros."', ctx: 'Abr 2025 - entra alineado con la desconfianza arbitral del núcleo madridista' },
      { text: '"Si el Barça fuera un partido político claramente sería el PSOE."', ctx: 'Jun 2025 - humor político aplicado al anti-barcelonismo del grupo' },
      { text: '"Aquí la gente no da leñazos y no te lesionan, todo friendly."', ctx: 'Dic 2025 - invitando a jugar fútbol en Madrid' },
    ],
    relations: [
      { who: 'Francisco', type: '🤝 Complicidad ibérica', desc: 'Conecta con él desde España y termina extendiendo el vínculo al fútbol presencial.' },
      { who: 'Gabriel', type: '😄 Humor compartido', desc: 'Gabriel lo usa como espejo cómico: "tú y Francisco son la misma mierda".' },
      { who: 'Gerardo', type: '⚽ Plan deportivo', desc: 'Lo incluye en propuestas de jugar juntos; la relación parece más práctica que ideológica.' },
      { who: 'Grupo', type: '✅ Refuerzo estable', desc: 'No domina la conversación, pero cuando aparece suma tono y continuidad.' },
    ],
    arc: 'Empieza como presencia lateral en primavera de 2025 y gana sitio hacia el ciclo de fantasy y fútbol presencial en Madrid. Nunca se vuelve protagonista, pero sí una pieza estable del ecosistema social del grupo.',
  },
  {
    id: 'jorge',
    name: 'Jorge Anzola',
    shortName: 'Jorge',
    initials: 'JA',
    nickname: '"El Terror de Amsterdam"',
    role: 'El Refuerzo Caótico',
    roleShort: 'Caótico',
    color: 'oklch(76% 0.16 310)',
    colorHex: '#b766d4',
    team: 'Messi-safe / multi-liga',
    activity: 2,
    warning: false,
    scores: [
      { label: 'Agresión', val: 4, color: 'oklch(62% 0.22 25)' },
      { label: 'Colaboración', val: 7, color: 'oklch(70% 0.16 145)' },
      { label: 'Humor', val: 8, color: 'oklch(72% 0.18 60)' },
      { label: 'Apertura', val: 8, color: 'oklch(68% 0.18 200)' },
    ],
    patterns: [
      'Entra tarde, recibe contexto acelerado y entiende rápido el código interno del grupo',
      'Su humor es absurdo y autoparódico - convierte el desconcierto en personaje',
      'Aporta side quests: F1, fantasy y comentarios dramáticos más que litigios interminables sobre árbitros',
      'Se integra más por química social que por volumen de mensajes',
    ],
    quotes: [
      { text: '"Nunca hablaría mal de Messi. No quiero tener peos con Infantino…"', ctx: 'Ago 2025 - se adapta al principal tabú del grupo desde su primer día' },
      { text: '"I’m already overwhelmed, no puedo poner a 11 CR"', ctx: 'Sep 2025 - entrando al fantasy con caos y honestidad' },
      { text: '"Perdimos el mundial de desayunos"', ctx: 'Sep 2025 - ejemplo perfecto de su dramatismo humorístico' },
    ],
    relations: [
      { who: 'Francisco', type: '😄 Bienvenida performática', desc: 'Francisco lo introduce con narrativa épica y Jorge responde siguiendo el juego.' },
      { who: 'Aaron', type: '🤯 Caos familiar', desc: 'La conversación sobre parentescos se convierte en una mini-comedia propia.' },
      { who: 'Gustavo', type: '📚 Contexto guiado', desc: 'Gustavo le da "material previo" para entender la locura del grupo.' },
      { who: 'Jesús', type: '😂 Validación instantánea', desc: 'Jesús suele comprar el chiste rápido y lo integra al tono colectivo.' },
    ],
    arc: 'Su debut en agosto de 2025 es tardío pero exitoso. No llega a ser central en las discusiones grandes, aunque sí refresca el grupo con humor lateral y una energía menos doctrinaria.',
  },
  {
    id: 'aaron',
    name: 'Aaron Rodrigues',
    shortName: 'Aaron',
    initials: 'AR',
    nickname: '"El cuñado (por ahora)"',
    role: 'El Rookie Aplicado',
    roleShort: 'Rookie',
    color: 'oklch(77% 0.15 250)',
    colorHex: '#6b82de',
    team: 'CD Tenerife',
    activity: 4,
    warning: false,
    scores: [
      { label: 'Agresión', val: 3, color: 'oklch(62% 0.22 25)' },
      { label: 'Colaboración', val: 8, color: 'oklch(70% 0.16 145)' },
      { label: 'Humor', val: 7, color: 'oklch(72% 0.18 60)' },
      { label: 'Apertura', val: 8, color: 'oklch(68% 0.18 200)' },
    ],
    patterns: [
      'Entra como nuevo cuñado de Francisco y se integra rápido sin ponerse a la defensiva',
      'Aprende el fantasy en tiempo real, pregunta reglas y enseguida empieza a competir de verdad',
      'Corrige identidades futboleras - "no es Las Palmas, es Tenerife" - y marca territorio sin volverse pesado',
      'Usa ChatGPT, estadísticas y memes para ponerse al día con sorprendente velocidad',
    ],
    quotes: [
      { text: '"A mi me invitaron para hacerme bullying por lo que veo"', ctx: 'Sep 2025 - lectura correcta de la cultura de ingreso al grupo' },
      { text: '"En realidad es el club deportivo Tenerife, si los confundes aquí te metes en un problema"', ctx: 'Sep 2025 - fijando identidad propia desde el primer día' },
      { text: '"Ya estoy buscando stats en chat gpt"', ctx: 'Sep 2025 - rookie, sí; pasivo, no' },
    ],
    relations: [
      { who: 'Francisco', type: '🤝 Tutoría familiar', desc: 'Francisco lo presenta, lo provoca y a la vez le abre la puerta de entrada.' },
      { who: 'Jesús', type: '😄 Complicidad física', desc: 'El bullying de bienvenida con Jesús se vuelve parte de su integración.' },
      { who: 'Jorge', type: '😂 Enredo genealógico', desc: 'Su conexión con Jorge arranca con una discusión delirante sobre grados de cuñadez.' },
      { who: 'Grupo', type: '✅ Adaptación veloz', desc: 'Pasa de "soy nuevo" a competir y opinar con naturalidad en muy poco tiempo.' },
    ],
    arc: 'Aparece en septiembre de 2025 como incorporación tardía, pero enseguida deja de sonar a invitado. El fantasy acelera su integración y termina siendo de los nuevos que más rápido entienden la lógica emocional del grupo.',
  },
]

export const EDGES = [
  { from: 'francisco', to: 'gabriel', type: 'ally', label: 'Alianza principal' },
  { from: 'francisco', to: 'jesus', type: 'ally', label: 'Respeto mutuo' },
  { from: 'francisco', to: 'gustavo', type: 'tension', label: 'Conflicto central' },
  { from: 'francisco', to: 'javier', type: 'high-tension', label: 'Máxima frustración' },
  { from: 'gabriel', to: 'jesus', type: 'ally', label: 'Complicidad silenciosa' },
  { from: 'gabriel', to: 'gustavo', type: 'comic', label: 'Expulsiones rituales' },
  { from: 'gabriel', to: 'javier', type: 'tension', label: 'Lo expulsó en Copa del Rey' },
  { from: 'gustavo', to: 'jesus', type: 'neutral', label: 'Debates respetuosos' },
  { from: 'gustavo', to: 'javier', type: 'ambiguous', label: 'Aliado involuntario' },
  { from: 'jesus', to: 'javier', type: 'cold', label: '😒 El veredicto' },
  { from: 'francisco', to: 'luis', type: 'neutral', label: 'Análisis técnico' },
  { from: 'francisco', to: 'andres', type: 'neutral', label: 'Amistad tranquila' },
  { from: 'francisco', to: 'gerardo', type: 'ambiguous', label: 'Debate de principios' },
  { from: 'francisco', to: 'espana34', type: 'ally', label: 'Madrid desde España' },
  { from: 'gabriel', to: 'espana34', type: 'comic', label: 'Humor compartido' },
  { from: 'gerardo', to: 'espana34', type: 'neutral', label: 'Planes de jugar en Madrid' },
  { from: 'francisco', to: 'jorge', type: 'comic', label: 'Bienvenida performática' },
  { from: 'gustavo', to: 'jorge', type: 'neutral', label: 'Le pasó el contexto' },
  { from: 'aaron', to: 'jorge', type: 'comic', label: 'Caos familiar' },
  { from: 'francisco', to: 'aaron', type: 'ally', label: 'Tutoría del rookie' },
  { from: 'jesus', to: 'aaron', type: 'neutral', label: 'Bullying de bienvenida' },
]

export const NODE_POS = {
  gabriel: { x: 540, y: 110 },
  francisco: { x: 220, y: 330 },
  gustavo: { x: 850, y: 210 },
  jesus: { x: 430, y: 530 },
  javier: { x: 780, y: 560 },
  luis: { x: 110, y: 560 },
  andres: { x: 590, y: 690 },
  gerardo: { x: 1060, y: 430 },
  espana34: { x: 980, y: 110 },
  jorge: { x: 1060, y: 650 },
  aaron: { x: 230, y: 690 },
}

export const EDGE_STYLE = {
  ally: { stroke: 'oklch(70% 0.16 145)', w: 3, dash: '', op: 0.7 },
  tension: { stroke: 'oklch(62% 0.22 25)', w: 2.5, dash: '', op: 0.7 },
  'high-tension': { stroke: 'oklch(62% 0.22 25)', w: 4.5, dash: '', op: 0.9 },
  comic: { stroke: 'oklch(72% 0.18 60)', w: 2, dash: '8,4', op: 0.7 },
  neutral: { stroke: 'rgba(255,255,255,0.22)', w: 1.5, dash: '', op: 0.5 },
  ambiguous: { stroke: 'oklch(68% 0.18 200)', w: 2, dash: '5,3', op: 0.6 },
  cold: { stroke: 'rgba(255,255,255,0.12)', w: 1, dash: '3,3', op: 0.4 },
}

export const MEMBER_EVIDENCE = {
  gabriel: [
    {
      id: 'gabriel-var-criteria',
      title: 'Fija el marco de sospecha sobre el arbitraje',
      topic: 'VAR',
      context: '21 abr 2025 · Debate por fuera de juego y calibracion',
      summary:
        'Gabriel no discute tanto la existencia de la tecnologia como la opacidad del proceso. Su patron es desconfiar del arbitro y de la manipulacion humana sobre la herramienta.',
      excerpts: [
        fragment(
          '21 abr 2025 · 2:12 PM',
          'Gabriel Gutiérrez',
          'Cuando la imagen sale de una vez, fue de la máquina. Ya cuando se demora mucho la están revisando y la retocan mirando las cámaras',
        ),
        fragment(
          '21 abr 2025 · 2:52 PM',
          'Gabriel Gutiérrez',
          'la tecnología en si no es el problema',
        ),
        fragment(
          '21 abr 2025 · 2:53 PM',
          'Gabriel Gutiérrez',
          'Siempre ha sido el árbitro',
        ),
      ],
    },
    {
      id: 'gabriel-admin-humor',
      title: 'Usa ironia breve para administrar tensiones',
      topic: 'Dinámica',
      context: '27 abr 2025 y 16 may 2025 · Post-expulsion y lectura del ambiente',
      summary:
        'Su autoridad entra y sale del chiste. Puede cerrar una escalada con una frase seca y luego pasar a diagnosticar el tono general del grupo.',
      excerpts: [
        fragment('27 abr 2025 · 12:10 AM', 'Gabriel Gutiérrez', 'Ley mordaza'),
        fragment(
          '16 may 2025 · 9:12 PM',
          'Gabriel Gutiérrez',
          'Si Andres Eduardo Pinto participará más activamente el mood fuera más ligero',
        ),
      ],
    },
  ],
  francisco: [
    {
      id: 'francisco-var-method',
      title: 'Empuja el debate del VAR hacia procedimiento y prueba',
      topic: 'VAR',
      context: '21 abr 2025 · Discusion tecnica del fuera de juego',
      summary:
        'Francisco discute con lenguaje de proceso: punto de fuga, calibracion, margen de error. No solo protesta; intenta construir un caso.',
      excerpts: [
        fragment(
          '21 abr 2025 · 2:14 PM',
          'Francisco Arteaga',
          'Lo que pasa es que Gustavo simplifica todo para hacerlo ver ridículo.',
        ),
        fragment(
          '21 abr 2025 · 2:17 PM',
          'Francisco Arteaga',
          'Para sacar la línea del fuera de juego, tienen que mostrar el punto de fuga, de otra forma la línea siempre es cuestionable.',
        ),
        fragment(
          '21 abr 2025 · 3:04 PM',
          'Francisco Arteaga',
          'Pero eso implicaría que si la calibración sale mal, las líneas están mal, Gustavo',
        ),
      ],
    },
    {
      id: 'francisco-onboarding',
      title: 'También define las reglas culturales de entrada',
      topic: 'Nuevos miembros',
      context: '1 sep 2025 · Bienvenida a Aaron',
      summary:
        'Cuando entra gente nueva, Francisco convierte la bienvenida en ceremonia. Introduce parentescos, jerga interna y hasta los tabues del grupo.',
      excerpts: [
        fragment(
          '1 sep 2025 · 8:15 PM',
          'Francisco Arteaga',
          'Denle la bienvenida a mi cuñado (por ahora). Aaron Rodrigues.',
        ),
        fragment(
          '1 sep 2025 · 8:25 PM',
          'Francisco Arteaga',
          'Y tercero, nunca, nunca, PERO NUNCA, te metas con Messi.',
        ),
      ],
    },
  ],
  gustavo: [
    {
      id: 'gustavo-contrapunto',
      title: 'Pincha el consenso madridista con sarcasmo limpio',
      topic: 'VAR',
      context: '21 abr 2025 · Discusion sobre justicia arbitral',
      summary:
        'Su aporte tipico es llevar la tesis rival al extremo para obligar al grupo a explicar mejor su punto.',
      excerpts: [
        fragment(
          '21 abr 2025 · 2:03 PM',
          'Gustavo Torres',
          'Vamos a darle el pito a Florentino de una vez por todas y ya',
        ),
        fragment(
          '21 abr 2025 · 2:15 PM',
          'Gustavo Torres',
          'Lo que pasa es que ustedes no se escuchan, la gimnasia mental que hacen para buscar conspiración',
        ),
      ],
    },
    {
      id: 'gustavo-deescalation',
      title: 'Puede trolear y luego bajar la tension',
      topic: 'Convivencia',
      context: '27 abr 2025 y 31 ago 2025 · Reentrada y dia largo de VAR',
      summary:
        'Incluso cuando provoca, Gustavo tambien funciona como válvula de alivio. Su humor descomprime momentos que vienen cargados.',
      excerpts: [
        fragment(
          '27 abr 2025 · 12:05 AM',
          'Gustavo Torres',
          'oh wow, yo pensaba que el VAR sólo eran robos',
        ),
        fragment(
          '31 ago 2025 · 11:18 PM',
          'Gustavo Torres',
          'Muchachos mídanse la tensión...',
        ),
      ],
    },
  ],
  jesus: [
    {
      id: 'jesus-interpretacion',
      title: 'Desplaza la discusion desde la maquina hacia la interpretacion',
      topic: 'VAR',
      context: '21 abr 2025 y 31 ago 2025 · Dos grandes dias de arbitraje',
      summary:
        'Su patron mas consistente es separar tecnologia de uso. Cuando interviene, reordena la conversacion hacia criterios y no solo hacia indignacion.',
      excerpts: [
        fragment(
          '21 abr 2025 · 2:46 PM',
          'Jesús Burgos',
          'la tecnología se implementó para suplementar las reglas que ya existían, y eso está perfecto porque es evolución.',
        ),
        fragment(
          '31 ago 2025 · 6:38 PM',
          'Jesús Burgos',
          'El mismo peo de siempre. La tecnología no es el problema, es quien la interpreta',
        ),
      ],
    },
    {
      id: 'jesus-veredicto',
      title: 'Combina veredicto seco con humor lateral',
      topic: 'Dinámica',
      context: '27 abr 2025 y 31 ago 2025 · Descompresion y cierre',
      summary:
        'No necesita hablar mucho para fijar posicion. Un remate ironico suyo suele quedarse como etiqueta del episodio.',
      excerpts: [
        fragment('27 abr 2025 · 12:06 AM', 'Jesús Burgos', 'Gabriel J Trump'),
        fragment(
          '31 ago 2025 · 6:41 PM',
          'Jesús Burgos',
          'El saldo de goles anulados al RM es ridículo',
        ),
      ],
    },
  ],
  javier: [
    {
      id: 'javier-rigid-literalism',
      title: 'Reduce la discusion a literalidad reglamentaria',
      topic: 'VAR',
      context: '21 abr 2025 · Debate por fuera de juego',
      summary:
        'Su estilo aparece como contrapunto inflexible: menos contexto, menos matices, mas literalidad sobre la aplicacion de la regla.',
      excerpts: [
        fragment(
          '21 abr 2025 · 2:15 PM',
          'Javier Gimenez',
          'Te quejas por que aplican bien la regla?.',
        ),
        fragment(
          '21 abr 2025 · 2:28 PM',
          'Javier Gimenez',
          'De verdad es increíble, que quieras que validen un gol qué no es .',
        ),
      ],
    },
    {
      id: 'javier-escalation',
      title: 'Su presencia reabre la friccion incluso cuando no desarrolla mucho',
      topic: 'Dinámica',
      context: '27 abr 2025 y 31 ago 2025 · Expulsion, retorno y nueva polemica',
      summary:
        'El problema no es solo lo que dice, sino la energia que reactiva cada vez que entra en un hilo caliente.',
      excerpts: [
        fragment('27 abr 2025 · 12:03 AM', 'Sistema', 'Gabriel Gutiérrez removed Javier Gimenez'),
        fragment('27 abr 2025 · 12:05 AM', 'Sistema', 'Javier Gimenez was added'),
        fragment(
          '31 ago 2025 · 11:14 AM',
          'Javier Gimenez',
          'Pero es mano de esta no se por que lloran...',
        ),
      ],
    },
  ],
  luis: [
    {
      id: 'luis-grounded',
      title: 'Aparece poco, pero con observaciones concretas',
      topic: 'VAR',
      context: '21 abr 2025 · Primer gran debate arbitral',
      summary:
        'Luis baja la discusion al efecto practico en el juego: tiempo, ritmo y criterio arbitral. Es menos doctrinario que otros.',
      excerpts: [
        fragment('21 abr 2025 · 2:00 PM', 'Luís Torrado', 'Polemico'),
        fragment(
          '21 abr 2025 · 2:01 PM',
          'Luís Torrado',
          'ayer por lo menos se tomaron como 5 min pa ver un fuera de juego...demasiado como enfrian el juego',
        ),
      ],
    },
    {
      id: 'luis-racism-line',
      title: 'En febrero intenta separar picardia de agresion',
      topic: 'Convivencia',
      context: '18 y 23 feb 2026 · Caso Prestiani / Vinicius',
      summary:
        'Su posicion no es juridica ni filosofica; intenta distinguir codigos de cancha de humillacion sostenida, aunque a veces patina en el borde.',
      excerpts: [
        fragment(
          '18 feb 2026 · 2:16 PM',
          'Luís Torrado',
          'No marico confundes las cosas, ser canchero es diferente..es tirar un caño, hacer sombreritos...ya que te esten diciendo vainas todo el tiempo es diferente',
        ),
        fragment(
          '23 feb 2026 · 5:58 PM',
          'Luís Torrado',
          'Claro pero de llevar eso a un insulto racista .. por lo menos probalo..capaz le dijo mariquito y ya jaja',
        ),
      ],
    },
  ],
  andres: [
    {
      id: 'andres-toxicity',
      title: 'Nombró la fatiga del grupo antes que casi nadie',
      topic: 'Convivencia',
      context: '16 may 2025 · Balance sobre la toxicidad del chat',
      summary:
        'Andres suele hablar poco, pero cuando entra a medir el clima social, su lectura pesa porque viene de alguien que evita el conflicto.',
      excerpts: [
        fragment('16 may 2025 · 9:05 PM', 'Andres Eduardo Pinto', 'Que toxico este grupo'),
        fragment(
          '16 may 2025 · 9:05 PM',
          'Andres Eduardo Pinto',
          'Me he querido salir 5567 veces',
        ),
        fragment('16 may 2025 · 9:13 PM', 'Andres Eduardo Pinto', 'Un padre responsable'),
      ],
    },
    {
      id: 'andres-detached-view',
      title: 'Su distancia le permite romper el echo chamber',
      topic: 'Dinámica',
      context: '15 sep 2025 y 16 feb 2026 · Analisis frio y acercamiento al futbol presencial',
      summary:
        'Cuando opina desde fuera de la rivalidad local, expone que el grupo puede estar atrapado en su propia narrativa. Y cuando se acerca a jugar, lo hace desde el humor.',
      excerpts: [
        fragment(
          '15 sep 2025 · 3:22 PM',
          'Andres Eduardo Pinto',
          'Responderé como Don Andrés, realmente me sabe a mierda toda la Liga española, hasta logo',
        ),
        fragment(
          '15 sep 2025 · 3:25 PM',
          'Andres Eduardo Pinto',
          'siento que lloran mucho de ambos bandos',
        ),
        fragment(
          '16 feb 2026 · 9:09 PM',
          'Andres Eduardo Pinto',
          'Coño que día van a jugar la semana que viene? A ver si me animo',
        ),
      ],
    },
  ],
  gerardo: [
    {
      id: 'gerardo-philosophy',
      title: 'Lleva el conflicto a libertad, privacidad y prueba',
      topic: 'Convivencia',
      context: '18 feb 2026 · Debate Prestiani / Vinicius',
      summary:
        'Gerardo entra como filosofico lateral: corre la discusion hacia los limites de grabar, auditar y sancionar, incluso cuando sabe que esta entrando tarde.',
      excerpts: [
        fragment(
          '18 feb 2026 · 4:10 PM',
          'Gerardo Vitale Errico',
          'Aquí tirando un comentario sin saber de qué coño están hablando',
        ),
        fragment(
          '18 feb 2026 · 4:27 PM',
          'Gerardo Vitale Errico',
          'Terreno muy pantanoso ese del hate speech, muy subjetivo y abstracto para mi gusto.',
        ),
        fragment(
          '18 feb 2026 · 4:47 PM',
          'Gerardo Vitale Errico',
          'Hhahahahaaha siento la necesidad de enviar una nota de voz',
        ),
      ],
    },
    {
      id: 'gerardo-football-social',
      title: 'Su lado social entra por fantasy, padel y futbol en Madrid',
      topic: 'Dinámica',
      context: '9 dic 2025 y 16 feb 2026 · Integracion fuera del chat',
      summary:
        'No es solo voz filosofica. Tambien empuja encuentros presenciales, reta a sumarse y amplifica la capa social del grupo.',
      excerpts: [
        fragment(
          '9 dic 2025 · 3:14 PM',
          'Gerardo Vitale Errico',
          'Únete Amigui @Andres Eduardo Pinto',
        ),
        fragment(
          '9 dic 2025 · 3:14 PM',
          'Gerardo Vitale Errico',
          'Una de las mejores decisiones del 2025 ha sido volver al fútbol definitivamente',
        ),
        fragment(
          '16 feb 2026 · 6:04 PM',
          'Gerardo Vitale Errico',
          'Cono si y si, partidazo y burda de arrecho.',
        ),
      ],
    },
  ],
  espana34: [
    {
      id: 'espana34-refuerzo-arbitral',
      title: 'Refuerza el bloque madridista desde España',
      topic: 'VAR',
      context: '26 abr 2025 · Previa de la final y cuestion arbitral',
      summary:
        'Su entrada al debate replica y valida la sospecha arbitral del nucleo duro, pero desde una voz menos central y mas de refuerzo.',
      excerpts: [
        fragment(
          '26 abr 2025 · 8:52 PM',
          'Contacto España (+34)',
          'Con esa rueda de prensa claramente ya no hay neutralidad en los árbitros, quedó demostrado.',
        ),
        fragment(
          '26 abr 2025 · 9:06 PM',
          'Contacto España (+34)',
          'Esta temporada varios equipos han sacado comunicados oficiales por la manera irregular que están pitando los partidos',
        ),
      ],
    },
    {
      id: 'espana34-football-invite',
      title: 'Convierte el grupo en puente hacia futbol presencial',
      topic: 'Dinámica',
      context: '9 dic 2025 · Invitacion a jugar en Madrid',
      summary:
        'Su rol crece cuando la conversacion sale del puro comentario y se vuelve plan concreto para jugar, conectar y sostener la relacion fuera del hilo.',
      excerpts: [
        fragment(
          '9 dic 2025 · 2:48 PM',
          'Contacto España (+34)',
          'Lo digo porque todas las semanas estamos jugando, tenemos un equipo de la orquesta, por si te quieres venir un día te digo',
        ),
        fragment(
          '9 dic 2025 · 2:51 PM',
          'Contacto España (+34)',
          'Aquí la gente no da leñazos y no te lesionan, todo friendly',
        ),
      ],
    },
  ],
  jorge: [
    {
      id: 'jorge-onboarding',
      title: 'Entiende el codigo del grupo desde el primer dia',
      topic: 'Nuevos miembros',
      context: '26 ago 2025 · Entrada de Jorge',
      summary:
        'Jorge entra tarde pero se adapta rapido al tono. Responde al lore interno con humor absurdo y enseguida se integra.',
      excerpts: [
        fragment(
          '26 ago 2025 · 2:47 PM',
          'Jorge Anzola',
          'Marico yo no había visto este artículos. Esos malditos, quitándome views del tuit original',
        ),
        fragment(
          '26 ago 2025 · 2:52 PM',
          'Jorge Anzola',
          'Nunca hablaría mal de Messi. No quiero tener peos con Infantino…',
        ),
        fragment('26 ago 2025 · 3:00 PM', 'Jorge Anzola', 'JAJAJA maldita sea'),
      ],
    },
    {
      id: 'jorge-fantasy-chaos',
      title: 'Su energia caotica encuentra hogar en el fantasy',
      topic: 'Fantasy',
      context: '1 y 16 sep 2025 · Onboarding y primer golpe del juego',
      summary:
        'Donde otros ven manual, Jorge ve escena comica. El fantasy le da un espacio natural para exagerar errores y dramatizar.',
      excerpts: [
        fragment(
          '1 sep 2025 · 8:54 PM',
          'Jorge Anzola',
          'I’m already overwhelmed, no puedo poner a 11 CR',
        ),
        fragment('16 sep 2025 · 6:37 PM', 'Jorge Anzola', 'Tengo un lesionado'),
        fragment(
          '16 sep 2025 · 7:07 PM',
          'Jorge Anzola',
          'Marico me había dado chance de cambiarlo… y no le di confirmar',
        ),
      ],
    },
  ],
  aaron: [
    {
      id: 'aaron-entry',
      title: 'Llega leyendo bien el ritual de bienvenida',
      topic: 'Nuevos miembros',
      context: '1 sep 2025 · Primeras intervenciones',
      summary:
        'Aaron no entra defensivo. Se deja iniciar por el grupo, marca su identidad futbolera y en minutos ya esta jugando el juego social.',
      excerpts: [
        fragment(
          '1 sep 2025 · 8:21 PM',
          'Aaron Rodrigues',
          'A mi me invitaron para hacerme bullying por lo que veo',
        ),
        fragment(
          '1 sep 2025 · 8:30 PM',
          'Aaron Rodrigues',
          'En realidad es el club deportivo Tenerife, si los confundes aquí te metes en un problema',
        ),
      ],
    },
    {
      id: 'aaron-fantasy-ramp',
      title: 'Aprende el fantasy en publico y rapido',
      topic: 'Fantasy',
      context: '1 y 16 sep 2025 · Puesta al dia acelerada',
      summary:
        'Su curva de adaptacion es visible: pregunta, usa stats, entra a la liga y enseguida empieza a exigir feedback y resultados.',
      excerpts: [
        fragment(
          '1 sep 2025 · 8:52 PM',
          'Aaron Rodrigues',
          'Ya estoy buscando stats en chat gpt',
        ),
        fragment(
          '16 sep 2025 · 6:36 PM',
          'Aaron Rodrigues',
          'Lo hice pero no se me unió a la liga 👉🏻👈🏻 ya está',
        ),
        fragment(
          '16 sep 2025 · 11:32 PM',
          'Aaron Rodrigues',
          'Y por qué a mí no me diste un comentario de cómo iba ☹️',
        ),
      ],
    },
  ],
}

export const TIMELINE_EVENTS = [
  {
    id: 'chat-kickoff',
    date: '20 abr 2025',
    topic: 'Dinámica',
    title: 'El chat arranca entre vacile Premier, estadios y arbitras',
    participants: ['Gabriel', 'Francisco', 'Jesús'],
    summary:
      'El primer día ya deja clara la textura del grupo: humor rápido, referencias futboleras cruzadas y una comodidad inmediata para pasar de un dato a una burla.',
    evidence: [
      fragment(
        '20 abr 2025 · 5:16 PM',
        'Gabriel Gutiérrez',
        'El United volvió a perder jaja',
      ),
      fragment(
        '20 abr 2025 · 5:29 PM',
        'Gabriel Gutiérrez',
        'Si, parece una carpa de circo',
      ),
      fragment(
        '20 abr 2025 · 5:51 PM',
        'Francisco Arteaga',
        'En estos días entrevistaron a una árbitra española, y dice que los jugadores le escriben por instagram para invitarla a salir',
      ),
      fragment('20 abr 2025 · 6:35 PM', 'Jesús Burgos', 'Jajajajajajajajja'),
    ],
  },
  {
    id: 'var-april-2025',
    date: '21 abr 2025',
    topic: 'VAR',
    title: 'El grupo entra en modo litigio por el VAR',
    participants: ['Francisco', 'Gabriel', 'Gustavo', 'Javier'],
    summary:
      'La discusión sobre fuera de juego semiautomático y criterios arbitrales cristaliza el eje clásico del grupo: Francisco y Gabriel construyen sospecha, Gustavo la pincha, Javier la literaliza y Jesús reordena el debate.',
    evidence: [
      fragment(
        '21 abr 2025 · 2:12 PM',
        'Gabriel Gutiérrez',
        'Cuando la imagen sale de una vez, fue de la máquina. Ya cuando se demora mucho la están revisando y la retocan mirando las cámaras',
      ),
      fragment(
        '21 abr 2025 · 2:14 PM',
        'Francisco Arteaga',
        'Pero cada vez que Jesús Burgos interviene en este grupo, lo que hace es tirar factos y explicar lo que pasa realmente.',
      ),
      fragment(
        '21 abr 2025 · 2:15 PM',
        'Gustavo Torres',
        'Lo que pasa es que ustedes no se escuchan, la gimnasia mental que hacen para buscar conspiración',
      ),
      fragment(
        '21 abr 2025 · 2:15 PM',
        'Javier Gimenez',
        'Te quejas por que aplican bien la regla?.',
      ),
      fragment(
        '21 abr 2025 · 2:46 PM',
        'Jesús Burgos',
        'la tecnología se implementó para suplementar las reglas que ya existían, y eso está perfecto porque es evolución.',
      ),
    ],
  },
  {
    id: 'copa-final-crisis',
    date: '25 abr 2025',
    topic: 'VAR',
    title: 'La final de Copa convierte el chat en sala de crisis arbitral',
    participants: ['Francisco', 'Gabriel', 'Jesús', 'Javier'],
    summary:
      'La rueda de prensa arbitral previa a la final dispara una lectura casi institucional: ya no se discute una jugada, sino si el partido llega viciado antes de empezar.',
    evidence: [
      fragment(
        '25 abr 2025 · 2:53 PM',
        'Francisco Arteaga',
        'Se armó la grande con los árbitros en la final, jajajaja',
      ),
      fragment(
        '25 abr 2025 · 2:54 PM',
        'Francisco Arteaga',
        'Salió De Burgos llorando porque Real Madrid TV lo puso en un vídeo',
      ),
      fragment(
        '25 abr 2025 · 3:34 PM',
        'Gabriel Gutiérrez',
        'Que bolas, como se va a jugar esa final ahora con esos árbitros? Acaban de reconocer públicamente que se la tienen jurada',
      ),
      fragment(
        '25 abr 2025 · 8:17 PM',
        'Jesús Burgos',
        'Pero esos bichos literalmente amenazaron a un equipo que al que le van a arbitrar mañana',
      ),
      fragment(
        '25 abr 2025 · 10:11 PM',
        'Gabriel Gutiérrez',
        'No debería jugarse ese partido.',
      ),
    ],
  },
  {
    id: 'copa-neutralidad',
    date: '26 abr 2025',
    topic: 'VAR',
    title: 'La previa de la final convierte el arbitraje en conflicto politico',
    participants: ['Contacto España (+34)', 'Francisco', 'Gabriel', 'Gustavo'],
    summary:
      'Antes de la final, el grupo deja de hablar solo de jugadas y pasa a discutir neutralidad institucional, comunicados oficiales y sesgo estructural.',
    evidence: [
      fragment(
        '26 abr 2025 · 8:52 PM',
        'Contacto España (+34)',
        'Con esa rueda de prensa claramente ya no hay neutralidad en los árbitros, quedó demostrado.',
      ),
      fragment(
        '26 abr 2025 · 9:06 PM',
        'Contacto España (+34)',
        'Esta temporada varios equipos han sacado comunicados oficiales por la manera irregular que están pitando los partidos',
      ),
      fragment(
        '26 abr 2025 · 11:03 PM',
        'Francisco Arteaga',
        'Eres pura paja Javier',
      ),
      fragment(
        '26 abr 2025 · 11:03 PM',
        'Francisco Arteaga',
        'Hablar por trollear',
      ),
    ],
  },
  {
    id: 'javier-reentry',
    date: '27 abr 2025',
    topic: 'Dinámica',
    title: 'Javier vuelve a entrar y reaparece el foco de fricción',
    participants: ['Javier', 'Gabriel', 'Francisco'],
    summary:
      'La reentrada de Javier refuerza la figura del contrapunto más áspero del grupo y reabre la dinámica de provocación, reacción y escalada que luego define varios meses.',
    evidence: [
      fragment('27 abr 2025 · 12:03 AM', 'Sistema', 'Gabriel Gutiérrez removed Javier Gimenez'),
      fragment('27 abr 2025 · 12:05 AM', 'Sistema', 'Javier Gimenez was added'),
      fragment(
        '27 abr 2025 · 12:05 AM',
        'Gustavo Torres',
        'oh wow, yo pensaba que el VAR sólo eran robos',
      ),
      fragment('27 abr 2025 · 12:06 AM', 'Jesús Burgos', 'Gabriel J Trump'),
      fragment('27 abr 2025 · 12:10 AM', 'Gabriel Gutiérrez', 'Ley mordaza'),
    ],
  },
  {
    id: 'andres-toxicidad',
    date: '16 may 2025',
    topic: 'Convivencia',
    title: 'Andrés verbaliza la fatiga moral del grupo',
    participants: ['Andrés', 'Gabriel', 'Francisco'],
    summary:
      'Cuando Andrés resume el ambiente como tóxico, aparece una verdad estructural: incluso los miembros más tranquilos reconocen el desgaste de la conversación.',
    evidence: [
      fragment('16 may 2025 · 9:05 PM', 'Andres Eduardo Pinto', 'Que toxico este grupo'),
      fragment(
        '16 may 2025 · 9:05 PM',
        'Andres Eduardo Pinto',
        'Me he querido salir 5567 veces',
      ),
      fragment('16 may 2025 · 9:06 PM', 'Francisco Arteaga', 'Es culpa de Gustavo'),
      fragment(
        '16 may 2025 · 9:12 PM',
        'Gustavo Torres',
        'Es un safe space para jodernos',
      ),
      fragment('16 may 2025 · 9:13 PM', 'Andres Eduardo Pinto', 'Un padre responsable'),
    ],
  },
  {
    id: 'inter-barca-night',
    date: '6-7 may 2025',
    topic: 'Rivalidad',
    title: 'Inter-Barça se vuelve una noche coral de scouting, memes y catarsis',
    participants: ['Francisco', 'Gabriel', 'Andrés', 'Gerardo', 'Contacto España (+34)'],
    summary:
      'La semifinal Inter-Barça activa a perfiles que suelen hablar menos. El grupo entra en modo watch party: táctica, fichajes, épica italiana y alegría abierta porque gana el anti-Barça.',
    evidence: [
      fragment('6 may 2025 · 10:37 PM', 'Francisco Arteaga', 'El paradon de Sommer'),
      fragment(
        '6 may 2025 · 10:54 PM',
        'Andres Eduardo Pinto',
        'Que serie esta',
      ),
      fragment(
        '6 may 2025 · 10:55 PM',
        'Gerardo Vitale Errico',
        'Hoy barella hizo cagar',
      ),
      fragment(
        '6 may 2025 · 11:40 PM',
        'Francisco Arteaga',
        'Que partidazo',
      ),
      fragment(
        '6 may 2025 · 11:40 PM',
        'Francisco Arteaga',
        'Da alegría cuando gana el fútbol',
      ),
      fragment('7 may 2025 · 12:25 AM', 'Gabriel Gutiérrez', 'Forza Inter'),
    ],
  },
  {
    id: 'group-vote-july',
    date: '17-18 jul 2025',
    topic: 'Dinámica',
    title: 'Se vota si el grupo debe seguir existiendo',
    participants: ['Francisco', 'Grupo'],
    summary:
      'El grupo deja de ser solo un chat de fútbol y se vuelve objeto de análisis para sí mismo. Hay tensión sobre continuidad, pertenencia y comodidad de algunos miembros.',
    evidence: [
      fragment(
        '17 jul 2025 · previo a la encuesta',
        'Francisco Arteaga',
        'Primero necesito saber si el grupo debe seguir existiendo. Esa es la prioridad.',
      ),
      fragment(
        '17 jul 2025 · previo a la encuesta',
        'Francisco Arteaga',
        'Noté que una persona del grupo no se siente cómoda escribiendo aquí por otra persona del mismo grupo.',
      ),
      fragment(
        '17 jul 2025 · 9:13 PM',
        'Francisco Arteaga',
        'Bueno, oficialmente hay 5 de 9 votos para mantener el grupo abierto otro año más.',
      ),
      fragment(
        '18 jul 2025 · 1:53 PM',
        'Francisco Arteaga',
        'El grupo se mantiene abierto. La democracia ha ganado.',
      ),
    ],
  },
  {
    id: 'jorge-joins',
    date: '26 ago 2025',
    topic: 'Nuevos miembros',
    title: 'Jorge entra y el grupo gana un agente de caos lateral',
    participants: ['Jorge', 'Francisco', 'Gustavo', 'Jesús'],
    summary:
      'La entrada de Jorge refresca la dinámica con humor absurdo, meta-comentario y menos dogma. No mueve el eje ideológico, pero sí aligera la textura social.',
    evidence: [
      fragment('26 ago 2025 · 2:43 PM', 'Sistema', 'You added Jorge Anzola'),
      fragment(
        '26 ago 2025 · 2:44 PM',
        'Francisco Arteaga',
        'Denle la bienvenida a Jorge Anzola. El terror de los malandros en Amsterdam',
      ),
      fragment(
        '26 ago 2025 · 2:52 PM',
        'Jorge Anzola',
        'Nunca hablaría mal de Messi. No quiero tener peos con Infantino…',
      ),
      fragment(
        '26 ago 2025 · 3:00 PM',
        'Gustavo Torres',
        'Este es material previo que es bueno que estés familiarizado',
      ),
      fragment('26 ago 2025 · 3:00 PM', 'Jorge Anzola', 'JAJAJA maldita sea'),
    ],
  },
  {
    id: 'audio-var-august',
    date: '31 ago 2025',
    topic: 'VAR',
    title: 'El audio del VAR reaviva el gran caso arbitral del grupo',
    participants: ['Francisco', 'Jesús', 'Javier', 'Gabriel', 'Gustavo'],
    summary:
      'La frase "para poder anular el gol" se convierte en munición simbólica. El grupo se reparte entre indignación, sarcasmo, incredulidad y trolling terapéutico.',
    evidence: [
      fragment(
        '31 ago 2025 · 1:49 AM',
        'Francisco Arteaga',
        '7 minutos de tardo el “semiautomático” en dibujar esa línea...',
      ),
      fragment(
        '31 ago 2025 · 9:13 AM',
        'Francisco Arteaga',
        '“para PODER anular el gol”',
      ),
      fragment(
        '31 ago 2025 · 6:38 PM',
        'Jesús Burgos',
        'El mismo peo de siempre. La tecnología no es el problema, es quien la interpreta',
      ),
      fragment(
        '31 ago 2025 · 7:28 PM',
        'Gabriel Gutiérrez',
        'Que me corrija Francisco, pero las leyes siempre se interpretan. Lo que hay que tener es sentido común.',
      ),
      fragment(
        '31 ago 2025 · 11:18 PM',
        'Gustavo Torres',
        'Muchachos mídanse la tensión...',
      ),
    ],
  },
  {
    id: 'aaron-joins',
    date: '1 sep 2025',
    topic: 'Nuevos miembros',
    title: 'Aaron entra, aprende las reglas no escritas y se integra rápido',
    participants: ['Aaron', 'Francisco', 'Jesús', 'Jorge'],
    summary:
      'Su llegada funciona como onboarding perfecto al universo Burritos: bullying de bienvenida, advertencia sobre Messi y entrada acelerada al fantasy y al tono interno.',
    evidence: [
      fragment('1 sep 2025 · 8:13 PM', 'Sistema', 'You added Aaron Rodrigues'),
      fragment(
        '1 sep 2025 · 8:15 PM',
        'Francisco Arteaga',
        'Denle la bienvenida a mi cuñado (por ahora). Aaron Rodrigues.',
      ),
      fragment(
        '1 sep 2025 · 8:21 PM',
        'Aaron Rodrigues',
        'A mi me invitaron para hacerme bullying por lo que veo',
      ),
      fragment(
        '1 sep 2025 · 8:25 PM',
        'Francisco Arteaga',
        'Y tercero, nunca, nunca, PERO NUNCA, te metas con Messi.',
      ),
      fragment(
        '1 sep 2025 · 8:30 PM',
        'Aaron Rodrigues',
        'En realidad es el club deportivo Tenerife, si los confundes aquí te metes en un problema',
      ),
    ],
  },
  {
    id: 'fantasy-september',
    date: '15-16 sep 2025',
    topic: 'Fantasy',
    title: 'El fantasy crea un segundo tablero de estatus',
    participants: ['Francisco', 'Aaron', 'Jorge', 'Contacto España (+34)'],
    summary:
      'La liga fantasy añade una capa menos ideológica y más lúdica. Desde ahí entran nuevos chistes, jerarquías semanales y una forma distinta de participar.',
    evidence: [
      fragment('15 sep 2025 · 11:22 AM', 'Jorge Anzola', 'Ya estoy en eso maldita sea'),
      fragment('15 sep 2025 · 10:15 PM', 'Contacto España (+34)', 'Listo 🔥'),
      fragment(
        '16 sep 2025 · 2:38 PM',
        'Aaron Rodrigues',
        'Lo estoy haciendo pero para que sirve el comodín?',
      ),
      fragment(
        '16 sep 2025 · 6:36 PM',
        'Aaron Rodrigues',
        'Lo hice pero no se me unió a la liga 👉🏻👈🏻 ya está',
      ),
      fragment('16 sep 2025 · 6:37 PM', 'Jorge Anzola', 'Tengo un lesionado'),
      fragment('16 sep 2025 · 11:03 PM', 'Contacto España (+34)', 'Grande Kylian 20pts 😍'),
      fragment(
        '16 sep 2025 · 11:19 PM',
        'Francisco Arteaga',
        'Revisando los equipos de esta fecha, los errores más comunes que vi:',
      ),
    ],
  },
  {
    id: 'gabriel-exit-return',
    date: '27-28 oct 2025',
    topic: 'Dinámica',
    title: 'Gabriel se sale, el grupo entra en pánico breve y Gustavo lo reingresa',
    participants: ['Gabriel', 'Francisco', 'Gustavo', 'Jesús', 'Andrés'],
    summary:
      'La salida de Gabriel hace visible cuánto pesa como ancla simbólica del grupo. En menos de 48 horas pasa de ruptura silenciosa a operación retorno con chalequeo incluido.',
    evidence: [
      fragment('27 oct 2025 · 6:44 AM', 'Andres Eduardo Pinto', 'El Barry se volvió a salir?'),
      fragment(
        '27 oct 2025 · 7:17 AM',
        'Francisco Arteaga',
        'Hablé con el y dijo que no quiere ser parte de este grupo',
      ),
      fragment(
        '27 oct 2025 · 1:22 PM',
        'Francisco Arteaga',
        'Ya Gabriel no está aquí para leernos',
      ),
      fragment(
        '28 oct 2025 · 5:43 PM',
        'Sistema',
        'Gustavo Torres added Gabriel Gutiérrez',
      ),
      fragment(
        '28 oct 2025 · 5:44 PM',
        'Gustavo Torres',
        'Gabo no te vayas, el grupo no es lo mismo sin ti',
      ),
      fragment('28 oct 2025 · 6:19 PM', 'Gabriel Gutiérrez', 'Holis'),
    ],
  },
  {
    id: 'madrid-football-layer',
    date: '9 dic 2025',
    topic: 'Dinámica',
    title: 'El chat se derrama hacia el futbol presencial en Madrid',
    participants: ['Contacto España (+34)', 'Francisco', 'Gerardo', 'Andrés', 'Aaron'],
    summary:
      'La conversacion deja de ser solo comentario y fantasy. Aparece una capa nueva: jugar juntos en Madrid, sumar gente y estirar la convivencia fuera del teléfono.',
    evidence: [
      fragment(
        '9 dic 2025 · 2:48 PM',
        'Contacto España (+34)',
        'Lo digo porque todas las semanas estamos jugando, tenemos un equipo de la orquesta, por si te quieres venir un día te digo',
      ),
      fragment(
        '9 dic 2025 · 2:51 PM',
        'Contacto España (+34)',
        'Aquí la gente no da leñazos y no te lesionan, todo friendly',
      ),
      fragment(
        '9 dic 2025 · 3:14 PM',
        'Gerardo Vitale Errico',
        'Una de las mejores decisiones del 2025 ha sido volver al fútbol definitivamente',
      ),
      fragment(
        '9 dic 2025 · 3:09 PM',
        'Andres Eduardo Pinto',
        'Un día me anoto se los prometo',
      ),
      fragment('9 dic 2025 · 3:30 PM', 'Aaron Rodrigues', 'Yes sir'),
    ],
  },
  {
    id: 'memo-fantasy-ghost',
    date: '20-21 feb 2026',
    topic: 'Fantasy',
    title: 'Memo domina la fantasy sin estar en el grupo',
    participants: ['Francisco', 'Gabriel', 'Jesús'],
    summary:
      'Aparece una rareza estructural del ecosistema Burritos: el lider competitivo ni siquiera participa en la conversación. El fantasy y la sociabilidad ya son capas relacionadas, pero no idénticas.',
    evidence: [
      fragment(
        '20 feb 2026 · 6:43 PM',
        'Francisco Arteaga',
        'El único que no está en este grupo es el que va de primero en la liga',
      ),
      fragment(
        '20 feb 2026 · 10:07 PM',
        'Jesús Burgos',
        'Memo nos violo a todos. Yo la pegué con Guirassy pero no se me ocurrió Gordon',
      ),
      fragment(
        '21 feb 2026 · 12:25 AM',
        'Francisco Arteaga',
        'Yo te is a Gordon pero, jamás lo hubiera puesto de Capitán',
      ),
    ],
  },
  {
    id: 'prestiani-vinicius',
    date: '18-23 feb 2026',
    topic: 'Convivencia',
    title: 'El caso Prestiani/Vinicius marca el punto moral más duro',
    participants: ['Javier', 'Gabriel', 'Jesús', 'Francisco', 'Luís', 'Gerardo'],
    summary:
      'La discusión sobre racismo y provocación deja de ser solo fútbol. Aquí se hace visible quién relativiza, quién condena y quién intenta ordenar el caos.',
    evidence: [
      fragment(
        '18 feb 2026 · 1:09 PM',
        'Jesús Burgos',
        'Lo de el hate a Vinicius es de estudio',
      ),
      fragment(
        '18 feb 2026 · 4:27 PM',
        'Gerardo Vitale Errico',
        'Terreno muy pantanoso ese del hate speech, muy subjetivo y abstracto para mi gusto.',
      ),
      fragment(
        '18 feb 2026 · 4:59 PM',
        'Javier Gimenez',
        'Creo que es menos grave discriminar por orientación sexual que por origen étnico/color de piel.',
      ),
      fragment(
        '23 feb 2026 · 5:58 PM',
        'Luís Torrado',
        'Claro pero de llevar eso a un insulto racista .. por lo menos probalo..capaz le dijo mariquito y ya jaja',
      ),
      fragment(
        '23 feb 2026 · 6:30 PM',
        'Javier Gimenez',
        'Capaz para prestianni y los argentinos decirle mono no tiene una connotación racistas. A lo mejor le dijo que dejar de comportarse como mono.',
      ),
      fragment(
        '23 feb 2026 · 6:30 PM',
        'Gabriel Gutiérrez',
        'Es en serio que estamos teniendo esta discusión? JAJAJAJA',
      ),
      fragment(
        '23 feb 2026 · 6:31 PM',
        'Gabriel Gutiérrez',
        'En España le dieron a Vinicius que se fuera al sambodromo a hacer el mono. Seguro quisieron decir que él es muy alegre',
      ),
    ],
  },
  {
    id: 'francisco-burnout',
    date: '16 mar 2026',
    topic: 'Dinámica',
    title: 'Francisco amenaza con dejar de organizar y cerrar el grupo',
    participants: ['Francisco', 'Gabriel', 'Gustavo', 'Andrés'],
    summary:
      'Después de meses de quinielas, fantasy y discusiones, el organizador central verbaliza agotamiento. El grupo reacciona tratándolo como amenaza real y también como performance conocida.',
    evidence: [
      fragment(
        '16 mar 2026 · 7:04 PM',
        'Francisco Arteaga',
        'Y este es el último que organizó',
      ),
      fragment(
        '16 mar 2026 · 7:04 PM',
        'Francisco Arteaga',
        'Ustedes son muy tóxicos',
      ),
      fragment(
        '16 mar 2026 · 7:43 PM',
        'Andres Eduardo Pinto',
        'Suelta Francisco que nadie te va a Juzgar, así los factos salpiquen a todos',
      ),
      fragment(
        '16 mar 2026 · 9:19 PM',
        'Francisco Arteaga',
        'Solo quiero que se queden, con que este es el último que organizo. El año que viene no hay nada, y cierro este grupo de tóxicos',
      ),
      fragment('17 mar 2026 · 11:06 PM', 'Francisco Arteaga', 'Claro que sí'),
    ],
  },
]
