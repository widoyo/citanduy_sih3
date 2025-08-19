// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;
import { KOTA_TO_FETCH } from '$env/static/private';
import type { PageServerLoad } from './$types';


import { fetchRain, getWlevel } from '$lib/data/hidrologiFetcher.ts'; // Import to ensure it's included in the build

export const load: PageServerLoad = async (event) => {
    const kv = event.platform.env.KV;

    const cuaca = await kv.get('prakiraan_cuaca');
    const beritaCty = await kv.get('berita_cty');

    //const beritaHtml = await fetchBeritaCty();
    const berita = JSON.parse(beritaCty || '[]');

    // Fetch rain data
    // and wlevel data
    const rainData = await fetchRain();

	// Initial desired order — lowercase substrings
	const initialOrder = JSON.parse(KOTA_TO_FETCH.replace(/'/g, '"'));

	// Track which kabupaten keyword matched which items
	const orderedGrouped: { key: string; label: string; items: typeof rainData }[] = [];

	const usedIndices = new Set<number>();
	const usedKeywords = new Set<string>();

    // filter rainData to remove item.telemetri.ch < 1
    rainData.items = rainData.items.filter(
        item => item.telemetri.rain24 > 0.5
    ) 
	// Step 1: Apply initial kabupaten order
	for (const keyword of initialOrder) {
		const items: typeof rainData = [];
        console.log('Processing keyword:', keyword);
		for (let i = 0; i < rainData.items.length; i++) {
            
			const kab = rainData.items[i].pos.kabupaten || '';
			if (!usedIndices.has(i) && kab.toLowerCase().includes(keyword)) {
				items.push(rainData.items[i]);
				usedIndices.add(i);
			}
		}

		if (items.length > 0) {
			orderedGrouped.push({
				key: keyword,
				label: items[0].pos.kabupaten, // use first label
				items
			});
			usedKeywords.add(keyword);
		}
	}

	// Step 2: Find remaining kabupaten from the data
	const remainingGroups: Record<string, typeof rainData> = {};

	for (let i = 0; i < rainData.items.length; i++) {
		if (usedIndices.has(i)) continue;

		const kab = rainData.items[i].pos.kabupaten || 'Lainnya';
		const keyword = kab.toLowerCase();

		if (!remainingGroups[keyword]) {
			remainingGroups[keyword] = [];
		}
		remainingGroups[keyword].push(rainData.items[i]);
	}

	// Step 3: Append the rest to the ordered list
	for (const keyword in remainingGroups) {
		orderedGrouped.push({
			key: keyword,
			label: remainingGroups[keyword][0].pos.kabupaten,
			items: remainingGroups[keyword]
		});
	}

	// Final: Compose updated kabupatenOrder
	const finalKabupatenOrder = [...initialOrder, ...Object.keys(remainingGroups)];

    const wlevelData = await getWlevel();
    // Define your preferred order of sungai (case-insensitive match)
    const sungaiOrder = ['cikidang', 'cikondang', 'cibaruyan', 'citanduy', 'cimuntur', 'cijolang'];

    // Step 1: Group wlevelData by sungai
    const sungaiGroups: Record<string, typeof wlevelData.items> = {};

    wlevelData.items = wlevelData.items.filter(
        item => !item.pos.nama.toLowerCase().includes('manganti')
    );
    for (const item of wlevelData.items) {
        const sungai = item.pos.sungai || 'Lainnya';
        if (!sungaiGroups[sungai]) sungaiGroups[sungai] = [];
        sungaiGroups[sungai].push(item);
    }

    // Step 2: Sort each group by elevasi descending
    for (const sungai in sungaiGroups) {
        sungaiGroups[sungai].sort((a, b) => (b.pos.elevasi ?? 0) - (a.pos.elevasi ?? 0));
    }

    // Step 3: Create ordered group array
    const groupedWLevelData: { sungai: string; items: typeof wlevelData.items }[] = [];

    // Track sungai already added
    const usedSungai = new Set<string>();

    // First, add known sungai in order
    for (const keyword of sungaiOrder) {
        const match = Object.keys(sungaiGroups).find(s => s.toLowerCase().includes(keyword));
        if (match && !usedSungai.has(match)) {
            groupedWLevelData.push({ sungai: match, items: sungaiGroups[match] });
            usedSungai.add(match);
        }
    }

    // Then, append the remaining sungai
    for (const sungai in sungaiGroups) {
        if (!usedSungai.has(sungai)) {
            groupedWLevelData.push({ sungai, items: sungaiGroups[sungai] });
        }
    }

    return {
        prakiraanList: JSON.parse(cuaca),
        berita,
        groupedRainData: orderedGrouped,
        rainData: rainData.items,
        wlevelData: wlevelData.items,
        groupedWLevelData,
        posCty: data
    };
}
