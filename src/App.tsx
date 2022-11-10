import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ImageGallery from "./components/ImageGallery";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="antialiased mx-auto md:max-w-5xl">
        <ImageGallery />
      </main>
    </QueryClientProvider>
  );
}

export default App;
