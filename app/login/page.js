'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert('Invalid login credentials')
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div style={{display:'flex',height:'100vh',justifyContent:'center',alignItems:'center'}}>
      <form onSubmit={handleLogin} style={{padding:'30px',border:'1px solid #ddd',borderRadius:'8px',width:'300px'}}>
        <h2 style={{marginBottom:'20px'}}>Alok Harsh Rice Mill</h2>

        <input
          type="email"
          placeholder="Email"
          required
          style={{width:'100%',padding:'8px',marginBottom:'10px'}}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          style={{width:'100%',padding:'8px',marginBottom:'15px'}}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          style={{width:'100%',padding:'10px',background:'black',color:'white',border:'none'}}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
