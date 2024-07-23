import React from 'react'
//individual news item component ; each looks like a card
export default function NewsItem(props) {
    const { title, description, url, urlToImage, author, date, source } = props;
    return (
        <div className="card my-3" style={{ width: "20rem" ,margin:"auto"}}>
            <div style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:"0px"}}>
                <span className=" badge rounded-pill bg-danger" >
                    <span>{source}</span>
                </span>
            </div>
            <img src={urlToImage} className="card-img-top" alt="Pic Here" />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                {description && <p className="card-text">{description}</p>}
                <p className="card-text"><small className="text-body-secondary">By {author} on {date}</small></p>
                <a href={url} className="btn btn-sm btn-dark" rel="noreferrer" target='_blank'>Read More</a>
            </div>
        </div>
    )
}
//{urlToImage}