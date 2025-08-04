import { useRef } from "react";
import Section from "../../components/mainbody/Section";
import HeadNews from "./HeadNews";
import TrendingNews from "./TrendingNews";
import useFetch from "../../hooks/useFetch";

const worldNewsOptions = {
  endpoint: 'top-headlines',
  category: 'world',
  language: 'en',
  max: 10,
};

export default function WorldNews() {
  // const contentArray = newsContent
  // console.log('this is from worldnews content array', newsContent)

  const newsData = useRef([]);
  // const { articles } = newsData.current = useFetch(worldNewsOptions);
  // console.log('this is from world news', articles)
  const sections = [
    {
      title: null,
      customGrid: 'grid-area-head',
      content: <HeadNews />
    },
    {
      title: 'Trending',
      customGrid: 'grid-area-trend-container',
      content: <TrendingNews />
    }
  ]
  return (
    <Section
      id={'world-news'}
      sectionData={sections}
      salutation={true}
    />
  )
}