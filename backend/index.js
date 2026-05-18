const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const app = express();
app.use(cors());
app.use(express.json());

const detectPlatform = (url) => {
  if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
  if (url.includes('instagram.com')) return 'instagram';
  if (url.includes('tiktok.com')) return 'tiktok';
  if (url.includes('reddit.com')) return 'reddit';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('bsky.app')) return 'bluesky';
  return 'web';
};

const extractMetadata = async (url) => {
  const platform = detectPlatform(url);

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });
  const html = await response.text();
  const $ = cheerio.load(html);
  const getMeta = (name) =>
    $('meta[property="' + name + '"]').attr('content') ||
    $('meta[name="' + name + '"]').attr('content') ||
    '';
  return {
    title: getMeta('og:title') || $('title').text() || '',
    description: getMeta('og:description') || getMeta('description') || '',
    image: getMeta('og:image') || '',
    siteName: getMeta('og:site_name') || '',
    url,
    platform,
  };
};

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'xshare-backend' });
});

app.post('/metadata', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL requerida' });
  }
  try {
    const metadata = await extractMetadata(url);
    res.json(metadata);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo procesar la URL', detail: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('XShare backend corriendo en puerto ' + PORT);
});