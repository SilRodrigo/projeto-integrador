export type WithOptionalIncludes<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export { ICreateUserDto as IUserCreateDto, IRequestUserDto, IUpdateUserDto, IFilterUserDto, IAuthUserDto as IUserAuthDto } from './user';
export { ICreateProjectDto, IRequestProjectDto, IUpdateProjectDto, IFilterProjectDto } from './project';
export { ICreateRequirementDto, IRequestRequirementDto, IUpdateRequirementDto, IFilterRequirementDto } from './requirement';
export { ICreateRequirementVersionDto, IRequestRequirementVersionDto, IUpdateRequirementVersionDto, IFilterRequirementVersionDto } from './requirementVersion';