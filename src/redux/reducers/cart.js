const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA_TO_CART": {
      const newItems = {
        ...state.items,
        [action.payload.id]: !state.items[action.payload.id]
          ? [action.payload]
          : [...state.items[action.payload.id], action.payload.id],
      };
      return {
        ...state,
        items: newItems,
        totalCount: [].concat.apply([], Object.values(newItems)).length,
        // totalCount: state.totalCount + 1,
        totalPrice: state.totalPrice + action.payload.price,
      };
    }

    default:
      return state;
  }
};
