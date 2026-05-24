# Components

Reusable React components used across multiple pages.

## Purpose
The `components/` folder stores small, reusable UI elements that appear in multiple places throughout your application.

## What to Put Here
- `Button.jsx` - Reusable button component
- `Card.jsx` - Card layout component
- `Header.jsx` - Header component
- `Footer.jsx` - Footer component
- `Modal.jsx` - Modal dialog component
- `Navbar.jsx` - Navigation bar component
- `Form.jsx` - Form component
- `Loader.jsx` - Loading spinner component
- `Alert.jsx` - Alert/notification component

## Guidelines
- Keep components **small and focused**
- Each component should do **one thing well**
- Use **Tailwind CSS** for styling
- Accept props for customization
- Don't include page-specific logic

## Example

```jsx
// components/Button.jsx
export function Button({ text, onClick, variant = 'primary' }) {
  const baseStyles = "font-semibold py-2 px-4 rounded transition duration-200";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
```

## Usage in Other Components

```jsx
import { Button } from '@/components/Button';

export function MyComponent() {
  return (
    <div>
      <Button text="Click me" variant="primary" />
      <Button text="Cancel" variant="secondary" />
    </div>
  );
}
```
