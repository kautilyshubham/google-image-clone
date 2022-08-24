import React, { useEffect, useRef, useState } from "react";
import ImageCard from "./ImageCard";
import ImageDetailOverlay from "./IMageDetailOverlay";
import useIntersection from "../hooks/useIntersection";

const ImageContainer = () => {
  const loader = useRef(null);
  const pagination = useRef({
    page: 0,
    limit: 50,
    isNextPageData: true,
  });

  const [images, setImages] = useState([]);
  const [showDetail, setShowDetail] = useState(null);


  const { createObserver } = useIntersection();

  // use effect to call the api
  useEffect(() => {
    getImage();
  }, []);

  useEffect(() => {
    let observer;

    if (loader.current) {
      observer = createObserver(loader, () => {
        if (pagination.current.isNextPageData) {
          getImage(pagination.current.page);
        }
      });
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [createObserver, images]);

  // getimage api
  const getImage = (page = 0) => {
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=${pagination.current.limit}`, {
      method: "get",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length) {
          setImages((imgs) => [...imgs, ...data]);
          pagination.current.page += 1;
        } else {
          pagination.current.isNextPageData = false;
        }
      });
  };

  const imageClicked = (img) => {
    setShowDetail(img);
  };
  const closeOverlay = () => {
    setShowDetail(null);
  };

  // UI Functions

  return (
    <main className="main_app">
      <div className="section_imgs">
        <div className="images-cont" id="image-container">
          {images?.map((imgData, index) => {
            const isLastImage = index === images.length - 1;
            return (
              <ImageCard
                ref={isLastImage ? loader : null}
                key={imgData.id}
                imgData={imgData}
                clickCb={() => imageClicked(imgData)}
                extraClass={showDetail?.id === imgData.id ? "active" : ""}
              />
            );
          })}
        </div>
      </div>
      {showDetail && (
        <div className="section_detail">
          <ImageDetailOverlay imageDetail={showDetail} close={closeOverlay} />
        </div>
      )}
    </main>
  );
};

export default React.memo(ImageContainer);
