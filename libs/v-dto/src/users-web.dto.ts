import { ApiProperty } from '@nestjs/swagger';

export class WebRegistrationParamDto {
    @ApiProperty({ description: 'Id of user', nullable: false })
    login: string;

    @ApiProperty({ description: 'Email of user', nullable: false })
    email: string;

    @ApiProperty({ description: 'Password of user', nullable: false })
    password: string;

    @ApiProperty({ description: 'Repeat password', nullable: false })
    passwordRepeat: string;
}

export class WebLoginParamDto {
    @ApiProperty({ description: 'Login of user', nullable: false })
    login: string;

    @ApiProperty({ description: 'Password of user', nullable: false })
    password: string;
}

export class WebUserDto {
    @ApiProperty({ description: 'Id of user', nullable: false })
    id: string;

    @ApiProperty({ description: 'Login of user', nullable: false })
    login: string;

    @ApiProperty({ description: 'Email of user', nullable: false })
    email: string;

    @ApiProperty({ description: 'Flag of user active', nullable: false })
    active: boolean;

    @ApiProperty({ description: 'Date of user creation', nullable: false })
    created_at: Date;
}

export class WebUsersAllDto {
    @ApiProperty({ description: 'List of users' })
    users: WebUserDto[];

    @ApiProperty({ description: 'Count of users' })
    count: number;
}

export class FindByIdDto {
    @ApiProperty({ description: 'Id of user' })
    id: string;
}

export class FindByIdsDto {
    @ApiProperty({ description: 'Ids of user' })
    ids: string[];
}

export class FindAllDto {
    @ApiProperty({ description: 'Ids for exclude', required: false })
    excludeIds?: string[];

    @ApiProperty({ description: 'Login for search', required: false })
    login?: string;

    @ApiProperty({ description: 'Number of pagination', required: false })
    skip?: number;

    @ApiProperty({ description: 'Limit of rows', required: false })
    limit?: number;

    @ApiProperty({ description: 'Field for sorting', required: false })
    sortField?: string;

    @ApiProperty({ description: 'Sotring asc/desc', required: false })
    sortAsc?: string;
}