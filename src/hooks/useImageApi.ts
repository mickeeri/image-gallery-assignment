import { useQuery } from "@tanstack/react-query";
import { camelizeKeys } from "humps";
import z from "zod";

const ImageSchema = z.object({
  id: z.string(),
  altDescription: z.string().nullable(),
  urls: z.object({
    thumb: z.string().url(),
    small: z.string().url(),
    regular: z.string().url(),
  }),
});

const ImageListSchema = z.array(ImageSchema);

const jsonParse = (res: Response) => res.json();

function makeFetchRequest() {
  const url = new URL("https://api.unsplash.com/photos");
  const params = new URLSearchParams({ per_page: "20" }).toString();

  url.search = params;

  return fetch(url, {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
      "Accept-Version": "v1",
    },
  });
}

export function useImageApi() {
  return useQuery({
    queryKey: ["photos"],
    retry: false,
    queryFn: () =>
      makeFetchRequest()
        .then(jsonParse)
        .then(camelizeKeys)
        .then(ImageListSchema.parse),
  });
}
