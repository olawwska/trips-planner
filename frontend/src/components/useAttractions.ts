import axios from 'axios';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { IAttractionPayloadType, AttractionFormType } from './types';

const useAttractions = () => {
  const queryClient = useQueryClient();

  const getAllAttractions = async (cityId: string) => {
    const { data } = await axios.get(`http://localhost:8000/getAllAttractions/${cityId}`);
    return data;
  };

  const useGetAllAttractions = (cityId: string = '') => {
    const { data, isLoading } = useQuery(['attractions', cityId], () => getAllAttractions(cityId), {
      enabled: Boolean(cityId),
    });
    return {
      data,
      isLoading,
    };
  };

  const useDeleteAttraction = async (attractionId: number) => {
    const { data } = await axios.delete(`http://localhost:8000/deleteAttraction/${attractionId}`);
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

  const useAddAttraction = async (attraction: IAttractionPayloadType) => {
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

  const useEditAttraction = async ({ attractionId, attraction }: AttractionFormType) => {
    const { data } = await axios.put(`http://localhost:8000/editAttraction`, {
      attractionId: attractionId,
      attraction: attraction,
    });
    return data;
  };

  const { mutate: editAttraction } = useMutation(useEditAttraction, {
    onSuccess: () => {
      console.log('attraction edited');
    },
    onError: (err) => {
      console.log(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries('attractions');
    },
  });

  const useAddRating = async ({ attractionId, rating }) => {
    const { data } = await axios.put(`http://localhost:8000/addRating`, {
      attractionId: attractionId,
      rating: rating,
    });
    return data;
  };

  const { mutate: addRating } = useMutation(useAddRating, {
    onSuccess: () => {
      console.log('added rating');
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
    editAttraction,
    addRating,
  };
};

export default useAttractions;
