import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const updateUser = async (updateduser) => {

    const apiUrl = process.env.REACT_APP_API_URL;

    const { id, ...rest } = updateduser;
    const response = await axios.put(`${apiUrl}/users/${id}`, rest);
    return response.data;
};

const useUpdateUsers = () => {
    const queryClient = useQueryClient();

    const updateUsersMutation = useMutation(updateUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('users'); // Invalidate the 'tasks' query to trigger refetching
        },
    });

    const updateUsersById = async (updateduser) => {
        try {
            await updateUsersMutation.mutateAsync(updateduser);
        } catch (error) {
            // Handle errors, e.g., show error message
            console.error('Error updating task:', error);
        }
    };

    return updateUsersById;
};

export default useUpdateUsers;
