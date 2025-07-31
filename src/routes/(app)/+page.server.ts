// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;
import type { PageLoad } from './$types';


import { fetchPrakiraan, parsePrakiraan } from '$lib/data/prakiraanFetcher.ts';
import { fetchBeritaCty, getArticles } from '$lib/data/beritaGrabber.ts';

export const load: PageLoad = async () => {
    const html = await fetchPrakiraan('https://www.bmkg.go.id/cuaca/prakiraan-cuaca/32');
    const prakiraanList = await parsePrakiraan(html);

    const html2 = await fetchPrakiraan('https://www.bmkg.go.id/cuaca/prakiraan-cuaca/33');
    const prakiraanList2 = await parsePrakiraan(html2);

    // Append prakiraanList2 into prakiraanList
    const combinedPrakiraanList = [...prakiraanList, ...prakiraanList2];

    const beritaHtml = await fetchBeritaCty();
    const berita = await getArticles(beritaHtml);
    return {
        prakiraanList: combinedPrakiraanList,
        berita
    };
}
