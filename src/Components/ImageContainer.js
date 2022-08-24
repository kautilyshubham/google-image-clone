import React, { useEffect, useRef, useState } from 'react'
import ImageCard from './ImageCard';
import InfiniteScroll from 'react-infinite-scroller';
import ImageDetailOverlay from './IMageDetailOverlay';



const ImageContainer = () => {
    const [images, setImages] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showDetail, setShowDetail] = useState(null);

    // use effect to call the api
    useEffect(() => {
        console.log('effect');
        getImage()
    }, []);

    // getimage api 
    const getImage = () => {
        fetch(`https://picsum.photos/v2/list?page=${pageNo}&limit=20`, { method: 'get' })
            .then((response) => response.json())
            .then((data) => setImages(imgs => [...imgs, ...data]));
    }

    const loadMore = () => {
        // setPageNo(p => p + 1)
    }

    const imageClicked = (img) => {
        setShowDetail(img)
    }
    const closeOverlay = () => {
        setShowDetail(null)
    }


    // UI Functions
    const displayImages = images?.map(imgData => <ImageCard key={imgData.id} imgData={imgData} clickCb={() => imageClicked(imgData)} extraClass={showDetail?.id === imgData.id ? "active" : ""} />)



    return (
        <main className="main_app">
            <div className="section_imgs">
                <div className='images-cont' id='image-container'>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={loadMore}
                        hasMore={true}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                    >
                        {images && displayImages}
                    </InfiniteScroll>

                </div>
            </div>
            {showDetail && <div className="section_detail">
                <ImageDetailOverlay imageDetail={showDetail} close={closeOverlay} />
            </div>}
        </main>

    )
}




export default React.memo(ImageContainer);