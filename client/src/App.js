// LIBRARIES:
import TravelApp from "./components/TravelApp";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// FILES:
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

const clientQuery = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={clientQuery}>
      <TravelApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
