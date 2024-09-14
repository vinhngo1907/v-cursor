import axios from "axios";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const apiGatewayUrl = import.meta.env.VITE_API_GATEWAY_URI;

export const requestWithToken = async (method: string, url: string, param?: any) => {

    const config = {
        headers: {
            Authorization: `Bearer ${authStore.accessToken}`
        }
    }

    const result = method === "post"
        ? await axios.post(url, param, config)
        : await axios.get(url, config);

    return result.data;
}

export const refreshTokenRequest = async () => {
    const requestTokenOld = localStorage.getItem("refreshToken");
    const config = {
        headers: {
            Authorization: `Bearer ${requestTokenOld}`
        }
    }

    const result = await axios.post(`${apiGatewayUrl}/auth/refresh`, {}, config);
    const { accessToken, refreshToken } = result.data;
    authStore.refresh({ accessToken, refreshToken })
    return { accessToken, refreshToken };
}

export const authenticatedRequest = async (
    method: string,
    url: string,
    param?: any) => {
    try {
        return await requestWithToken(method, url, param);
    } catch (error: any) {
        if (error.response?.status === 401) {
            try {
                await refreshTokenRequest();

                return await requestWithToken(method, url, param);
            } catch (secondError) {
                authStore.logout();
                throw secondError;
            }
        }

        throw error;
    }
}