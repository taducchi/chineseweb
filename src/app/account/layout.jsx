// app/account/layout.jsx

import Footer from "../components/Footer";
import Header from "../components/Header";

export default function AccountLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
