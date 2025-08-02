import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Home } from './pages/Home'
import { Explore } from './pages/Explore'
import { Listen } from './pages/Listen'
import { Support } from './pages/Support'
import { Report } from './pages/Report'
import { Resources } from './pages/Resources'
import { OrganizationInfo } from './pages/OrganizationInfo'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="container mx-auto px-4 pb-20 max-w-screen-sm">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/listen/:id" element={<Listen />} />
            <Route path="/support/:id" element={<Support />} />
            <Route path="/report" element={<Report />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/organization" element={<OrganizationInfo />} />
          </Routes>
        </div>
        <Navigation />
      </div>
    </Router>
  )
}

export default App

