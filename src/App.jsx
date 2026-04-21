import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  EDGE_STYLE,
  EDGES,
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
  member.quotes.map((quote, index) => ({
    id: `${member.id}-evidence-${index}`,
    title: member.patterns[index] || `Evidencia ${index + 1}`,
    topic: deriveEvidenceTopic(quote.ctx),
    context: quote.ctx,
    summary:
      member.patterns[index] ||
      'La cita ilustra un comportamiento consistente dentro del período analizado.',
    excerpt: quote.text,
  }))

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

const EvidenceSection = ({ member }) => {
  const evidenceItems = getEvidenceItems(member)

  return (
    <section className="profile-section">
      <h3>Evidencia</h3>
      <div className="evidence-list">
        {evidenceItems.map((item) => (
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
              <blockquote>{item.excerpt}</blockquote>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}

const ProfilePanel = ({ member, tweaks, onClose }) => {
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

        <EvidenceSection member={member} />

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

const TimelineView = () => {
  const topics = useMemo(
    () => ['Todos', ...new Set(TIMELINE_EVENTS.map((event) => event.topic))],
    [],
  )
  const [activeTopic, setActiveTopic] = useState('Todos')

  const visibleEvents = useMemo(() => {
    if (activeTopic === 'Todos') return TIMELINE_EVENTS
    return TIMELINE_EVENTS.filter((event) => event.topic === activeTopic)
  }, [activeTopic])

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
              onClick={() => setActiveTopic(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div className="timeline-list">
        {visibleEvents.map((event) => (
          <article key={event.id} className="timeline-card">
            <div className="timeline-card__rail" aria-hidden="true" />
            <div className="timeline-card__content">
              <div className="timeline-card__meta">
                <span>{event.date}</span>
                <span>{event.topic}</span>
              </div>
              <h3>{event.title}</h3>
              <p>{event.summary}</p>
              <div className="timeline-card__participants">
                {event.participants.map((participant) => (
                  <span key={`${event.id}-${participant}`}>{participant}</span>
                ))}
              </div>
              <div className="timeline-card__quote">“{event.quote}”</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

const CompareColumn = ({ member }) => {
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
        {evidenceItems.map((item) => (
          <div key={item.id} className="compare-evidence">
            <div className="compare-evidence__meta">
              <span>{item.topic}</span>
              <span>{item.context}</span>
            </div>
            <p>{item.summary}</p>
            <blockquote>{item.excerpt}</blockquote>
          </div>
        ))}
      </section>

      <section className="compare-card__section">
        <h4>Evolución</h4>
        <p className="arc-text">{member.arc}</p>
      </section>
    </article>
  )
}

const CompareView = ({ leftMember, rightMember, leftId, rightId, onChangeLeft, onChangeRight }) => (
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
      <CompareColumn member={leftMember} />
      <CompareColumn member={rightMember} />
    </div>
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
    return [0, 1, 2, 3].includes(value) ? value : 0
  } catch {
    return 0
  }
}

const App = () => {
  const [tab, setTab] = useState(readStoredTab)
  const [selected, setSelected] = useState(null)
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
      if (event.key === 'Escape') setSelected(null)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

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

  const tabs = ['Perfiles', 'Relaciones', 'Timeline', 'Comparar']

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
          <TimelineView />
        ) : (
          <CompareView
            leftMember={compareLeftMember}
            rightMember={compareRightMember}
            leftId={compareLeftId}
            rightId={compareRightId}
            onChangeLeft={setCompareLeftId}
            onChangeRight={setCompareRightId}
          />
        )}
      </main>

      {selected && tab < 2 && (
        <ProfilePanel member={selected} tweaks={tweaks} onClose={() => setSelected(null)} />
      )}
      <TweakPanel tweaks={tweaks} setTweaks={setTweaks} visible={tweakVisible} />
    </div>
  )
}

export default App
