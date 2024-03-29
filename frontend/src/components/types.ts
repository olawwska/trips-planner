export interface CityType {
  city: string;
  id: number;
}

export type PlaceListItemType = {
  id: number;
  onDelete: (id: number) => void;
  name: string;
  onHandleFocus?: () => void;
  onHandleClick?: (id: number) => void;
  onHandleMouseOut?: () => void;
  setIsOpenDialog?: (isOpen: boolean) => void;
  setAttractionForm?: (state: any) => void;
  addRating?: ({ attractionId, rating }) => void;
  rating?: number | null;
};

interface Coordinates {
  lat: number;
  lng: number;
}

interface PlaceInfo {
  photo: string;
  attraction: string;
  website: string;
  rating?: number;
}

export interface IPlaceType extends Coordinates, PlaceInfo {
  name: string;
}

export interface IAttractionPayloadType extends Coordinates, PlaceInfo {
  attraction: string;
  cityId?: number;
}

export interface IAttractionType extends IAttractionPayloadType {
  id: number;
}

export interface IInfoWindowDataType extends PlaceInfo {
  attractionId: number;
}

export type TripsPlannerActionsType =
  | {
      type: 'CHANGE_ATTRACTION_ID';
      id: number;
    }
  | {
      type: 'CHANGE_ATTRACTION_INFO';
      photo: string;
      attraction: string;
      website: string;
    }
  | {
      type: 'CHANGE_ALL_ATTRACTION_INFO';
      attractionId: number;
      lat: number;
      lng: number;
      photo: string;
      attraction: string;
      website: string;
      isOpen: boolean;
    }
  | {
      type: 'CLOSE_INFO_WINDOW';
    }
  | {
      type: 'AUTHENTICATE_USER';
      isAuthenticated: boolean;
      authenticatedUserName: string;
    };

export interface TripsPlannerStateType extends IInfoWindowDataType, Coordinates {
  isOpen: boolean;
  isAuthenticated: false;
  authenticatedUserName: string;
}

export type AttractionFormType = {
  attraction: string;
  id?: number;
};
