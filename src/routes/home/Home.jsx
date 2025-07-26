import { useState, useEffect, useRef } from "react";
import LocalNews from "./LocalNews";
import TrendingNews from "./TrendingNews";
import HeadNews from "./HeadNews";
import Salutation from "./Salutation";
import Section from "../../components/mainbody/Section";
import BusinessFinance from "./BusinessFinance";
import Card from "../../components/card/Card";
import Entertainment from "../entertainment/Entertainment";
import Aside from "../../components/mainbody/Aside";
import WorldNews from "./WorldNews";
import ScienceTechnology from "./ScienceTechnology";
import Sports from "./Sports";
import useFetch from "../../hooks/useFetch";

export default function Home() {
  const dataRef = useRef([])

  const GNEWS_PARAMS = {
    endpoint: 'top-headlines',
    country: 'ph',
    category: 'world',
    language: 'en',
    max: 10,
  };

  dataRef.current = useFetch(GNEWS_PARAMS, false);
  // console.log(dataRef.current)
  return (
    <main className="w-full mx-auto">
      <WorldNews />
      <LocalNews />
      <BusinessFinance />
      <Entertainment />
      <ScienceTechnology />
      <Sports />
    </main>
  )
}