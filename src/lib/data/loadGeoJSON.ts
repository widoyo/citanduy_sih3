import type { FeatureCollection } from 'geojson';

export async function loadGeoJSON(filename: string): Promise<FeatureCollection> {
  try {
    // Validate filename to prevent directory traversal
    if (!/^[a-zA-Z0-9_-]/.test(filename)) {
      throw new Error('Invalid filename format');
    }

    // For static files, we can import them directly
    const response = await import(`$lib/data/${filename}.geojson?raw`);
    return JSON.parse(response.default);
  } catch (error) {
    console.error(`Error loading GeoJSON file ${filename}:`, error);
    throw new Error(`Failed to load ${filename}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}