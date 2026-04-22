import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')
const defaultInput = '/Users/Francisco/Downloads/_chat.txt'
const outputFile = path.join(repoRoot, 'public', 'comment-highlights.json')
const urlPattern = /https?:\/\/\S+|www\.\S+/g

const memberMap = new Map([
  ['gabriel gutierrez', 'gabriel'],
  ['gabriel gutierrez', 'gabriel'],
  ['francisco arteaga', 'francisco'],
  ['gustavo torres', 'gustavo'],
  ['jesus burgos', 'jesus'],
  ['jesús burgos', 'jesus'],
  ['javier gimenez', 'javier'],
  ['javier gimenez', 'javier'],
  ['luis torrado', 'luis'],
  ['luís torrado', 'luis'],
  ['andres eduardo pinto', 'andres'],
  ['andrés eduardo pinto', 'andres'],
  ['gerardo vitale errico', 'gerardo'],
  ['karin "pie roto"', 'espana34'],
  ['34 698 68 36 15', 'espana34'],
  ['34 698 68 36 15 ', 'espana34'],
  ['jorge anzola', 'jorge'],
  ['aaron rodrigues', 'aaron'],
  ['sistema', 'system'],
])

const memberDisplay = {
  gabriel: 'Gabriel Gutiérrez',
  francisco: 'Francisco Arteaga',
  gustavo: 'Gustavo Torres',
  jesus: 'Jesús Burgos',
  javier: 'Javier Gimenez',
  luis: 'Luís Torrado',
  andres: 'Andrés Eduardo Pinto',
  gerardo: 'Gerardo Vitale Errico',
  espana34: 'Karin "Pie Roto"',
  jorge: 'Jorge Anzola',
  aaron: 'Aaron Rodrigues',
}

const CATEGORY_DEFS = [
  {
    id: 'toxic',
    title: 'El comentario más tóxico',
    shortLabel: 'Tóxico',
    icon: '☣️',
    accent: 'oklch(62% 0.22 25)',
    description: 'Roce directo, hostilidad y frases diseñadas para subir la temperatura del grupo.',
    patterns: [
      { label: 'pura paja', regex: /\bpura paja\b/g, weight: 8 },
      { label: 'hablas por fastidiar', regex: /hablas? por fastidiar/g, weight: 8 },
      { label: 'llore de nuevo', regex: /llore de nuevo/g, weight: 8 },
      { label: 'suelta el papo', regex: /suelta el papo/g, weight: 7 },
      { label: 'deja de pelear', regex: /quieras pelear todo el tiempo/g, weight: 6 },
      { label: 'no me jodas', regex: /no me jodas/g, weight: 5 },
      { label: 'mierda', regex: /\bmierda\b/g, weight: 3 },
      { label: 'maldito', regex: /\bmaldit[ao]\b/g, weight: 4 },
      { label: 'ridículo', regex: /\bridicul/g, weight: 4 },
      { label: 'llorón', regex: /\bllor[oó]n|\blloran\b|\blloras\b/g, weight: 4 },
      { label: 'coño', regex: /\bcoño\b|\bcono\b/g, weight: 2 },
      { label: 'joder', regex: /\bjod[a-z]*\b/g, weight: 2 },
      { label: 'fastidiar', regex: /\bfastidi[a-z]*\b/g, weight: 3 },
      { label: 'tóxico', regex: /\btoxic[a-z]*\b/g, weight: 2 },
      { label: 'peo', regex: /\bpeo\b/g, weight: 2 },
      { label: 'mamawebos', regex: /\bmamaweb[a-z]*\b/g, weight: 6 },
      { label: 'hijo de puta', regex: /hijo de puta/g, weight: 7 },
      { label: 'no puedes defender esa mierda', regex: /no puedes defender esa mierda/g, weight: 7 },
      { label: 've a besar tu afiche', regex: /ve a besar tu afiche/g, weight: 6 },
    ],
    bonuses: [
      {
        label: 'ataque directo',
        test: (normalized) => /\b(tu|tú|eres|usted|ustedes)\b/.test(normalized) && /(paja|llor|fastidi|jod|mierda|ridicul)/.test(normalized),
        weight: 4,
      },
    ],
  },
  {
    id: 'racist',
    title: 'El comentario más racista',
    shortLabel: 'Racista',
    icon: '🚫',
    accent: 'oklch(66% 0.18 18)',
    description: 'Lectura de frases con sesgo racial explícito o con minimización directa de insultos racistas.',
    patterns: [
      { label: 'decirle mono', regex: /decirl[eé]\s+mono/g, weight: 11 },
      { label: 'comportarse como mono', regex: /comportarse como mono/g, weight: 12 },
      { label: 'connotación racista', regex: /connotaci[oó]n racista/g, weight: 11 },
      { label: 'menos grave discriminar', regex: /menos grave discriminar/g, weight: 12 },
      { label: 'origen étnico', regex: /origen etnic/g, weight: 8 },
      { label: 'no creo en las razas', regex: /no creo en las razas/g, weight: 10 },
      { label: 'los negros', regex: /\blos negros\b/g, weight: 10 },
      { label: 'sudaco', regex: /\bsudaco\b/g, weight: 10 },
      { label: 'negrito', regex: /\bnegrit[oa]s?\b/g, weight: 7 },
      { label: 'mono', regex: /\bmono\b/g, weight: 5 },
      { label: 'negritos', regex: /\bnegrit[oa]s?\b/g, weight: 6 },
    ],
    bonuses: [
      {
        label: 'minimización',
        test: (normalized) => /racista/.test(normalized) && /(no|menos|capaz|a lo mejor|supuest)/.test(normalized),
        weight: 5,
      },
    ],
    vetoes: [
      /odio|hate a vinicius es de estudio/g,
      /no puedes decir esas vainas/g,
      /insulto racista .* probalo/g,
      /conden/g,
      /hate speech/g,
      /castigar conductas racistas/g,
      /acabar con el racismo/g,
      /luchar contra ello/g,
      /le dice algo racista/g,
    ],
  },
  {
    id: 'calming',
    title: 'El comentario más tranquilizador',
    shortLabel: 'Tranquilizador',
    icon: '🫶',
    accent: 'oklch(70% 0.16 145)',
    description: 'Mensajes que corrigen, enfrían o hacen retroceder la escalada dentro del chat.',
    patterns: [
      { label: 'retiro ese comentario', regex: /retiro ese comentario/g, weight: 12 },
      { label: 'perdón', regex: /\bperd[oó]n\b/g, weight: 5 },
      { label: 'disculpa', regex: /\bdisculp[a-z]*\b/g, weight: 5 },
      { label: 'tranquilo', regex: /\btranquil[oa]s?\b/g, weight: 5 },
      { label: 'calma', regex: /\bcalm[a-z]*\b/g, weight: 4 },
      { label: 'no pasa nada', regex: /no pasa nada/g, weight: 9 },
      { label: 'relájense', regex: /rel[aá]jense/g, weight: 9 },
      { label: 'puro amor', regex: /puro amor/g, weight: 10 },
      { label: 'se respetan las opiniones diferentes', regex: /se respetan las opiniones diferentes/g, weight: 10 },
      { label: 'confundes las cosas', regex: /confundes las cosas/g, weight: 11 },
      { label: 'es diferente', regex: /\bes diferente\b/g, weight: 4 },
      { label: 'trato de no opinar', regex: /trato de no opinar/g, weight: 6 },
      { label: 'lo acepto', regex: /te lo acepto/g, weight: 6 },
      { label: 'con calma', regex: /con calma/g, weight: 5 },
    ],
    penalties: [
      { regex: /\bllor[a-z]*\b/g, weight: 5 },
      { regex: /\bpaja\b/g, weight: 5 },
      { regex: /\btrolear|joder|jodiendo\b/g, weight: 5 },
    ],
  },
  {
    id: 'troll',
    title: 'El comentario más troll',
    shortLabel: 'Troll',
    icon: '🎭',
    accent: 'oklch(72% 0.18 60)',
    description: 'Sarcasmo, carnada y frases hechas para pinchar al otro sin declararlo frontalmente.',
    patterns: [
      { label: 'ah ok', regex: /\bah ok\b/g, weight: 8 },
      { label: 'por joder', regex: /por joder/g, weight: 8 },
      { label: 'solo estaba jodiendo', regex: /solo estaba jodiendo/g, weight: 9 },
      { label: 'fue más por joder', regex: /fue m[aá]s por joder/g, weight: 9 },
      { label: 'para joder', regex: /para joder/g, weight: 7 },
      { label: 'jodiendo', regex: /jodiendo/g, weight: 5 },
      { label: 'meme', regex: /\bmeme\b/g, weight: 7 },
      { label: 'trolear', regex: /\btrolear|troll\b/g, weight: 6 },
      { label: 'muy justo', regex: /muy justo/g, weight: 11 },
      { label: 've a besar tu afiche', regex: /ve a besar tu afiche/g, weight: 7 },
      { label: 'si te pedí fuente', regex: /si te pedi fuente|si te ped[ií] fuente/g, weight: 6 },
      { label: 'emoji de burla', regex: /🤣|😂/g, weight: 2 },
      { label: 'jajaja', regex: /jaja[a-z]*/g, weight: 1 },
    ],
    bonuses: [
      {
        label: 'sarcasmo con pregunta',
        test: (normalized) => normalized.includes('?') && /(ah ok|seguro|claro|jaj)/.test(normalized),
        weight: 4,
      },
    ],
  },
]

const normalizeText = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\u202f|\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const stripUrls = (text) => text.replace(urlPattern, ' ').replace(/\s+/g, ' ').trim()

const parseTimestamp = (value) => {
  const match = value
    .replace(/\u202f/g, ' ')
    .replace(/\u00a0/g, ' ')
    .match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}), (\d{1,2}):(\d{2}):(\d{2}) ?([AP]M)$/i)

  if (!match) return null

  const [, month, day, year, hourRaw, minute, second, meridiem] = match
  let hour = Number(hourRaw)
  if (meridiem.toUpperCase() === 'PM' && hour !== 12) hour += 12
  if (meridiem.toUpperCase() === 'AM' && hour === 12) hour = 0

  return new Date(
    Date.UTC(Number(`20${year}`), Number(month) - 1, Number(day), hour, Number(minute), Number(second)),
  )
}

const parseMessages = (contents) => {
  const lines = contents.split(/\r?\n/)
  const pattern = /^\[(.*?)\] ([^:]+): ?(.*)$/
  const messages = []
  let current = null

  for (const rawLine of lines) {
    const line = rawLine.replace(/^[\ufeff\u200e]/, '')
    const match = line.match(pattern)

    if (match) {
      if (current) messages.push(current)
      const author = match[2]
      const normalizedAuthor = normalizeText(author).replace(/[^\w+ ]+/g, ' ').replace(/\s+/g, ' ').trim()
      current = {
        rawAt: match[1],
        timestamp: parseTimestamp(match[1]),
        author,
        memberId: memberMap.get(normalizedAuthor) ?? (normalizedAuthor.includes('34 698 68 36 15') ? 'espana34' : null),
        text: match[3],
      }
      continue
    }

    if (current) current.text += `\n${line}`
  }

  if (current) messages.push(current)
  return messages
}

const isNearInTime = (left, right, maxMinutes = 90) => {
  if (!left?.timestamp || !right?.timestamp) return true
  return Math.abs(right.timestamp.getTime() - left.timestamp.getTime()) <= maxMinutes * 60 * 1000
}

const createContextWindow = (messages, index) => {
  const self = messages[index]
  const previous = []
  const next = []

  for (let cursor = index - 1; cursor >= 0 && previous.length < 2; cursor -= 1) {
    if (!isNearInTime(self, messages[cursor])) break
    previous.unshift(messages[cursor])
  }

  for (let cursor = index + 1; cursor < messages.length && next.length < 4; cursor += 1) {
    if (!isNearInTime(self, messages[cursor])) break
    next.push(messages[cursor])
  }

  return [...previous, self, ...next].map((entry, offset) => ({
    id: `ctx-${index}-${offset}`,
    at: entry.rawAt,
    author: memberDisplay[entry.memberId] ?? entry.author,
    memberId: entry.memberId,
    text: stripUrls(entry.text).trim(),
    kind: entry === self ? 'self' : previous.includes(entry) ? 'before' : 'after',
  }))
}

const countPattern = (normalized, pattern) => {
  const matches = normalized.match(pattern.regex)
  if (!matches) return null

  return {
    label: pattern.label,
    count: matches.length,
    score: matches.length * pattern.weight,
  }
}

const buildRationale = (entry) => {
  const labels = entry.matches
    .slice(0, 3)
    .map((item) => item.label)
    .filter(Boolean)

  if (labels.length === 0) return 'La frase concentra la señal mas clara de esta categoria para este miembro.'
  return `Activa la lectura por ${labels.join(', ')}.`
}

const scoreMessageForCategory = (message, category) => {
  const cleaned = stripUrls(message.text)
  const normalized = normalizeText(cleaned)
  const laughterStripped = normalized.replace(/jaja[a-z]*|🤣|😂|😆|😛|🙂|🥰/g, ' ').replace(/\s+/g, ' ').trim()

  if (!normalized) return null
  if (normalized.includes('sticker omitted') || normalized.includes('image omitted') || normalized.includes('video omitted')) return null
  if (normalized.length < 10) return null

  if (category.vetoes?.some((pattern) => pattern.test(normalized))) return null

  const matches = category.patterns
    .map((pattern) => countPattern(normalized, pattern))
    .filter(Boolean)

  let score = matches.reduce((total, item) => total + item.score, 0)

  category.bonuses?.forEach((bonus) => {
    if (bonus.test(normalized)) {
      matches.push({ label: bonus.label, count: 1, score: bonus.weight })
      score += bonus.weight
    }
  })

  category.penalties?.forEach((penalty) => {
    const hits = normalized.match(penalty.regex)?.length ?? 0
    score -= hits * penalty.weight
  })

  if (category.id === 'troll' && score > 0 && laughterStripped.length < 12) {
    score -= 4
  }

  if (category.id === 'calming' && /(llor|joder|trolear|paja)/.test(normalized)) score -= 4
  if (category.id === 'racist' && !/(mono|racista|negr|sudaco|razas|origen etnic)/.test(normalized)) score = 0
  if (category.id === 'racist' && /(hate speech|castigar conductas racistas|acabar con el racismo|luchar contra ello)/.test(normalized)) score = 0
  if (category.id === 'troll' && laughterStripped.length < 8) score = 0

  if (score <= 0) return null

  const intensity = score >= 14 ? 'Alta' : score >= 8 ? 'Media' : 'Baja'

  return {
    text: cleaned,
    score,
    intensity,
    matches: matches.sort((left, right) => right.score - left.score),
  }
}

const main = async () => {
  const inputFile = process.argv[2] || defaultInput
  const source = await fs.readFile(inputFile, 'utf8')
  const messages = parseMessages(source)
  const byCategory = new Map(CATEGORY_DEFS.map((category) => [category.id, []]))

  messages.forEach((message, index) => {
    if (!message.memberId || message.memberId === 'system') return

    CATEGORY_DEFS.forEach((category) => {
      const scored = scoreMessageForCategory(message, category)
      if (!scored) return

      byCategory.get(category.id).push({
        id: `${category.id}-${message.memberId}-${index}`,
        memberId: message.memberId,
        memberName: memberDisplay[message.memberId] ?? message.author,
        author: memberDisplay[message.memberId] ?? message.author,
        at: message.rawAt,
        timestamp: message.timestamp?.toISOString() ?? null,
        score: scored.score,
        intensity: scored.intensity,
        text: scored.text,
        matches: scored.matches,
        rationale: buildRationale(scored),
        contextWindow: createContextWindow(messages, index),
      })
    })
  })

  const categories = CATEGORY_DEFS.map((category) => {
    const bestPerMember = [...(byCategory.get(category.id) ?? [])]
      .sort((left, right) => {
        if (right.score !== left.score) return right.score - left.score
        return (right.text?.length ?? 0) - (left.text?.length ?? 0)
      })
      .reduce((accumulator, entry) => {
        if (!accumulator.some((item) => item.memberId === entry.memberId)) accumulator.push(entry)
        return accumulator
      }, [])

    return {
      id: category.id,
      title: category.title,
      shortLabel: category.shortLabel,
      icon: category.icon,
      accent: category.accent,
      description: category.description,
      entries: bestPerMember,
      leader: bestPerMember[0] ?? null,
      memberCount: bestPerMember.length,
    }
  })

  const output = {
    generatedAt: new Date().toISOString(),
    sourceName: 'Negreira Boys Fantasy Cup ⚽️🤡',
    categories,
  }

  await fs.mkdir(path.dirname(outputFile), { recursive: true })
  await fs.writeFile(outputFile, JSON.stringify(output, null, 2))
  console.log(`comment-highlights: ${categories.length} categories written to ${outputFile}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
