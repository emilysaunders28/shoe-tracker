import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export const fetchSearch = async (search) => {
    const res = await axios.post(
        '/api/search/',
        {
            search: search,
        },
    {});
    return res.data;
}

export const useSearch = (search) => {
    return useQuery({
        queryKey: ['search', search],
        queryFn: () => fetchSearch(search),
        staleTime: 1000 * 60 * 5,
        enabled: !!search,
    });
}