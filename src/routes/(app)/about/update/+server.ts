import { json } from '@sveltejs/kit';
import { fetchBeritaCty, getArticles } from '$lib/data/beritaGrabber.js';
import { fetchPrakiraan, parsePrakiraan } from '$lib/data/prakiraanFetcher.js';
import { URL_PRAKIRAAN_JABAR, URL_PRAKIRAAN_JATENG } from '$env/static/private';

export const GET = async ({request, platform}) => {
    const beritaHtml = await fetchBeritaCty();
    const berita = await getArticles(beritaHtml);
    await platform.env.KV.put('berita_cty', JSON.stringify(berita));

    const prakiraanHtml = await fetchPrakiraan(URL_PRAKIRAAN_JABAR);
    const prakiraanList = await parsePrakiraan(prakiraanHtml);

    const prakiraanHtml2 = await fetchPrakiraan(URL_PRAKIRAAN_JATENG);
    const prakiraanList2 = await parsePrakiraan(prakiraanHtml2);

    await platform.env.KV.put('prakiraan_cuaca', JSON.stringify([...prakiraanList, ...prakiraanList2]));
    
    return json({ok: true, berita: berita, prakiraan: [...prakiraanList, ...prakiraanList2]})
}