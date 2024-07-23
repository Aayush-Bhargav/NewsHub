import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import Spin from './Spin';
import axios from 'axios';
//search component
export default function Search(props) {
    console.log('Hi in search component')
    console.log("keyword:" + props.query)
    let [articles, setArticles] = useState([]);//set articles to nothing
    let [loading, setLoading] = useState(true); //set loading to true
    let [page, setPage] = useState(1);
    let [res, setRes] = useState(true);
    const [limit, setLimit] = useState(1);
    console.log(limit);
    let [totalResults, setTotalResults] = useState(0);
    useEffect(() => {
        // Simulate a data fetch
        const fetchData = async () => {
            setLoading(true);
            props.handleProgress(10); //set progress bar progress to 10 percent
            let url = `https://newsapi.org/v2/everything?apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&q=${props.query}`; //hit the api to find the news with query parameter passed as props
            console.log("url1:" + url)
            const response = await axios.get(url);
            const data = await response.data;
            setLoading(false);//once you get the data, stop the loading
            props.handleProgress(100);
            let hey = data.totalResults;
            setTotalResults(hey);//set the total results
            setLimit(Math.floor(hey / props.pageSize) + 1) //limit the number of pages to how many ever results you get divided by page size 
            setArticles(data.articles); //update articles
            console.log(data);
            if (data.totalResults > 0) { //change the title based on search parameter
                document.title = `News Hub - ${props.query}`;
            }
            else {

                document.title = 'News Hub - No Results Found.';
            }
            // let hey = data.totalResults;
            // setLimit(Math.floor(hey / props.pageSize) + 1)
            // setTotalResults(hey);

            setRes(false);
            console.log("default url:" + props.defaultUrl);


            // console.log(https://newsapi.org/v2/top-headlines?country=in&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&category=${props.category}&q=${props.query})


        };

        fetchData();
        //eslint-disable-next-line
    }, [page]); ///whenever page changes, fetch the data
    console.log(props.defaultUrl);
    return (
        <>
            {loading && <Spin />} {/* Show loading spinner while fetching data */}

            {articles.length > 0 && (
                <>
                    <h1 className='text-center my-4'>{`News Hub - Top Results on "${props.query}"`}</h1>
                    <div className='container my-3'>
                        <div className='row'>
                            {articles.map((article) => (
                                <div key={article.url} className='col-lg-4 col-md-6 col-sm-12'>
                                    <NewsItem
                                        title={article.title}
                                        description={article.description ? article.description : "Click below to read more about the article."}
                                        url={article.url}
                                        urlToImage={article.urlToImage ? article.urlToImage : props.defaultUrl}
                                        author={article.author ? article.author : article.source.name}
                                        date={article.publishedAt ? new Date(article.publishedAt).toUTCString() : '10 Days Ago'}
                                        source={article.source.name}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </>
            )}

            {!loading && totalResults === 0 && (
                <>
                    {res && <Spin />} {/* Show spinner if res is true */}
                    {!res && <h1 className='text-center my-4'>{`No Results Found on "${props.query}"`}</h1>} {/* Show no results message if res is false */}
                </>
            )}
            <div className='container d-flex justify-content-between'>
                <button type="button" disabled={page <= 1} className="btn btn-dark my-2" onClick={() => {
                    setPage(page - 1);
                }}>&larr; Previous</button>
                <button type="button" disabled={page >= limit} className="btn btn-dark my-2" onClick={() => {
                    console.log('i got clicked')
                    console.log(limit)
                    if (page < limit)
                        setPage(page + 1)
                    console.log("page " + page)
                }}>Next &rarr;</button>

            </div>
        </>
    );

}