import React, { useEffect } from "react";
import { useImageApi } from "../hooks/useImageApi";
import { useInView } from "react-intersection-observer";

function ImageGallery() {
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useImageApi();

  const { ref, inView } = useInView();
  const showLoader = isLoading || isFetchingNextPage;

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className="mt-8 mx-8 md:mx-0">
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.images.map(({ id, urls, altDescription }) => (
              <li className="h-72 md:h-64" key={id}>
                <img
                  className="w-full aspect-auto rounded object-cover h-full border border-teal-200"
                  src={urls.small}
                  alt={altDescription || ""}
                />
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>

      <footer className="text-center my-10">
        {showLoader ? "Loading images..." : null}

        {isError && !showLoader ? (
          <p role="alert" className="text-red-700">
            There was an error loading more images!{" "}
            <button onClick={() => fetchNextPage()}>Try again</button>
          </p>
        ) : null}

        {!isError && !showLoader ? (
          <button ref={ref} onClick={() => fetchNextPage()}>
            Load more
          </button>
        ) : null}
      </footer>
    </div>
  );
}

export default ImageGallery;
