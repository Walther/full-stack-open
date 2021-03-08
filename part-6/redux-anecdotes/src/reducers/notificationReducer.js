const notificationAtStart = { content: "", id: null };

const initialState = notificationAtStart;

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "NEW_NOTIFICATION":
      // Check if we have an existing notification, clear it
      if (state.id) {
        clearTimeout(state.id);
      }
      const newNotification = {
        content: action.data.content,
        id: action.data.id,
      };
      console.log("newNotification: ", newNotification);
      return newNotification;
    case "REMOVE_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};

export const createNotification = (content, id) => {
  return {
    type: "NEW_NOTIFICATION",
    data: { content, id },
  };
};

export const removeNotification = (content) => {
  return {
    type: "REMOVE_NOTIFICATION",
  };
};

export const setNotification = (content, time) => {
  return async (dispatch) => {
    // Create a timeout for removing the notification, store the ID
    const notificationID = setTimeout(
      () => dispatch(removeNotification()),
      time * 1000
    );
    // Create the new notification, include the ID in the state
    dispatch(createNotification(content, notificationID));
  };
};

export default reducer;
