import { $Enums } from "@prisma/client";
import { IRequestUserDto } from "../dtos";

export interface IUser {
    id: string
    email: string;
    createdAt: Date
    updatedAt: Date,
    userType: $Enums.UserType
}

export const userFactory = (requestUserDto: IRequestUserDto): IUser => {
    const user =  {
        id: requestUserDto.id,
        email: requestUserDto.email,
        createdAt: requestUserDto.createdAt,
        updatedAt: requestUserDto.updatedAt,
        userType: requestUserDto.userType
    }

    return user;
}