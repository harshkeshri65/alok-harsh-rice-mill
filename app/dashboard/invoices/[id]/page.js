"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

export default function InvoiceView() {

  const { id } = useParams()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const [invoice, setInvoice] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchInvoice()
  }, [])

  async function fetchInvoice() {

    const { data: invoiceData } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", id)
      .single()

    if (!invoiceData) return

    setInvoice(invoiceData)

    const { data: customerData } = await supabase
      .from("customers")
      .select("*")
      .eq("id", invoiceData.customer_id)
      .single()

    setCustomer(customerData)

    const { data: itemData } = await supabase
      .from("invoice_items")
      .select("*, products(name, hsn)")
      .eq("invoice_id", id)

    setItems(itemData || [])
  }

  function printInvoice() {
    window.print()
  }

  if (!invoice || !customer) return <div>Loading...</div>

  return (
    <div style={{ padding: "40px", background: "white" }}>

      <h2 style={{ textAlign: "center" }}>Bill of Supply</h2>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <h3>ALOK HARSH RICE MILL PVT. LTD.</h3>
          <p>Industrial Growth Center Gidha</p>
          <p>Arrah, Bihar</p>
          <p>GSTIN: 10AAICA4820B1ZJ</p>
        </div>

        <div>
          <p><b>Invoice No:</b> {invoice.invoice_number}</p>
          <p><b>Date:</b> {new Date(invoice.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      <hr />

      <div style={{ marginBottom: "20px" }}>
        <h4>Buyer (Bill To)</h4>
        <p><b>{customer.name}</b></p>
        <p>{customer.address}</p>
        <p>Phone: {customer.phone}</p>
        <p>GST: {customer.gst_number}</p>
      </div>

      <table border="1" width="100%" cellPadding="8">
        <thead>
          <tr>
            <th>Sl</th>
            <th>Description</th>
            <th>HSN</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>GST</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.products?.name}</td>
              <td>{item.products?.hsn}</td>
              <td>{item.quantity}</td>
              <td>₹ {item.price}</td>
              <td>₹ {item.gst_amount}</td>
              <td>₹ {item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ textAlign: "right", marginTop: "20px" }}>
        Grand Total: ₹ {invoice.total_amount}
      </h3>

      <br />

      <button onClick={printInvoice}>Print</button>

    </div>
  )
}
