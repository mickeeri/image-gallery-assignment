import { useInfiniteQuery } from "@tanstack/react-query";
import { camelizeKeys } from "humps";
import z from "zod";

const ImageSchema = z.object({
  id: z.string(),
  altDescription: z.string().nullable(),
  urls: z.object({ small: z.string().url() }),
});

const ImageListSchema = z.array(ImageSchema);

const ImageResponseSchema = z.object({
  nextUrl: z.string().url().optional(),
  prevUrl: z.string().url().optional(),
  images: ImageListSchema,
});

type ImageResponse = z.infer<typeof ImageResponseSchema>;

async function handleError(res: Response) {
  if (!res.ok) {
    throw new Error({ status: res.status, ...(await res.json()) });
  }

  return res;
}

async function parseResponse(res: Response) {
  const images = await res.json();
  const link = res.headers.get("link") || "";

  const pageInfo = link.split(",").map((part) => {
    let [url, rel] = part.split(";");
    url = url.trim().slice(1, -1);
    rel = rel.trim().split(/['"]/)[1];
    return { url, rel };
  });

  const nextUrl = pageInfo.find(({ rel }) => rel === "next")?.url;
  const prevUrl = pageInfo.find(({ rel }) => rel === "prev")?.url;

  return { images, nextUrl, prevUrl };
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
    getNextPageParam: (page: ImageResponse) => page.nextUrl,
    queryFn: ({ pageParam }) =>
      makeFetchRequest(pageParam)
        .then(handleError)
        .then(parseResponse)
        .then(camelizeKeys)
        .then(ImageResponseSchema.parse),
  });
}
