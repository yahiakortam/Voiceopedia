import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search, Mic, Heart, Building } from 'lucide-react'

export function Navigation() {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/explore', icon: Search, label: 'Explore' },
    { path: '/report', icon: Mic, label: 'Report' },
    { path: '/resources', icon: Heart, label: 'Resources' },
    { path: '/organization', icon: Building, label: 'About' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-blue-200 shadow-lg z-50">
      <div className="container mx-auto px-4 max-w-screen-sm">
        <div className="flex items-center justify-around h-16">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path
            
            return (
              <Link
                key={path}
                to={path}
                className="flex flex-col items-center justify-center space-y-1 py-2 px-3 rounded-lg transition-colors relative"
              >
                <motion.div
                  className={`p-2 rounded-full transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'text-blue-400 hover:bg-blue-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.div>
                <span 
                  className={`text-xs font-medium transition-colors ${
                    isActive ? 'text-blue-600' : 'text-blue-400'
                  }`}
                >
                  {label}
                </span>
                {isActive && (
                  <motion.div
                    className="absolute -top-1 left-1/2 w-1 h-1 bg-blue-500 rounded-full"
                    layoutId="activeIndicator"
                    initial={false}
                    style={{ x: '-50%' }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

