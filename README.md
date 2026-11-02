# Osijek Drone Expo: organizacija

Aplikacija za organizaciju izložbe: izlagači i program.

Autor: Vedran Kralj

## Entiteti (CRUD nad oba)

- **Izlagač**: naziv, država, e-mail, površina štanda (m²), kotizacija plaćena (kvačica)
- **Program**: naslov, vrsta (predavanje, demonstracija letenja, radionica), izlagač, datum, trajanje (min), lokacija, snimiti za video (kvačica); svaka točka pripada jednom izlagaču (1 : N)

Pravila: izlagaču koji nije platio kotizaciju ne može se dodijeliti termin programa; izlagač s točkama programa ne može se obrisati; e-mail i trajanje se provjeravaju.

## Stranice

Početna (platili kotizaciju, točke programa, ukupna površina štandova i nadolazeći program), Izlagači i Program (filtar po vrsti).

Svi početni podaci su izmišljeni (demo). Podaci se spremaju u `localStorage` preglednika.

## Pokretanje

```bash
npm install
npm run dev
```

Produkcijski build: `npm run build` (izlaz u `dist/`).

## Tehnologije

React 19, Vite
