import { useQuery } from "@tanstack/react-query";

export function useImageApi() {
  return useQuery({
    queryKey: ["photos"],
    retry: false,
    queryFn: () =>
      fetch("https://api.unsplash.com/photos", {
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
          "Accept-Version": "v1",
        },
      }).then((res) => res.json()),
  });
}
