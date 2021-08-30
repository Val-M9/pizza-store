import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

import { fetchPizzas } from "../redux/actions/pizzas";
import { Categories, SortPopup, PizzaBlock, PizzaLoader } from "../components";
import { sortPopupItems, categoryItems } from "../assets/constants/constants.js";
import { setCategories, setSortBy } from "../redux/actions/filters";
import { addPizzaToCart } from "../redux/actions/cart";

export default function Home() {
  const { pizzas, isLoaded } = useSelector(({ pizzas }) => {
    return {
      pizzas: pizzas.items,
      isLoaded: pizzas.isLoaded,
    };
  });
  const cartItems = useSelector(({ cart }) => cart.items);
  const { category, sortBy } = useSelector(({ filters }) => filters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [dispatch, category, sortBy]);

  const onSelectCategory = useCallback(
    (index) => {
      dispatch(setCategories(index));
    },
    [dispatch],
  );

  const onSelectSortType = useCallback(
    (sortBy) => {
      dispatch(setSortBy(sortBy));
    },
    [dispatch],
  );

  const handleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCart(obj));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          items={categoryItems}
          onClickItem={onSelectCategory}
        />
        <SortPopup
          activeSortType={sortBy}
          items={sortPopupItems}
          onSetSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? pizzas &&
            pizzas.map((pizza) => (
              <PizzaBlock
                onAddPizza={handleAddPizzaToCart}
                key={pizza.id}
                addedCount={cartItems[pizza.id] && cartItems[pizza.id].items.length}
                {...pizza}
              />
            ))
          : Array(12)
              .fill(0)
              .map((_, index) => <PizzaLoader key={index} />)}
      </div>
    </div>
  );
}
