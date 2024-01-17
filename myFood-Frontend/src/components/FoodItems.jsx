import FoodItem from "./FoodItem";

export default function FoodItems({ items, search }) {
  return (
    <>
      <div className="container mb-4">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {items.map((item) => {
            if (item.name.toLowerCase().includes(search.toLowerCase()))
              return <FoodItem key={item.name} item={item} search={search} />;
          })}
        </div>
      </div>
    </>
  );
}
