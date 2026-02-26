'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.push('/login')
      }
    }

    checkUser()
  }, [])

  return (
    <div style={{padding:'40px'}}>
      <h1>Welcome to Alok Harsh Rice Mill Dashboard</h1>
      <p>Secure area 🔒</p>
    </div>
  )
}
