import { useMutation, useQueryClient } from 'react-query'; // Import necessary functions from react-query
import axios from 'axios'; // Import axios for making HTTP requests

const useCreateTask = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const queryClient = useQueryClient();


    // Define the mutation function for creating a task
    const createTaskMutation = useMutation(
        (taskData) => axios.post(`${apiUrl}/task`, taskData), // Adjust the endpoint as per your backend API
        {
            onSuccess: () => {
                // Invalidate relevant query data after creating a task to trigger refetching
                queryClient.invalidateQueries('tasks');
            },
        }
    );

    return createTaskMutation;
};

export default useCreateTask;

