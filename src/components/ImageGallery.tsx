import React, { useEffect } from "react";
import { useImageApi } from "../hooks/useImageApi";
import { useInView } from "react-intersection-observer";

function ImageGallery() {
  const { data, isLoading, isError, fetchNextPage } = useImageApi();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  // TODO: handle if slow response

  return (
    <div className="mt-8 mx-8 md:mx-0">
      {isLoading ? "loading" : null}

      {/* <ul className="sm:columns-2 md:columns-3 lg:columns-4 gap-6"> */}
      <ul className="grid grid-cols-4 gap-6">
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.images.map(({ id, urls, altDescription }) => (
              <li key={id}>
                <img
                  className="w-full aspect-auto rounded"
                  src={urls.small}
                  alt={altDescription || ""}
                />
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>

      <footer className="text-center mb-10">
        {isError && !isLoading ? (
          <p role="alert" className="text-red-700">
            There was an error loading more images!{" "}
            <button onClick={() => fetchNextPage()}>Try again</button>
          </p>
        ) : null}

        {!isError && !isLoading ? (
          <button ref={ref} onClick={() => fetchNextPage()}>
            Load more
          </button>
        ) : null}
      </footer>
    </div>
  );
}

export default ImageGallery;
