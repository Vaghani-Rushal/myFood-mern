import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { itemsActions } from "../store/fooditems";
import { fetchItemStatusActions } from "../store/fetchItems";

export default function FetchFoodItems() {
  const fetchItemStatus = useSelector((store) => store.fetchItemStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchItemStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchItemStatusActions.markFetchingStarted());
    fetch("https://myfood-mern.onrender.com/api/items", { signal })
      .then((res) => res.json())
      .then((items) => {
        dispatch(fetchItemStatusActions.markFetchDone());
        dispatch(fetchItemStatusActions.markFetchingFinished());
        dispatch(itemsActions.addInitialItems(items.foodItems));
      });

    return () => {
      controller.abort();
    };
  }, [fetchItemStatus]);

  return <> </>;
}
