export const IME_APLIKACIJE = 'Osijek Drone Expo'
export const AUTOR = 'Vedran Kralj'

export const STRANICE = [
    { id: 'pocetna', naziv: 'Početna' },
    { id: 'izlagaci', naziv: 'Izlagači' },
    { id: 'program', naziv: 'Program' },
]

export const VRSTE_PROGRAMA = ['Predavanje', 'Demonstracija letenja', 'Radionica']

// 2027-05-14 -> 14. 05. 2027.
export const formatDatum = (d) => (d ? d.split('-').reverse().join('. ') + '.' : '')

export const danas = () => new Date().toISOString().slice(0, 10)

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
