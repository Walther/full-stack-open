const filterAtStart = "";

const initialState = filterAtStart;

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "SET_FILTER":
      const newfilter = action.data.content;
      return newfilter;
    default:
      return state;
  }
};

export const setFilter = (content) => {
  return {
    type: "SET_FILTER",
    data: { content },
  };
};

export default reducer;
