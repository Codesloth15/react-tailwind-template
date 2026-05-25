import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import katalkLogo from '@/assets/bg-katalk.png'
import { signUp } from '@/services/authService.js'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    // validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      setLoading(false)
      return
    }

    try {
      const { data, error } = await signUp(email, password, {
        full_name: name
      })

      if (error) {
        setError(error)
        setLoading(false)
        return
      }

      console.log('Signup success:', data)

      setLoading(false)

      // You can redirect to login OR home
      navigate('/')
    } catch (err) {
      setError('Unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex overflow-hidden">

      {/* LEFT SIDE - FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-background px-4 py-6">

        <div className="w-full max-w-md flex flex-col justify-center">

          {/* HEADER */}
          <div className="text-center mb-5">
            <h1 className="text-3xl font-bold text-primary">
              Create Account
            </h1>
            <p className="text-sm text-secondary mt-1">
              Sign up to get started
            </p>
          </div>

          {/* CARD */}
          <div className="bg-white rounded-xl shadow-lg p-6">

            {/* ERROR */}
            {error && (
              <div className="bg-red-50 border border-red-300 text-red-500 px-3 py-2 rounded-lg text-sm mb-3">
                {error}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name */}
              <div>
                <label className="text-sm font-medium text-primary">
                  Username
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

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
                <label className="text-sm font-medium text-primary">
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm font-medium text-primary">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* SHOW PASSWORD */}
              <label className="flex items-center gap-2 text-sm text-secondary">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                Show password
              </label>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: '#FF9B51' }}
                className="w-full text-white py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>
          </div>

          {/* FOOTER */}
          <p className="text-center text-sm mt-4 text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - INFO */}
      <div
        className="hidden md:flex md:w-1/2 items-center justify-center p-6"
        style={{ backgroundColor: '#FF9B51' }}
      >
        <div className="text-center text-white">
          <img
            src={katalkLogo}
            className="w-full max-w-xs mx-auto mb-6"
            alt="logo"
          />

          <h2 className="text-xl font-semibold mb-2">
            Join the Community Today
          </h2>

          <p className="text-sm opacity-90">
            Create your account and start connecting instantly
          </p>
        </div>
      </div>

    </div>
  )
}