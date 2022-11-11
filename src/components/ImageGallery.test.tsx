import { render, screen, waitFor } from "@testing-library/react";
import ImageGallery from "./ImageGallery";
import { rest } from "msw";
import { mockIntersectionObserver } from "jsdom-testing-mocks";
import userEvent from "@testing-library/user-event";
import { server } from "../mocks/server";
import QueryClientWrapper from "./QueryClientWrapper";

mockIntersectionObserver();

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

function setup() {
  return render(<ImageGallery />, { wrapper: QueryClientWrapper });
}

it("renders some images", async () => {
  setup();
  expect(await screen.findAllByRole("img")).toHaveLength(2);
});

it("shows an error message if the request fails", async () => {
  server.use(
    rest.get("**/photos", (_, res, ctx) => {
      return res(ctx.status(403), ctx.json({ errors: "invalid access token" }));
    })
  );

  setup();

  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(/there was an error/i);
});

it("loads more images when clicking on 'load more'", async () => {
  setup();

  expect(await screen.findAllByRole("img")).toHaveLength(2);

  const loadMoreButton = screen.getByRole("button");
  userEvent.click(loadMoreButton);

  await waitFor(() => {
    expect(screen.getAllByRole("img")).toHaveLength(3);
  });
});
