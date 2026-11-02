import { useEffect, useState } from 'react'
import { AUTOR, IME_APLIKACIJE, STRANICE } from './constants'
import Izlagaci from './pages/Izlagaci'
import Pocetna from './pages/Pocetna'
import Program from './pages/Program'

const dohvatiStranicu = () => {
  const id = window.location.hash.replace('#/', '').replace('#', '')
  return STRANICE.some((s) => s.id === id) ? id : 'pocetna'
}

function App() {
  const [stranica, setStranica] = useState(dohvatiStranicu)

  useEffect(() => {
    const naPromjenu = () => setStranica(dohvatiStranicu())
    window.addEventListener('hashchange', naPromjenu)
    return () => window.removeEventListener('hashchange', naPromjenu)
  }, [])

  const idi = (id) => { window.location.hash = `#/${id}` }

  return (
    <>
      <header className="zaglavlje">
        <button className="logo" onClick={() => idi('pocetna')}>
          {IME_APLIKACIJE}
          <span className="autor">{AUTOR}</span>
        </button>
        <nav className="izbornik">
          {STRANICE.map((s) => (
            <button key={s.id} className={s.id === stranica ? 'aktivna' : ''} onClick={() => idi(s.id)}>
              {s.naziv}
            </button>
          ))}
        </nav>
      </header>

      <main className="sadrzaj">
        {stranica === 'izlagaci' ? <Izlagaci /> : stranica === 'program' ? <Program /> : <Pocetna idi={idi} />}
      </main>

      <footer className="podnozje">&copy; {IME_APLIKACIJE}</footer>
    </>
  )
}

export default App
