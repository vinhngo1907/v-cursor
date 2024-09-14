<script lang="ts">

import { getUsersList } from "@/repos/users";
import { useHeaderAlertStore } from "@/stores/header-alert";

const headerAlertStore = useHeaderAlertStore();

export default {
    data: () => ({
        users: [],
        skip: 0,
        count: 0,
        limit: 5,
        page: 1,
        pagesLength: 1,
        error: undefined
    }),
    methods: {
        async getUsers() {
            try {
                const { users, count } = await getUsersList({ skip: this.skip, limit: this.limit });
                this.users = users;
                this.count = count;
                this.pagesLength = Math.ceil(this.count / this.limit);

            } catch (error: any) {
                headerAlertStore.setError(error);
                if (error.response?.status === 401) {
                    this.$router.push({ name: "login" });
                }
            }
        },
    },
    async mounted() {
        this.getUsers();
    },
    watch: {
        page: function (page) {
            this.skip = (this.page - 1) * this.limit;
            this.getUsers();
        }
    },
};
</script>

<template>
    <v-table hover=true>
        <thead>
            <tr>
                <th class="text-left">Login</th>
                <th class="text-left">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.login }}</td>
                <td>
                    <v-btn prepend-icon="mdi-chat-outline" variant="outlined" color="primary" size="small"
                        :to="`chat-private/${user.id}`">Message</v-btn>
                </td>
            </tr>
        </tbody>
    </v-table>

    <div class="text-center">
        <v-container>
            <v-row justify="center">
                <v-col cols="8">
                    <v-container class="max-width">
                        <v-pagination class="my-4" :length="pagesLength" v-model="page"></v-pagination>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>