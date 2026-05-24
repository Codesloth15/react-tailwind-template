/**
 * Reusable Card Component
 * Generic card wrapper for content
 */

export default function Card({ 
  children, 
  className = '',
  hover = true,
  ...props 
}) {
  const hoverClass = hover ? 'hover:border-purple-500/50' : ''
  
  return (
    <div
      className={`bg-slate-700/50 border border-purple-500/20 rounded-lg p-6 transition ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
