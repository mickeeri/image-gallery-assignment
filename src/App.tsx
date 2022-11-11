import ImageGallery from "./components/ImageGallery";
import QueryClientWrapper from "./components/QueryClientWrapper";

function App() {
  return (
    <QueryClientWrapper>
      <main className="antialiased mx-auto md:max-w-5xl">
        <ImageGallery />
      </main>
    </QueryClientWrapper>
  );
}

export default App;
