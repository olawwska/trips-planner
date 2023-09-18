import axios from 'axios';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { IAttractionPayloadType, AttractionFormType } from './types';

const useAttractions = () => {
  const queryClient = useQueryClient();

  const getAllAttractions = async (cityId: string) => {
    const { data } = await axios.get(`http://localhost:8000/${cityId}/attractions`, {
      withCredentials: true,
    });
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
    const { data } = await axios.delete(`http://localhost:8000/attractions/${attractionId}`);
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
    const { data } = await axios.post(`http://localhost:8000/attractions`, attraction);
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

  const useEditAttraction = async ({ id, attraction }: AttractionFormType) => {
    const { data } = await axios.put(`http://localhost:8000/attractions`, {
      id,
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
    const { data } = await axios.post(
      `http://localhost:8000/rating/${attractionId}`,
      {
        rating: rating,
      },
      { withCredentials: true }
    );
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

  const useEditRating = async ({ attractionId, rating }) => {
    const { data } = await axios.put(
      `http://localhost:8000/rating/${attractionId}`,
      {
        rating: rating,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  };

  const { mutate: editRating } = useMutation(useEditRating, {
    onSuccess: () => {
      console.log('rating edited');
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
    editRating,
  };
};

export default useAttractions;
