import React, { useEffect, useRef, useState } from "react";

export const registerObserver = (ref, setShowImage) => {
  const observer = new IntersectionObserver((enteries, observer) => {
    enteries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      setShowImage(true);
      observer.disconnect();
    });
  });
  observer.observe(ref);
};

const ImageCard = React.forwardRef((props, ref) => {
  const { imgData, clickCb, extraClass } = props;
  const { id, url, author, download_url } = imgData;
  const [showImage, setShowImage] = useState(false);
  const placeHolderRef = useRef(null);

  useEffect(() => {
    /**
     * To Register Observer on the span.
     */
    registerObserver(placeHolderRef.current, setShowImage);
  }, []);

  return (
    <div ref={ref} image-id={id} className={`image_card-cont ${extraClass}`}>
      <button onClick={clickCb} className="no_btn">
        <div className="image_card-img">
          {showImage ? <img src={download_url} alt={url} /> : <span ref={placeHolderRef} />}
        </div>
        <div className="image_card-text">
          <h6 className="img-title" aria-label={author}>
            {author}
          </h6>
          <span className="img-desc">cardekho.com</span>
        </div>
      </button>
    </div>
  );
});

export default ImageCard;
