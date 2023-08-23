import {
  FETCH_USERS,
  FETCH_SELECTED_USER,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
} from "../action-types/userActionTypes";

const initialState = {
  userData: [],
  selectedUserId: null,
  selectedUserDetails: {},
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, userData: action.payload.data };

    case FETCH_SELECTED_USER:
      return { ...state, selectedUserDetails: action.payload.data };

    case DELETE_USER:
      return {
        ...state,
        userData: state.userData.filter((user) => user.id !== action.payload),
      };

    case UPDATE_USER:
      return {
        ...state,
        userData: state.userData.map((user) =>
          user.id === action.payload.id
            ? {
                ...user,
                ...action.payload.updatedData,
              }
            : user
        ),
      };

    case ADD_USER:
      return { ...state, userData: [...state.userData, action.payload.data] };

    default:
      return state;
  }
};
