export default function DashboardLayout({ children }) {
  return (
    <div className="layout">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Alok Harsh</h2>
        <p className="subtitle">Rice Mill Billing</p>

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
