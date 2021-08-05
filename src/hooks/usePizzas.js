import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getPizzas } from "../api/api";
import { setPizzas } from "../redux/actions/pizzas";

export const usePizzas = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const response = async () => {
      const res = await getPizzas();
      dispatch(setPizzas(res));
    };
    response();
  }, [dispatch]);
};
