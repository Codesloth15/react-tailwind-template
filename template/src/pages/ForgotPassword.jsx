import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      console.log('Forgot password request:', { email })
      
      setTimeout(() => {
        setLoading(false)
        setSuccess(true)
      }, 1000)
    } catch (err) {
      setError('Failed to send reset email')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary">Check Your Email</h1>
            <p className="mt-2 text-secondary">We've sent password reset instructions</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700 text-sm">
                We've sent a password reset link to <strong>{email}</strong>. Check your email and click the link to reset your password.
              </p>
              <p className="text-green-600 text-xs mt-2">
                If you don't see the email, check your spam folder.
              </p>
            </div>

            {/* Back to Login */}
            <div className="space-y-3">
              <Link
                to="/login"
                style={{ backgroundColor: '#FF9B51' }}
                className="block w-full text-center text-white py-2 rounded-lg hover:opacity-90 font-medium transition"
              >
                Back to Login
              </Link>
              <button
                onClick={() => setSuccess(false)}
                className="w-full text-center text-primary hover:text-success font-medium"
              >
                Try Another Email
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">Reset Password</h1>
          <p className="mt-2 text-secondary">Enter your email to receive reset instructions</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-error text-error px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Forgot Password Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="you@example.com"
              />
              <p className="mt-2 text-xs text-secondary">
                We'll send you a link to reset your password
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: '#FF9B51' }}
              className="w-full text-white py-2 rounded-lg hover:opacity-90 font-medium transition disabled:bg-secondary disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          {/* Back to Login */}
          <Link
            to="/login"
            className="block w-full text-center text-primary hover:text-success font-medium py-2 border border-primary rounded-lg hover:bg-background transition"
          >
            Back to Login
          </Link>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-secondary">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:text-success font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
