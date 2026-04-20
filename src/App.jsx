import { useCallback, useEffect, useState } from 'react'
import { EDGE_STYLE, EDGES, MEMBERS, NODE_POS, TWEAK_DEFAULTS } from './data.js'

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
      <svg viewBox="0 0 1000 680" className="network-svg" role="img" aria-label="Mapa de relaciones del grupo">
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
                  {member.name.split(' ')[0]}
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
    return value === 1 ? 1 : 0
  } catch {
    return 0
  }
}

const App = () => {
  const [tab, setTab] = useState(readStoredTab)
  const [selected, setSelected] = useState(null)
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS)
  const [tweakVisible, setTweakVisible] = useState(false)

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

  const tabs = ['Perfiles', 'Relaciones']

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
              onClick={() => setTab(index)}
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
        ) : (
          <section className="network-section" aria-label="Relaciones del grupo">
            <p>Haz clic en un nodo para ver el perfil · Pasa el cursor sobre las líneas para ver el tipo de relación</p>
            <NetworkView onSelect={handleSelect} selectedId={selected?.id} tweaks={tweaks} />
          </section>
        )}
      </main>

      {selected && <ProfilePanel member={selected} tweaks={tweaks} onClose={() => setSelected(null)} />}
      <TweakPanel tweaks={tweaks} setTweaks={setTweaks} visible={tweakVisible} />
    </div>
  )
}

export default App
