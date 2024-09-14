import { defineStore } from "pinia";

export const useAuthStore = defineStore("count", {
    state: () => {
        const accessToken: string | null = localStorage.getItem("accessToken");
        const refreshToken: string | null = localStorage.getItem("refreshToken");

        return {
            accessToken, refreshToken, auth: Boolean(accessToken)
        }
    },
    actions: {
        refresh({ accessToken, refreshToken }: { accessToken: string, refreshToken: string }) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        },
        login({ accessToken, refreshToken }: { accessToken: string, refreshToken: string }) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.auth = true;
        },
        logout() {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            this.auth = false;
        }
    }
})