import axios from 'axios';
import { useQuery } from 'react-query';

const useCoordinates = () => {
  const getCityCoordinates = async (city: string) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=process.env.REACT_APP_API_KEY`;
    const { data } = await axios.get(url);
    return data;
  };

  const useGetCityCoordinates = (city: string) => {
    const { data: coordinates, isLoading: isLoadingCoordinates } = useQuery(
      ['coordinates', city],
      () => getCityCoordinates(city),
      {
        enabled: Boolean(city),
      }
    );
    return {
      coordinates,
      isLoadingCoordinates,
    };
  };

  return { useGetCityCoordinates };
};

export default useCoordinates;
