import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const deleteTask = async (taskId) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    await axios.delete(`${apiUrl}/task/${taskId}`);
};

const useDeleteTask = () => {
    const queryClient = useQueryClient();

    const deleteTaskMutation = useMutation(deleteTask, {
        onSuccess: () => {
            queryClient.invalidateQueries('tasks'); // Invalidate the 'tasks' query to trigger refetching
        },
    });

    const deleteTaskById = async (taskId) => {
        try {
            await deleteTaskMutation.mutateAsync(taskId);
        } catch (error) {
            // Handle errors, e.g., show error message
            console.error('Error deleting task:', error);
        }
    };

    return deleteTaskById;
};

export default useDeleteTask;
