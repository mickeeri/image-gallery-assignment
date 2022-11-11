import { rest } from "msw";
import { faker } from "@faker-js/faker";
import { setupServer } from "msw/node";
import { Image } from "../types";

function buildImage(): Image {
  return {
    altDescription: "",
    id: faker.datatype.uuid(),
    urls: { small: faker.image.imageUrl() },
  };
}

const handlers = [
  rest.get("**/photos", (req, res, ctx) => {
    const page = Number(req.url.searchParams.get("page"));
    const response = page === 2 ? [buildImage()] : [buildImage(), buildImage()];

    return res(
      ctx.json(response),
      ctx.set(
        "link",
        `<https://api.unsplash.com/photos?page=13944&per_page=20>; rel="last", <https://api.unsplash.com/photos?page=${
          page + 1
        }&per_page=20>; rel="next"`
      )
    );
  }),
];

export const server = setupServer(...handlers);
