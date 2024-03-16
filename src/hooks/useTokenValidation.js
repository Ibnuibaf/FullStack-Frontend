import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; 
import toast from 'react-hot-toast';

const useTokenValidation = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return null;
};

export default useTokenValidation