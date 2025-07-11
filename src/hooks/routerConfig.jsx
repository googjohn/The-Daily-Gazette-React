import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../routes/home/Home";
import Finance from "../routes/finance/Finance";
import Entertainment from "../routes/entertainment/Entertainment";
import SciAndTech from "../routes/sci&tech/Sci&Tech";
import Sports from "../routes/sports/Sports";
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
