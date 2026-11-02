import CrudTablica from '../components/CrudTablica'
import { EMAIL_RE } from '../constants'
import { useLista } from '../hooks'
import IzlagacService from '../services/IzlagacService'
import ProgramService from '../services/ProgramService'

export default function Izlagaci() {

    const izlagaci = useLista(IzlagacService)
    const program = useLista(ProgramService)

    const brojTocaka = (sifra) => program.stavke.filter((p) => p.izlagacSifra === sifra).length

    function validate(v) {
        const g = {}
        if (!EMAIL_RE.test(String(v.email).trim())) g.email = 'Unesite ispravan e-mail.'
        if (!(Number(v.stand) > 0)) g.stand = 'Površina štanda mora biti veća od 0.'
        return g
    }

    return (
        <CrudTablica
            naslov="Izlagači"
            novi="Novi izlagač"
            servis={IzlagacService}
            stavke={izlagaci.stavke}
            osvjezi={izlagaci.osvjezi}
            prazno="Još nema izlagača."
            validate={validate}
            fields={[
                { name: 'naziv', label: 'Naziv izlagača', required: true },
                { name: 'drzava', label: 'Država', required: true, default: 'Hrvatska' },
                { name: 'email', label: 'E-mail', type: 'email', required: true },
                { name: 'stand', label: 'Površina štanda (m²)', type: 'number', step: '0.5', required: true },
                { name: 'kotizacijaPlacena', label: 'Kotizacija plaćena', type: 'checkbox' },
            ]}
            columns={[
                { key: 'naziv', label: 'Izlagač' },
                { key: 'drzava', label: 'Država' },
                { key: 'email', label: 'E-mail' },
                { render: (i) => `${i.stand} m²`, label: 'Štand' },
                { render: (i) => <span className={i.kotizacijaPlacena ? 'oznaka ok' : 'oznaka'}>{i.kotizacijaPlacena ? 'Plaćeno' : 'Nije plaćeno'}</span>, label: 'Kotizacija' },
                { render: (i) => brojTocaka(i.sifra), label: 'Programa' },
            ]}
            blokirajBrisanje={(i) =>
                brojTocaka(i.sifra) > 0 ? 'Izlagač ima točke programa i ne može se obrisati. Prvo obrišite njegov program.' : null}
        />
    )
}
