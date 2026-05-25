import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import katalkLogo from '@/assets/login.png'
import { getSession } from '@/services/authService'

export default function SplashScreen() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { session } = await getSession()

        // small delay for splash feel
        setTimeout(() => {
          setLoading(false)

          if (session) {
            navigate('/home')
          } else {
            navigate('/login')
          }
        }, 2000)

      } catch (error) {
        console.log('Session check error:', error)
        setLoading(false)
        navigate('/login')
      }
    }

    checkUser()
  }, [navigate])

  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{ backgroundColor: '#FF9B51' }}
    >
      <div className="text-center">

        {/* Logo */}
        <h1 className="text-7xl text-[#25343F] font-black">
          KATALK
        </h1>

        <img
          src={katalkLogo}
          alt="KaTalk Logo"
          className="w-full max-w-lg h-auto object-contain"
        />

        {/* Loading text */}
        <p className="mt-6 text-white text-lg font-medium">
          {loading ? 'Loading...' : 'Redirecting...'}
        </p>

        {/* Simple spinner */}
        {loading && (
          <div className="mt-4 flex justify-center">
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

      </div>
    </div>
  )
}