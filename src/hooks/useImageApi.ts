import { useInfiniteQuery } from "@tanstack/react-query";
import { camelizeKeys } from "humps";
import { ImageResponse, ImageResponseSchema } from "../types";

async function handleError(res: Response) {
  if (!res.ok) {
    throw new Error({ status: res.status, ...(await res.json()) });
  }

  return res;
}

function getNextPageUrlFromLinkHeader(res: Response) {
  const link = res.headers.get("link");

  if (!link) {
    return undefined;
  }

  // This could perhaps have been less complicated but
  // it's good if we want to retrieve the prev and last page later.
  const pageInfo = link.split(",").map((part) => {
    let [url, rel] = part.split(";");
    url = url.trim().slice(1, -1);
    rel = rel.trim().split(/['"]/)[1];
    return { url, rel };
  });

  return pageInfo.find(({ rel }) => rel === "next")?.url;
}

async function parseResponse(res: Response) {
  const images = await res.json();
  return { images, nextUrl: getNextPageUrlFromLinkHeader(res) };
}

function makeFetchRequest(
  url = "https://api.unsplash.com/photos?page=1&per_page=20"
) {
  return fetch(url, {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
      "Accept-Version": "v1",
    },
  });
}

export function useImageApi() {
  return useInfiniteQuery({
    queryKey: ["photos"],
    retry: false,
    getNextPageParam: (page: ImageResponse) => page.nextUrl,
    queryFn: ({ pageParam }) =>
      makeFetchRequest(pageParam)
        .then(handleError)
        .then(parseResponse)
        .then(camelizeKeys)
        .then(ImageResponseSchema.parse),
  });
}
