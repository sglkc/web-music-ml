# Web Music ML

Projek ini dibuat untuk melengkapi tugas akhir semester untuk pelajaran
Pengantar Sains Data dan Basis Data.

Website ini berisi dengan tabel dan juga CRUD untuk memodifikasi isi tabel.
Adapun plot untuk clustering dan juga integrasi sistem rekomendasi untuk
mendapatkan list lagu dengan tingkat kemiripan yang besar.

## Teknologi

### Tools

- [Node.js](https://nodejs.org), sebagai runtime JavaScript
- [pnpm](https://pnpm.io), sebagai package manager
- [netlify-cli](https://docs.netlify.com/cli/get-started/), untuk menjalankan server functions API

### Front-End

- [React](https://react.dev), sebagai library user interface
- [Vite](https://vitejs.dev), untuk bundle dan build
- [UnoCSS](https://unocss.dev), untuk class-based styling
- [Axios](https://axios-http.com), untuk fetch data dari API

### Back-End

- [Express](https://expressjs.com), sebagai framework API
- [Sequelize](https://sequelize.org), sebagai library object-relational mapping untuk database

### Machine Learning

- [alike](https://www.npmjs.com/package/alike), sebagai library untuk penerapan k-Nearest Neighbour dan sistem rekomendasi
- [node-kmeans](/src/lib/node-kmeans.js), modifikasi dari library node-kmeans dalam modul ES6 digunakan untuk
  mencari k-Means clustering
- [Plotly.js](https://plotly.com/javascript/), untuk membuat plot dan rendering cluster

### Hosting

- [Netlify](https://netlify.com), untuk front-end dan back-end
- [Railway](https://railway.app), untuk database MySQL

## Cara Penggunaan

1. Clone repositori
  ```sh
  git clone git@github.com:sglkc/web-music-ml.git
  ```
2. Install dependency menggunakan pnpm
  ```sh
  pnpm i
  ```
3. Gunakan netlify untuk development
  ```sh
  netlify dev
  ```

## Environment

Gunakan environment jika ingin mengubah credential database tanpa mengubah kode.

```js
database: process.env.DB_NAME || 'projekbasdat'
username: process.env.DB_USER || 'root'
password: process.env.DB_PASS || ''
host: process.env.DB_HOST || 'localhost'
port: process.env.DB_PORT || 3306
```
