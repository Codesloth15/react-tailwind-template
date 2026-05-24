/**
 * Hero Section Component
 * Main landing page hero with CTA buttons
 */

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Connect with <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Anyone</span>, Anywhere
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Real-time messaging with end-to-end encryption. Chat, share, and collaborate seamlessly across all your devices.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:scale-105">
              Start Chatting →
            </button>
            <button className="px-8 py-3 border border-purple-500 text-purple-400 rounded-lg font-semibold hover:bg-purple-500/10 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Mockup */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-3xl opacity-30 animate-pulse"></div>
          <div className="relative bg-slate-800 rounded-lg p-8 border border-purple-500/30">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-600"></div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-700 rounded w-20"></div>
                  <div className="h-2 bg-gray-600 rounded w-32 mt-2"></div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-600"></div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-700 rounded w-24"></div>
                  <div className="h-2 bg-gray-600 rounded w-40 mt-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
