import { useImageApi } from "../hooks/useImageApi";

function ImageGallery() {
  const { data, isLoading, isError } = useImageApi();

  return (
    <div className="mt-8">
      {isLoading ? "loading" : null}
      {isError ? "Oh there was an error" : null}

      <ul className="columns-3 gap-6">
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
