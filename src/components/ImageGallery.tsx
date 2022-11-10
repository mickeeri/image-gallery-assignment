import { useImageApi } from "../hooks/useImageApi";

function ImageGallery() {
  const { data, isLoading, isError } = useImageApi();

  return (
    <div>
      {isLoading ? "loading" : null}
      {isError ? "Oh there was an error" : null}

      <pre>{JSON.stringify(data)}</pre>
      <h1>Images</h1>
    </div>
  );
}

export default ImageGallery;
