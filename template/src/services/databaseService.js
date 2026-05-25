import { supabase } from './supabase'

/**
 * Fetch data from a table
 */
export const fetchData = async (tableName, options = {}) => {
  try {
    let query = supabase.from(tableName).select(options.select || '*')

    if (options.where) {
      Object.entries(options.where).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
    }

    if (options.order) {
      query = query.order(options.order.column, {
        ascending: options.order.ascending !== false
      })
    }

    if (options.limit) {
      query = query.limit(options.limit)
    }

    const { data, error } = await query

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

/**
 * Fetch a single record by ID
 */
export const fetchById = async (tableName, id) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

/**
 * Insert a new record
 */
export const insertData = async (tableName, record) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .insert([record])
      .select()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

/**
 * Update a record
 */
export const updateData = async (tableName, id, updates) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .update(updates)
      .eq('id', id)
      .select()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

/**
 * Delete a record
 */
export const deleteData = async (tableName, id) => {
  try {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id)

    if (error) throw error

    return { error: null }
  } catch (error) {
    return { error: error.message }
  }
}

/**
 * Batch insert multiple records
 */
export const insertBatch = async (tableName, records) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .insert(records)
      .select()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

/**
 * Listen to real-time changes in a table
 */
export const subscribeToTable = (tableName, callback) => {
  const subscription = supabase
    .from(tableName)
    .on('*', (payload) => {
      callback(payload)
    })
    .subscribe()

  return subscription
}
