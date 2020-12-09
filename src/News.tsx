import React, { useState } from 'react'
import axios from 'axios'

export const URL = 'http://hn.algolia.com/api/v1/search?query=React'

export const News: React.FC = () => {
  const [news, setNews] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  const fetchNews = async () => {
    try {
      const response = await axios.get(URL)
      const recievedNews = response.data.hits

      setNews(recievedNews)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <>
      <button onClick={fetchNews}>Fetch news</button>

      {error && <p>{error}</p>}

      <ul>
        {news.map(({ objectID, url, title }) => (
          <li key={objectID}>
            <a href={url} rel="noreferrer" target="_blank">
              {title}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
