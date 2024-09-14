import axios from "axios";
import type { userListDto, usersListQueryDto } from "../dto/users";
import { useAuthStore } from "../stores/auth";
import { authenticatedRequest } from "../utils/axios";

const authStore = useAuthStore();
const apiGatewayUrl = import.meta.env.VITE_API_GATEWAY_URI;

export const loginUser = async (param: any) => {
    const { data } = await axios.post(`${apiGatewayUrl}/auth/login`, param);
    const { accessToken, refreshToken } = data;

    authStore.login({ accessToken, refreshToken });
    return { accessToken, refreshToken };
};

export const registerUser = async (param: any) => {
    const { data } = await axios.post(`${apiGatewayUrl}/auth/registration`, param);
    return data;
}

export const getListsUser = async(param: usersListQueryDto):Promise<userListDto> => {
    const url = new URL('/users/find-all', apiGatewayUrl);
  Object.entries(param).forEach(([ key, value ]) => url.searchParams.append(key, value?.toString()));

  return authenticatedRequest("get", url.href);
}