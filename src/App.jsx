import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  CHAT_SOURCE_NAME,
  EDGE_STYLE,
  EDGES,
  MEMBER_EVIDENCE,
  MEMBERS,
  NODE_POS,
  TIMELINE_EVENTS,
  TWEAK_DEFAULTS,
} from './data.js'

const deriveEvidenceTopic = (context) => {
  const value = context.toLowerCase()
  if (value.includes('fantasy')) return 'Fantasy'
  if (value.includes('var') || value.includes('árbitr') || value.includes('arbitr')) return 'VAR'
  if (value.includes('racis') || value.includes('vinicius') || value.includes('prestiani')) return 'Convivencia'
  if (value.includes('messi') || value.includes('barça') || value.includes('barca')) return 'Rivalidad'
  if (value.includes('grupo')) return 'Dinámica'
  return 'Chat'
}

const getEvidenceItems = (member) =>
  MEMBER_EVIDENCE[member.id] ||
  member.quotes.map((quote, index) => ({
    id: `${member.id}-evidence-${index}`,
    title: member.patterns[index] || `Evidencia ${index + 1}`,
    topic: deriveEvidenceTopic(quote.ctx),
    context: quote.ctx,
    summary:
      member.patterns[index] ||
      'La cita ilustra un comportamiento consistente dentro del período analizado.',
    excerpts: [
      {
        at: quote.ctx,
        author: member.name,
        text: quote.text.replace(/^"|"$/g, ''),
        source: `Contexto curado · ${CHAT_SOURCE_NAME}`,
      },
    ],
  }))

const TOPIC_ACCENTS = {
  VAR: 'oklch(62% 0.22 25)',
  Fantasy: 'oklch(72% 0.18 60)',
  Convivencia: 'oklch(68% 0.18 200)',
  Dinámica: 'oklch(70% 0.16 145)',
  'Nuevos miembros': 'oklch(76% 0.16 310)',
  Rivalidad: 'oklch(74% 0.16 25)',
}

const TIMELINE_READ_LABELS = [
  { key: 'active', label: 'Más activos' },
  { key: 'aggressive', label: 'Más agresivos' },
  { key: 'pacifying', label: 'Más pacificadores' },
  { key: 'conservative', label: 'Más conservadores' },
  { key: 'sensible', label: 'Más sensatos' },
]

const TIMELINE_READ_WEIGHTS = {
  active: 3,
  aggressive: 2,
  pacifying: 3,
  conservative: 2,
  sensible: 3,
}

const MONTH_INDEX = {
  ene: 1,
  feb: 2,
  mar: 3,
  abr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  ago: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dic: 12,
}

const ANALYSIS_PHASES = [
  {
    id: 'kickoff',
    label: 'Arranque',
    range: 'Abr-May 2025',
    from: 202504,
    to: 202505,
    accent: 'oklch(72% 0.18 60)',
  },
  {
    id: 'fantasy',
    label: 'Fantasy',
    range: 'Ago-Sep 2025',
    from: 202508,
    to: 202509,
    accent: 'oklch(76% 0.16 310)',
  },
  {
    id: 'reorder',
    label: 'Reorden',
    range: 'Oct-Dic 2025',
    from: 202510,
    to: 202512,
    accent: 'oklch(70% 0.16 145)',
  },
  {
    id: 'fracture',
    label: 'Fractura',
    range: 'Ene-Mar 2026',
    from: 202601,
    to: 202603,
    accent: 'oklch(62% 0.22 25)',
  },
]

const MEMBER_AWARDS = {
  gabriel: {
    title: 'Premio Ley Mordaza',
    blurb: 'Cuando el chat se descompone, aparece como admin, juez y comite disciplinario en una sola persona.',
  },
  francisco: {
    title: 'Premio Motor de Reaccion',
    blurb: 'Nadie empuja tanto la conversacion ni convierte un tema cualquiera en debate de alto octanaje.',
  },
  gustavo: {
    title: 'Premio Abogado del Diablo',
    blurb: 'Tiene la rara habilidad de pinchar consensos, irritar al bloque madridista y luego reirse con ellos.',
  },
  jesus: {
    title: 'Premio Factos de Emergencia',
    blurb: 'Entra poco, pero cuando entra reordena el hilo y deja veredicto con autoridad fria.',
  },
  javier: {
    title: 'Premio Elemento Disruptivo',
    blurb: 'No estabiliza nada: escala, provoca y devuelve friccion incluso cuando el grupo ya estaba girando hacia otra cosa.',
  },
  luis: {
    title: 'Premio Corresponsal con Criterio',
    blurb: 'Aparece poco, pero casi siempre baja el debate al terreno concreto y evita la gimnasia retorica.',
  },
  andres: {
    title: 'Premio Detector de Toxicidad',
    blurb: 'Su superpoder es nombrar el clima del grupo sin necesidad de meterse de lleno en la pelea.',
  },
  gerardo: {
    title: 'Premio Giro Filosofico',
    blurb: 'Puede agarrar una disputa futbolera y convertirla en una conversacion sobre libertad, prueba y principios.',
  },
  espana34: {
    title: 'Premio Refuerzo Peninsular',
    blurb: 'Suma tono, contexto de Madrid y continuidad social sin necesitar dominar el centro del escenario.',
  },
  jorge: {
    title: 'Premio Caos Carismatico',
    blurb: 'Transforma onboarding, fantasy y parentescos imposibles en una mini-comedia propia.',
  },
  aaron: {
    title: 'Premio Rookie Aplicado',
    blurb: 'Entra nuevo, detecta rapido la cultura del grupo y en seguida compite como si llevara meses adentro.',
  },
}

const TOXICITY_RANKING = [
  {
    id: 'javier',
    title: 'El mas toxico',
    note: 'Escala, provoca y se convierte en foco de ruptura con demasiada regularidad.',
  },
  {
    id: 'gabriel',
    title: 'Toxicidad institucional',
    note: 'No rompe por volumen, pero cuando castiga o expulsa deja cicatriz de admin severo.',
  },
  {
    id: 'francisco',
    title: 'Combustion argumentativa',
    note: 'Su intensidad sostiene el debate, pero tambien puede elevar la temperatura demasiado rapido.',
  },
]

const normalizeText = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const buildMemberLookup = () => {
  const lookup = new Map()

  const register = (alias, member) => {
    if (!alias) return
    lookup.set(normalizeText(alias), member)
  }

  MEMBERS.forEach((member) => {
    register(member.name, member)
    register(member.shortName, member)
    register(member.nickname?.replace(/"/g, ''), member)
    register(member.name.split(' ')[0], member)
  })

  register('Andrés', MEMBERS.find((member) => member.id === 'andres'))
  register('Andres', MEMBERS.find((member) => member.id === 'andres'))
  register('Grupo', { id: 'group', name: 'Grupo', shortName: 'Grupo' })
  register('Sistema', { id: 'system', name: 'Sistema', shortName: 'Sistema' })

  return lookup
}

const MEMBER_LOOKUP = buildMemberLookup()

const resolveMember = (label) => {
  const normalized = normalizeText(label)
  if (MEMBER_LOOKUP.has(normalized)) return MEMBER_LOOKUP.get(normalized)

  return (
    MEMBERS.find((member) => {
      const fullName = normalizeText(member.name)
      const firstName = normalizeText(member.name.split(' ')[0])
      return fullName.includes(normalized) || normalized.includes(firstName)
    }) ?? null
  )
}

const toDisplayName = (label) => resolveMember(label)?.shortName || resolveMember(label)?.name || label

const buildEventFragments = (event) => {
  const base = event.evidence.map((excerpt, index) => ({
    ...excerpt,
    id: `${event.id}-${index}`,
    topic: event.topic,
    summary: event.summary,
    sourceId: event.id,
    sourceTitle: event.title,
    sourceType: 'timeline',
    contextLabel: event.date,
    participants: event.participants,
  }))

  return base.map((excerpt) => ({
    ...excerpt,
    contextWindow: base,
  }))
}

const buildEvidenceFragments = (member, item) => {
  const participantName = member.shortName || member.name.split(' ')[0]
  const base = item.excerpts.map((excerpt, index) => ({
    ...excerpt,
    id: `${item.id}-${index}`,
    topic: item.topic,
    summary: item.summary,
    sourceId: item.id,
    sourceTitle: item.title,
    sourceType: 'evidencia',
    contextLabel: item.context,
    participants: [participantName],
  }))

  return base.map((excerpt) => ({
    ...excerpt,
    contextWindow: base,
  }))
}

const parseEventDate = (value) => {
  const [day, monthLabel, year] = value.split(' ')
  const month = MONTH_INDEX[monthLabel] ?? 1

  return {
    day: Number(day),
    month,
    year: Number(year),
    key: Number(year) * 100 + month,
  }
}

const getEventPhase = (dateLabel) => {
  const parsed = parseEventDate(dateLabel)
  return (
    ANALYSIS_PHASES.find((phase) => parsed.key >= phase.from && parsed.key <= phase.to) ??
    ANALYSIS_PHASES[ANALYSIS_PHASES.length - 1]
  )
}

const createMemberAccumulator = (member) => ({
  member,
  events: 0,
  fragmentsAuthored: 0,
  active: 0,
  aggressive: 0,
  pacifying: 0,
  conservative: 0,
  sensible: 0,
  triggers: 0,
  provocative: 0,
  disruption: 0,
  influence: 0,
  volume: 0,
})

const dedupeLabels = (labels) => {
  const seen = new Set()
  const output = []

  labels.forEach((label) => {
    const normalized = normalizeText(label)
    if (!normalized || seen.has(normalized)) return
    seen.add(normalized)
    output.push(toDisplayName(label))
  })

  return output
}

const buildPairKey = (left, right) => [toDisplayName(left), toDisplayName(right)].sort().join('::')

const addPairCounts = (bucket, values) => {
  const labels = dedupeLabels(values)
  for (let index = 0; index < labels.length; index += 1) {
    for (let nested = index + 1; nested < labels.length; nested += 1) {
      const key = buildPairKey(labels[index], labels[nested])
      bucket.set(key, (bucket.get(key) ?? 0) + 1)
    }
  }
}

const addAnchorPairCounts = (bucket, anchor, values) => {
  const anchorLabel = toDisplayName(anchor)
  dedupeLabels(values)
    .filter((label) => label !== anchorLabel)
    .forEach((label) => {
      const key = buildPairKey(anchorLabel, label)
      bucket.set(key, (bucket.get(key) ?? 0) + 1)
    })
}

const bumpCounter = (bucket, labels) => {
  dedupeLabels(labels).forEach((label) => {
    bucket.set(label, (bucket.get(label) ?? 0) + 1)
  })
}

const deriveRoleLabel = (snapshot) => {
  if (!snapshot || snapshot.volume === 0) return 'Latente'

  if (snapshot.member.warning && (snapshot.aggressive > 0 || snapshot.provocative > 0 || snapshot.triggers > 0)) {
    return 'Elemento disruptivo'
  }

  if (snapshot.aggressive >= 2 && snapshot.aggressive > snapshot.pacifying) return 'Escalador'
  if (snapshot.pacifying >= 2 && snapshot.pacifying >= snapshot.aggressive) return 'Pacificador'
  if (snapshot.active >= 2 && snapshot.active >= snapshot.sensible) return 'Motor'
  if (snapshot.sensible + snapshot.conservative >= 2) return 'Analítico'
  if (snapshot.fragmentsAuthored >= 2) return 'Articulador'
  return 'Observador'
}

const deriveEventCausality = (event) => {
  const aggressiveLabels = dedupeLabels(event.read.aggressive)
  const disruptiveAggressor = aggressiveLabels.find((label) => resolveMember(label)?.warning)
  const triggerExcerpt = event.evidence.find((excerpt) => normalizeText(excerpt.author) !== 'sistema')
  const trigger = disruptiveAggressor || (triggerExcerpt ? toDisplayName(triggerExcerpt.author) : aggressiveLabels[0] || 'Grupo')
  const aggressors = dedupeLabels(event.read.aggressive)
  const actives = dedupeLabels(event.read.active)
  const pacifiers = dedupeLabels(event.read.pacifying)
  const stabilizers = dedupeLabels([...event.read.sensible, ...event.read.conservative])

  return {
    trigger,
    amplifiers: dedupeLabels([...aggressors.filter((name) => name !== trigger), ...actives.filter((name) => name !== trigger)]).slice(0, 3),
    pacifiers: pacifiers.slice(0, 3),
    stabilizers: stabilizers.slice(0, 3),
  }
}

const scoreEventImpact = (event) =>
  event.evidence.length * 2 +
  event.participants.length +
  event.read.active.length * 2 +
  event.read.aggressive.length * 3 +
  event.read.pacifying.length * 2 +
  (event.topic === 'Convivencia' ? 2 : 0)

const deriveTimelineAnalytics = (events) => {
  const topicCounts = new Map()
  const memberStats = new Map(MEMBERS.map((member) => [member.id, createMemberAccumulator(member)]))
  const topicStats = new Map()
  const phaseStats = new Map(
    ANALYSIS_PHASES.map((phase) => [
      phase.id,
      {
        ...phase,
        members: new Map(MEMBERS.map((member) => [member.id, createMemberAccumulator(member)])),
      },
    ]),
  )

  let totalFragments = 0

  events.forEach((event) => {
    const phase = getEventPhase(event.date)
    const phaseBucket = phaseStats.get(phase.id)
    const eventCausality = deriveEventCausality(event)
    const topicBucket =
      topicStats.get(event.topic) ??
      {
        topic: event.topic,
        events: 0,
        alliancePairs: new Map(),
        frictionPairs: new Map(),
        triggers: new Map(),
        pacifiers: new Map(),
      }

    totalFragments += event.evidence.length
    topicCounts.set(event.topic, (topicCounts.get(event.topic) ?? 0) + 1)
    topicBucket.events += 1
    bumpCounter(topicBucket.triggers, [eventCausality.trigger])
    bumpCounter(topicBucket.pacifiers, eventCausality.pacifiers)

    addPairCounts(
      topicBucket.alliancePairs,
      [...event.read.pacifying, ...event.read.sensible, ...event.read.conservative],
    )
    dedupeLabels(event.read.aggressive).forEach((aggressor) => {
      addAnchorPairCounts(
        topicBucket.frictionPairs,
        aggressor,
        dedupeLabels(event.participants),
      )
    })
    topicStats.set(event.topic, topicBucket)

    event.participants.forEach((participant) => {
      const member = resolveMember(participant)
      if (!member || !memberStats.has(member.id)) return
      const stat = memberStats.get(member.id)
      stat.events += 1
      stat.influence += 1
      stat.volume += 1

      const phaseMember = phaseBucket?.members.get(member.id)
      if (phaseMember) {
        phaseMember.events += 1
        phaseMember.influence += 1
        phaseMember.volume += 1
      }
    })

    const triggerMember = resolveMember(eventCausality.trigger)
    if (triggerMember && memberStats.has(triggerMember.id)) {
      const stat = memberStats.get(triggerMember.id)
      stat.triggers += 1
      stat.provocative += 2
      stat.disruption += 3

      const phaseMember = phaseBucket?.members.get(triggerMember.id)
      if (phaseMember) {
        phaseMember.triggers += 1
        phaseMember.provocative += 2
        phaseMember.disruption += 3
      }
    }

    event.evidence.forEach((excerpt) => {
      const member = resolveMember(excerpt.author)
      if (!member || !memberStats.has(member.id)) return
      const stat = memberStats.get(member.id)
      stat.fragmentsAuthored += 1
      stat.influence += 2
      stat.volume += 2
      if (member.warning) {
        stat.provocative += 1
        stat.disruption += 1
      }

      const phaseMember = phaseBucket?.members.get(member.id)
      if (phaseMember) {
        phaseMember.fragmentsAuthored += 1
        phaseMember.influence += 2
        phaseMember.volume += 2
        if (member.warning) {
          phaseMember.provocative += 1
          phaseMember.disruption += 1
        }
      }
    })

    TIMELINE_READ_LABELS.forEach(({ key }) => {
      event.read[key].forEach((label) => {
        const member = resolveMember(label)
        if (!member || !memberStats.has(member.id)) return
        const stat = memberStats.get(member.id)
        stat[key] += 1
        stat.influence += TIMELINE_READ_WEIGHTS[key] ?? 1
        if (key === 'aggressive') {
          stat.provocative += 1
          stat.disruption += member.warning ? 4 : 2
        }

        const phaseMember = phaseBucket?.members.get(member.id)
        if (phaseMember) {
          phaseMember[key] += 1
          phaseMember.influence += TIMELINE_READ_WEIGHTS[key] ?? 1
          if (key === 'aggressive') {
            phaseMember.provocative += 1
            phaseMember.disruption += member.warning ? 4 : 2
          }
        }
      })
    })
  })

  const ranking = [...memberStats.values()].map((item) => ({
    ...item,
    leverage: item.volume ? item.influence / item.volume : 0,
    aggressionIndex:
      item.aggressive * 3 +
      item.provocative * 2 +
      item.disruption +
      (item.member.warning ? 48 : 0),
    provocationIndex:
      item.provocative * 3 +
      item.triggers * 4 +
      item.disruption +
      (item.member.warning ? 48 : 0),
    role: deriveRoleLabel(item),
  }))
  const dominantTopicEntry = [...topicCounts.entries()].sort((left, right) => right[1] - left[1])[0]
  const turningPoints = events
    .map((event) => ({
      ...event,
      impactScore: scoreEventImpact(event),
      leadFragment: buildEventFragments(event)[0] ?? null,
    }))
    .sort((left, right) => right.impactScore - left.impactScore)
    .slice(0, 3)

  const byMetric = (key) =>
    ranking
      .filter((item) => item.member.id !== 'system' && item.member.id !== 'group')
      .sort((left, right) => right[key] - left[key])[0]

  const influenceRows = ranking
    .filter((item) => item.volume > 0)
    .sort((left, right) => {
      if (right.influence !== left.influence) return right.influence - left.influence
      return right.leverage - left.leverage
    })
    .slice(0, 6)

  const roleDrift = ranking
    .filter((item) => item.volume > 0)
    .sort((left, right) => right.influence - left.influence)
    .slice(0, 4)
    .map((item) => ({
      member: item.member,
      currentRole: item.role,
      phases: ANALYSIS_PHASES.map((phase) => {
        const phaseItem = phaseStats.get(phase.id)?.members.get(item.member.id) ?? createMemberAccumulator(item.member)
        const role = deriveRoleLabel(phaseItem)
        return {
          id: phase.id,
          label: phase.label,
          range: phase.range,
          accent: phase.accent,
          role,
          influence: phaseItem.influence,
          volume: phaseItem.volume,
        }
      }).filter((phase) => phase.volume > 0),
    }))

  const memberRoleDrift = Object.fromEntries(
    MEMBERS.map((member) => [
      member.id,
      ANALYSIS_PHASES.map((phase) => {
        const phaseItem = phaseStats.get(phase.id)?.members.get(member.id) ?? createMemberAccumulator(member)
        return {
          id: phase.id,
          label: phase.label,
          range: phase.range,
          accent: phase.accent,
          role: deriveRoleLabel(phaseItem),
          influence: phaseItem.influence,
          volume: phaseItem.volume,
          leverage: phaseItem.volume ? phaseItem.influence / phaseItem.volume : 0,
        }
      }).filter((phase) => phase.volume > 0),
    ]),
  )

  const topicDynamics = [...topicStats.values()]
    .map((topic) => {
      const topAlliance = [...topic.alliancePairs.entries()].sort((left, right) => right[1] - left[1])[0]
      const topFriction = [...topic.frictionPairs.entries()].sort((left, right) => right[1] - left[1])[0]
      const topTrigger = [...topic.triggers.entries()].sort((left, right) => right[1] - left[1])[0]
      const topPacifier = [...topic.pacifiers.entries()].sort((left, right) => right[1] - left[1])[0]

      return {
        topic: topic.topic,
        events: topic.events,
        topAlliance: topAlliance
          ? { pair: topAlliance[0].split('::'), count: topAlliance[1] }
          : null,
        topFriction: topFriction
          ? { pair: topFriction[0].split('::'), count: topFriction[1] }
          : null,
        topTrigger: topTrigger ? { name: topTrigger[0], count: topTrigger[1] } : null,
        topPacifier: topPacifier ? { name: topPacifier[0], count: topPacifier[1] } : null,
      }
    })
    .sort((left, right) => right.events - left.events)

  return {
    totalEvents: events.length,
    totalFragments,
    dominantTopic: dominantTopicEntry?.[0] ?? 'Sin filtro',
    topInfluence: byMetric('influence'),
    topPacifier: byMetric('pacifying'),
    topAggressive: byMetric('aggressionIndex'),
    topProvocative: byMetric('provocationIndex'),
    tensionPeak: turningPoints[0] ?? null,
    turningPoints,
    influenceRows,
    roleDrift,
    memberRoleDrift,
    topicDynamics,
  }
}

const ChatFragments = ({ excerpts, label = 'Fragmentos del chat', onSelectFragment }) => (
  <div className="chat-fragments">
    <div className="chat-fragments__label">{label}</div>
    <div className="chat-fragments__list">
      {excerpts.map((excerpt, index) => (
        <button
          key={excerpt.id || `${excerpt.author}-${excerpt.at}-${index}`}
          type="button"
          className={`chat-fragment${onSelectFragment ? ' is-interactive' : ''}`}
          onClick={onSelectFragment ? () => onSelectFragment(excerpt) : undefined}
        >
          <div className="chat-fragment__meta">
            <span className="chat-fragment__author">{excerpt.author}</span>
            <span>{excerpt.at}</span>
            {excerpt.source && <span>{excerpt.source}</span>}
          </div>
          <div className="chat-fragment__text">“{excerpt.text}”</div>
          {onSelectFragment && <div className="chat-fragment__cta">Abrir evidencia</div>}
        </button>
      ))}
    </div>
  </div>
)

const TimelineReadout = ({ read }) => (
  <div className="timeline-readout">
    {TIMELINE_READ_LABELS.map(({ key, label }) => (
      <div key={key} className="timeline-readout__row">
        <div className="timeline-readout__label">{label}</div>
        <div className="timeline-readout__chips">
          {read[key].map((name) => (
            <span key={`${key}-${name}`} className="timeline-readout__chip">
              {name}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
)

const EventCausalityPanel = ({ event }) => {
  const causality = useMemo(() => deriveEventCausality(event), [event])
  const rows = [
    { label: 'Disparador', values: [causality.trigger], tone: 'oklch(72% 0.18 60)' },
    { label: 'Amplificadores', values: causality.amplifiers, tone: 'oklch(62% 0.22 25)' },
    { label: 'Pacificadores', values: causality.pacifiers, tone: 'oklch(70% 0.16 145)' },
    { label: 'Cierre sensato', values: causality.stabilizers, tone: 'oklch(68% 0.18 200)' },
  ]

  return (
    <div className="event-causality">
      {rows.map((row) => (
        <div key={row.label} className="event-causality__row">
          <div className="event-causality__label">{row.label}</div>
          <div className="event-causality__chips">
            {(row.values.length > 0 ? row.values : ['Sin señal clara']).map((value) => (
              <span key={`${row.label}-${value}`} className="event-causality__chip" style={{ '--causality-accent': row.tone }}>
                {value}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const TimelineEventCard = ({ event, onSelectFragment }) => {
  const [activePane, setActivePane] = useState('read')
  const eventFragments = useMemo(() => buildEventFragments(event), [event])

  return (
    <article
      className="timeline-card"
      style={{ '--timeline-accent': TOPIC_ACCENTS[event.topic] ?? '#f0ede8' }}
    >
      <div className="timeline-card__rail" aria-hidden="true" />
      <div className="timeline-card__content">
        <div className="timeline-card__meta">
          <span>{event.date}</span>
          <span>{event.topic}</span>
          <span>{event.participants.length} participantes</span>
        </div>
        <h3>{event.title}</h3>
        <p>{event.summary}</p>
        <div className="timeline-card__participants">
          {event.participants.map((participant) => (
            <span key={`${event.id}-${participant}`}>{participant}</span>
          ))}
        </div>

        <div className="timeline-panel">
          <div className="timeline-tabs" role="tablist" aria-label={`Vistas del evento ${event.title}`}>
            {[
              { key: 'read', label: 'Lectura' },
              { key: 'causality', label: 'Causalidad' },
              { key: 'evidence', label: `Fragmentos (${event.evidence.length})` },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activePane === tab.key}
                className={`timeline-tab${activePane === tab.key ? ' active' : ''}`}
                onClick={() => setActivePane(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="timeline-panel__body">
            {activePane === 'read' ? (
              <TimelineReadout read={event.read} />
            ) : activePane === 'causality' ? (
              <EventCausalityPanel event={event} />
            ) : (
              <ChatFragments
                excerpts={eventFragments}
                label={`Fragmentos reales de ${CHAT_SOURCE_NAME}`}
                onSelectFragment={onSelectFragment}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

const TopicDynamicsSection = ({ analytics }) => (
  <section className="analysis-section" aria-label="Alianzas y friccion por tema">
    <div className="analysis-section__header">
      <div>
        <h3>Alianzas y fricción por tema</h3>
        <p>Qué combinaciones se repiten cuando cambia el asunto: quién empuja, quién calma y dónde se forman bloques.</p>
      </div>
    </div>

    <div className="topic-dynamics-grid">
      {analytics.topicDynamics.map((item) => (
        <article
          key={item.topic}
          className="topic-dynamics-card"
          style={{ '--topic-accent': TOPIC_ACCENTS[item.topic] ?? 'rgba(255,255,255,0.12)' }}
        >
          <div className="topic-dynamics-card__header">
            <div>
              <div className="topic-dynamics-card__topic">{item.topic}</div>
              <div className="topic-dynamics-card__meta">{item.events} eventos</div>
            </div>
          </div>

          <div className="topic-dynamics-card__rows">
            <div className="topic-dynamics-row">
              <div className="topic-dynamics-row__label">Dispara</div>
              <div className="topic-dynamics-row__value">
                {item.topTrigger ? `${item.topTrigger.name} · ${item.topTrigger.count}` : 'Sin patrón'}
              </div>
            </div>
            <div className="topic-dynamics-row">
              <div className="topic-dynamics-row__label">Alianza dominante</div>
              <div className="topic-dynamics-row__value">
                {item.topAlliance ? `${item.topAlliance.pair.join(' + ')} · ${item.topAlliance.count}` : 'Sin patrón'}
              </div>
            </div>
            <div className="topic-dynamics-row">
              <div className="topic-dynamics-row__label">Fricción dominante</div>
              <div className="topic-dynamics-row__value">
                {item.topFriction ? `${item.topFriction.pair.join(' vs ')} · ${item.topFriction.count}` : 'Sin patrón'}
              </div>
            </div>
            <div className="topic-dynamics-row">
              <div className="topic-dynamics-row__label">Calma más</div>
              <div className="topic-dynamics-row__value">
                {item.topPacifier ? `${item.topPacifier.name} · ${item.topPacifier.count}` : 'Sin patrón'}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
)

const TimelineInsights = ({ analytics, onSelectFragment }) => {
  const summaryCards = [
    {
      label: 'Eventos visibles',
      value: String(analytics.totalEvents),
      tone: 'rgba(255,255,255,0.12)',
    },
    {
      label: 'Fragmentos auditables',
      value: String(analytics.totalFragments),
      tone: 'rgba(255,255,255,0.12)',
    },
    {
      label: 'Tema dominante',
      value: analytics.dominantTopic,
      tone: TOPIC_ACCENTS[analytics.dominantTopic] ?? 'rgba(255,255,255,0.12)',
    },
    {
      label: 'Motor del período',
      value: analytics.topInfluence?.member.shortName || analytics.topInfluence?.member.name || 'N/D',
      tone: analytics.topInfluence?.member.color || 'rgba(255,255,255,0.12)',
    },
  ]

  const insightCards = [
    {
      title: 'Escalador recurrente',
      value: analytics.topAggressive?.member.shortName || analytics.topAggressive?.member.name || 'N/D',
      meta: analytics.topAggressive
        ? `${analytics.topAggressive.aggressive} lecturas directas · ${analytics.topAggressive.disruption} marcas de ruptura`
        : 'Sin datos',
      tone: 'oklch(62% 0.22 25)',
    },
    {
      title: 'Provocador estructural',
      value: analytics.topProvocative?.member.shortName || analytics.topProvocative?.member.name || 'N/D',
      meta: analytics.topProvocative
        ? `${analytics.topProvocative.triggers} disparadores · ${analytics.topProvocative.provocative} señales de provocación`
        : 'Sin datos',
      tone: 'oklch(60% 0.25 15)',
    },
    {
      title: 'Pacificador dominante',
      value: analytics.topPacifier?.member.shortName || analytics.topPacifier?.member.name || 'N/D',
      meta: analytics.topPacifier
        ? `${analytics.topPacifier.pacifying} intervenciones calmantes`
        : 'Sin datos',
      tone: 'oklch(70% 0.16 145)',
    },
  ]

  return (
    <>
      <div className="timeline-summary">
        {summaryCards.map((item) => (
          <div
            key={item.label}
            className="timeline-summary__item"
            style={{ '--summary-accent': item.tone }}
          >
            <div className="timeline-summary__value">{item.value}</div>
            <div className="timeline-summary__label">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="timeline-insights">
        {insightCards.map((item) => (
          <article
            key={item.title}
            className="timeline-insight"
            style={{ '--insight-accent': item.tone }}
          >
            <div className="timeline-insight__eyebrow">{item.title}</div>
            <div className="timeline-insight__value">{item.value}</div>
            <div className="timeline-insight__meta">{item.meta}</div>
          </article>
        ))}
      </div>

      <section className="turning-points" aria-label="Momentos bisagra">
        <div className="turning-points__header">
          <div>
            <h3>Momentos bisagra</h3>
            <p>Los episodios que más reorganizaron el tono, la atención y la fricción del grupo.</p>
          </div>
        </div>
        <div className="turning-points__list">
          {analytics.turningPoints.map((event, index) => (
            <article key={event.id} className="turning-point-card">
              <div className="turning-point-card__rank">0{index + 1}</div>
              <div className="turning-point-card__body">
                <div className="turning-point-card__meta">
                  <span>{event.date}</span>
                  <span>{event.topic}</span>
                  <span>{event.impactScore} puntos</span>
                </div>
                <h4>{event.title}</h4>
                <p>{event.summary}</p>
              </div>
              {event.leadFragment && (
                <button
                  type="button"
                  className="turning-point-card__action"
                  onClick={() => onSelectFragment(event.leadFragment)}
                >
                  Abrir evidencia
                </button>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

const EvidenceExplorer = ({ fragment, allFragments, onClose }) => {
  if (!fragment) return null

  const relatedFragments = allFragments
    .filter(
      (candidate) =>
        candidate.id !== fragment.id &&
        (candidate.author === fragment.author ||
          candidate.topic === fragment.topic ||
          candidate.participants?.some((participant) => fragment.participants?.includes(participant))),
    )
    .slice(0, 4)

  return (
    <div className="evidence-explorer">
      <button type="button" className="evidence-explorer__backdrop" onClick={onClose} aria-label="Cerrar evidencia" />
      <section className="evidence-explorer__panel" aria-label="Evidence Explorer">
        <div className="evidence-explorer__header">
          <div>
            <div className="evidence-explorer__eyebrow">Evidence Explorer</div>
            <h3>{fragment.sourceTitle}</h3>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Cerrar evidence explorer">
            ✕
          </button>
        </div>

        <div className="evidence-explorer__meta">
          <span>{fragment.topic}</span>
          <span>{fragment.contextLabel}</span>
          <span>{fragment.sourceType}</span>
        </div>

        <blockquote className="evidence-explorer__quote">“{fragment.text}”</blockquote>

        <div className="evidence-explorer__summary">
          <div className="evidence-explorer__section-title">Por qué importa</div>
          <p>{fragment.summary}</p>
        </div>

        <div className="evidence-explorer__participants">
          <div className="evidence-explorer__section-title">Participantes implicados</div>
          <div className="evidence-explorer__chips">
            {fragment.participants?.map((participant) => (
              <span key={`${fragment.id}-${participant}`}>{toDisplayName(participant)}</span>
            ))}
          </div>
        </div>

        <div className="evidence-explorer__context">
          <div className="evidence-explorer__section-title">Contexto del bloque</div>
          <div className="evidence-explorer__context-list">
            {fragment.contextWindow?.map((entry) => (
              <div
                key={entry.id}
                className={`evidence-explorer__context-item${entry.id === fragment.id ? ' active' : ''}`}
              >
                <div className="evidence-explorer__context-meta">
                  <span>{entry.author}</span>
                  <span>{entry.at}</span>
                </div>
                <div>{entry.text}</div>
              </div>
            ))}
          </div>
        </div>

        {relatedFragments.length > 0 && (
          <div className="evidence-explorer__related">
            <div className="evidence-explorer__section-title">Conecta con</div>
            <div className="evidence-explorer__related-list">
              {relatedFragments.map((entry) => (
                <article key={entry.id} className="evidence-link-card">
                  <div className="evidence-link-card__meta">
                    <span>{entry.author}</span>
                    <span>{entry.topic}</span>
                  </div>
                  <div className="evidence-link-card__title">{entry.sourceTitle}</div>
                  <p>“{entry.text}”</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

const InfluenceBoard = ({ analytics }) => (
  <section className="analysis-section" aria-label="Influence vs volume">
    <div className="analysis-section__header">
      <div>
        <h3>Influence vs volume</h3>
        <p>Separa quién habla mucho de quién realmente reordena la conversación.</p>
      </div>
    </div>

    <div className="influence-board">
      {analytics.influenceRows.map((item, index) => {
        const influenceWidth = Math.max((item.influence / analytics.influenceRows[0].influence) * 100, 12)

        return (
          <article key={item.member.id} className="influence-row">
            <div className="influence-row__rank">0{index + 1}</div>
            <div className="influence-row__identity">
              <div className="influence-row__name">{item.member.name}</div>
              <div className="influence-row__role" style={{ color: item.member.color }}>
                {item.role}
              </div>
            </div>
            <div className="influence-row__bar">
              <div className="influence-row__fill" style={{ width: `${influenceWidth}%`, background: item.member.color }} />
            </div>
            <div className="influence-row__metrics">
              <span>Influencia {item.influence}</span>
              <span>Volumen {item.volume}</span>
              <span>Leverage {item.leverage.toFixed(1)}x</span>
            </div>
          </article>
        )
      })}
    </div>
  </section>
)

const RoleDriftSection = ({ analytics }) => (
  <section className="analysis-section" aria-label="Role drift">
    <div className="analysis-section__header">
      <div>
        <h3>Role drift</h3>
        <p>Cómo cambia el rol de los miembros más influyentes según la fase del grupo.</p>
      </div>
    </div>

    <div className="role-drift-grid">
      {analytics.roleDrift.map((entry) => (
        <article key={entry.member.id} className="role-drift-card">
          <div className="role-drift-card__header">
            <div>
              <div className="role-drift-card__name">{entry.member.name}</div>
              <div className="role-drift-card__current" style={{ color: entry.member.color }}>
                Rol dominante: {entry.currentRole}
              </div>
            </div>
          </div>

          <div className="role-drift-card__timeline">
            {entry.phases.map((phase) => (
              <div key={`${entry.member.id}-${phase.id}`} className="role-phase">
                <div className="role-phase__meta">
                  <span className="role-phase__label">{phase.label}</span>
                  <span className="role-phase__range">{phase.range}</span>
                </div>
                <div className="role-phase__chip" style={{ '--role-accent': phase.accent }}>
                  {phase.role}
                </div>
                <div className="role-phase__stats">
                  <span>I {phase.influence}</span>
                  <span>V {phase.volume}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  </section>
)

const CompareRoleDrift = ({ member, analytics }) => {
  const phases = analytics.memberRoleDrift[member.id] ?? []

  if (phases.length === 0) return null

  return (
    <section className="compare-card__section">
      <h4>Role drift</h4>
      <div className="compare-role-drift">
        {phases.map((phase) => (
          <div key={`${member.id}-${phase.id}`} className="compare-role-phase">
            <div>
              <div className="compare-role-phase__label">{phase.label}</div>
              <div className="compare-role-phase__range">{phase.range}</div>
            </div>
            <div className="compare-role-phase__role" style={{ '--role-accent': phase.accent }}>
              {phase.role}
            </div>
            <div className="compare-role-phase__metrics">
              <span>I {phase.influence}</span>
              <span>V {phase.volume}</span>
              <span>L {phase.leverage.toFixed(1)}x</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const ScoreBar = ({ label, val, color }) => (
  <div className="score-bar">
    <div className="score-bar__meta">
      <span>{label}</span>
      <span>{val}/10</span>
    </div>
    <div className="score-bar__track">
      <div
        className="score-bar__fill"
        style={{ width: `${val * 10}%`, background: color }}
      />
    </div>
  </div>
)

const Dots = ({ level, color }) => (
  <div className="activity-dots" aria-label={`${level} de 10`}>
    {Array.from({ length: 10 }).map((_, index) => (
      <span
        key={index}
        className="activity-dot"
        style={{ background: index < level ? color : 'rgba(255,255,255,0.1)' }}
      />
    ))}
  </div>
)

const MemberCard = ({ member, selected, tweaks, onSelect, delay }) => {
  const isJavier = member.warning
  const showAlert = tweaks.showAlerts && isJavier
  const roleDisplay = isJavier
    ? tweaks.softMode
      ? member.roleSoft || member.role
      : member.role
    : member.role

  return (
    <button
      type="button"
      className={`member-card${isJavier ? ' warning' : ''}${selected ? ' selected' : ''}`}
      onClick={() => onSelect(member)}
      style={{
        borderColor: selected
          ? member.color
          : isJavier
            ? 'rgba(220,60,40,0.35)'
            : 'rgba(255,255,255,0.07)',
        animationDelay: `${delay * 60}ms`,
      }}
    >
      <span className="member-card__accent" style={{ background: member.color }} />
      {showAlert && <span className="member-card__alert">⚠ ALERTA</span>}

      <span className="member-card__header">
        <span className="avatar" style={{ background: member.color }}>
          {member.initials}
        </span>
        <span className="member-card__identity">
          <span className="member-card__name">{member.name}</span>
          <span className="member-card__role" style={{ color: member.color }}>
            {roleDisplay}
          </span>
        </span>
      </span>

      <span className="member-card__activity">
        <span className="member-card__eyebrow">Actividad</span>
        <Dots level={member.activity} color={member.color} />
      </span>

      {tweaks.showTeams && <span className="member-card__team">{member.team}</span>}
    </button>
  )
}

const EvidenceSection = ({ member, onSelectFragment }) => {
  const evidenceItems = getEvidenceItems(member)

  return (
    <section className="profile-section">
      <h3>Evidencia</h3>
      <div className="evidence-list">
        {evidenceItems.map((item) => {
          const evidenceFragments = buildEvidenceFragments(member, item)

          return (
          <details key={item.id} className="evidence-card">
            <summary className="evidence-card__summary">
              <div>
                <div className="evidence-card__title">{item.title}</div>
                <div className="evidence-card__meta">
                  <span>{item.topic}</span>
                  <span>{item.context}</span>
                </div>
              </div>
              <span className="evidence-card__toggle">Ver</span>
            </summary>
            <div className="evidence-card__body">
              <p>{item.summary}</p>
              <ChatFragments excerpts={evidenceFragments} onSelectFragment={onSelectFragment} />
            </div>
          </details>
          )
        })}
      </div>
    </section>
  )
}

const ProfilePanel = ({ member, tweaks, onClose, onSelectFragment }) => {
  if (!member) return null

  const isJavier = member.warning
  const softMode = tweaks.softMode
  const roleDisplay = isJavier
    ? softMode
      ? member.roleSoft || member.role
      : member.role
    : member.role

  return (
    <aside className={`profile-panel${isJavier ? ' warning' : ''}`} aria-label={`Perfil de ${member.name}`}>
      <div
        className="profile-panel__hero"
        style={{
          background: `${member.color}12`,
          borderBottomColor: `${member.color}28`,
        }}
      >
        <button type="button" className="close-btn" onClick={onClose} aria-label="Cerrar perfil">
          ✕
        </button>
        <div className="profile-panel__intro">
          <div className="avatar avatar--large" style={{ background: member.color }}>
            {member.initials}
          </div>
          <div>
            <h2>{member.name}</h2>
            <div className="profile-panel__role" style={{ color: member.color }}>
              {roleDisplay}
            </div>
            <div className="profile-panel__subline">
              {member.nickname} · {member.team}
            </div>
          </div>
        </div>

        {isJavier && !softMode && (
          <div className="profile-alert">
            ⚠ <strong>Elemento disruptivo.</strong> No llega a puntos medios, borra mensajes,
            minimiza el racismo y usa la condescendencia como argumento.
          </div>
        )}
      </div>

      <div className="profile-panel__body">
        <section className="profile-section">
          <h3>Dimensiones</h3>
          {member.scores.map((score) => (
            <ScoreBar key={score.label} {...score} />
          ))}
        </section>

        <section className="profile-section">
          <h3>Patrones</h3>
          {member.patterns.map((pattern) => (
            <div key={pattern} className="pattern-row">
              <span className="pattern-row__dot" style={{ background: member.color }} />
              <span>{pattern}</span>
            </div>
          ))}
        </section>

        <section className="profile-section">
          <h3>Citas destacadas</h3>
          {member.quotes.map((quote) => (
            <figure
              key={`${quote.text}-${quote.ctx}`}
              className={`quote-card${isJavier && !softMode ? ' warning' : ''}`}
            >
              <blockquote>{quote.text}</blockquote>
              <figcaption>{quote.ctx}</figcaption>
            </figure>
          ))}
        </section>

        <EvidenceSection member={member} onSelectFragment={onSelectFragment} />

        <section className="profile-section">
          <h3>Relaciones</h3>
          {member.relations.map((relation) => (
            <div key={`${relation.who}-${relation.type}`} className="relation-row">
              <div className="relation-row__who" style={{ color: member.color }}>
                {relation.who}
              </div>
              <div>
                <div className="relation-row__type">{relation.type}</div>
                <div className="relation-row__desc">{relation.desc}</div>
              </div>
            </div>
          ))}
        </section>

        <section className="profile-section">
          <h3>Evolución en el chat</h3>
          <p className="arc-text">{member.arc}</p>
        </section>
      </div>
    </aside>
  )
}

const NetworkView = ({ onSelect, selectedId, tweaks }) => {
  const [hoveredEdge, setHoveredEdge] = useState(null)
  const [hoveredNode, setHoveredNode] = useState(null)

  const handleNodeKeyDown = useCallback(
    (event, member) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onSelect(member)
      }
    },
    [onSelect],
  )

  return (
    <div className="network-view">
      <svg viewBox="0 0 1200 800" className="network-svg" role="img" aria-label="Mapa de relaciones del grupo">
        <g aria-label="Relaciones">
          {EDGES.map((edge, index) => {
            const from = NODE_POS[edge.from]
            const to = NODE_POS[edge.to]
            if (!from || !to) return null

            const style = EDGE_STYLE[edge.type]
            const isHovered = hoveredEdge === index

            return (
              <g key={`${edge.from}-${edge.to}`}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={style.stroke}
                  strokeWidth={isHovered ? style.w + 2 : style.w}
                  strokeDasharray={style.dash || undefined}
                  opacity={isHovered ? 1 : style.op}
                  className="network-edge"
                  onMouseEnter={() => setHoveredEdge(index)}
                  onMouseLeave={() => setHoveredEdge(null)}
                />
                {isHovered && (
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2 - 10}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.85)"
                    fontSize="11"
                    fontFamily="DM Sans, sans-serif"
                    className="network-edge__label"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            )
          })}
        </g>

        <g aria-label="Miembros">
          {MEMBERS.map((member) => {
            const pos = NODE_POS[member.id]
            if (!pos) return null

            const isSelected = selectedId === member.id
            const isHovered = hoveredNode === member.id
            const radius = isSelected ? 44 : isHovered ? 41 : 36
            const isJavier = member.warning && tweaks.showAlerts
            const roleDisplay = member.warning
              ? tweaks.softMode
                ? member.roleSoft || member.roleShort
                : member.roleShort
              : member.roleShort

            return (
              <g
                key={member.id}
                className="network-node"
                tabIndex="0"
                role="button"
                aria-label={`Ver perfil de ${member.name}`}
                transform={`translate(${pos.x},${pos.y})`}
                onClick={() => onSelect(member)}
                onKeyDown={(event) => handleNodeKeyDown(event, member)}
                onMouseEnter={() => setHoveredNode(member.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {isJavier && (
                  <circle r={radius + 10} fill="rgba(220,60,40,0.08)" className="warning-pulse" />
                )}
                {isSelected && (
                  <circle r={radius + 7} fill="none" stroke={member.color} strokeWidth="2.5" opacity="0.5" />
                )}
                <circle r={radius} fill={member.color} className="network-node__circle" />
                <text textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="13" fontWeight="700">
                  {member.initials}
                </text>
                <text textAnchor="middle" y={radius + 17} fill="rgba(255,255,255,0.75)" fontSize="12">
                  {member.shortName || member.name.split(' ')[0]}
                </text>
                {isJavier && !tweaks.softMode && (
                  <text textAnchor="middle" y={radius + 31} fill="oklch(62% 0.22 25)" fontSize="10" fontWeight="700">
                    ⚠ Manzana Podrida
                  </text>
                )}
                {(isHovered || isSelected) && (
                  <text
                    textAnchor="middle"
                    y={radius + 31 + (isJavier && !tweaks.softMode ? 14 : 0)}
                    fill={member.color}
                    fontSize="10"
                    opacity="0.8"
                  >
                    {roleDisplay}
                  </text>
                )}
              </g>
            )
          })}
        </g>
      </svg>

      <div className="network-legend">
        <div className="network-legend__title">Tipos de relación</div>
        {[
          { stroke: EDGE_STYLE.ally.stroke, label: 'Alianza', dash: false },
          { stroke: EDGE_STYLE.tension.stroke, label: 'Tensión / Conflicto', dash: false },
          { stroke: EDGE_STYLE['high-tension'].stroke, label: 'Conflicto máximo', dash: false },
          { stroke: EDGE_STYLE.comic.stroke, label: 'Tensión cómica', dash: true },
          { stroke: EDGE_STYLE.ambiguous.stroke, label: 'Relación ambigua', dash: true },
          { stroke: 'rgba(255,255,255,0.25)', label: 'Neutral', dash: false },
        ].map((item) => (
          <div key={item.label} className="network-legend__row">
            <svg width="24" height="4" aria-hidden="true">
              <line
                x1="0"
                y1="2"
                x2="24"
                y2="2"
                stroke={item.stroke}
                strokeWidth="2"
                strokeDasharray={item.dash ? '5,3' : undefined}
              />
            </svg>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const TimelineView = ({ onSelectFragment }) => {
  const topics = useMemo(
    () => ['Todos', ...new Set(TIMELINE_EVENTS.map((event) => event.topic))],
    [],
  )
  const [activeTopic, setActiveTopic] = useState('Todos')

  const visibleEvents = useMemo(() => {
    if (activeTopic === 'Todos') return TIMELINE_EVENTS
    return TIMELINE_EVENTS.filter((event) => event.topic === activeTopic)
  }, [activeTopic])
  const analytics = useMemo(() => deriveTimelineAnalytics(visibleEvents), [visibleEvents])

  return (
    <section className="timeline-section" aria-label="Timeline de eventos">
      <div className="section-intro">
        <div>
          <h2>Timeline</h2>
          <p>
            Los hitos que más alteraron la dinámica del grupo, desde arbitraje y expulsiones hasta
            fantasy y nuevas incorporaciones.
          </p>
        </div>
        <div className="filter-pills" aria-label="Filtros por tema">
          {topics.map((topic) => (
            <button
              key={topic}
              type="button"
              className={`filter-pill${activeTopic === topic ? ' active' : ''}`}
              style={{
                '--pill-accent':
                  topic === 'Todos' ? 'rgba(255,255,255,0.12)' : TOPIC_ACCENTS[topic] ?? '#f0ede8',
              }}
              onClick={() => setActiveTopic(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <TimelineInsights analytics={analytics} onSelectFragment={onSelectFragment} />
      <InfluenceBoard analytics={analytics} />
      <RoleDriftSection analytics={analytics} />
      <TopicDynamicsSection analytics={analytics} />

      <div className="timeline-list">
        {visibleEvents.map((event) => (
          <TimelineEventCard key={event.id} event={event} onSelectFragment={onSelectFragment} />
        ))}
      </div>
    </section>
  )
}

const CompareColumn = ({ member, onSelectFragment, analytics }) => {
  const evidenceItems = getEvidenceItems(member).slice(0, 2)

  return (
    <article className="compare-card">
      <header className="compare-card__header">
        <div className="avatar avatar--large" style={{ background: member.color }}>
          {member.initials}
        </div>
        <div>
          <h3>{member.name}</h3>
          <div className="compare-card__role" style={{ color: member.color }}>
            {member.role}
          </div>
          <div className="compare-card__subline">
            {member.nickname} · {member.team}
          </div>
        </div>
      </header>

      <section className="compare-card__section">
        <h4>Dimensiones</h4>
        {member.scores.map((score) => (
          <ScoreBar key={score.label} {...score} />
        ))}
      </section>

      <section className="compare-card__section">
        <h4>Patrones</h4>
        {member.patterns.slice(0, 3).map((pattern) => (
          <div key={pattern} className="pattern-row">
            <span className="pattern-row__dot" style={{ background: member.color }} />
            <span>{pattern}</span>
          </div>
        ))}
      </section>

      <section className="compare-card__section">
        <h4>Evidencia</h4>
        {evidenceItems.map((item) => {
          const evidenceFragments = buildEvidenceFragments(member, item)

          return (
            <div key={item.id} className="compare-evidence">
              <div className="compare-evidence__meta">
                <span>{item.topic}</span>
                <span>{item.context}</span>
              </div>
              <p>{item.summary}</p>
              <ChatFragments
                excerpts={evidenceFragments}
                label="Fragmentos citados"
                onSelectFragment={onSelectFragment}
              />
            </div>
          )
        })}
      </section>

      <section className="compare-card__section">
        <h4>Evolución</h4>
        <p className="arc-text">{member.arc}</p>
      </section>

      <CompareRoleDrift member={member} analytics={analytics} />
    </article>
  )
}

const CompareView = ({
  leftMember,
  rightMember,
  leftId,
  rightId,
  onChangeLeft,
  onChangeRight,
  onSelectFragment,
  analytics,
}) => (
  <section className="compare-section" aria-label="Comparador de miembros">
    <div className="section-intro">
      <div>
        <h2>Comparar miembros</h2>
        <p>
          Contrasta perfiles, dimensiones, evidencia y evolución sin salir del dashboard.
        </p>
      </div>
    </div>

    <div className="compare-controls">
      <label className="compare-control">
        <span>Miembro A</span>
        <select value={leftId} onChange={(event) => onChangeLeft(event.target.value)}>
          {MEMBERS.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </label>
      <label className="compare-control">
        <span>Miembro B</span>
        <select value={rightId} onChange={(event) => onChangeRight(event.target.value)}>
          {MEMBERS.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </label>
    </div>

    <div className="compare-layout">
      <CompareColumn member={leftMember} onSelectFragment={onSelectFragment} analytics={analytics} />
      <CompareColumn member={rightMember} onSelectFragment={onSelectFragment} analytics={analytics} />
    </div>
  </section>
)

const AwardsView = () => (
  <section className="awards-section" aria-label="Premios del grupo">
    <div className="section-intro">
      <div>
        <h2>Premios</h2>
        <p>
          Una lectura mas ligera del grupo: reconocimientos por personalidad, estilo y rol dentro
          del ecosistema del chat.
        </p>
      </div>
    </div>

    <section className="awards-block" aria-label="Ranking de toxicidad">
      <div className="awards-block__header">
        <h3>Ranking de "el mas toxico"</h3>
        <p>Lectura editorial del dashboard: Javier primero, Gabriel segundo y Francisco tercero.</p>
      </div>

      <div className="toxicity-podium">
        {TOXICITY_RANKING.map((entry, index) => {
          const member = MEMBERS.find((item) => item.id === entry.id)
          if (!member) return null

          return (
            <article
              key={entry.id}
              className={`toxicity-card toxicity-card--rank-${index + 1}`}
              style={{ '--award-accent': member.color }}
            >
              <div className="toxicity-card__rank">#{index + 1}</div>
              <div className="toxicity-card__header">
                <div className="avatar avatar--large" style={{ background: member.color }}>
                  {member.initials}
                </div>
                <div>
                  <h3>{member.name}</h3>
                  <div className="toxicity-card__title">{entry.title}</div>
                </div>
              </div>
              <p>{entry.note}</p>
            </article>
          )
        })}
      </div>
    </section>

    <section className="awards-block" aria-label="Premios por personalidad">
      <div className="awards-block__header">
        <h3>Premios por personalidad</h3>
        <p>Un premio por miembro, conectado con la funcion que cumple dentro de la dinamica del grupo.</p>
      </div>

      <div className="awards-grid">
        {MEMBERS.map((member) => {
          const award = MEMBER_AWARDS[member.id]
          if (!award) return null

          return (
            <article
              key={member.id}
              className="award-card"
              style={{ '--award-accent': member.color }}
            >
              <div className="award-card__header">
                <div className="avatar" style={{ background: member.color }}>
                  {member.initials}
                </div>
                <div>
                  <h3>{member.name}</h3>
                  <div className="award-card__title">{award.title}</div>
                </div>
              </div>
              <p>{award.blurb}</p>
            </article>
          )
        })}
      </div>
    </section>
  </section>
)

const TweakPanel = ({ tweaks, setTweaks, visible }) => {
  const updateTweaks = (key) => {
    const next = { ...tweaks, [key]: !tweaks[key] }
    setTweaks(next)
    window.parent?.postMessage({ type: '__edit_mode_set_keys', edits: next }, '*')
  }

  return (
    <div className={`tweak-panel${visible ? ' visible' : ''}`} aria-hidden={!visible}>
      <div className="tweak-label">Tweaks</div>
      {[
        { key: 'showAlerts', label: 'Mostrar alertas ⚠' },
        { key: 'softMode', label: 'Modo grupo (lenguaje suave)' },
        { key: 'showTeams', label: 'Mostrar equipos' },
      ].map(({ key, label }) => (
        <div key={key} className="tweak-row">
          <span>{label}</span>
          <button
            type="button"
            className={`tweak-toggle${tweaks[key] ? ' on' : ''}`}
            aria-label={label}
            aria-pressed={tweaks[key]}
            onClick={() => updateTweaks(key)}
          />
        </div>
      ))}
    </div>
  )
}

const readStoredTab = () => {
  try {
    const value = Number.parseInt(localStorage.getItem('dash-tab') || '0', 10)
    return [0, 1, 2, 3, 4].includes(value) ? value : 0
  } catch {
    return 0
  }
}

const App = () => {
  const [tab, setTab] = useState(readStoredTab)
  const [selected, setSelected] = useState(null)
  const [selectedFragment, setSelectedFragment] = useState(null)
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS)
  const [tweakVisible, setTweakVisible] = useState(false)
  const [compareLeftId, setCompareLeftId] = useState('francisco')
  const [compareRightId, setCompareRightId] = useState('javier')

  useEffect(() => {
    localStorage.setItem('dash-tab', String(tab))
  }, [tab])

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === '__activate_edit_mode') setTweakVisible(true)
      if (event.data?.type === '__deactivate_edit_mode') setTweakVisible(false)
    }

    window.addEventListener('message', handleMessage)
    window.parent?.postMessage({ type: '__edit_mode_available' }, '*')

    return () => window.removeEventListener('message', handleMessage)
  }, [])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return
      if (selectedFragment) {
        setSelectedFragment(null)
        return
      }
      setSelected(null)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedFragment])

  const handleSelect = useCallback((member) => {
    setSelected((previous) => (previous?.id === member.id ? null : member))
  }, [])

  const handleTabChange = (index) => {
    if (index > 1) setSelected(null)
    setTab(index)
  }

  const compareLeftMember = MEMBERS.find((member) => member.id === compareLeftId) ?? MEMBERS[0]
  const compareRightMember =
    MEMBERS.find((member) => member.id === compareRightId) ?? MEMBERS[1] ?? MEMBERS[0]
  const allExplorerFragments = useMemo(
    () => [
      ...TIMELINE_EVENTS.flatMap((event) => buildEventFragments(event)),
      ...MEMBERS.flatMap((member) =>
        getEvidenceItems(member).flatMap((item) => buildEvidenceFragments(member, item)),
      ),
    ],
    [],
  )
  const globalAnalytics = useMemo(() => deriveTimelineAnalytics(TIMELINE_EVENTS), [])

  const tabs = ['Perfiles', 'Relaciones', 'Timeline', 'Comparar', 'Premios']

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div className="dashboard-heading">
          <h1>Análisis del Grupo</h1>
          <p>Abr 2025 – Feb 2026 · {MEMBERS.length} miembros analizados</p>
        </div>

        <div className="dashboard-stats" aria-label="Resumen">
          {[
            { label: 'Mensajes analizados', val: '~12,500' },
            { label: 'Días de chat', val: '~300' },
            { label: 'Elemento disruptivo', val: '1 ⚠', color: 'oklch(62% 0.22 25)' },
          ].map((stat) => (
            <div key={stat.label} className="stat">
              <div className="stat__value" style={{ color: stat.color || '#f0ede8' }}>
                {stat.val}
              </div>
              <div className="stat__label">{stat.label}</div>
            </div>
          ))}
        </div>

        <nav className="tabs" aria-label="Vistas">
          {tabs.map((label, index) => (
            <button
              key={label}
              type="button"
              className={`tab-btn${tab === index ? ' active' : ''}`}
              onClick={() => handleTabChange(index)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main
        className={`dashboard-content${selected ? ' has-panel' : ''}`}
        style={{ '--panel-offset': selected ? '500px' : '0px' }}
      >
        {tab === 0 ? (
          <section className="card-grid" aria-label="Perfiles del grupo">
            {MEMBERS.map((member, index) => (
              <MemberCard
                key={member.id}
                member={member}
                selected={selected?.id === member.id}
                tweaks={tweaks}
                onSelect={handleSelect}
                delay={index}
              />
            ))}
          </section>
        ) : tab === 1 ? (
          <section className="network-section" aria-label="Relaciones del grupo">
            <p>Haz clic en un nodo para ver el perfil · Pasa el cursor sobre las líneas para ver el tipo de relación</p>
            <NetworkView onSelect={handleSelect} selectedId={selected?.id} tweaks={tweaks} />
          </section>
        ) : tab === 2 ? (
          <TimelineView onSelectFragment={setSelectedFragment} />
        ) : tab === 3 ? (
          <CompareView
            leftMember={compareLeftMember}
            rightMember={compareRightMember}
            leftId={compareLeftId}
            rightId={compareRightId}
            onChangeLeft={setCompareLeftId}
            onChangeRight={setCompareRightId}
            onSelectFragment={setSelectedFragment}
            analytics={globalAnalytics}
          />
        ) : (
          <AwardsView />
        )}
      </main>

      {selected && tab < 2 && (
        <ProfilePanel
          member={selected}
          tweaks={tweaks}
          onClose={() => setSelected(null)}
          onSelectFragment={setSelectedFragment}
        />
      )}
      <EvidenceExplorer
        fragment={selectedFragment}
        allFragments={allExplorerFragments}
        onClose={() => setSelectedFragment(null)}
      />
      <TweakPanel tweaks={tweaks} setTweaks={setTweaks} visible={tweakVisible} />
    </div>
  )
}

export default App
