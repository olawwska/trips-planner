import { initialState } from './context';
import { IInfoWindowStateType, InfoWindowActionsType } from '../types';

const reducer = (state: IInfoWindowStateType, action: InfoWindowActionsType) => {
  switch (action.type) {
    case 'CHANGE_ATTRACTION_ID':
      return { ...state, id: action.id };
    case 'CHANGE_ATTRACTION_INFO':
      return {
        ...state,
        photo: action.photo,
        website: action.website,
        attraction: action.attraction,
      };
    case 'CHANGE_ALL_ATTRACTION_INFO':
      return {
        attractionId: action.attractionId,
        lat: action.lat,
        lng: action.lng,
        photo: action.photo,
        website: action.website,
        attraction: action.attraction,
        isOpen: action.isOpen,
      };

    case 'CLOSE_INFO_WINDOW':
      return {
        ...state,
        attractionId: initialState.attractionId,
        photo: initialState.photo,
        website: initialState.website,
        attraction: initialState.attraction,
        isOpen: initialState.isOpen,
      };
    default:
      return state;
  }
};

export default reducer;
