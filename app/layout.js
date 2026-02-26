import './globals.css'
export const metadata = {
  title: "Alok Harsh Rice Mill",
  description: "Billing System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
