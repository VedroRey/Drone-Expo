import { useState } from 'react'
import CrudTablica from '../components/CrudTablica'
import { VRSTE_PROGRAMA, formatDatum } from '../constants'
import { useLista } from '../hooks'
import IzlagacService from '../services/IzlagacService'
import ProgramService from '../services/ProgramService'

export default function Program() {

    const program = useLista(ProgramService)
    const izlagaci = useLista(IzlagacService)
    const [vrsta, setVrsta] = useState('')

    const izlagac = (sifra) => izlagaci.stavke.find((i) => i.sifra === sifra)

    const prikaz = program.stavke
        .filter((p) => !vrsta || p.vrsta === vrsta)
        .sort((a, b) => a.datum.localeCompare(b.datum))

    function validate(v) {
        const g = {}
        const trajanje = Number(v.trajanje)
        if (!Number.isInteger(trajanje) || trajanje < 5 || trajanje > 480) g.trajanje = 'Trajanje mora biti od 5 do 480 minuta.'
        const i = izlagac(Number(v.izlagacSifra))
        if (i && !i.kotizacijaPlacena) g.izlagacSifra = 'Izlagač nije platio kotizaciju, pa mu se ne može dodijeliti termin.'
        return g
    }

    return (
        <CrudTablica
            naslov="Program"
            novi="Nova točka programa"
            servis={ProgramService}
            stavke={prikaz}
            osvjezi={program.osvjezi}
            prazno={program.stavke.length === 0 ? 'Program je prazan.' : 'Nema programa te vrste.'}
            validate={validate}
            alat={(
                <div className="alat">
                    <label className="filtar-vrste">
                        Vrsta programa
                        <select value={vrsta} onChange={(e) => setVrsta(e.target.value)}>
                            <option value="">Sve</option>
                            {VRSTE_PROGRAMA.map((v) => <option key={v} value={v}>{v}</option>)}
                        </select>
                    </label>
                </div>
            )}
            fields={[
                { name: 'naslov', label: 'Naslov', required: true },
                { name: 'vrsta', label: 'Vrsta', type: 'select', required: true, options: VRSTE_PROGRAMA.map((v) => ({ value: v, label: v })) },
                { name: 'izlagacSifra', label: 'Izlagač', type: 'select', asNumber: true, required: true, options: izlagaci.stavke.map((i) => ({ value: i.sifra, label: i.naziv })) },
                { name: 'datum', label: 'Datum', type: 'date', required: true },
                { name: 'trajanje', label: 'Trajanje (min)', type: 'number', required: true, default: 45 },
                { name: 'lokacija', label: 'Lokacija', required: true },
                { name: 'snimiti', label: 'Snimiti za video', type: 'checkbox' },
            ]}
            columns={[
                { render: (p) => formatDatum(p.datum), label: 'Datum' },
                { key: 'naslov', label: 'Naslov' },
                { key: 'vrsta', label: 'Vrsta' },
                { render: (p) => izlagac(p.izlagacSifra)?.naziv ?? '—', label: 'Izlagač' },
                { render: (p) => `${p.trajanje} min`, label: 'Trajanje' },
                { key: 'lokacija', label: 'Lokacija' },
                { render: (p) => (p.snimiti ? <span className="oznaka ok">Snima se</span> : '—'), label: 'Video' },
            ]}
        />
    )
}
