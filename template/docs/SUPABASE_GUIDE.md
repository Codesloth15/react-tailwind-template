# Supabase Configuration Guide

This guide explains how to set up and use Supabase in your KaTalk React application.

## Installation

Supabase is already added to your `package.json`. Install dependencies:

```bash
npm install
```

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up/Sign in with your GitHub account
4. Create a new project
5. Copy your **Project URL** and **Anon Key**

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Open `.env` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

**Note:** Never commit `.env` to version control. It's already in `.gitignore`.

## File Structure

```
src/
├── services/
│   ├── supabase.js          # Supabase client initialization
│   ├── authService.js       # Authentication functions
│   └── databaseService.js   # Database CRUD operations
├── context/
│   └── AuthContext.jsx      # Auth state management
└── routes/
    └── App.jsx              # Main app component
```

## Usage

### Authentication Service

#### Sign Up
```javascript
import { signUp } from '@/services/authService'

const { data, error } = await signUp(email, password, {
  firstName: 'John',
  lastName: 'Doe'
})
```

#### Sign In
```javascript
import { signIn } from '@/services/authService'

const { data, error } = await signIn(email, password)
```

#### Sign Out
```javascript
import { signOut } from '@/services/authService'

const { error } = await signOut()
```

#### Reset Password
```javascript
import { resetPassword } from '@/services/authService'

const { error } = await resetPassword(email)
```

#### Get Current User
```javascript
import { getCurrentUser } from '@/services/authService'

const { user, error } = await getCurrentUser()
```

### Database Service

#### Fetch Data
```javascript
import { fetchData } from '@/services/databaseService'

// Simple fetch
const { data, error } = await fetchData('users')

// With options
const { data, error } = await fetchData('users', {
  select: 'id, name, email',
  where: { status: 'active' },
  order: { column: 'created_at', ascending: false },
  limit: 10
})
```

#### Fetch by ID
```javascript
import { fetchById } from '@/services/databaseService'

const { data, error } = await fetchById('users', userId)
```

#### Insert Data
```javascript
import { insertData } from '@/services/databaseService'

const { data, error } = await insertData('users', {
  name: 'John Doe',
  email: 'john@example.com'
})
```

#### Update Data
```javascript
import { updateData } from '@/services/databaseService'

const { data, error } = await updateData('users', userId, {
  name: 'Jane Doe'
})
```

#### Delete Data
```javascript
import { deleteData } from '@/services/databaseService'

const { error } = await deleteData('users', userId)
```

#### Batch Insert
```javascript
import { insertBatch } from '@/services/databaseService'

const { data, error } = await insertBatch('users', [
  { name: 'User 1', email: 'user1@example.com' },
  { name: 'User 2', email: 'user2@example.com' }
])
```

### Auth Context (State Management)

Use the `AuthProvider` to manage auth state globally:

1. Wrap your app with `AuthProvider` in `main.jsx`:

```javascript
import { AuthProvider } from '@/context/AuthContext'
import App from '@/routes/App'

root.render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)
```

2. Use the `useAuth` hook in components:

```javascript
import { useAuth } from '@/context/AuthContext'

function MyComponent() {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {user ? (
        <p>Welcome, {user.email}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  )
}
```

## Example: Login Implementation

```javascript
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '@/services/authService'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error } = await signIn(email, password)

    if (error) {
      setError(error)
      setLoading(false)
      return
    }

    // Login successful
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}
```

## Supabase Database Schema Setup

### Users Table (Auto-created by Auth)
Supabase automatically manages the auth.users table.

### Custom Tables Example

```sql
-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant1_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  participant2_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Security & Row Level Security (RLS)

Enable RLS on your tables for security:

```sql
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow users to see their own messages
CREATE POLICY "Users can see their messages"
  ON messages
  FOR SELECT
  USING (sender_id = auth.uid() OR recipient_id = auth.uid());

-- Allow users to insert their own messages
CREATE POLICY "Users can send messages"
  ON messages
  FOR INSERT
  WITH CHECK (sender_id = auth.uid());
```

## Real-time Subscriptions

Listen to real-time changes:

```javascript
import { subscribeToTable } from '@/services/databaseService'

useEffect(() => {
  const subscription = subscribeToTable('messages', (payload) => {
    console.log('New message:', payload)
  })

  return () => subscription.unsubscribe()
}, [])
```

## Troubleshooting

### Missing environment variables
- Ensure `.env` file exists with correct variables
- Restart the dev server after adding env variables

### Authentication errors
- Verify Supabase project URL and Anon Key are correct
- Check that user email is not already registered

### Database errors
- Ensure RLS policies allow the operation
- Check table permissions for the authenticated user

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Database](https://supabase.com/docs/guides/database)
- [Supabase Client Library](https://supabase.com/docs/reference/javascript)
