"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

export default function ProductsPage() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  )

  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [gst, setGst] = useState("")
  const [unit, setUnit] = useState("")

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (data) setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  async function addProduct(e) {
    e.preventDefault()

    await supabase.from("products").insert([
      {
        name,
        price: Number(price),
        gst_percent: Number(gst),
        unit
      }
    ])

    setName("")
    setPrice("")
    setGst("")
    setUnit("")
    fetchProducts()
  }

  async function deleteProduct(id) {
    await supabase.from("products").delete().eq("id", id)
    fetchProducts()
  }

  return (
    <div>
      <h1>Products</h1>

      <form onSubmit={addProduct} style={{ marginBottom: "30px" }}>
        <input placeholder="Product Name" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input placeholder="Price" type="number" value={price} onChange={(e)=>setPrice(e.target.value)} required />
        <input placeholder="GST %" type="number" value={gst} onChange={(e)=>setGst(e.target.value)} />
        <input placeholder="Unit (kg/bag)" value={unit} onChange={(e)=>setUnit(e.target.value)} />
        <button type="submit">Add Product</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>GST %</th>
            <th>Unit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>₹ {p.price}</td>
              <td>{p.gst_percent}%</td>
              <td>{p.unit}</td>
              <td>
                <button onClick={()=>deleteProduct(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}
