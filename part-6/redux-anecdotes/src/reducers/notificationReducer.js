const notificationAtStart = "";

const initialState = notificationAtStart;

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "NEW_NOTIFICATION":
      const newNotification = action.data.content;
      return newNotification;
    case "REMOVE_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};

export const createNotification = (content) => {
  return {
    type: "NEW_NOTIFICATION",
    data: { content },
  };
};

export const removeNotification = (content) => {
  return {
    type: "REMOVE_NOTIFICATION",
  };
};

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(createNotification(content));
    setTimeout(() => dispatch(removeNotification()), time * 1000);
  };
};

export default reducer;
