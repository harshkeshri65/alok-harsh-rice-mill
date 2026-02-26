"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

export default function CustomersPage() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  )

  const [customers, setCustomers] = useState([])
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [gst, setGst] = useState("")

  async function fetchCustomers() {
    const { data } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false })

    if (data) setCustomers(data)
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  async function addCustomer(e) {
    e.preventDefault()

    await supabase.from("customers").insert([
      { name, phone, address, gst_number: gst }
    ])

    setName("")
    setPhone("")
    setAddress("")
    setGst("")
    fetchCustomers()
  }

  async function deleteCustomer(id) {
    await supabase.from("customers").delete().eq("id", id)
    fetchCustomers()
  }

  return (
    <div>
      <h1>Customers</h1>

      <form onSubmit={addCustomer}>
        <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} required />
        <input placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} />
        <input placeholder="GST Number" value={gst} onChange={(e)=>setGst(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <hr />

      {customers.map((c)=>(
        <div key={c.id}>
          {c.name} - {c.phone}
          <button onClick={()=>deleteCustomer(c.id)}>Delete</button>
        </div>
      ))}

    </div>
  )
}
