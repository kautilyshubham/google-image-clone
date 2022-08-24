import React from 'react';



const ImageDetailOverlay = (props) => {
    const { imageDetail, close } = props;



    return (
        <div className='img_detail_overlay'>
            <button className='close_btn' onClick={close}>&times;</button>
            <div className="img_detail">
                <img src={imageDetail.download_url} alt={imageDetail.url} loading="lazy" />
            </div>
            <div className="detail_sec">
                <div className='comp_logo'>
                    <img src="/imgs/logo_c.png" alt="" />
                    <span>CARS24</span>
                </div>
                <h1>{imageDetail.author}</h1>
                <p>www.abc.com</p>
            </div>
        </div>
    )
};

export default ImageDetailOverlay;