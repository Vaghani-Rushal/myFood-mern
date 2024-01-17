import { useState } from "react";
import Advertise from "../components/Advertise";
import FoodItems from "../components/FoodItems";

import { useSelector } from "react-redux";

export default function Home() {
  const foodItems = useSelector((store) => store.foodItem);

  const [search, setSearch] = useState("");

  const handleSearch = (value) => {
    setSearch(value);
  };

  return (
    <>
      <div className="mb-5">
        <Advertise search={search} handleSearch={handleSearch} />
      </div>

      {foodItems.map((item) => {
        return (
          <div className="container" key={item.categoryName}>
            <h2 className="pb-4">{item.categoryName}</h2>
            <FoodItems items={item.items} search={search} />
            <hr className="my-4" />
          </div>
        );
      })}
    </>
  );
}
