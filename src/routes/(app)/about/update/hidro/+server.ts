import { json } from '@sveltejs/kit';

export const GET = async ({url, platform}) => {

  let dest = 'https://sihka.bbwscitanduy.id/api/wlevel';
  let dest_key = 'wlevel_data_cty';
  if (url.searchParams.get('rain')) {
    dest = 'https://sihka.bbwscitanduy.id/api/rain';
    const t = new Date();
    if (t.getHours() < 7) {
      const yesterday = new Date(t);
      yesterday.setDate(t.getDate() - 1);
      dest += '?s=' + yesterday.toISOString().split('T')[0];
    }    
    dest_key = 'rain_data_cty';
  }

  try {
    const response = await fetch(dest);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    await platform.env.KV.put(dest_key, JSON.stringify(data));
    return json({ok: true, data: data});
  } catch (error) {
    console.error('Error fetching data:', error);
    return json({ok: false, error: 'Failed to fetch wlevel data'});
    //throw error; // Re-throw the error for further handling
  }
        
    
}