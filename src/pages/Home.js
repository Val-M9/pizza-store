import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

import { fetchPizzas } from "../redux/actions/pizzas";
import { Categories, SortPopup, PizzaBlock, PizzaLoader } from "../components";
import { sortPopupItems, categoryItems } from "../assets/constants/constants.js";
import { setCategories, setSortBy } from "../redux/actions/filters";

export default function Home() {
  const { pizzas, isLoaded } = useSelector(({ pizzas }) => {
    return {
      pizzas: pizzas.items,
      isLoaded: pizzas.isLoaded,
    };
  });

  const { category, sortBy } = useSelector(({ filters }) => filters);
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [dispatch, category, sortBy]);

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
          ? pizzas && pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
          : Array(12)
              .fill(0)
              .map((_, index) => <PizzaLoader key={index} />)}
      </div>
    </div>
  );
}