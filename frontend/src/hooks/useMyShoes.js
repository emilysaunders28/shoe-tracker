import axios from 'axios';
import { useQuery } from '@tanstack/react-query'

export const fetchMyShoes = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/get_user_shoes/', {
        headers: {
            'Authorization': `Token ${token}`
        },
    });
    return res.data;
};

export const useMyShoes = () => {
    return useQuery({
        queryKey: ['myShoes'],
        queryFn: fetchMyShoes,
        staleTime: 1000 * 60 * 5,
        retry: false,
        enabled: !!localStorage.getItem('token'), // Only fetch if token exists
    });
};