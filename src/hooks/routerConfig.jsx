import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/home/Home";
import Finance from "../pages/finance/Finance";
import Entertainment from "../pages/entertainment/Entertainment";
import SciAndTech from "../pages/scienceAndTechnology/ScienceAndTechnology";
import Sports from "../pages/sports/Sports";
import Login from "../routes/login/Login";
import Search, { SearchLoader } from "../pages/search/Search";
import { Suspense } from "react";
import Spinner from "../components/spinner/Spinner";
import WeatherPage, { weatherSearchAction } from "../pages/weatherForecast/WeatherPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <div className="text-center text-4xl flex justify-center items-center h-screen">Error loading. Page not found.</div>,
    children: [
      { index: true, element: <Home /> },
      { path: '/finance', element: <Finance /> },
      { path: '/entertainment', element: <Entertainment /> },
      { path: '/scienceTechnology', element: <SciAndTech /> },
      { path: '/sports', element: <Sports /> },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/search',
    element:
      <Suspense fallback={<Spinner />}>
        <Search />
      </Suspense>,
    loader: SearchLoader,
  },
  {
    path: '/weather',
    element: <WeatherPage />,
    action: weatherSearchAction,
  },
])
