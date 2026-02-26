export default function DashboardPage() {
  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
          Dashboard Overview
        </h1>
        <p style={{ color: "#6b7280" }}>
          Welcome back! Here is your business summary.
        </p>
      </div>

      <div className="card-container">

        <div className="card">
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Total Sales
          </p>
          <h2 style={{ marginTop: "10px", fontSize: "26px" }}>
            ₹ 0
          </h2>
        </div>

        <div className="card">
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Total Customers
          </p>
          <h2 style={{ marginTop: "10px", fontSize: "26px" }}>
            0
          </h2>
        </div>

        <div className="card">
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Pending Dues
          </p>
          <h2 style={{ marginTop: "10px", fontSize: "26px" }}>
            ₹ 0
          </h2>
        </div>

      </div>
    </div>
  )
}
