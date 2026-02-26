"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

export default function InvoiceView() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const { id } = useParams()

  const [invoice, setInvoice] = useState(null)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchInvoice()
  }, [])

  async function fetchInvoice() {

    const { data: invoiceData } = await supabase
      .from("invoices")
      .select("*, customers(*)")
      .eq("id", id)
      .single()

    const { data: itemData } = await supabase
      .from("invoice_items")
      .select("*, products(*)")
      .eq("invoice_id", id)

    setInvoice(invoiceData)
    setItems(itemData)
  }

  if (!invoice) return <p>Loading...</p>

  const grandTotal = items.reduce((sum, item) => sum + item.total, 0)

  return (
    <div style={{ background: "white", padding: "40px" }}>

      <h1>Alok Harsh Rice Mill</h1>
      <p>Rice Mill Billing System</p>

      <hr />

      <h2>Invoice</h2>
      <p><strong>Customer:</strong> {invoice.customers.name}</p>
      <p><strong>Date:</strong> {new Date(invoice.created_at).toLocaleDateString()}</p>

      <table border="1" width="100%" cellPadding="10" style={{ marginTop: "20px" }}>
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
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.products.name}</td>
              <td>{item.quantity}</td>
              <td>₹ {item.price}</td>
              <td>{item.gst_percent}%</td>
              <td>₹ {item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ textAlign: "right" }}>Grand Total: ₹ {grandTotal}</h2>

      <div style={{ marginTop: "30px" }}>
        <button onClick={() => window.print()}>
          🖨 Print Bill
        </button>

        <button
          style={{ marginLeft: "15px" }}
          onClick={() => {
            const message = `Invoice from Alok Harsh Rice Mill\nTotal Amount: ₹ ${grandTotal}`
            window.open(`https://wa.me/${invoice.customers.phone}?text=${encodeURIComponent(message)}`)
          }}
        >
          📲 Send WhatsApp
        </button>
      </div>

    </div>
  )
}
