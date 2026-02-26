export default function DashboardLayout({ children }) {
  return (
    <div className="layout">

      {/* Sidebar */}
      <div className="sidebar">
     <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
  
  <div style={{
    width: "42px",
    height: "42px",
    background: "#facc15",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "#111827",
    fontSize: "18px"
  }}>
    AH
  </div>

  <div>
    <h2 style={{ margin: 0 }}>Alok Harsh</h2>
    <p style={{ fontSize: "12px", opacity: 0.6, margin: 0 }}>
      Rice Mill Billing
    </p>
  </div>

</div>

        <hr className="divider" />

        <a href="/dashboard">Dashboard</a>
        <a href="/dashboard/customers">Customers</a>
        <a href="/dashboard/products">Products</a>
        <a href="/dashboard/invoices">Invoices</a>
      </div>

      {/* Main Content */}
      <div className="main">
        {children}
      </div>

    </div>
  )
}
