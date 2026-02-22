import { useState } from 'react'
import './WaitlistModal.css'

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwh4fjfDXKpvP8T5zarBLL6KZqFWbsoeYoN4cqgI2y41gqboCmfC-1Ue766crQbzw90/exec'

function WaitlistModal({ isOpen, onClose }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | submitted | error
  const [errorMsg, setErrorMsg] = useState('')

  const resetForm = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setStatus('idle')
    setErrorMsg('')
  }

  const handleClose = () => {
    if (status !== 'submitting') {
      resetForm()
      onClose()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email }),
      })

      if (!res.ok) throw new Error('Network response was not ok')

      const data = await res.json()
      if (data.result !== 'success') throw new Error(data.error || 'Unknown error')

      setStatus('submitted')
      setTimeout(() => {
        resetForm()
        onClose()
      }, 1500)
    } catch (err) {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  return (
    <div
      className={`waitlist-overlay${isOpen ? ' open' : ''}`}
      onClick={handleClose}
    >
      <div className="waitlist-card" onClick={(e) => e.stopPropagation()}>
        <button className="waitlist-close" onClick={handleClose} aria-label="Close">
          &times;
        </button>
        <h2 className="waitlist-title">Join the Waitlist</h2>
        {status === 'submitted' ? (
          <p className="waitlist-status success">You're on the list!</p>
        ) : (
          <form className="waitlist-form" onSubmit={handleSubmit}>
            <input
              className="waitlist-input"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={status === 'submitting'}
            />
            <input
              className="waitlist-input"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={status === 'submitting'}
            />
            <input
              className="waitlist-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'submitting'}
            />
            {status === 'error' && (
              <p className="waitlist-status error">{errorMsg}</p>
            )}
            <button
              className="waitlist-submit"
              type="submit"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default WaitlistModal
