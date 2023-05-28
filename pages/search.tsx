import { FormEvent, useState } from "react";
import { NewsArticle } from "../models/NewsArticles";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import NewsArticlesGrid from "../components/NewsArticlesGrid";
import { Head } from "next/document";

const SearchNewsPage = () => {
    const [searchResult, setSearchResult] = useState<NewsArticle[] | null> (null)  //useState(NewsArticle[] | null)
    const [searchResultsLoading, setSearchResultsLoading] = useState(false)
    const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] = useState(false)

    async function handleSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const searchQuery = formData.get('searchQuery')?.toString().trim()

        if(searchQuery)
        {
            try{
                setSearchResult(null)
                setSearchResultsLoadingIsError(false)
                setSearchResultsLoading(true)
                const response = await fetch("/api/search-news?q="+searchQuery);
                const articles: NewsArticle[] = await response.json();
                setSearchResult(articles)
            }catch(error){
                console.log(error);
                setSearchResultsLoadingIsError(true)
            } finally{
                setSearchResultsLoading(false)
            }
        }
    }

    return (
        <>
        <main>
            <h1>Search News</h1>
            <Alert>
                This page uses <strong>client-side data fetching</strong> to show fresh data for every search.
                Requests are handled by our backend via <strong>API Reoutes</strong>   
            </Alert>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="search-input">
                    <Form.Label>Search query</Form.Label>   
                    <Form.Control name="searchQuery" placeholder="E.g Politics, Sports, ..." />
                </Form.Group>
                <Button type="submit" disabled={searchResultsLoading}>Search</Button>
            </Form>
            <div className="d-flex flex-column align-items-center">
                {searchResultsLoading && <Spinner animation="border" />}
                {searchResultsLoadingIsError && <p>Something went wrong . Please try again</p>}
                {searchResult?.length ===0 && <p>Nothing found. Try a different query.</p>}
                {searchResult && <NewsArticlesGrid articles={searchResult}/>}
            </div>
        </main>
        </>
        );
}
export default SearchNewsPage;