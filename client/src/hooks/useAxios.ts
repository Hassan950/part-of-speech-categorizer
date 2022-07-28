import axios from 'axios';
import { useEffect, useState } from 'react';

axios.defaults.baseURL = 'http://localhost:8000/api';

export const useAxios = ({
  url,
  method = 'get',
  data,
}: {
  url: string;
  method?: 'get' | 'post';
  data?: any;
}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      url,
      method,
      data,
    })
      .then((res) => setResponse(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { response, error, loading };
};
