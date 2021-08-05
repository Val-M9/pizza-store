import * as axios from "axios";

export const getPizzas = async (sortBy, category) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/pizzas?${
        category !== null ? `category=${category}` : ""
      }&_sort=${sortBy}&_order=asc`,
    );
    return response.data;
  } catch (error) {
    console.error("error", error);
  }
};
