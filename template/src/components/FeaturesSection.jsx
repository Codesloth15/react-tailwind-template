/**
 * Features Section Component
 * Display app features in a grid layout
 */

const FEATURES = [
  { icon: '🔒', title: 'Encrypted', desc: 'End-to-end encryption for all your conversations' },
  { icon: '⚡', title: 'Instant', desc: 'Real-time messaging with zero latency' },
  { icon: '🌍', title: 'Global', desc: 'Connect with anyone around the world' },
  { icon: '📱', title: 'Cross-Platform', desc: 'Use on web, mobile, and desktop' },
  { icon: '🎨', title: 'Customizable', desc: 'Personalize your chat experience' },
  { icon: '👥', title: 'Group Chat', desc: 'Create unlimited group conversations' },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50 border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Powerful Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <div key={i} className="bg-slate-700/50 border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/50 transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
