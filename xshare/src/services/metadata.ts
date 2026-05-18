const BACKEND_URL = 'https://musical-carnival-x54xg74q7j75hpjv4-3001.app.github.dev';

export const detectPlatform = (url: string): string => {
  if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
  if (url.includes('instagram.com')) return 'instagram';
  if (url.includes('tiktok.com')) return 'tiktok';
  if (url.includes('reddit.com')) return 'reddit';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('bsky.app')) return 'bluesky';
  return 'web';
};

export const fetchMetadata = async (url: string) => {
  const response = await fetch(`${BACKEND_URL}/metadata`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!response.ok) throw new Error('Error procesando URL');
  return response.json();
};
