import { pos_cty } from '$lib/data/pos_cty.js';
import { pos_luar } from '$lib/data/pos_luar';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    const pl_lines = pos_luar.split('\n');
    console.log('Parsed pos_luar:', pl_lines.length);
    const lines = pos_cty.split('\n');
    const headers = lines[0].split('\t');
    const data = lines.slice(1).map(line => {
        const values = line.split('\t');
        const item: Record<string, any> = {};
        headers.forEach((header, index) => {
            if (header.trim() === 'll') {
                [item['latitude'], item['longitude']] = values[index].trim().split(',').map(Number);
            } else {
                item[header.trim()] = values[index].trim();
            }
        });
        return item;
    });
    console.log('Parsed pos_cty:', data.length);
    console.log('Parsed pos_cty[0]:', JSON.stringify(data[0]));
    return {
        posCty: data
    };

}
