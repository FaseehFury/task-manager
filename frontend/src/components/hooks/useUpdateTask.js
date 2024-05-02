import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const updateTask = async (updatedTask) => {

    const apiUrl = process.env.REACT_APP_API_URL;

    const { id, ...rest } = updatedTask;
    const response = await axios.put(`${apiUrl}/task/${id}`, rest);
    return response.data;
};

const useUpdateTask = () => {
    const queryClient = useQueryClient();

    const updateTaskMutation = useMutation(updateTask, {
        onSuccess: () => {
            queryClient.invalidateQueries('tasks'); // Invalidate the 'tasks' query to trigger refetching
        },
    });

    const updateTaskById = async (updatedTask) => {
        try {
            await updateTaskMutation.mutateAsync(updatedTask);
        } catch (error) {
            // Handle errors, e.g., show error message
            console.error('Error updating task:', error);
        }
    };

    return updateTaskById;
};

export default useUpdateTask;
