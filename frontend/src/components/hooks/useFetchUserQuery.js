import axios from "axios";
import { useQuery } from "react-query";

const useFetchUsers = () => {
    const apiUrl = process.env.REACT_APP_API_URL;



    const fetchUsers = async () => {

        const users = await axios.get(`${apiUrl}/users`)

        return users?.data;
    }
    const { data, isLoading, refetch } = useQuery('useFetchusers', () => fetchUsers());
    return {
        data,
        isLoading,
        refetch,
    }

}
export default useFetchUsers;
