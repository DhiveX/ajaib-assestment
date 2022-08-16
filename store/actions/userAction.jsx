import { GET_USERS, USERS_ERROR } from "../types";
import { getUserByFilter } from "../../pages/api/user";

export const fetchUser = (queryParams) => (dispatch) => {
  getUserByFilter(queryParams)
    .then((response) => {
      const user = response.data.results;
      dispatch({
        type: GET_USERS,
        payload: user,
      });
    })
    .catch((error) => {
      dispatch({
        type: USERS_ERROR,
        payload: error,
      });
    });
};
