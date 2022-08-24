import { useCallback } from "react";

function useIntersection() {
  const handleObserver = useCallback((entries, onIntersect) => {
    const target = entries[0];
    if (target.isIntersecting) {
      onIntersect();
    }
  }, []);

  const createObserver = useCallback(
    (loader, onIntersect) => {
      const option = {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      };
      const observer = new IntersectionObserver(
        (entries) => handleObserver(entries, onIntersect),
        option
      );
      console.log({ current: loader.current });
      if (loader.current) observer.observe(loader.current);
      return observer;
    },
    [handleObserver]
  );

  return { createObserver };
}

export default useIntersection;
