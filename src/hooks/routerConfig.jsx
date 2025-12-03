import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/home/Home";
import Finance from "../pages/finance/Finance";
import Entertainment from "../pages/entertainment/Entertainment";
import Sports from "../pages/sports/Sports";
import Login from "../pages/login/Login";
import Search from "../pages/search/Search";
import { Suspense } from "react";
import Spinner from "../components/spinner/Spinner";
import WeatherPage from "../pages/weatherForecast/WeatherPage";
import ScienceAndTechnology from "../pages/scienceAndTechnology/ScienceAndTechnology";
import ErrorPage from "../components/error/ErrorPage";
import { weatherSearchAction } from "../pages/weatherForecast/WeatherPageUtility";
import { SearchLoader } from "../pages/search/searchUtility";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/finance', element: <Finance /> },
      { path: '/entertainment', element: <Entertainment /> },
      { path: '/scienceTechnology', element: <ScienceAndTechnology /> },
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
