export default async function handler(req, res) {
  try {
    const response = await fetch('https://charleswilke.substack.com/feed');
    if (!response.ok) {
      return res.status(502).json({ error: 'Failed to fetch feed' });
    }
    const xml = await response.text();
    res.setHeader('Access-Control-Allow-Origin', 'https://fellowvector.com');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(xml);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
