import * as fs from 'fs';
import { parse } from 'csv-parse';
import * as path from 'path';


interface PosBbwsCty {
    id: number;
    nama: string;
    tipe: string;
    latlon: string;
    elevasi: number;
    kabupaten: string;
    kecamatan: string;
    desa: string;
    sungai: string;
    orde: string;
    sh: number;
    sk: number;
    sm: number;
}