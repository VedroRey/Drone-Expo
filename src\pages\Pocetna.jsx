import { danas, formatDatum } from '../constants'
import { useLista } from '../hooks'
import IzlagacService from '../services/IzlagacService'
import ProgramService from '../services/ProgramService'

export default function Pocetna({ idi }) {

    const izlagaci = useLista(IzlagacService)
    const program = useLista(ProgramService)

    const platili = izlagaci.stavke.filter((i) => i.kotizacijaPlacena).length
    const povrsina = izlagaci.stavke.reduce((z, i) => z + i.stand, 0)
    const izlagac = (sifra) => izlagaci.stavke.find((i) => i.sifra === sifra)?.naziv ?? '—'
    const nadolazeci = program.stavke
        .filter((p) => p.datum >= danas())
        .sort((a, b) => a.datum.localeCompare(b.datum))
        .slice(0, 6)

    const kutije = [
        { broj: `${platili} / ${izlagaci.stavke.length}`, tekst: 'Izlagača platilo kotizaciju', na: 'izlagaci' },
        { broj: program.stavke.length, tekst: 'Točaka programa', na: 'program' },
        { broj: `${povrsina} m²`, tekst: 'Ukupna površina štandova', na: 'izlagaci' },
    ]

    return (
        <>
            <section className="naslovnica">
                <h1>Osijek Drone Expo</h1>
                <p className="prigusen">Organizacija izložbe: izlagači, štandovi i program na jednom mjestu.</p>
            </section>

            <div className="kutije">
                {kutije.map((k) => (
                    <button key={k.tekst} className="kutija statistika" onClick={() => idi(k.na)}>
                        <b>{k.broj}</b>
                        <span>{k.tekst}</span>
                    </button>
                ))}
            </div>

            <h2>Nadolazeći program</h2>
            <div className="kutija tablica-omot">
                {nadolazeci.length === 0 ? (
                    <p className="prigusen popuna">Nema nadolazećeg programa.</p>
                ) : (
                    <table>
                        <thead>
                            <tr><th>Datum</th><th>Naslov</th><th>Izlagač</th><th>Lokacija</th><th>Video</th></tr>
                        </thead>
                        <tbody>
                            {nadolazeci.map((p) => (
                                <tr key={p.sifra}>
                                    <td>{formatDatum(p.datum)}</td>
                                    <td>{p.naslov}</td>
                                    <td>{izlagac(p.izlagacSifra)}</td>
                                    <td>{p.lokacija}</td>
                                    <td>{p.snimiti ? <span className="oznaka ok">Snima se</span> : '—'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}
