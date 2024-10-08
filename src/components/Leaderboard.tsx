import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface LeaderboardEntry {
  player: string
  total_score: number
  races: number
  completed_races: number
}

function Leaderboard() {
  const [leagues, setLeagues] = useState<string[]>([])
  const [selectedLeague, setSelectedLeague] = useState<string>('')
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    axios.get('/api/leagues')
      .then(response => {
        setLeagues(response.data)
        if (response.data.length > 0) {
          setSelectedLeague(response.data[0])
        }
      })
      .catch(error => {
        console.error('Error fetching leagues:', error)
      })
  }, [])

  useEffect(() => {
    if (selectedLeague) {
      axios.get(`/api/scores?league=${encodeURIComponent(selectedLeague)}`)
        .then(response => {
          setLeaderboard(response.data)
        })
        .catch(error => {
          console.error('Error fetching leaderboard:', error)
        })
    }
  }, [selectedLeague])

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">ESK 심레이싱 순위표</h2>
      <div className="mb-4">
        <label htmlFor="league-select" className="block text-sm font-medium text-gray-700">리그 선택</label>
        <select
          id="league-select"
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {leagues.map((league) => (
            <option key={league} value={league}>{league}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">순위</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">플레이어</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">총점</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">참가 레이스</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">완주율</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaderboard.map((entry, index) => (
              <tr key={entry.player}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.player}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.total_score}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.races}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {((entry.completed_races / entry.races) * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard