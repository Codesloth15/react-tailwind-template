# React + Tailwind CSS Template

A modern, minimal React template with Tailwind CSS v4 and Vite for rapid UI development.

## Features

- ⚡ **Vite** - Lightning-fast build tool with HMR
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework with auto-discovery
- ⚛️ **React 19** - Latest React features
- 🔧 **ESLint** - Code quality and consistency
- 📦 **Clean Structure** - Ready-to-use project layout

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm build
```

### Preview

```bash
npm preview
```

## Project Structure

```
src/
├── components/      # Reusable React components
├── pages/          # Page components
├── hooks/          # Custom React hooks
├── services/       # API and external services
├── utils/          # Utility functions
├── context/        # React Context providers
├── constants/      # Constants and config
├── styles/         # Global styles (if needed)
├── App.jsx         # Main App component
├── index.css       # Global styles with Tailwind
└── main.jsx        # Entry point
```

## Styling

This template uses **Tailwind CSS v4** with the Vite plugin for automatic CSS processing. All Tailwind utilities are available - no configuration needed.

### Example

```jsx
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
  <h1 className="text-5xl font-bold text-gray-900">Welcome</h1>
</div>
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
