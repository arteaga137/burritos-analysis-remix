import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')
const defaultInput = '/Users/Francisco/Downloads/_chat.txt'
const outputFile = path.join(repoRoot, 'public', 'links-index.json')
const cacheDir = path.join(repoRoot, 'tmp')
const previewCacheFile = path.join(cacheDir, 'link-preview-cache.json')
const PREVIEW_FETCH_TIMEOUT_MS = 4500
const PREVIEW_FETCH_CONCURRENCY = 6
const PREVIEW_FETCH_HOSTS = [
  'marca.com',
  'as.com',
  'sport.es',
  'mundodeportivo.com',
  'nytimes.com',
  'si.com',
  'espn.com',
  'espn.com.ar',
  'infobae.com',
  'realmadrid.com',
  'larazon.es',
  'theobjective.com',
  'okdiario.com',
  'cope.es',
  'tntsports.com.ar',
  'theathletic.com',
  'substack.com',
  'blackandwhitepixels.substack.com',
]

const memberMap = new Map([
  ['gabriel gutierrez', 'gabriel'],
  ['gabriel gutiérrez', 'gabriel'],
  ['francisco arteaga', 'francisco'],
  ['gustavo torres', 'gustavo'],
  ['jesus burgos', 'jesus'],
  ['jesús burgos', 'jesus'],
  ['javier gimenez', 'javier'],
  ['javier giménez', 'javier'],
  ['luis torrado', 'luis'],
  ['luís torrado', 'luis'],
  ['andres eduardo pinto', 'andres'],
  ['andrés eduardo pinto', 'andres'],
  ['gerardo vitale errico', 'gerardo'],
  ['karin "pie roto"', 'espana34'],
  ['jorge anzola', 'jorge'],
  ['aaron rodrigues', 'aaron'],
  ['sistema', 'system'],
])

const urlPattern = /https?:\/\/\S+|www\.\S+/g
const toneLexicon = {
  Pelea: [
    'paja',
    'fastidi',
    'llor',
    'coño',
    'carajo',
    'arrech',
    'toxic',
    'peo',
    'no joda',
    'indign',
    'vergonz',
    'ridicul',
    'robo',
    'culpa',
    'jod',
    'odio',
    'puta',
    'mierd',
    'maldita',
    'loco',
    'enfermo',
  ],
  Burla: [
    'jaja',
    'jeje',
    'que risa',
    'me dio risa',
    'meme',
    'burla',
    'sticker omitted',
    'jajaj',
    '😂',
    '🤣',
    '😭',
    'maldita sea',
  ],
  Aprobacion: [
    'exacto',
    'tal cual',
    'esto!',
    'factos',
    'grande',
    'banco',
    'de acuerdo',
    'correcto',
    'listo',
    'yes sir',
    'duro',
    'uff',
    'buenisimo',
    'buenísimo',
  ],
  Escepticismo: [
    'polemic',
    'no se',
    'no sé',
    'sera',
    'será',
    'de verdad',
    'en serio',
    'capaz',
    'dudo',
    'supuest',
    'si esto es cierto',
    'si eso es cierto',
    'raro',
  ],
  Informativo: [
    'dato curios',
    'mirate',
    'mira',
    'lean',
    'lee',
    'explica',
    'explic',
    'para que entiendas',
    'vieron que',
    'ojo',
    'todo lo que hay que saber',
    'ultima hora',
    'última hora',
  ],
}

const normaliseText = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const trimUrl = (value) => value.replace(/[)\],.!?]+$/g, '')

const canonicaliseUrl = (value) => {
  const hydrated = value.startsWith('http') ? value : `https://${value}`
  const cleaned = trimUrl(hydrated)
  const url = new URL(cleaned)
  const hostname = url.hostname.replace(/^www\./, '').toLowerCase()

  url.hash = ''

  if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
    if (url.pathname === '/watch' && url.searchParams.has('v')) {
      url.search = `?v=${url.searchParams.get('v')}`
    } else {
      url.search = ''
    }
  } else if (
    hostname === 'youtu.be' ||
    hostname === 'x.com' ||
    hostname === 'twitter.com' ||
    hostname.endsWith('instagram.com') ||
    hostname === 'tiktok.com' ||
    hostname.endsWith('.tiktok.com')
  ) {
    url.search = ''
  } else {
    url.search = ''
  }

  return url.toString()
}

const formatDomain = (value) => value.replace(/^www\./, '').toLowerCase()

const buildLabel = (messageText, url) => {
  if (messageText) return messageText

  try {
    const parsed = new URL(url)
    const pathname = parsed.pathname.replace(/\/$/, '')
    const leaf = pathname.split('/').filter(Boolean).at(-1)
    if (leaf) return `${formatDomain(parsed.hostname)} · ${decodeURIComponent(leaf)}`
  } catch {
    return url
  }

  return url
}

const shouldFetchPlatformPreview = (hostname, previewType) =>
  previewType === 'Articulo' &&
  PREVIEW_FETCH_HOSTS.some((allowed) => hostname === allowed || hostname.endsWith(`.${allowed}`))

const decodeHtmlEntities = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))

const parseTagAttributes = (tag) => {
  const attributes = {}
  const pattern = /([a-zA-Z:-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g
  let match = pattern.exec(tag)

  while (match) {
    const [, name, , doubleQuoted, singleQuoted, bare] = match
    attributes[name.toLowerCase()] = decodeHtmlEntities(doubleQuoted ?? singleQuoted ?? bare ?? '')
    match = pattern.exec(tag)
  }

  return attributes
}

const extractHtmlPreview = (html, pageUrl) => {
  const head = html.match(/<head[\s\S]*?<\/head>/i)?.[0] ?? html
  const metaMap = new Map()
  const metaPattern = /<meta\b[^>]*>/gi
  let tagMatch = metaPattern.exec(head)

  while (tagMatch) {
    const attributes = parseTagAttributes(tagMatch[0])
    const key = (attributes.property || attributes.name || '').toLowerCase()
    const content = attributes.content?.trim()
    if (key && content && !metaMap.has(key)) metaMap.set(key, content)
    tagMatch = metaPattern.exec(head)
  }

  const titleTag = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
  const title = metaMap.get('og:title') || metaMap.get('twitter:title') || (titleTag ? decodeHtmlEntities(titleTag).trim() : '')
  const description =
    metaMap.get('og:description') ||
    metaMap.get('twitter:description') ||
    metaMap.get('description') ||
    ''
  const image =
    metaMap.get('og:image:secure_url') ||
    metaMap.get('og:image') ||
    metaMap.get('twitter:image') ||
    ''

  return {
    previewTitle: title || null,
    previewDescription: description || null,
    previewImageUrl: image ? new URL(image, pageUrl).toString() : null,
  }
}

const readPreviewCache = async () => {
  try {
    const raw = await fs.readFile(previewCacheFile, 'utf8')
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

const writePreviewCache = async (cache) => {
  await fs.mkdir(cacheDir, { recursive: true })
  await fs.writeFile(previewCacheFile, JSON.stringify(cache, null, 2))
}

const fetchPreviewMetadata = async (url) => {
  const response = await fetch(url, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (compatible; burritos-analysis-remix/1.0; +https://github.com/arteaga137/burritos-analysis-remix)',
      accept: 'text/html,application/xhtml+xml',
    },
    signal: AbortSignal.timeout(PREVIEW_FETCH_TIMEOUT_MS),
  })

  if (!response.ok) {
    throw new Error(`preview-fetch-http-${response.status}`)
  }

  const html = await response.text()
  return extractHtmlPreview(html, response.url || url)
}

const mapLimit = async (items, limit, iteratee) => {
  const results = new Array(items.length)
  let cursor = 0

  const worker = async () => {
    while (cursor < items.length) {
      const index = cursor
      cursor += 1
      results[index] = await iteratee(items[index], index)
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()))
  return results
}

const getYouTubeVideoId = (url) => {
  const hostname = formatDomain(url.hostname)
  const pathname = url.pathname.replace(/\/$/, '')

  if ((hostname === 'youtube.com' || hostname === 'm.youtube.com') && pathname === '/watch') {
    return url.searchParams.get('v')
  }
  if (hostname === 'youtu.be') return pathname.split('/').filter(Boolean)[0] ?? null
  if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
    const segments = pathname.split('/').filter(Boolean)
    if (segments[0] === 'shorts' || segments[0] === 'live' || segments[0] === 'embed') {
      return segments[1] ?? null
    }
  }

  return null
}

const detectLinkPreview = (canonicalUrl, messageText, label) => {
  const url = new URL(canonicalUrl)
  const hostname = formatDomain(url.hostname)
  const pathname = url.pathname.toLowerCase()
  const normalizedCopy = normaliseText([messageText, label].filter(Boolean).join(' '))

  if (hostname === 'youtube.com' || hostname === 'm.youtube.com' || hostname === 'youtu.be') {
    const videoId = getYouTubeVideoId(url)
    const previewType =
      pathname.startsWith('/shorts/') ? 'Short' : pathname.startsWith('/live/') ? 'Live' : 'Video'

    return {
      platform: 'YouTube',
      previewType,
      monogram: 'YT',
      thumbnailUrl: videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null,
    }
  }

  if (hostname === 'x.com' || hostname === 'twitter.com') {
    return {
      platform: 'X',
      previewType:
        normalizedCopy.includes('retweet') ||
        normalizedCopy.includes('repost') ||
        normalizedCopy.includes('reposteo') ||
        normalizedCopy.includes('reposteo') ||
        normalizedCopy.startsWith('rt ')
          ? 'Repost'
          : 'Tweet',
      monogram: 'X',
      thumbnailUrl: null,
    }
  }

  if (hostname.endsWith('instagram.com')) {
    const previewType = pathname.startsWith('/reel/') || pathname.startsWith('/reels/')
      ? 'Reel'
      : pathname.startsWith('/p/')
        ? 'Post'
        : 'Perfil'

    return {
      platform: 'Instagram',
      previewType,
      monogram: 'IG',
      thumbnailUrl: null,
    }
  }

  if (hostname === 'tiktok.com' || hostname.endsWith('.tiktok.com')) {
    return {
      platform: 'TikTok',
      previewType: pathname.includes('/video/') ? 'Video' : 'Clip',
      monogram: 'TT',
      thumbnailUrl: null,
    }
  }

  if (hostname === 'chatgpt.com') {
    return {
      platform: 'ChatGPT',
      previewType: 'Share',
      monogram: 'AI',
      thumbnailUrl: null,
    }
  }

  return {
    platform: hostname.split('.').slice(0, -1).join('.') || hostname,
    previewType: 'Articulo',
    monogram: (hostname.split('.')[0] ?? 'LN').slice(0, 2).toUpperCase(),
    thumbnailUrl: null,
  }
}

const extractUrls = (text) => [...(text.match(urlPattern) ?? [])].map(trimUrl)

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
      current = {
        rawAt: match[1],
        timestamp: parseTimestamp(match[1]),
        author: match[2],
        memberId: memberMap.get(normaliseText(match[2])) ?? null,
        text: match[3],
      }
      continue
    }

    if (current) current.text += `\n${line}`
  }

  if (current) messages.push(current)
  return messages
}

const detectTopic = (entry, surroundingText) => {
  const text = normaliseText([entry.messageText, surroundingText, entry.domain].filter(Boolean).join(' '))

  if (text.includes('fantasy') || text.includes('jornada') || text.includes('alineacion') || text.includes('alineacion')) return 'Fantasy'
  if (
    text.includes('var') ||
    text.includes('arbit') ||
    text.includes('offside') ||
    text.includes('fuera de juego') ||
    text.includes('semiautomatic')
  ) {
    return 'VAR'
  }
  if (
    text.includes('racis') ||
    text.includes('vinicius') ||
    text.includes('mono') ||
    text.includes('prestiani') ||
    text.includes('discrimin')
  ) {
    return 'Convivencia'
  }
  if (
    text.includes('fichaj') ||
    text.includes('mercado') ||
    text.includes('ancelotti') ||
    text.includes('huijsen') ||
    text.includes('mbappe') ||
    text.includes('alexander-arnold') ||
    text.includes('davies')
  ) {
    return 'Mercado'
  }
  if (
    text.includes('barca') ||
    text.includes('barcelona') ||
    text.includes('madrid') ||
    text.includes('messi') ||
    text.includes('cristiano')
  ) {
    return 'Rivalidad'
  }
  if (
    text.includes('grupo') ||
    text.includes('chat') ||
    text.includes('echo chamber') ||
    text.includes('salirme')
  ) {
    return 'Dinámica'
  }

  return 'Chat'
}

const scoreTone = (text, reactionCount) => {
  const normalized = normaliseText(text)
  const scores = Object.fromEntries(
    Object.entries(toneLexicon).map(([tone, terms]) => [
      tone,
      terms.reduce((total, term) => total + (normalized.includes(term) ? 1 : 0), 0),
    ]),
  )

  if (reactionCount >= 4) scores.Pelea += 1
  if (reactionCount >= 2) scores.Burla += 0.5
  if ((normalized.match(/\?/g) ?? []).length >= 2) scores.Escepticismo += 1
  if ((normalized.match(/jaja/g) ?? []).length >= 2) scores.Burla += 1

  const ranked = Object.entries(scores).sort((left, right) => right[1] - left[1])
  const [tone, rawScore] = ranked[0]

  if (!rawScore || rawScore <= 0) return { tone: 'Informativo', confidence: 0.28 }
  return { tone, confidence: Math.min(0.95, 0.32 + rawScore * 0.12) }
}

const summariseTone = ({ tone, reactionCount, reactionAuthors, domain }) => {
  if (tone === 'Pelea') {
    return reactionCount > 1
      ? 'El link dispara respuesta inmediata, roce y contraargumento dentro del grupo.'
      : 'El link cae en un entorno tenso y alimenta fricción.'
  }
  if (tone === 'Burla') {
    return reactionAuthors.length > 0
      ? 'El link se recibe en clave de chiste, meme o vacile colectivo.'
      : 'El contexto del link es más de joda que de análisis.'
  }
  if (tone === 'Aprobacion') {
    return 'El grupo lo toma como munición útil o validación del punto que se estaba defendiendo.'
  }
  if (tone === 'Escepticismo') {
    return 'El link entra con dudas, lectura crítica o desconfianza sobre su contenido.'
  }
  if (domain.includes('instagram.com') || domain.includes('tiktok.com') || domain.includes('youtube.com') || domain.includes('youtu.be')) {
    return 'El link funciona más como clip o consumo rápido que como prueba fuerte.'
  }
  return 'El link acompaña la conversación como referencia o contexto informativo.'
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
    author: entry.author,
    memberId: entry.memberId,
    text: entry.text.trim(),
    kind: entry === self ? 'self' : previous.includes(entry) ? 'before' : 'after',
  }))
}

const main = async () => {
  const inputFile = process.argv[2] || defaultInput
  const source = await fs.readFile(inputFile, 'utf8')
  const messages = parseMessages(source)
  const entries = []
  const previewCache = await readPreviewCache()

  messages.forEach((message, index) => {
    const urls = extractUrls(message.text)
    if (urls.length === 0) return

    const contextWindow = createContextWindow(messages, index)
    const reactionMessages = contextWindow.filter((entry) => entry.kind === 'after' && entry.author !== 'Sistema')
    const reactionAuthors = [...new Set(reactionMessages.map((entry) => entry.author).filter((author) => author !== message.author))].slice(0, 5)
    const contextText = contextWindow.map((entry) => entry.text).join(' ')
    const messageText = stripUrls(message.text)

    urls.forEach((rawUrl, urlIndex) => {
      const canonicalUrl = canonicaliseUrl(rawUrl)
      const parsed = new URL(canonicalUrl)
      const domain = formatDomain(parsed.hostname)
      const label = buildLabel(messageText, canonicalUrl)
      const preview = detectLinkPreview(canonicalUrl, messageText, label)
      const topic = detectTopic({ messageText, domain }, contextText)
      const toneData = scoreTone(contextText, reactionMessages.length)
      const heat = Math.min(
        100,
        Math.round(
          reactionMessages.length * 10 +
            reactionAuthors.length * 9 +
            (toneData.tone === 'Pelea' ? 26 : 0) +
            (toneData.tone === 'Burla' ? 18 : 0) +
            (toneData.tone === 'Escepticismo' ? 12 : 0),
        ),
      )

      entries.push({
        id: `link-${index}-${urlIndex}`,
        url: trimUrl(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`),
        canonicalUrl,
        domain,
        author: message.author,
        memberId: message.memberId,
        at: message.rawAt,
        timestamp: message.timestamp?.toISOString() ?? null,
        messageText,
        label,
        topic,
        tone: toneData.tone,
        toneConfidence: Number(toneData.confidence.toFixed(2)),
        platform: preview.platform,
        previewType: preview.previewType,
        previewMonogram: preview.monogram,
        thumbnailUrl: preview.thumbnailUrl,
        previewTitle: null,
        previewDescription: null,
        heat,
        reactionCount: reactionMessages.length,
        reactionAuthors,
        summary: summariseTone({
          tone: toneData.tone,
          reactionCount: reactionMessages.length,
          reactionAuthors,
          domain,
        }),
        contextWindow,
      })
    })
  })

  entries.sort((left, right) => {
    if (!left.timestamp || !right.timestamp) return 0
    return right.timestamp.localeCompare(left.timestamp)
  })

  const previewTargets = [...new Set(
    entries
      .filter((entry) => shouldFetchPlatformPreview(entry.domain, entry.previewType))
      .map((entry) => entry.canonicalUrl),
  )]

  await mapLimit(previewTargets, PREVIEW_FETCH_CONCURRENCY, async (targetUrl) => {
    const cached = previewCache[targetUrl]

    if (cached) return cached

    try {
      const metadata = await fetchPreviewMetadata(targetUrl)
      previewCache[targetUrl] = metadata
      return metadata
    } catch {
      return null
    }
  })

  entries.forEach((entry) => {
    const metadata = previewCache[entry.canonicalUrl]
    if (!metadata) return
    if (metadata.previewImageUrl && !entry.thumbnailUrl) entry.thumbnailUrl = metadata.previewImageUrl
    if (metadata.previewTitle) entry.previewTitle = metadata.previewTitle
    if (metadata.previewDescription) entry.previewDescription = metadata.previewDescription
  })

  await fs.mkdir(path.dirname(outputFile), { recursive: true })
  await fs.writeFile(outputFile, JSON.stringify(entries, null, 2))
  await writePreviewCache(previewCache)

  console.log(`links-index: ${entries.length} shares written to ${outputFile}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
