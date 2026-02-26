export default function DashboardLayout({ children }) {
  return (
    <div className="layout">

      {/* Sidebar */}
      <div className="sidebar">

        {/* Brand Section */}
        <div style={{ marginBottom: "35px" }}>
          <h1 style={{
            margin: 0,
            fontSize: "22px",
            fontWeight: "700",
            letterSpacing: "0.6px"
          }}>
            Alok Harsh
          </h1>

          <p style={{
            margin: "5px 0 0 0",
            fontSize: "13px",
            color: "#9ca3af",
            letterSpacing: "0.5px"
          }}>
            Rice Mill
          </p>

          <div style={{
            width: "55px",
            height: "3px",
            background: "#facc15",
            marginTop: "14px",
            borderRadius: "5px"
          }}></div>
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
