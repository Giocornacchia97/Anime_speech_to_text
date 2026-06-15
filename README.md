# InuScribe Learning Lab

Web app React per trasformare episodi anime in sessioni di studio giapponese-italiano.

## Funzioni

- Dashboard con progressi e sessioni recenti
- Libreria con ricerca e filtri
- Importazione audio con configurazione linguistica
- Studio sincronizzato con player, trascrizione e note didattiche
- Simulatore dei costi API con esportazione CSV
- Persistenza locale di episodi, budget e chiave API demo
- Layout responsive e tema automatico chiaro/scuro

## Avvio locale

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy Vercel

Importare questa cartella come progetto Vercel. Il file `vercel.json` configura il fallback delle route della SPA verso `index.html`.

La trascrizione è attualmente simulata nel browser. Per collegare API reali, le chiamate dovranno essere spostate in funzioni server-side per non esporre le chiavi nel client.
