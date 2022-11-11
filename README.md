## Image Gallery Assignment

This project contains:

- Using [React Query](https://tanstack.com/query/v4/docs/adapters/react-query) to fetch data.
- Infinite scrolling.
- Tests with React Testing Library and mocking network calls with [MSW (Mock Service Worker)](https://mswjs.io/)
- Using [Tailwind CSS](https://tailwindcss.com/) for styling.
- Trying out TypeScript schema validation with [zod](https://github.com/colinhacks/zod) to validate data from network calls and infer TypeScript types.

### How to run the application

1. Create an `.env` file in the root of the project. Base it on `.env.example`. Add your own Access Key from Unsplash.
2. Run `npm i`
3. Run `npm run start`
4. You can also run the tests with `npm run test`

### Reasoning about time constraints

I put a lot of focus into the logic for fetching data as well as the automatic tests for that. The logic for pagination and the infinite scrolling was
quite tricky. Maybe I could have just stored the current page in a variable and increment it, but I wanted to use the [pagination headers](https://unsplash.com/documentation#pagination) from Unsplash. That way it will be easier if for example I wanted to show the total number of pages.

I'm not filtering the images by category or by search words even though the assignment says "fetch data for a specific category". I'm not sure what is meant by category in the Unsplash documentation, also filtering by search term is only a "nice to have".

I'm presenting the images in a grid. Probably it would be nicer to show the pictures in a so called "masonry layout", like they have on [this page](https://unsplash.com/). That is however not as easy as it sounds. Often the recommended way is to use a library for that.

If I had more time the error handling could be more detailed, however there is error handling and a nice touch is that you can press a button to retry the operation.
