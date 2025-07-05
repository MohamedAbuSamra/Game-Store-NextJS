import axios from '../lib/axios';

export const fetchUserProfile = async (): Promise<any> => {
  const res = await axios.get('/users/profile');
  return res.data;
};
