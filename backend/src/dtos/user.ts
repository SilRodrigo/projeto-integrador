import { Prisma } from "@prisma/client";

export interface IUserCreateDto extends Pick<Prisma.UserUncheckedCreateInput, 'email' | 'password'> { }

export interface IRequestUserDto extends Omit<Prisma.UserGetPayload<{}>, 'password'> { }

export interface IUpdateUserDto extends Prisma.UserUpdateInput { }

export interface IFilterUserDto extends Omit<Prisma.UserWhereInput, 'password'> { }

export interface IUserAuthDto {
  email: string;
  password: string;
}