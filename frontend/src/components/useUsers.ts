import axios from 'axios';
import { useMutation } from 'react-query';

const useUsers = () => {
  const useAddUser = async ({ userEmail }) => {
    const { data } = await axios.post('http://localhost:8000/addUser', { userEmail: userEmail });
    return data;
  };

  const { mutate: addUser } = useMutation(useAddUser, {
    onSuccess: () => {
      console.log('success');
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { addUser };
};

export default useUsers;
