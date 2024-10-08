import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Trophy } from 'lucide-react'
import ScoreList from './components/ScoreList'
import ScoreForm from './components/ScoreForm'
import Leaderboard from './components/Leaderboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <Trophy className="h-14 w-14 text-yellow-400" />
                <div className="text-2xl font-bold">ESK 심레이싱 점수</div>
              </div>
              <nav className="mt-5">
                <ul className="flex space-x-4">
                  <li>
                    <Link to="/" className="text-blue-500 hover:text-blue-700">순위표</Link>
                  </li>
                  <li>
                    <Link to="/scores" className="text-blue-500 hover:text-blue-700">점수 목록</Link>
                  </li>
                  <li>
                    <Link to="/add" className="text-blue-500 hover:text-blue-700">점수 입력</Link>
                  </li>
                </ul>
              </nav>
              <Routes>
                <Route path="/" element={<Leaderboard />} />
                <Route path="/scores" element={<ScoreList />} />
                <Route path="/add" element={<ScoreForm />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App