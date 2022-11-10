import { useImageApi } from "../hooks/useImageApi";

function ImageGallery() {
  const { data, isLoading, isError } = useImageApi();

  return (
    <div className="mt-8 mx-8 md:mx-0">
      {isLoading ? "loading" : null}
      {isError ? "Oh there was an error" : null}

      <ul className="sm:columns-2 md:columns-3 lg:columns-4 gap-6">
        {(data || []).map(({ id, urls, altDescription }) => (
          <li key={id} className="mb-6">
            <img
              className="w-full aspect-auto rounded"
              src={urls.small}
              alt={altDescription || ""}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageGallery;
