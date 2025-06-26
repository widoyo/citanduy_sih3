# SIH3 BBWS Citanduy

## Gambaran Produk

Portal yang memuat H3: Hidrologi (Air Permukaan), HidroMeteorologi (Prakiraan Air), HidroGeologi (Air Tanah).

Data disediakan oleh Balai Wilayah Sungai, PSDA Provinsi,Kabupaten,Kota, Badan Meteorologi dan Geofisika, Kementerian Energi dan Sumberdaya Alam.

Data sifatnya terkini dan ringkasan, penelusuran lebih detil tentang data seharusnya diarahkan ke web penyedia data.

Semaksimal mungkin 'entry data' dilakukan dengan cara komunikasi mesin-ke-mesin


## Product Backlog

- [ ] Pengguna publik dan pengelola dapat mengakses website pada alamat: https://sih3.bbwscitanduy.id
- [ ] Pengguna publik dapat berinteraksi dengan menu-menu, setiap menu akan membawa pengguna ke halaman yang dipilih
- [ ] Halaman Hidrometeorologi diisi gambar peta potensi hujan dari BMKG
- [ ] Halaman Geospatial, menampilkan Peta gambar dari Satelit
- [ ] Halaman Geospatial, menampilkan titik-titik lokasi Pos Hujan, Pos Duga Air
- [ ] Halaman Geospatial, menampilkan batas Das/Wilayah Sungai Citanduy, batas wilayah administrasi, 

## Sprint 1: 9 - 20 Juni 2025

### Commited Product Backlog Items

#### 1. Pengguna publik dan pengelola dapat mengakses website pada alamat: https://sih3.bbwscitanduy.id

- [x] Pesan sub domain 'sih3.bbwscitanduy.id'
- [x] Install dan konfigurasi Nginx (Engine X) Web Server, menggunakan VPS Cloud hosting bersama dengan SIHKA BBWS Citanduy
- [x] Membuat prototype halaman dari Mockup, dibuat dengan sveltekit
- [ ] Deploy prototype ke production server

## sv (Svelte Command Line Interface / CLI)

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
