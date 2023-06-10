export interface CityType {
  city: string;
  id: string;
}

export type PlaceListItemType = {
  id: string;
  onDelete: (id: string) => void;
  place: {
    type?: string;
    name: string;
  };
};

export interface IAttractionPayload {
  attraction: string;
  cityId: string;
  lat: number;
  lng: number;
  photo: string;
  rating: number;
  website: string;
}

export interface IAttractionType extends IAttractionPayload {
  id: number;
}

export interface IInfoWindowDataType {
  id: number;
  photo: string;
  rating: number;
  website: string;
}

export interface IMarkerType extends IInfoWindowDataType {
  lat: number;
  lng: number;
}
