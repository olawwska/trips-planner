import { initialState } from './context';
import { IInfoWindowStateType, InfoWindowActionsType } from '../types';

const reducer = (state: IInfoWindowStateType, action: InfoWindowActionsType) => {
  switch (action.type) {
    case 'CHANGE_ATTRACTION_ID':
      return { ...state, id: action.id };
    case 'CHANGE_ATTRACTION_INFO':
      return { ...state, photo: action.photo, website: action.website, rating: action.rating };
    case 'CHANGE_ALL_ATTRACTION_INFO':
      return {
        id: action.id,
        lat: action.lat,
        lng: action.lng,
        photo: action.photo,
        website: action.website,
        rating: action.rating,
        isOpen: action.isOpen,
      };

    case 'CLOSE_INFO_WINDOW':
      return {
        ...state,
        id: initialState.id,
        photo: initialState.photo,
        website: initialState.website,
        rating: initialState.rating,
        isOpen: initialState.isOpen,
      };
    default:
      return state;
  }
};

export default reducer;
