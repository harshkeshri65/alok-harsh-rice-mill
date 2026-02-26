export default function DashboardPage() {
  return (
    <div>

      {/* Header Section */}
      <div style={{ marginBottom: "50px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "600" }}>
          Dashboard Overview
        </h1>
        <p style={{ color: "#6b7280", marginTop: "8px" }}>
          Welcome back! Here is your business summary.
        </p>
      </div>

      {/* Cards Section */}
      <div style={{ display: "flex", gap: "30px" }}>

        <div className="card">
          <p style={{ color: "#6b7280" }}>Total Sales</p>
          <h2 style={{ marginTop: "10px" }}>₹ 0</h2>
        </div>

        <div className="card">
          <p style={{ color: "#6b7280" }}>Total Customers</p>
          <h2 style={{ marginTop: "10px" }}>0</h2>
        </div>

        <div className="card">
          <p style={{ color: "#6b7280" }}>Pending Dues</p>
          <h2 style={{ marginTop: "10px" }}>₹ 0</h2>
        </div>

      </div>

    </div>
  )
}
