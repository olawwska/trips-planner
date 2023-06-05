import axios from 'axios';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { AttractionType } from './types';

const useAttractions = () => {
  const queryClient = useQueryClient();

  const getAllAttractions = async (cityId: string) => {
    const { data } = await axios.get(`http://localhost:8000/getAllAttractions/${cityId}`);
    return data;
  };

  const useGetAllAttractions = (cityId: string = ''): AttractionType[] => {
    const { data } = useQuery(['attractions', cityId], () => getAllAttractions(cityId), {
      enabled: Boolean(cityId),
    });
    return data;
  };

  const useDeleteAttraction = async (id: string) => {
    const { data } = await axios.delete(`http://localhost:8000/deleteAttraction/${id}`);
    return data;
  };

  const { mutate: deleteAttraction } = useMutation(useDeleteAttraction, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries('attractions');
    },
  });

  const useAddAttraction = async (attraction: AttractionType) => {
    const { data } = await axios.post(`http://localhost:8000/addAttraction`, attraction);
    return data;
  };

  const { mutate: addAttraction } = useMutation(useAddAttraction, {
    onSuccess: () => {
      console.log('attraction added');
    },
    onError: (err) => {
      console.log(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries('attractions');
    },
  });

  return {
    useGetAllAttractions,
    addAttraction,
    deleteAttraction,
  };
};

export default useAttractions;
