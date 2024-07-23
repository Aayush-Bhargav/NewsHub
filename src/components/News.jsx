import React, { useState } from 'react';
import { useEffect } from 'react';
import NewsItem from './NewsItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spin from './Spin';
import axios from 'axios';
//news component
export default function News(props) {

    let [articles, setArticles] = useState([]);//initialize articles to be empty
    let [loading, setLoading] = useState(true);//initially set loading to true to show the spinner
    let [page, setPage] = useState(1);
    const [limit, setLimit] = useState(1);
 
    let [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        // Simulate a data fetch
        const fetchData = async () => {
            loading && props.handleProgress(10); 
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&category=${props.category}`);
            console.log(`url:https://newsapi.org/v2/top-headlines?country=in&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&category=${props.category}`)
            const data = await response.data;
             loading && props.handleProgress(100); 
             //once result is fetched , stop showing the spinner and make progress bar reach full state and then disappear
            setLoading(false);
            console.log('articles:'+data.articles);
            let hey = data.totalResults;
            setTotalResults(hey);//update number of total articles returned 
            setLimit(Math.floor(hey / props.pageSize) + 1)//set limit on the number of pages
            setArticles([...articles, ...data.articles]) //update articles array
            console.log('artices:'+articles)
            document.title = `News Hub - ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`; //update title of the page
        };

        fetchData();
        //eslint-disable-next-line
    },[page]);
    const fetchMoreData = () => {//increment the page paramter when you want to fetch more data
        setPage(page + 1);
    }
    console.log('default url:'+props.defaultUrl);
    return (

        <>

            <h1 className='text-center my-4'>News Hub - {props.category === "" ? "Top Headlines" : `Top ${props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines`}</h1>
            {loading && <Spin />}
            <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults} loader={<Spin />}>
                <div className='container my-3'>
                    <div className='row '>
                        {
                            articles.map((article) => {
                                return (<div key={article.url} className='col-lg-4 col-md-6 col-sm-12 ' style={{ padding: "auto" }} >
                                    <NewsItem title={article.title} description={article.description ? article.description : "Click below to read more about the article."} url={article.url} urlToImage={article.urlToImage ? article.urlToImage : props.defaultUrl} author={article.author ? article.author : article.source.name} date={article.publishedAt ? ((new Date(article.publishedAt)).toUTCString()) : '10 Days Ago'} source={article.source.name} />
                                </div>)
                            })}
                    </div>
                </div>
            </InfiniteScroll> 
            {/*infinte scroll component downloaded from npm */}
            {/* initally I had used previous and next buttons */}
            <div className='container d-flex justify-content-between'>
                {/* <button type="button" disabled={page<=1} className="btn btn-dark my-2" onClick={()=>{
            setPage(page-1);
        }}>&larr; Previous</button>
        <button type="button"   disabled={page>=limit} className="btn btn-dark my-2" onClick={()=>{
            console.log('i got clicked')
            console.log(limit)
            if(page<limit)
                setPage(page+1)
            console.log("page "+page)
        }}>Next &rarr;</button> */}

            </div>
        </>

    );
}
