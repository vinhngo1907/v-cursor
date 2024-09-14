

<script lang="ts">
import { loginUser } from "@/repos/users";
import { useHeaderAlertStore } from "@/stores/header-alert";

const headerAlertStore = useHeaderAlertStore();

export default {
    data: () => ({
        valid: false,
        showPwd: false,
        login: "",
        loginRules: [(value: string) => !!value || "Login is required"],
        password: "",
        passwordRules: [(value: string) => !! value || "Password is required"]
    }),
    methods: {
        async sendLogin(event: any){
            event.preventDefault();
            const {valid} = await this.validateField();
            if(!valid){
                return;
            }

            try {
                const {login, password} = this;
                await loginUser({
                    login, password
                });

                headerAlertStore.setSuccess({
                    message: "Login successful. Welcome!",
                });

                setTimeout(() => {
                    this.$router.push({name: "users-list"});
                }, 1000);
            } catch (error) {
                headerAlertStore.setError(error);
            }
        },
        validateField(){
            return this.$refs.form.validate();
        }
    },
    watch: {
        login: "validateField",
        password: "validateField"
    },
};
</script>

<template>
 <v-form ref="form" v-model="valid" lazy-validation @submit="sendLogin">
    <v-card class="mx-auto" title="Authentication">
      <v-container>
        <v-text-field
          v-model="login"
          :rules="loginRules"
          color="primary"
          label="Login"
          variant="underlined"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPwd ? 'text' : 'password'"
          color="primary"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
          required
          @click:append="showPwd = !showPwd"
        ></v-text-field>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" type="submit">
          Authentication
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>