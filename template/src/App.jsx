import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            Tailwind CSS Test
          </h1>
          <p className="text-xl text-gray-600">
            Testing all Tailwind features are working correctly
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1 - Colors */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Colors</h2>
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-red-500 rounded"></div>
              <div className="w-12 h-12 bg-yellow-500 rounded"></div>
              <div className="w-12 h-12 bg-green-500 rounded"></div>
              <div className="w-12 h-12 bg-blue-500 rounded"></div>
              <div className="w-12 h-12 bg-purple-500 rounded"></div>
            </div>
          </div>

          {/* Card 2 - Typography */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Typography</h2>
            <div className="space-y-2">
              <p className="text-xs text-gray-500">Extra Small</p>
              <p className="text-sm text-gray-600">Small Text</p>
              <p className="text-base text-gray-700">Base Text</p>
              <p className="text-lg font-semibold text-gray-800">Large Bold</p>
            </div>
          </div>

          {/* Card 3 - Spacing */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-purple-600 mb-4">Spacing</h2>
            <div className="space-y-3">
              <div className="bg-purple-100 p-2 rounded text-sm">Padding Small</div>
              <div className="bg-purple-100 p-4 rounded text-sm">Padding Medium</div>
              <div className="bg-purple-100 p-6 rounded text-sm">Padding Large</div>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Interactive Elements</h2>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Primary Button
            </button>
            <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
              Success Button
            </button>
            <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
              Danger Button
            </button>
            <button className="px-6 py-3 border-2 border-gray-400 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Outline Button
            </button>
          </div>

          {/* Counter */}
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-6">
            <p className="text-lg text-gray-700 mb-4">Counter State Test: <span className="font-bold text-2xl text-purple-600">{count}</span></p>
            <div className="flex gap-3">
              <button
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Increment
              </button>
              <button
                onClick={() => setCount(count - 1)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Decrement
              </button>
              <button
                onClick={() => setCount(0)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Responsive Design (try resizing)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl hover:scale-105 transition-transform cursor-pointer"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p>✅ If you see colorful cards, buttons, gradients, and responsive elements above, Tailwind CSS is working perfectly!</p>
        </div>
      </div>
    </div>
  );
}

export default App;