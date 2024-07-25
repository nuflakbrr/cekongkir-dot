## CekOngkir (Next.js Typescript, Tailwindcss, Customize ESLint Rules)

Ini adalah proyek [Next.js](https://nextjs.org/) di-bootstrap dengan [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Teknologi Yang Digunakan

- [Next.js (Typescript)](https://nextjs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Axios](https://axios-http.com/docs/intro/)

## Fitur

Fitur yang terdapat pada templat proyek ini adalah:

- Authentikasi.
- Proyek Arsitektur.
- State Management (React Context).
- Kustomisasi `React Hooks`.

### Authentikasi

Pada proyek ini sudah implementasi `protected routes` sederhana menggunakan `React Context`. Untuk bisa mengakses halaman `Beranda`, Anda harus masuk ke halaman `Login` terlebih dahulu. Lalu masukkan kredensial sebagai berikut:

```
username: user
password: password
```

Setelah itu, klik button login dan Anda akan segera bisa menikmati fitur lainnya pada website ini.

### Proyek Arsitektur

Terdapat beberapa poin penting terkait bagaimana menjalankan proyek arsitektur yang benar. Untuk studi kasus kali ini, Saya telah membuatkan sebuah templat proyek kosong yang sudah Saya kustomisasi yang sekiranya sudah mengimplementasi bagaimana cara mengatur proyek arsitektur yang baik agar terlihat rapi.

```
/
├─public/
└─src/
│ ├─app/
│ │ ├─(auth)
│ │ │   └─(routes)
│ │ │       └─login
│ │ └─api/
│ │   ├─city
│ │   ├─cost
│ │   └─province
│ ├─components/
│ │ ├─Common/
│ │ ├─Containers/
│ │ │ ├─Auth/
│ │ │ ├─ErrorPage/
│ │ │ └─Home/
│ │ │   └─components/
│ │ ├─Mixins/
│ │ │ └─Navbar/
│ │ └─ui/
│ ├─context/
│ ├─data/
│ ├─hooks/
│ ├─interfaces/
│ ├─lib/
│ ├─middlewares/
│ └─providers/
└─.env.example
└─.eslintrc.json
└─.gitignore
└─next-env.d.ts
└─next.config.mjs
└─package.json
└─postcss.config.js
└─README.md
└─tailwind.config.ts
└─tsconfig.json
```

#### Folder Common

Folder `Common` terletak pada `/src/components/`. Lalu didalamnya berisikan apa saja? Folder `Common` Berisikan komponen-komponen universal, seperti: tombol, dropdown, dll.

#### Folder Mixins

Folder `Mixins` terletak pada `/src/components/`. Lalu didalamnya berisikan apa saja? Folder `Mixins` Berisikan komponen-komponen yang merupakan gabungan dari komponen-komponen universal dari folder `Common`. Seperti: navbar (yang berisi beberapa hal umum seperti tombol, dropdown, dll).

#### Folder Containers

Folder `Containers` terletak pada `/src/components/`. Lalu didalamnya berisikan apa saja? Folder `Containers` Berisikan kombinasi folder `Common` dan halaman itu sendiri yang membentuk 1 halaman. 1 halaman 1 folder `Containers` agar tetap rapi.

Jika pada 1 container memiliki beberapa section, maka Anda harus memisahkan dan menaruhnya di dalam folder `components` namun masih tetap dalam 1 folder `Containers`. Seperti: `/src/components/Containers/Home/components`.

## Mulai Sekarang

Pertama, buka terminal lalu eksekusi perintah berikut:

```bash
npx degit nuflakbrr/cekongkir-dot <nama_proyek>
# atau
git clone https://github.com/nuflakbrr/cekongkir-dot <nama_proyek>
```

Kedua, install `depedencies` didalam proyek yang sudah Anda klona:

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

Ketiga, salin environtment:

```bash
cp .env.example .env
```

Keempat, jalankan server pengembangan:

```bash
npm run dev
# atau
yarn dev
# atau
pnpm run dev
```

Keempat, buka [http://localhost:3000](http://localhost:3000) pada browser Anda dan lihat hasilnya.

Anda dapat mulai mengedit halaman dengan memodifikasi `/src/components/Containers/Home/Home.tsx`. Halaman diperbarui secara otomatis saat Anda mengedit file.

## Rute API

[Rute API](https://nextjs.org/docs/api-routes/introduction) dapat diakses di [http://localhost:3000/api/hello](http://localhost:3000/api/hello). Titik akhir ini dapat diedit di `/src/app/api/hello.ts`.

Folder `/src/app/api` dipetakan ke `/api/*`. File dalam direktori ini diperlakukan sebagai [Rute API](https://nextjs.org/docs/api-routes/introduction) bukannya Bereaksi halaman.

## Pelajari Lebih

Untuk mempelajari lebih lanjut tentang Next.js, lihat referensi berikut:

- [Dokumentasi Next.js](https://nextjs.org/docs) - pelajari tentang fitur dan API Next.js.
- [Pelajari Next.js](https://nextjs.org/learn) - tutorial Next.js yang interaktif.

Anda dapat memeriksa [GitHub Repositori Next.js](https://github.com/vercel/next.js/) - umpan balik dan kontribusi Anda dipersilakan!

## Publikasi di Vercel

Jalur paling mudah untuk publikasi aplikasi Next.js Anda menggunakan [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dari pencipta Next.js.

Lihat [dokumentasi publikasi Next.js kami](https://nextjs.org/docs/deployment) untuk lebih lengkap.

## Author Templat Ini

Nama kontributor dan info kontak,

Naufal Akbar Nugroho  
[@nuflakbrr](https://github.com/nuflakbrr)
[@kbrnugroho](https://instagram.com/kbrnugroho)
