import { IRequestUserDto } from "../../dtos";

export interface IUser {
    id: string;
    email: string;
    password?: string
}

export const userFactory = (requestUserDto: IRequestUserDto): IUser => {
    const { id, email } = requestUserDto

    return {
        id,
        email
    }
}