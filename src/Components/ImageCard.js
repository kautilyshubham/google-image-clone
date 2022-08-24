import React from 'react';


const ImageCard = ({ imgData, clickCb, extraClass }) => {
    const { id, url, height, width, author, download_url } = imgData;
    return (
        <div key={id} image-id={id} className={`image_card-cont ${extraClass}`}>
            <a onClick={clickCb}>
                <div className='image_card-img'>
                    <img src={download_url} alt={url} loading="lazy" />
                </div>
                <div className='image_card-text'>
                    <h6 className='img-title' aria-label={author}>{author}</h6>
                    <span className='img-desc'>cardekho.com</span>
                </div>
            </a>
        </div>
    )
}


export default ImageCard;