<script lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { useHeaderAlertStore } from "@/stores/header-alert";
import { io } from "socket.io-client";
import { userDto } from '@/dto/users';
import { messageDto } from '@/dto/messages';
import { useAuthStore } from '@/stores/auth';
import { refreshTokenRequest } from '@/utils/axios';

const apiGatewayUrl = import.meta.env.VITE_SOCKET_URI;
const usersById: { [key: string]: userDto } = {};
const messages: messageDto[] = [];

const headerAlertStore = useHeaderAlertStore();
const authStore = useAuthStore();

export default {
    data: () => ({
        socket: io(apiGatewayUrl),
        message: "",
        messages,
        loading: false,
        disabled: false,
        roomId: '',
        uuid: '',
        usersById,
    }),

    async mounted() {
        try {
            this.socket.on("exception", async (error: any) => {
                try {
                    if (error.message === 'jwt expired') {
                        await refreshTokenRequest();
                        if (!this.roomId) {
                            this.joinRoom();
                        }
                        this.sendMessage(undefined);
                    } else {
                        throw error;
                    }
                } catch (err: any) {
                    headerAlertStore.setError(err);
                    if (err.response?.status === 401) {
                        this.$router.push({ name: "login" });
                    }
                }
            });

            this.socket.on("connect", () => {
                this.joinRoom();
            });

            this.socket.on("joinPrivateRoom", (data) => {
                this.roomId = data.room.id;
                this.usersById = data.users.reduce((acc: { [key: string]: userDto }, user: userDto) => {
                    acc[user.id] = user;
                    return acc;
                }, {});

                this.messages = data.messages.map(({ uuid, user_id, message, created_at }: messageDto) => ({
                    uuid,
                    user_id,
                    message,
                    created_at,
                    login: this.usersById[user_id]?.login,
                }));
                this.scrollDown();
            });

            this.socket.on("message", (data) => {
                const { uuid, user_id, message, created_at, } = data;
                this.messages.push({
                    uuid,
                    user_id,
                    message,
                    created_at,
                    login: this.usersById[user_id]?.login,
                });

                if (uuid === this.uuid) {
                    this.loading = false;
                    this.disabled = false;
                    this.message = '';
                }

                this.scrollDown();
            });

            this.socket.on("disconnect", () => {
                console.log("Disconnected");
            });


        } catch (error) {
            headerAlertStore.setError(error);
        }
    },
    beforeUnmount() {
        this.socket?.disconnect()
    },
    methods: {
        sendMessage(event: any | undefined) {
            event?.preventDefault();

            if (this.message) {
                this.loading = true;
                this.disabled = true;
                this.uuid = uuidv4();
                this.socket?.emit("message", {
                    token: authStore.accessToken,
                    message: this.message,
                    uuid: this.uuid,
                    room_id: this.roomId,
                });
            }

        },
        joinRoom() {
            this.socket.emit("joinPrivateRoom", {
                token: authStore.accessToken,
                userId: this.$route.params.userId,
                type: 'private',
            });
        },
        scrollDown() {
            const el: any = this.$refs.messages_container;
            if (this.messages?.length > 5) {
                setTimeout(() => {
                    el.scrollToIndex(this.messages.length - 1);
                }, 1000);
            }
        }
    }
}

</script>

<template>
    <v-card class="mx-auto" title="Chat">
        <v-card-text>
            <v-virtual-scroll :height="300" :items="messages" ref="messages_container">
                <template v-slot:default="{ item }">
                    <v-list-item-title>{{ item.login }}</v-list-item-title>
                    <v-list-item-subtitle>{{ new Date(item.created_at).toLocaleString() }}: {{ item.message
                        }}</v-list-item-subtitle>
                </template>
            </v-virtual-scroll>
        </v-card-text>

        <v-card-actions>
            <v-container>
                <v-row dense>
                    <v-col cols="12">

                        <v-form ref="form" @submit="sendMessage">
                            <v-text-field ref="message_field" :loading="loading" :disabled="disabled" label="Message"
                                append-inner-icon="mdi-send" v-model="message" @click:append-inner="sendMessage">
                            </v-text-field>
                        </v-form>

                    </v-col>
                </v-row>
            </v-container>
        </v-card-actions>

    </v-card>


</template>