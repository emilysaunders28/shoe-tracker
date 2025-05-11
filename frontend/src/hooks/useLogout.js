import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'


export const useLogout = (props) => {
    const queryClient = useQueryClient();

    const logout = async () => {
        const token = localStorage.getItem('token');

        try {
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

            localStorage.removeItem('token')
            queryClient.invalidateQueries(['user']);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    return logout;
}

