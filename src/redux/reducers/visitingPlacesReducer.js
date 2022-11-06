import * as types from "../constants";

const initialState = {
  fetchVisitingPlacesData: false,
  visitingPlacesData: [],
  favouritePlacesDataCount: 0,
};

export default function VisitingPlacesReducer(state = initialState, actions) {
  switch (actions.type) {
    case types.VISITING_PLACES_REQUEST:
      return {
        ...state,
        fetchVisitingPlacesData: false,
      };

    case types.VISITING_PLACES_REQUEST_SUCCESS:
      console.log("data is....", actions?.data);
      // const userInfo = actions && actions.params && actions.params.userInfo ? actions.params.userInfo : null
      const listData = actions && actions?.data ? actions?.data : [];
      const tempListData = initialState?.visitingPlacesData;
      if (listData) {
        tempListData.push(listData);
      }
      console.log("tempListData", tempListData);
      return {
        ...state,
        fetchVisitingPlacesData: true,
        visitingPlacesData: tempListData,
      };

    case types.FAVOURITE_PLACES_COUNT_REQUEST_SUCCESS:
      // const userInfo = actions && actions.params && actions.params.userInfo ? actions.params.userInfo : null
      const favouriteListData = actions && actions?.data ? actions?.data : [];
      return {
        ...state,
        favouritePlacesDataCount: favouriteListData?.length || 0,
      };

    case types.VISITING_PLACES_REQUEST_FAILURE:
      return {
        ...state,
        fetchVisitingPlacesData: true,
        visitingPlacesData: [],
      };

    default:
      return state;
  }
}
