import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ImageGallery from "./components/ImageGallery";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header"></header>

        <ImageGallery />
      </div>
    </QueryClientProvider>
  );
}

export default App;
