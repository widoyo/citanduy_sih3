import { json } from '@sveltejs/kit';

export const GET = async ({request, platform}) => {
  try {
    const response = await fetch('https://sihka.bbwscitanduy.id/api/wlevel');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    return json({ok: true, data: data});
  } catch (error) {
    console.error('Error fetching data:', error);
    return json({ok: false, error: 'Failed to fetch wlevel data'});
    //throw error; // Re-throw the error for further handling
  }
        
    
}