/**
 * Footer Component
 * Application footer with links and copyright
 */

export default function Footer() {
  return (
    <footer className="border-t border-purple-500/20 bg-slate-800/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center text-gray-400">
        <p>&copy; 2024 ChatApp. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
      </div>
    </footer>
  )
}
