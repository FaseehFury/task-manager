import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const deleteUser = async (userId) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    await axios.delete(`${apiUrl}/users/${userId}`);
};

const useDeleteUser = () => {
    const queryClient = useQueryClient();

    const deleteUserMutation = useMutation(deleteUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('users'); // Invalidate the 'tasks' query to trigger refetching
        },
    });

    const deleteUserById = async (userId) => {
        try {
            await deleteUserMutation.mutateAsync(userId);
        } catch (error) {
            // Handle errors, e.g., show error message
            console.error('Error deleting task:', error);
        }
    };

    return deleteUserById;
};

export default useDeleteUser;
