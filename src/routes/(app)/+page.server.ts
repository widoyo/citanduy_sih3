// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
import type { PageLoad } from './$types';


import { fetchPrakiraan, getTitle, parsePrakiraan } from '$lib/data/prakiraanFetcher.ts';

export const load: PageLoad = async () => {
    const html = await fetchPrakiraan();
    const title = await getTitle(html);
    const days = await parsePrakiraan(html);
    console.log(title);
    return {
        title,
        days
    };
}
