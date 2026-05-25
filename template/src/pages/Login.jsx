import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import katalkLogo from '@/assets/bg-katalk.png'
import { signIn } from '@/services/authService'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    // validation
    if (!email || !password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await signIn(email, password)

      if (error) {
        setError(error)
        setLoading(false)
        return
      }

      console.log('Login success:', data)

      setLoading(false)
      navigate('/home')
    } catch (err) {
      setError('Unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div
        className="hidden md:flex md:w-1/2 items-center justify-center p-8"
        style={{ backgroundColor: '#FF9B51' }}
      >
        <div className="text-center text-white">
          <img
            src={katalkLogo}
            alt="KaTalk Logo"
            className="w-full max-w-md mx-auto mb-8"
          />

          <p className="text-2xl font-semibold mb-2">
            Connect with Your Community
          </p>

          <p className="text-lg opacity-90">
            Simple, secure, and friendly communication
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary">
              Welcome Back
            </h1>
            <p className="mt-2 text-secondary">
              Sign in to your account
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-500 px-4 py-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">

                <label className="flex items-center gap-2 text-sm text-secondary">
                  <input type="checkbox" className="w-4 h-4" />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-orange-500 font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: '#FF9B51' }}
                className="w-full text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-secondary mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-orange-500 font-medium hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}