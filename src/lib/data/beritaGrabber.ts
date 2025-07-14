import { parseHTML } from 'linkedom';

/**
 * fetches the news data from a given URL and returns the HTML content.
 */
export async function fetchBeritaCty(): Promise<string> {
  try {
    const response = await fetch('https://sda.pu.go.id/balai/bbwscitanduy/berita');
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

// find .body > article > h4 is title berita
export async function getArticles(html: string): Promise<string> {
    const { document } = parseHTML(html);
    const articles = document.querySelectorAll<HTMLHeadingElement>('div.body > article > a');
    if (articles.length > 0) {
        console.log('Found articles:', articles.length);
        Array.from(articles).map((article) => {
            console.log('Article:', article.textContent?.trim());
            const a_berita = article.querySelector<HTMLAnchorElement>('a');
            console.log('Article:', a_berita?.textContent?.trim(), a_berita?.href);
            return {
                title: a_berita?.textContent?.trim() || '',
                href: a_berita?.href || ''
            };
        });
    } else {
        console.log('No articles found');
    }
}
