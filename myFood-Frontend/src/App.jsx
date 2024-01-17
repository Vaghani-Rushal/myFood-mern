import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "./components/LoadingSpinner";
import FetchFoodItems from "./components/FetchFoodItems";

function App() {
  const fetchItemStatus = useSelector((store) => store.fetchItemStatus);
  return (
    <>
      <div className="position-relative" style={{ minHeight: "100vh" }}>
        <Navbar />
        <FetchFoodItems />
        {fetchItemStatus.currentlyFetching ? <LoadingSpinner /> : <Outlet />}
        <Footer />
      </div>
    </>
  );
}

export default App;
