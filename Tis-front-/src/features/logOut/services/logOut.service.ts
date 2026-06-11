import { clearUserSession } from '../utils/logOut.utils';

export const logOutService = async (): Promise<void> => {
  // Simulando una llamada a API si fuese necesario:
  // await axios.post('/api/logout');
  
  clearUserSession();
};
