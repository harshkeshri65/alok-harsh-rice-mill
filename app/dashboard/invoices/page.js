"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

export default function CreateInvoice() {

  const router = useRouter()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])

  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [selectedProduct, setSelectedProduct] = useState("")
  const [quantity, setQuantity] = useState("")

  const [items, setItems] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const { data: customerData } = await supabase.from("customers").select("*")
    const { data: productData } = await supabase.from("products").select("*")

    setCustomers(customerData || [])
    setProducts(productData || [])
  }

  function addItem() {

    const product = products.find(p => p.id === selectedProduct)
    if (!product || !quantity) return

    const price = product.price
    const gstPercent = product.gst_percent
    const gstAmount = (price * quantity * gstPercent) / 100
    const total = (price * quantity) + gstAmount

    const newItem = {
      product_id: product.id,
      name: product.name,
      quantity: Number(quantity),
      price: price,
      gst_percent: gstPercent,
      gst_amount: gstAmount,
      total: total
    }

    setItems([...items, newItem])
    setQuantity("")
  }

  async function saveInvoice() {

    if (!selectedCustomer || items.length === 0) {
      alert("Select customer and add items")
      return
    }

    const grandTotal = items.reduce((sum, item) => sum + item.total, 0)

    // Insert invoice
    const { data: invoiceData, error: invoiceError } = await supabase
      .from("invoices")
      .insert([
        {
          customer_id: selectedCustomer,
          total_amount: grandTotal
        }
      ])
      .select()
      .single()

    if (invoiceError) {
      console.log(invoiceError)
      return
    }

    // Insert invoice items
    const itemsToInsert = items.map(item => ({
      invoice_id: invoiceData.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
      gst_percent: item.gst_percent,
      gst_amount: item.gst_amount,
      total: item.total
    }))

    await supabase.from("invoice_items").insert(itemsToInsert)

    // Redirect to printable invoice
    router.push(`/dashboard/invoices/${invoiceData.id}`)
  }

  const grandTotal = items.reduce((sum, item) => sum + item.total, 0)

  return (
    <div>
      <h1>Create Invoice</h1>

      <div style={{ marginBottom: "20px" }}>
        <select onChange={(e)=>setSelectedCustomer(e.target.value)}>
          <option value="">Select Customer</option>
          {customers.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <select onChange={(e)=>setSelectedProduct(e.target.value)}>
          <option value="">Select Product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>
              {p.name} (₹{p.price})
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e)=>setQuantity(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <button onClick={addItem} style={{ marginLeft: "10px" }}>
          Add
        </button>
      </div>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>GST</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>₹ {item.price}</td>
              <td>₹ {item.gst_amount}</td>
              <td>₹ {item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ textAlign: "right" }}>
        Grand Total: ₹ {grandTotal}
      </h2>

      <button onClick={saveInvoice}>
        Save Invoice
      </button>

    </div>
  )
}
