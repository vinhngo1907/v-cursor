import { defineStore } from "pinia";

type AlertType = "error" | "success"; // Define specific types for the properties

export const useHeaderAlertStore = defineStore("headerAlert", {
    state: () => {
        return {
          error: undefined as any | undefined,
          success: undefined as any | undefined,
        };
      },
    actions: {
        clear(type: AlertType, dt: number) {
            setTimeout(() => {
                if (this[type]?.dt === dt) {
                    this[type] = undefined;
                }
            }, 10000);
        },
        setError(error: any) {
            this.success = undefined;

            const dt = Date.now();
            this.error = {
                ...error,
                dt,
                message: error.response?.data?.message || error.message,
            };
            this.clear("error", dt);
        },
        setSuccess(success: any) {
            this.error = undefined;

            const dt = Date.now();
            this.success = {
                dt,
                message: success.response?.data?.message || success.message,
                data: success.response?.data || success.data,
            };

            this.clear("success", dt);
        },
    },
});
