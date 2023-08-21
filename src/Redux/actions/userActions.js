import {
  FETCH_USERS,
  FETCH_SELECTED_USER,
  ADD_USER
} from "../action-types/userActionTypes";

export const fetchAllUsers = (data) => {
  return {
    type: FETCH_USERS,
    payload: {data},
  };
};

export const getSelectedUser = (data) => {
  return{
    type: FETCH_SELECTED_USER,
    payload: {data}
  }
}

export const addUser = (data) => {
  return{
    type: ADD_USER,
    payload: {data}
  }
}