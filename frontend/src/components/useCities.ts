import axios from 'axios';
import { useMutation, useQueryClient, useQuery } from 'react-query';

const useCities = () => {
  const queryClient = useQueryClient();

  const getAllCities = async () => {
    const { data } = await axios.get('http://localhost:8000/getAll');
    return data;
  };

  const { data: cities, isLoading } = useQuery('cities', getAllCities);

  const useCreateCity = async (city: any) => {
    const { data } = await axios.post('http://localhost:8000/addCity', city);
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

  const useDeleteCity = async (id: string) => {
    const { data } = await axios.delete(`http://localhost:8000/deleteCity/${id}`);
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

  return {
    cities,
    areCitiesLoading: isLoading,
    createCity,
    deleteCity,
  };
};

export default useCities;
