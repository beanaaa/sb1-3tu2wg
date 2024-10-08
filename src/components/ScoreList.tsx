import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Users, Trophy, MapPin, Flag } from 'lucide-react'

interface Score {
  id: number
  league: string
  circuit: string
  player: string
  score: number
  completed: boolean
}

function ScoreList() {
  const [scores, setScores] = useState<Score[]>([])

  useEffect(() => {
    axios.get('/api/scores')
      .then(response => {
        setScores(response.data)
      })
      .catch(error => {
        console.error('Error fetching scores:', error)
      })
  }, [])

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">최신 심레이싱 점수 집계</h2>
      <ul className="space-y-4">
        {scores.map((score) => (
          <li key={score.id} className="bg-gray-50 rounded-lg p-4 shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Trophy className="h-5 w-5 text-yellow-400 mr-2" />
                <span className="font-semibold">{score.score}</span>
              </div>
              <div className="flex items-center">
                <Flag className={`h-5 w-5 ${score.completed ? 'text-green-500' : 'text-red-500'} mr-2`} />
                <span>{score.completed ? '완주' : '미완주'}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{score.player}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{score.circuit}</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              리그: {score.league}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ScoreList