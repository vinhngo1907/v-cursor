<script lang="ts">
import { getUsersList } from "@/repos/users";
import { useHeaderAlertStore } from "@/stores/header-alert";

const headerAlertStore = useHeaderAlertStore();

export default {
    data: () => ({
        users: [
        ],
        count: 0,
        skip: 0,
        limit: 5,
        page: 1,
        pagesLength: 1,
        error: undefined,

        dialog: false,
        loading: false,
        search: null,
        select: null,
    }),
    methods: {
        async getUsers(login: string) {
            try {
                const { users, count } = await getUsersList({
                    skip: this.skip,
                    limit: this.limit,
                    login,
                });
                this.users = users;
                this.count = count;
                this.pagesLength = Math.ceil(this.count / this.limit);
            } catch (error) {
                headerAlertStore.setError(error);
            }
        },

        submitUsers() {
            console.log('this.select', this.select);

            this.dialog = false;
        },

        rejectUsers() {
            console.log('this.select', this.select);

            this.select = null;
            this.dialog = false;
        },
    },
    async mounted() {
        // this.getUsers('user');
    },
    watch: {
        async search(val) {
            if (val && val.length > 3) {
                this.loading = true;
                await this.getUsers(val);
                this.loading = false;
                return Boolean(this.users.length);
            }
        },
    },

};
</script>

<template>

    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="800">
            <template v-slot:activator="{ props }">
                <v-btn prepend-icon="mdi-plus" variant="outlined" color="primary" v-bind="props">
                    Create new discussion
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="text-h5">Create new discussion</v-card-title>

                <v-card-text>
                    Select users for new discussion.
                </v-card-text>

                <v-card-text>
                    <v-autocomplete v-model="select" v-model:search="search" :loading="loading" :items="users"
                        item-title="login" item-value="id" chips closable-chips multiple>
                    </v-autocomplete>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green-darken-1" variant="text" @click="rejectUsers">
                        Disagree
                    </v-btn>
                    <v-btn color="green-darken-1" variant="text" @click="submitUsers">
                        Agree
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>

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
