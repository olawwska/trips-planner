import axios from 'axios';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { CityType } from './types';

const useCities = () => {
  const queryClient = useQueryClient();

  const getAllCities = async () => {
    const { data } = await axios.get(`http://localhost:8000/cities`, {
      withCredentials: true,
    });
    return data;
  };

  const { data: cities, isLoading: areCitiesLoading } = useQuery('cities', getAllCities);

  const useCreateCity = async ({ city }) => {
    const { data } = await axios.post(
      'http://localhost:8000/cities',
      {
        city: city,
      },
      { withCredentials: true }
    );
    return data;
  };

  const { mutate: createCity } = useMutation(useCreateCity, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries('cities');
    },
  });

  const useDeleteCity = async (cityId: number) => {
    const { data } = await axios.delete(`http://localhost:8000/cities/${cityId}`, {
      withCredentials: true,
    });
    return data;
  };

  const { mutate: deleteCity } = useMutation(useDeleteCity, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries('cities');
      queryClient.invalidateQueries('attractions');
    },
  });

  const getCityById = async (cityId: string) => {
    const { data } = await axios.get(`http://localhost:8000/cities/${cityId}`, {
      withCredentials: true,
    });
    return data;
  };

  const useGetCityById = (cityId: string = ''): CityType => {
    const { data } = useQuery(['city', cityId], () => getCityById(cityId), {
      enabled: Boolean(cityId),
    });
    return data;
  };

  return {
    cities,
    areCitiesLoading,
    createCity,
    deleteCity,
    useGetCityById,
  };
};

export default useCities;
