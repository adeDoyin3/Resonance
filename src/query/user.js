import { useQuery } from "@tanstack/react-query"
import { getUserProfile } from "../service/user"

export const useGetUserProfile = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn:getUserProfile
    })
}