export type messageDto = {
    uuid: string,
    user_id: string,
    message: string,
    created_at?: string,
    login?:string,
    token?:string
}