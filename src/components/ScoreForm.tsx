import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ScoreForm() {
  // ... (이전 코드는 그대로 유지)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await axios.post('/api/scores', {
        ...formData,
        score: parseInt(formData.score)
      })
      console.log('Score submitted successfully:', response.data)
      navigate('/')
    } catch (error) {
      console.error('Error submitting score:', error)
      setError('점수 제출 중 오류가 발생했습니다. 다시 시도해 주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ... (나머지 코드는 그대로 유지)
}

export default ScoreForm