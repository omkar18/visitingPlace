import * as types from "../constants";

export const VisitingPlacesData = (data) => async (dispatch) => {
  console.log("data...".data);
  await dispatch({
    type: types.VISITING_PLACES_REQUEST_SUCCESS,
    data,
  });
};

export const getFavouritePlacesCount = (data) => async (dispatch) => {
  console.log("daata in action", data);
  const filterData = data.filter((d) => d?.isFavourite);
  await dispatch({
    type: types.FAVOURITE_PLACES_COUNT_REQUEST_SUCCESS,
    data: filterData,
  });
};
