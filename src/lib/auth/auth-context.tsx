'use client'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export interface Profile {
  id: string
  name: string
  email: string
  role: 'admin' | 'vendedor'
  phone?: string
}

interface AuthState {
  user: User | null
  profile: Profile | null
  loading: boolean
  demoMode: boolean
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    demoMode: false,
  })

  const loadSession = useCallback(async () => {
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        setState({ user: null, profile: null, loading: false, demoMode: true })
        return
      }
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        setState({
          user: session.user,
          profile: profile ? { id: profile.id, name: profile.name, email: session.user.email!, role: profile.role, phone: profile.phone } : null,
          loading: false,
          demoMode: false,
        })
      } else {
        setState({ user: null, profile: null, loading: false, demoMode: false })
      }
    } catch {
      setState({ user: null, profile: null, loading: false, demoMode: true })
    }
  }, [])

  useEffect(() => { loadSession() }, [loadSession])

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return { error: error.message }
      router.refresh()
      router.push('/')
      return {}
    } catch {
      return { error: 'Error de conexión. Verifica que Supabase esté configurado.' }
    }
  }

  const signOut = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch { /* ignore */ }
    setState({ user: null, profile: null, loading: false, demoMode: false })
    router.push('/auth/login')
  }

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut, isAdmin: state.profile?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
