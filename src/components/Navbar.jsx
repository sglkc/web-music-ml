import { NavLink } from 'react-router-dom'

const pages = [
  { to: '/', text: 'Main Page' },
  { to: '/songs', text: 'Songs' },
  { to: '/artists', text: 'Artists' },
]

export default function Navbar() {
  return (
    <nav className="mb-8 flex justify-center underline underline-from-font">
      { pages.map((page) => (
        <NavLink
          key={page.to}
          to={page.to}
          className={({ isActive }) => isActive
            ? 'px-6 py-3 rounded-b-2 font-bold bg-blue-100 transition-colors'
            : 'px-6 py-3 rounded-b-2 hover:bg-gray-100 transition-colors'
          }
          end
        >
          { page.text }
        </NavLink>
      ))}
    </nav>
  )
}
