import { fetchNormalWithRetry } from "../../hooks/UseFetchForAll";

export const SearchLoader = async ({ request }) => {
  const requestUrl = new URL(request.url);
  const query = requestUrl.searchParams.get("q");

  if (!query) return new Response('Fetch failed', { result: null, query })
  try {
    // const ipinfoUrl = "/api/ip/ipLookUp"
    // const ipResponse = await fetchNormalWithRetry(ipinfoUrl, 2, 300)
    // const { country } = ipResponse.data;

    const apiUrl = `/api/news/worldnews?searchTerm=${query}&language=en&max=24`

    const apiResponse = await fetchNormalWithRetry(apiUrl, 2, 300)

    return { result: apiResponse.data, query }

  } catch (error) {
    if (error.name === 'AbortError') return;
    console.error(error)
    throw new Response('Loader failed', {
      status: error.status,
      statusText: error.message
    })
  }
}