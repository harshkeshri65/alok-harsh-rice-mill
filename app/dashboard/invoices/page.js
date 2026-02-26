
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
  const [loading, setLoading] = useState(false)

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

    if (!product) {
      alert("Select product")
      return
    }

    if (!quantity || Number(quantity) <= 0) {
      alert("Enter valid quantity")
      return
    }

    const qty = Number(quantity)
    const price = Number(product.price)
    const gstPercent = Number(product.gst_percent)

    const gstAmount = (price * qty * gstPercent) / 100
    const total = (price * qty) + gstAmount

    const newItem = {
      product_id: product.id,
      name: product.name,
      quantity: qty,
      price: price,
      gst_percent: gstPercent,
      gst_amount: gstAmount,
      total: total
    }

    setItems([...items, newItem])
    setQuantity("")
  }

  async function saveInvoice() {

    if (!selectedCustomer) {
      alert("Select customer")
      return
    }

    if (items.length === 0) {
      alert("Add at least one product")
      return
    }

    setLoading(true)

    const subtotal = items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    )

    const totalGst = items.reduce(
      (sum, item) => sum + item.gst_amount,
      0
    )

    const grandTotal = subtotal + totalGst

    const invoiceNumber = "INV-" + Date.now()

    // 🔥 INSERT INVOICE (MATCHES YOUR TABLE STRUCTURE)
    const { data: invoiceData, error: invoiceError } = await supabase
      .from("invoices")
      .insert([
        {
          invoice_number: invoiceNumber,
          customer_id: selectedCustomer,
          gst_type: "GST",
          subtotal: subtotal,
          gst_amount: totalGst,
          total_amount: grandTotal
        }
      ])
      .select()
      .single()

    if (invoiceError) {
      console.log("Invoice Insert Error:", invoiceError)
      alert("Invoice insert failed")
      setLoading(false)
      return
    }

    // 🔥 INSERT INVOICE ITEMS
    const itemsToInsert = items.map(item => ({
      invoice_id: invoiceData.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
      gst_percent: item.gst_percent,
      gst_amount: item.gst_amount,
      total: item.total
    }))

    const { error: itemsError } = await supabase
      .from("invoice_items")
      .insert(itemsToInsert)

    if (itemsError) {
      console.log("Items Insert Error:", itemsError)
      alert("Invoice items insert failed")
      setLoading(false)
      return
    }

    router.push(`/dashboard/invoices/${invoiceData.id}`)
  }

  const grandTotal = items.reduce((sum, item) => sum + item.total, 0)

  return (
    <div>
      <h1>Create Invoice</h1>

      <div style={{ marginBottom: "20px" }}>
        <select value={selectedCustomer} onChange={(e)=>setSelectedCustomer(e.target.value)}>
          <option value="">Select Customer</option>
          {customers.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <select value={selectedProduct} onChange={(e)=>setSelectedProduct(e.target.value)}>
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

      <button onClick={saveInvoice} disabled={loading}>
        {loading ? "Saving..." : "Save Invoice"}
      </button>

    </div>
  )
}
