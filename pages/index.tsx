import Head from 'next/head'
import Image from 'next/image'
import styles from '...@/styles/Home.module.css'
import { GetServerSideProps } from 'next'
import { NewsArticle, NewsResponse } from '../models/NewsArticles'
import NewsArticlesGrid from '../components/NewsArticlesGrid'

interface BreakingNewsPageProps{
  newsArticles: NewsArticle[],
}

export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async ()=>{

  /* await new Promise (r=>setTimeout(r,3000)) */

  const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey='+process.env.NEWS_API_KEY)
  const newsResponse: NewsResponse = await response.json()
  
  return {
    props:{newsArticles: newsResponse.articles}
  }
  ///Let error go to 500 page
}

export default function BreakingNewsPage({newsArticles}:BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title key="title">Breaking News </title>
      </Head>
      <main>
          <h1>Breaking News</h1>
          <NewsArticlesGrid  articles={newsArticles}/>
         {/* <NewsArticleEntry article={newsArticles[0]} /> */}
      </main>
    </>
  )
}
