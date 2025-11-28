export async function fetchWithRetry(url, retries = 3, buffer = 300) {

  try {
    const response = await fetch(url)

    if (!response.ok) {
      const newError = new Error(`Fetch failed. HTTP error status: ${response.status}`)
      newError.status = response.status
      throw newError
    }

    return await response.json()

  } catch (error) {
    console.log(error)

    if (retries <= 0) throw error

    await new Promise(r => setTimeout(r, buffer))

    console.log('Attempting another fetch...')
    fetchWithRetry(url, retries - 1, buffer * 2)
  }
}