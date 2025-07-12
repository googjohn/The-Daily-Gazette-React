import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function RootLayout() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}