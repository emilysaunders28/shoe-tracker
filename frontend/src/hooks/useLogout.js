import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export const useLogout = (props) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const res = await axios.post(
                '/api/logout/', 
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                }
            );
            return res.data;
        },
        onSuccess: () => {
            localStorage.removeItem('token');
            queryClient.invalidateQueries(['user']);
        },
        onError: (error) => {
            console.error('Logout failed:', error);
        }
    })


    return mutation;
}

