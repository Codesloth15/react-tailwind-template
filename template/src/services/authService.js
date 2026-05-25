import { supabase } from './supabase'

/**
 * Sign up a new user with email and password
 */
export const signUp = async (email, password, userData = {}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

/**
 * Sign in with email and password
 */
export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

/**
 * Sign out the current user
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) throw error

    return { error: null }
  } catch (error) {
    return { error: error.message }
  }
}

/**
 * Get the current user session
 */
export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession()

    if (error) throw error

    return { session: data.session, error: null }
  } catch (error) {
    return { session: null, error: error.message }
  }
}

/**
 * Reset password via email
 */
export const resetPassword = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })

    if (error) throw error

    return { error: null }
  } catch (error) {
    return { error: error.message }
  }
}

/**
 * Update user password
 */
export const updatePassword = async (newPassword) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

/**
 * Get the current authenticated user
 */
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser()

    if (error) throw error

    return { user: data.user, error: null }
  } catch (error) {
    return { user: null, error: error.message }
  }
}

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      callback(event, session)
    }
  )

  return subscription
}
