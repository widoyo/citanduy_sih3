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
    //console.log('Parsed days:', days);
    // Create an array to hold the forecast data for each day
    const forecastData = [];
    for (const row of bodyTable) {
        const cells = row.querySelectorAll<HTMLTableCellElement>('td');
        if (cells.length > 0) {
            const dayData = {};
            // first column is the city name, take name and href
            const cityLink = cells[0].querySelector<HTMLAnchorElement>('a');
            if (cityLink && cityLink.textContent) {
                dayData['city'] = cityLink.textContent.trim();
                dayData['href'] = cityLink.href;
            } else {
                dayData['city'] = cells[0].textContent.trim();
            }
            // Loop through column 1 (prakiraan cuaca) to the end of the row
            for (let i = 1; i < cells.length; i++) {
                const cell = cells[i];
                if (cell.textContent) {
                    const [, rain, temperature, humidity] = cell.textContent.trim().match(/([a-zA-Z\s]+)(\d+–\d+\s°C)(\d+–\d+%)/).map(s => s.trim());
                    const svgElements = cell.querySelectorAll('svg');

                    dayData[`hari_` + i] = {
                        tanggal: days[i], 
                        cuaca: rain, 
                        suhu: temperature, 
                        kelembaban: humidity,
                        cuaca_icon: svgElements[0].outerHTML
                    };
                }
            }
            forecastData.push(dayData);
        }
    }
    //console.log('Parsed forecast data:', forecastData);
    const kotas = ['banjar', 'tasikmalaya', 'ciamis', 'pangandaran', 'cilacap', 'banyumas', 'kadipaten'];
    // Filter the forecast data to include only the word of cities we are interested in
    const filteredForecast = forecastData.filter((data) => {
        return kotas.some((kota) => {
            return data.city.toLowerCase().includes(kota);
        });
    });
    console.log('Filtered forecast data:', filteredForecast);
    return filteredForecast;
}