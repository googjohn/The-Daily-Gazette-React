import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/home/Home";
import Finance from "../pages/finance/Finance";
import Entertainment from "../pages/entertainment/Entertainment";
import SciAndTech from "../pages/scienceAndTechnology/ScienceAndTechnology";
import Sports from "../pages/sports/Sports";
import Login from "../routes/login/Login";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <div className="text-center text-4xl flex justify-center items-center h-screen">Error loading. Page not found.</div>,
    children: [
      { index: true, element: <Home /> },
      { path: 'finance', element: <Finance /> },
      { path: 'entertainment', element: <Entertainment /> },
      { path: 'scienceTechnology', element: <SciAndTech /> },
      { path: 'Sports', element: <Sports /> },
    ]
  },
  {
    path: 'login',
    element: <Login />
  }
])
