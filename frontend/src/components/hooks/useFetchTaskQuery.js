import axios from "axios";
import { useQuery } from "react-query";

const useFetchTasksQuery = () => {
    const apiUrl = process.env.REACT_APP_API_URL;



    const fetchTask = async () => {

        const tasks = await axios.get(`${apiUrl}/task`)

        return tasks?.data;
    }
    const { data, isLoading, refetch } = useQuery('useFetchtasks', () => fetchTask());
    return {
        data,
        isLoading,
        refetch,
    }

}
export default useFetchTasksQuery;
