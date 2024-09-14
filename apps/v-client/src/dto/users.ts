export type usersListQueryDto = {
    login?: string;
    skip?: number;
    limt?: string;
    sortField?: string;
    sortAsc?: string;
};

export type userDto = {
    active: boolean,
    created_at: string;
    email: string;
    id: string;
    login: string;
}

export type userListDto = {
    users: userDto[];
    count: number;
}