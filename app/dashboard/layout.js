export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial' }}>
      
      {/* Sidebar */}
      <div style={{
        width: '220px',
        background: '#1e1e2f',
        color: 'white',
        padding: '20px'
      }}>
        <h2>Alok Harsh</h2>
        <p style={{ fontSize: '12px', opacity: 0.7 }}>Rice Mill Billing</p>

        <hr style={{ margin: '20px 0', borderColor: '#333' }} />

        <div style={{ marginBottom: '15px' }}>
          <a href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
            Dashboard
          </a>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <a href="/customers" style={{ color: 'white', textDecoration: 'none' }}>
            Customers
          </a>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <a href="/products" style={{ color: 'white', textDecoration: 'none' }}>
            Products
          </a>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <a href="/invoices" style={{ color: 'white', textDecoration: 'none' }}>
            Invoices
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '40px', background: '#f4f6f8' }}>
        {children}
      </div>
    </div>
  )
}
