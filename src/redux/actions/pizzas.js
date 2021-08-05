import { getPizzas } from "../../api/api";

export const fetchPizzas = (sortBy, category) => async (dispatch) => {
  dispatch(setLoaded(false));
  let response = await getPizzas(sortBy, category);
  dispatch(setPizzas(response));
};

export const setPizzas = (items) => ({
  type: "SET_PIZZAS",
  payload: items,
});

export const setLoaded = (payload) => ({ type: "SET_LOADED", payload });
