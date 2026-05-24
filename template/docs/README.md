# Documentation Index

Welcome to the project documentation! This folder contains comprehensive guides for organizing and developing your React + Tailwind CSS application.

## 📚 Documentation Files

### [COMPONENTS.md](./COMPONENTS.md)
Guide for creating reusable React components. Learn about component structure, best practices, and examples.

### [PAGES.md](./PAGES.md)
Guide for creating page-level components and setting up routing. Understand the difference between pages and components.

### [HOOKS.md](./HOOKS.md)
Guide for building custom React hooks. Includes examples for useAuth, useFetch, useForm, and more.

### [SERVICES.md](./SERVICES.md)
Guide for organizing API calls and business logic. Learn how to create a centralized API client and service modules.

### [CONTEXT.md](./CONTEXT.md)
Guide for managing global state with React Context API. Includes authentication and theme context examples.

### [CONSTANTS.md](./CONSTANTS.md)
Guide for organizing application constants and configuration values. Avoid magic strings and hardcoded values.

### [UTILS.md](./UTILS.md)
Guide for utility functions and helpers. Includes formatters, validators, storage helpers, and more.

### [ASSETS.md](./ASSETS.md)
Guide for organizing static files (images, icons, fonts). Best practices for optimization and organization.

---

## 🚀 Quick Start

1. **Create a new page** → See [PAGES.md](./PAGES.md)
2. **Build a component** → See [COMPONENTS.md](./COMPONENTS.md)
3. **Setup authentication** → See [CONTEXT.md](./CONTEXT.md) & [SERVICES.md](./SERVICES.md)
4. **Add API calls** → See [SERVICES.md](./SERVICES.md)
5. **Extract reusable logic** → See [HOOKS.md](./HOOKS.md)
6. **Add constants** → See [CONSTANTS.md](./CONSTANTS.md)
7. **Create helpers** → See [UTILS.md](./UTILS.md)

---

## 📋 Folder Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Full-page route components
├── hooks/          # Custom React hooks
├── services/       # API clients & business logic
├── context/        # React Context providers
├── constants/      # App constants & config
├── utils/          # Utility & helper functions
├── assets/         # Static files (images, icons)
├── App.jsx         # Main app component
├── index.css       # Global styles with Tailwind
└── main.jsx        # Entry point
```

---

## ✨ Key Principles

- ✅ **Keep components small** - One responsibility per component
- ✅ **Centralize APIs** - All fetch calls in services/
- ✅ **Use hooks** - Extract reusable logic
- ✅ **Global state with Context** - For auth, theme, notifications
- ✅ **No magic strings** - Use constants for all fixed values
- ✅ **DRY principle** - Reuse components and functions
- ✅ **Tailwind CSS** - Use utility classes for styling
- ✅ **Type safety** - Consider TypeScript for larger projects

---

## 🎨 Tech Stack

- **React 19** - UI library
- **Vite** - Build tool with HMR
- **Tailwind CSS v4** - Utility-first styling
- **React Router** - (Optional) Routing
- **ESLint** - Code quality

---

## 📖 Learn More

Each documentation file includes:
- Purpose and guidelines
- What files to create
- Code examples
- Best practices
- Usage patterns

Start with the guide relevant to what you're building!

---

**Last Updated:** 2026-05-18
