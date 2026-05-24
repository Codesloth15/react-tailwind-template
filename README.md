# React + Vite + Tailwind CSS Template

A professional, production-ready template for building modern React applications with Vite and Tailwind CSS. Features a pre-configured folder structure, reusable components, custom hooks, and API integration setup.

---

## 📋 About This Template

This is a **React Vite template** with:
- ⚡ **Vite** - Lightning-fast build tool and dev server
- ⚛️ **React 19** - Latest React features
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework
- 🗂️ **Professional Folder Structure** - Organized and scalable
- 🔗 **Path Aliases** - Clean imports with `@/` prefix
- 🎯 **Pre-built Components** - Navigation, Hero, Cards, Buttons
- 🛠️ **Utility Functions** - Formatting, validation, API calls
- ⚙️ **Custom Hooks** - Authentication and state management ready

---

## 📂 Folder Structure

```
react-tailwind-template/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Navigation.jsx
│   │   ├── HeroSection.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── Footer.jsx
│   │   ├── Button.jsx
│   │   └── Card.jsx
│   ├── pages/                # Page components (ready to add)
│   ├── hooks/                # Custom React hooks
│   │   └── useAuth.js
│   ├── services/             # API & external services
│   │   └── api.js
│   ├── utils/                # Utility functions
│   │   ├── formatting.js
│   │   └── validation.js
│   ├── context/              # React Context (ready to add)
│   ├── styles/               # Global styles
│   │   ├── index.css
│   │   └── App.css
│   ├── assets/               # Images, fonts, etc.
│   ├── App.jsx
│   └── main.jsx
├── public/                   # Static files
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
├── package.json
└── README.md
```

---

## 🚀 How to Run This Template

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Start Development Server**
```bash
npm run dev
```
The app will open at: **http://localhost:5173**

### 3. **Build for Production**
```bash
npm run build
```

### 4. **Preview Production Build**
```bash
npm run preview
```

---

## 🎯 How to Create a New Project from This Template

### Option 1: Clone This Template (Recommended)
```bash
# Clone the repository
git clone <your-repo-url> my-new-project
cd my-new-project

# Remove the git history
rm -rf .git
git init

# Install dependencies
npm install

# Start developing
npm run dev
```

### Option 2: Use as a Template (GitHub)
- Click **"Use this template"** button on GitHub
- GitHub creates a new repository from this template
- Clone your new repository and start developing

### Option 3: Manual Setup
If you want to create from scratch:

```bash
# Create Vite project
npm create vite@latest my-app -- --template react
cd my-app

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install additional dependencies
npm install react-router-dom

# Copy folder structure
mkdir -p src/{components,pages,hooks,services,utils,context,styles,assets}

# Start development
npm run dev
```

---

## 💻 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.x | UI Framework |
| Vite | 5.x | Build Tool & Dev Server |
| Tailwind CSS | 4.x | Styling |
| Node.js | 18+ | Runtime |

---

## 📦 Pre-configured Features

### ✅ Components Included
- **Navigation.jsx** - Responsive header with logo
- **HeroSection.jsx** - Landing hero section
- **FeaturesSection.jsx** - Feature showcase cards
- **Footer.jsx** - Footer with links
- **Button.jsx** - Reusable button component
- **Card.jsx** - Reusable card component

### ✅ Utilities Included
- **validation.js** - Email, password, username validation
- **formatting.js** - Date, time, text formatting
- **api.js** - Axios instance with auto token injection

### ✅ Hooks Included
- **useAuth.js** - Authentication state management

### ✅ Path Aliases
```javascript
// Import with clean paths
import Button from '@/components/Button'
import { formatDate } from '@/utils/formatting'
import api from '@/services/api'
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Building
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint (if configured)
```

---

## 📚 Quick Component Usage

### Using Button Component
```jsx
import Button from '@/components/Button'

export default function App() {
  return <Button variant="primary">Click me</Button>
}
```

### Using API Service
```jsx
import api from '@/services/api'

const data = await api.get('/endpoint')
const result = await api.post('/endpoint', { data })
```

### Using Validation
```jsx
import { isValidEmail } from '@/utils/validation'

if (isValidEmail(email)) {
  // Valid email
}
```

---

## ✨ Next Steps

### 1. Add Routing
```bash
npm install react-router-dom
```

### 2. Create Pages
Add page components in `src/pages/`:
- Home.jsx
- About.jsx
- Contact.jsx

### 3. Add State Management
Create contexts in `src/context/`:
- AuthContext.jsx
- ThemeContext.jsx

### 4. Create Custom Hooks
Add more hooks in `src/hooks/`:
- useLocalStorage.js
- useFetch.js

### 5. Configure API
Update `src/services/api.js` with your API base URL

---

## 🎨 Customization

### Change Tailwind Theme
Edit `tailwind.config.js`:
```javascript
export default {
  theme: {
    colors: {
      primary: '#your-color'
    }
  }
}
```

### Add Environment Variables
Create `.env.local`:
```
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=My App
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## 📞 Support & Documentation

For detailed information:
- See component comment headers for usage examples
- Check Tailwind docs: https://tailwindcss.com
- Check Vite docs: https://vitejs.dev
- Check React docs: https://react.dev

---

## 📄 License

This template is open source and available under the MIT License.

---

## 🎉 You're Ready!

This template includes everything you need to:
✅ Build modern React applications  
✅ Use Tailwind CSS for styling  
✅ Organize code professionally  
✅ Scale and maintain easily  
✅ Integrate with APIs  

**Start building now:** `npm run dev`
