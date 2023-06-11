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
};

interface Coordinates {
  lat: number;
  lng: number;
}

interface PlaceInfo {
  photo: string;
  rating: number;
  website: string;
}

export interface IPlaceType extends Coordinates, PlaceInfo {
  name: string;
}

export interface IAttractionPayloadType extends Coordinates, PlaceInfo {
  attraction?: string;
  cityId?: number;
}

export interface IAttractionType extends IAttractionPayloadType {
  id: number;
}

export interface IInfoWindowDataType extends PlaceInfo {
  id: number;
}

export type InfoWindowActionsType =
  | {
      type: 'CHANGE_ATTRACTION_ID';
      id: number;
    }
  | {
      type: 'CHANGE_ATTRACTION_INFO';
      photo: string;
      rating: number;
      website: string;
    }
  | {
      type: 'CHANGE_ALL_ATTRACTION_INFO';
      id: number;
      lat: number;
      lng: number;
      photo: string;
      rating: number;
      website: string;
      isOpen: boolean;
    }
  | {
      type: 'CLOSE_INFO_WINDOW';
    };

export interface IInfoWindowStateType extends IInfoWindowDataType, Coordinates {
  isOpen: boolean;
}
