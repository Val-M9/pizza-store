const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA_TO_CART": {
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };

      return {
        ...state,
        items: newItems,
        totalCount: state.totalCount + 1,
        totalPrice: state.totalPrice + action.payload.price,
      };
    }
    case "PLUS_CART_ITEM": {
      const oldItems = state.items[action.payload].items;
      const newItems = [...state.items[action.payload].items, state.items[action.payload].items[0]];

      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: newItems,
            totalPrice: getTotalPrice(newItems),
          },
        },
        totalPrice: state.totalPrice + getTotalPrice(newItems) - getTotalPrice(oldItems),
        totalCount: state.totalCount + 1,
      };
    }
    case "MINUS_CART_ITEM": {
      const oldItems = state.items[action.payload].items;
      const newItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
      const onePizzaPrice =
        newItems.length !== 1 ? state.items[action.payload].totalPrice / (newItems.length + 1) : 0;
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: newItems,
            totalPrice: getTotalPrice(newItems),
          },
        },
        totalCount: state.totalCount > 1 ? state.totalCount - 1 : state.totalCount,
        totalPrice: state.totalPrice - onePizzaPrice,
      };
    }
    case "REMOVE_ITEM": {
      let clonedItems = { ...state.items };
      const removedPrice = clonedItems[action.payload].totalPrice;
      const removedCount = clonedItems[action.payload].items.length;
      delete clonedItems[action.payload];
      return {
        ...state,
        items: clonedItems,
        totalPrice: state.totalPrice - removedPrice,
        totalCount: state.totalCount - removedCount,
      };
    }
    case "CLEAR_CART": {
      return { items: {}, totalPrice: 0, totalCount: 0 };
    }

    default:
      return state;
  }
};
