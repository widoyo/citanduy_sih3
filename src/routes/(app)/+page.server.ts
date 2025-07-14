// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
import type { PageLoad } from './$types';


import { fetchPrakiraan, parsePrakiraan } from '$lib/data/prakiraanFetcher.ts';
import { fetchBeritaCty, getArticles } from '$lib/data/beritaGrabber.ts';

export const load: PageLoad = async () => {
    const html = await fetchPrakiraan();
    const prakiraanList = await parsePrakiraan(html);

    const beritaHtml = await fetchBeritaCty();
    const beritaTitle = await getArticles(beritaHtml);
    return {
        prakiraanList,
        beritaTitle
    };
}
