import { Form, useLoaderData, useLocation, useSearchParams, } from "react-router-dom";
import { useState } from "react";
import MobileMenu from "../../components/mobilemenu/MobileMenu";
import Card from "../../components/card/Card";
import { FaList } from "react-icons/fa6";
import { IoGridOutline } from "react-icons/io5";
import Spinner from "../../components/spinner/Spinner";

export default function Search() {
  const [view, setView] = useState('grid');
  const { result, query } = useLoaderData();

  if (!result.articles) return <Spinner />

  return (
    <div id="search-page"
      className="w-full h-full absolute top-0 right-0">
      <div className="container max-w-[1280px] m-auto">
        <div id="search-container" className={`w-11/12 my-20 m-auto`}>
          <h1 className="text-2xl p-2.5 text-center">Search for latest news</h1>
          <Form action="/search" method="get" role="search">
            <div className="form-group relative flex justify-center items-center flex-nowrap ">
              <input
                // onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                name="q"
                id="search"
                placeholder="Search"
                className={`rounded-full pl-[15px] shadow-(--bs-lightBlue) w-full sm:w-8/12 h-9 
                transition-(--transition) focus:transition-(--transition) outline-0`}
              />
              <label htmlFor="search" className="absolute right-0 sm:right-[16.55%] bg-(--light-navy) rounded-full">
                <i className="fa-sharp fa-solid fa-magnifying-glass p-2.5 cursor-pointer  w-9 h-9"></i>
              </label>
            </div>
          </Form>
        </div>

        <div id="list-grid-toggle" className="w-11/12 m-auto p-2.5 flex gap-2.5 justify-end items-center text-[clamp(1.2rem,_2vw,_1.5rem)] cursor-pointer
        ">
          <FaList onClick={() => setView('list')} />
          <IoGridOutline onClick={() => setView('grid')} />
        </div>

        <div id="search-results" className="w-11/12 m-auto bg-[var(--gray-10)]">
          {view === 'list' ? (
            <div className="aside-content h-auto text-black p-2.5">
              <ul>
                {result && result.articles.map((article, index) => (
                  <li
                    key={article.id}
                    className="flex items-center gap-2.5 shadow-(--bs-cards) [&:nth-child(even)]:bg-(--gray-10) [&:nth-child(odd)]:bg-(--gray-20)"
                  >
                    <span className="item-number basis-[45px] w-[45px] h-[60px] flex justify-center items-center text-white rounded-[50%] m-[5px] text-[clamp(1.2rem,_2vw,_1.5rem)] bg-(--navy)">{index + 1}</span>
                    <a href={article.url} target="_blank" className="text-black basis-[calc(100%-55px)] text-[clamp(.7rem,_1.5vw,_.8rem)] hover:underline">{article.title}</a>

                  </li>
                ))}
              </ul>
            </div>
          ) : (

            <div id="search-card-container"
              className="p-2.5 flex flex-col sm:grid sm:grid-cols-12 [&>*]:col-span-3 gap-2.5">
              {
                result && result.articles.map(article => (
                  <Card
                    key={article.id}
                    cardTitle={article.title}
                    cardDescription={article.description}
                    cardImageSrc={article.image}
                    source={article.source}
                    link={article.url} />
                ))
              }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const SearchLoader = async ({ request }) => {

  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  try {
    const url = `https://gnews.io/api/v4/search?q=${query}&apikey=${import.meta.env.VITE_GNEWS_API_KEY_12}`
    const response = await fetch(url)
    if (!response.ok) {
      const error = new Error('Fetch failed')
      error.statusCode = response.status
      throw error
    }
    const result = await response.json();

    return { result, query }
  } catch (error) {
    console.log(error)
  }
}