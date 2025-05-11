import axios from 'axios';
import { useQuery } from '@tanstack/react-query'

export const fetchUser = async () => {
    const token = localStorage.getItem('token');

    const headers = {};
    if (token) {
        headers['Authorization'] = `Token ${token}`;
    }

    const res = await axios.get('/api/user/', {
        headers: headers,
    });
    return res.data;
};

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
        staleTime: 1000 * 60 * 5,
        retry: false,
    });
};