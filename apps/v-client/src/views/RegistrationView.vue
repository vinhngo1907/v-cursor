<script lang="ts">
import { registerUser } from "@/repos/users";
import { isEmailValid } from "@/utils/conditions";
import { useHeaderAlertStore } from "@/stores/header-alert";

const headerAlertStore = useHeaderAlertStore();

export default {
  data: () => ({
    valid: false,

    showPwd: false,
    showRPwd: false,

    login: "",
    loginRules: [(value: string) => !!value || "Login is required"],

    email: "",
    emailRules: [
      (value: string) => !!value || "E-mail is required",
      (value: string) => {
        return isEmailValid(value) || "E-mail must be valid";
      },
    ],

    password: "",
    passwordRules: [(value: string) => !!value || "Password is required"],

    passwordRepeat: "",

    terms: false,
    termsRules: [(value: string) => !!value || "Accept of terms is required"],
  }),
  methods: {
    async sendRegistration(event: any) {
      event?.preventDefault();

      try {
        const { valid } = await this.validateField();
        if (!valid) {
          return;
        }
        const { login, email, password, passwordRepeat } = this;
        await registerUser({
          login,
          email,
          password,
          passwordRepeat,
        });

        headerAlertStore.setSuccess({
          message: "Registration completed! Let's try to login!",
        });
        setTimeout(() => {
          this.$router.push({ name: "login" });
        }, 1000);
      } catch (error) {
        headerAlertStore.setError(error);
      }
    },
    passwordRepeatRules(value: string) {
      return value === this.password || "Repeat password please!";
    },
    validateField() {
      return this.$refs.form.validate();
    },
  },
  watch: {
    login: "validateField",
    email: "validateField",
    password: "validateField",
    passwordRepeat: "validateField",
    terms: "validateField",
  },
};
</script>

<template>
  <v-form ref="form" v-model="valid" lazy-validation @submit="sendRegistration">
    <v-card class="mx-auto" title="User Registration">
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
          v-model="email"
          :rules="emailRules"
          color="primary"
          label="Email"
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

        <v-text-field
          v-model="passwordRepeat"
          :rules="[passwordRepeatRules]"
          :append-icon="showRPwd ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showRPwd ? 'text' : 'password'"
          color="primary"
          label="Repeat password"
          placeholder="Repeat your password"
          variant="underlined"
          required
          @click:append="showRPwd = !showRPwd"
        ></v-text-field>

        <v-checkbox
          v-model="terms"
          :rules="termsRules"
          color="secondary"
          label="I agree to site terms and conditions"
        ></v-checkbox>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="primary" type="submit">
          Complete Registration

          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
