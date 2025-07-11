import { parseHTML } from 'linkedom';

/**
 * Fetches the weather forecast data from BMKG and parses the days from the header table.
 * @returns {Promise<any>} A promise that resolves to the parsed days from the forecast.
 */
export async function fetchPrakiraan(): Promise<any> {
  try {
    const response = await fetch('https://www.bmkg.go.id/cuaca/prakiraan-cuaca/32');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error for further handling
  }
}


export async function getTitle(html: string): Promise<string> {
    const { document } = parseHTML(html);
    const titleElement = document.querySelector<HTMLTitleElement>('title');
    if (titleElement) {
        return titleElement.textContent || '';
    }
    return '';
}


export async function parsePrakiraan(html: string) {
    const { document } = parseHTML(html);

    const headerTable = document.querySelectorAll<HTMLTableCellElement>('thead > tr > th');
    const bodyTable = document.querySelectorAll<HTMLTableRowElement>('tbody > tr');
    const days = [];
    for (const h of headerTable) {
        if (h.textContent) {
            days.push(h.textContent.trim());
        }
    }

    return bodyTable.length;
}