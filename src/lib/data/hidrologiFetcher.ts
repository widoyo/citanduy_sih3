export async function fetchRain(platform): Promise<any> {
  try {
    const resp = await platform?.env.KV.get('rain_data_cty');
    if (resp) {
      return JSON.parse(resp);
    }
    return { items: []};
  } catch (error) {
    console.error('Error fetching data:', error);
    return { items: [] }; // Return empty items on error
    //throw error; // Re-throw the error for further handling
  }
}

export async function getWlevel(platform): Promise<any> {
  try {
    const resp = await platform?.env.KV.get('wlevel_data_cty');
    if (resp) {
      return JSON.parse(resp);
    }
    return { items: []};
  } catch (error) {
    console.error('Error fetching data:', error);
    return { items: []};
    //throw error; // Re-throw the error for further handling
  }
}