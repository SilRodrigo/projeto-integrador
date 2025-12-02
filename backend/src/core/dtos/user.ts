import { Prisma } from "@prisma/client";

export interface ICreateUserDto extends Pick<Prisma.UserUncheckedCreateInput, 'email' | 'password'> { }

export interface IRequestUserDto extends Omit<Prisma.UserGetPayload<{}>, 'password'> { }

export interface IUpdateUserDto {
  email?: string;
  password?: string;
}

export interface IFilterUserDto extends Omit<Prisma.UserWhereInput, 'password'> { }

export interface IAuthUserDto extends Prisma.UserCreateInput { }
