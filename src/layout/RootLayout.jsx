import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function RootLayout() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-container">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}