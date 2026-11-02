import { napraviServis } from './Kolekcija'

// Entitet 1: Izlagač. Svi početni podaci su izmišljeni (demo).
export const izlagaci = [
    { sifra: 1, naziv: 'Demo Aerial d.o.o.', drzava: 'Hrvatska', email: 'info@demo-aerial.example', stand: 24, kotizacijaPlacena: true },
    { sifra: 2, naziv: 'Sky Tech GmbH (demo)', drzava: 'Njemačka', email: 'kontakt@skytech.example', stand: 36, kotizacijaPlacena: true },
    { sifra: 3, naziv: 'Dronovi Slavonije (demo)', drzava: 'Hrvatska', email: 'ured@dronovi.example', stand: 12, kotizacijaPlacena: false },
]

export default napraviServis('de_izlagaci', izlagaci)
