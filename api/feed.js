// Substack feed proxy.
// Fetches the RSS feed, trims it to the handful of fields the site renders, and
// returns JSON. The raw feed is ~450 KB of full post bodies; this is a few KB.

const FEED_URL      = 'https://charleswilke.substack.com/feed';
const MAX_ITEMS     = 20;
const EXCERPT_CHARS = 300;   // client trims further per variant
const THUMB_WIDTH   = 640;   // cards render at ~500px wide; 640 covers 1x and looks fine at 2x

export default async function handler(req, res) {
  try {
    const response = await fetch(FEED_URL, {
      headers: { 'User-Agent': 'fellowvector.com feed proxy' },
    });
    if (!response.ok) {
      res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60');
      return res.status(502).json({ error: `Upstream responded ${response.status}` });
    }

    const items = parseFeed(await response.text());

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    // Browser keeps it 10 min, edge keeps it 1 h and serves stale for a day while refreshing
    res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ items });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ── Parsing ──
// Substack's feed is well-formed RSS 2.0 with CDATA-wrapped text fields. A few
// targeted regexes are enough here and avoid pulling an XML parser into the function.

export function parseFeed(xml) {
  const blocks = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  return blocks.slice(0, MAX_ITEMS).map(block => {
    const link  = tag(block, 'link');
    const image = thumbnail(attr(block, 'enclosure', 'url'));
    const date  = toIso(tag(block, 'pubDate'));
    return {
      title:   tag(block, 'title'),
      link:    /^https?:\/\//.test(link) ? link : '',
      date,
      excerpt: excerpt(tag(block, 'description')),
      image,
    };
  }).filter(item => item.title && item.link);
}

function tag(block, name) {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`));
  return m ? unwrap(m[1]) : '';
}

function attr(block, name, attrName) {
  const m = block.match(new RegExp(`<${name}\\s[^>]*?\\b${attrName}="([^"]*)"`));
  return m ? decodeEntities(m[1]) : '';
}

function unwrap(s) {
  const m = s.match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/);
  return (m ? m[1] : decodeEntities(s)).trim();
}

function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&(?:apos|#39);/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

function excerpt(html) {
  const text = decodeEntities(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
  return text.length > EXCERPT_CHARS ? text.slice(0, EXCERPT_CHARS).trimEnd() : text;
}

function toIso(s) {
  const t = Date.parse(s);
  return Number.isNaN(t) ? '' : new Date(t).toISOString();
}

// Substack serves post images through a Cloudinary-style fetch URL. Inserting a width
// transform turns a ~600 KB original into a ~100 KB card thumbnail.
function thumbnail(url) {
  if (!/^https:\/\/substackcdn\.com\/image\/fetch\//.test(url)) {
    return /^https:\/\//.test(url) ? url : '';
  }
  if (/\/image\/fetch\/[^/]*\bw_\d+/.test(url)) return url;
  return url.replace('/image/fetch/', `/image/fetch/w_${THUMB_WIDTH},c_limit,`);
}
