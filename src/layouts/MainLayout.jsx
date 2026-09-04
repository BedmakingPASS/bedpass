import { Outlet, useMatches } from 'react-router-dom'
import Sidebar from '../components/common/Sidebar.jsx'
import Navbar from '../components/common/Navbar.jsx'

export default function MainLayout() {
  const matches = useMatches()
  const title = matches[matches.length - 1]?.handle?.title ?? ''

  return (
    <div className="flex min-h-screen bg-cba-cream">
      <Sidebar />
      <div className="flex-1">
        <Navbar title={title} />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
