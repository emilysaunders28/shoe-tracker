import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const fetchShoeById = async (id) => {
    const token = localStorage.getItem('token')
    const headers = {}

    if (token) {
        headers['Authorization'] = `Token ${token}`
    }
    const res = await axios.get(
        `/api/shoe/${id}/`,
        {
            headers: headers
        }
    );
    return res.data
}

export const useShoeById = (id) => {
    return useQuery({
        queryKey: ['shoe', id],
        queryFn: () => fetchShoeById(id),
        staleTime: 1000 * 5 * 60
    })
}