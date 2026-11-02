import { napraviServis } from './Kolekcija'

// Entitet 2: Program (točka programa izložbe). Svaka pripada jednom izlagaču (izlagacSifra). Početni podaci su demo.
export const program = [
    { sifra: 1, naslov: 'Uvod u snimanje dronom', vrsta: 'Predavanje', datum: '2027-05-14', trajanje: 45, lokacija: 'Dvorana A', snimiti: true, izlagacSifra: 1 },
    { sifra: 2, naslov: 'Demonstracija letenja u zatvorenom', vrsta: 'Demonstracija letenja', datum: '2027-05-14', trajanje: 30, lokacija: 'Arena', snimiti: true, izlagacSifra: 2 },
    { sifra: 3, naslov: 'Radionica: sastavljanje drona', vrsta: 'Radionica', datum: '2027-05-15', trajanje: 90, lokacija: 'Radionica 1', snimiti: false, izlagacSifra: 2 },
]

export default napraviServis('de_program', program)
