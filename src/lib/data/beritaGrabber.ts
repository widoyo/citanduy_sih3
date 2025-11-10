import { parseHTML } from 'linkedom';
import { URL_KEGIATAN_BBWSCTY } from '$env/static/private';

/**
 * Fetches the news data from a given URL and returns the HTML content.
 * @returns Promise<string> HTML content, or empty string if fetch fails
 */
export async function fetchBeritaCty(): Promise<string> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(URL_KEGIATAN_BBWSCTY, {
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.text();
    return data;
    
  } catch (error) {
    console.error(`Error fetching berita from ${URL_KEGIATAN_BBWSCTY}:`, error);
    return ''; // Return empty string instead of throwing
  }
}

// find .body > article > h4 is title berita
export async function getArticles(html: string): Promise<string> {
    const { document } = parseHTML(html);
    const articles = document.querySelectorAll<HTMLHeadingElement>('div.body > article > a');
    if (articles.length > 0) {
        console.log('Found articles:', articles.length);
        return Array.from(articles).map((article) => {
            const a_href = article.href;
            const a_title = article.querySelector<HTMLHeadingElement>('h4').textContent.trim();
            return {
                href: a_href,
                title: a_title
            };
        });
    } else {
        console.log('No articles found');
    }
}
