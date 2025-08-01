export async function fetchRain(): Promise<any> {
  try {
    const response = await fetch('https://sihka.bbwscitanduy.id/api/rain');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error for further handling
  }
}

export async function getWlevel(): Promise<string> {
  try {
    const response = await fetch('https://sihka.bbwscitanduy.id/api/wlevel');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error for further handling
  }
}