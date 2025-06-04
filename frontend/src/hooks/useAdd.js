import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const addShoe = async ({ data }) => {

    const token = localStorage.getItem('token')
    
    const res = await axios.post(
        `/api/add/`,
        data,
        {
            headers: {
                'Authorization': `Token ${token}`
            },
        }
    );

    return res.data
}

export const useAdd = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationKey: ['addShoe'],
        mutationFn: addShoe,
        onSuccess: () => {
            queryClient.invalidateQueries(['userShoes']) // Example: invalidate related queries
            navigate('/myshoes') // Redirect to the user's shoes page

        },
        onError: (error) => {
            console.error('Error adding shoe:', error)
        }
    })
}