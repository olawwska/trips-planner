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

export interface AttractionType {
  attraction: string;
  id?: string;
  cityId: string;
}
