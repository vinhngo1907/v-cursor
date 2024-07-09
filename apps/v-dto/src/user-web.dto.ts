import { ApiProperty } from "@nestjs/swagger";

export class WebRegistrationParamDto {
    @ApiProperty({ description: 'Id of user', nullable: false })
    login: string;

    @ApiProperty({ description: "Email of user", nullable: false })
    email: string;

    @ApiProperty({ description: 'Password of user', nullable: false })
    password: string;

    @ApiProperty({ description: 'Repeat password', nullable: false })
    passwordRepeat: string;
}