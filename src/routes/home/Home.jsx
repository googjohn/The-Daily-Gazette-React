import { useState, useEffect } from "react";
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

export default function Home() {

  return (
    <main className="mx-auto">
      <WorldNews />
      <LocalNews />
      <BusinessFinance />
      <Entertainment />
      <ScienceTechnology />
      <Sports />
    </main>
  )
}