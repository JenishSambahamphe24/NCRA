import { UserRoleEnum, UserTypeEnum } from "@/enums/user.enum";


export type TUser = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  isEmailVerified: boolean;
  institutionId: number;
  type: UserTypeEnum;
  status: boolean;
  roles: UserRoleEnum[];
  isTemporaryPassword: boolean;
};

export type TUserRequest = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: string;
  institutionId: number;
  type: UserTypeEnum;
  status: boolean;
  roleIds: number[];
  isTemporaryPassword: boolean;
};

export type TIdRequest = {
    id: number;
}


export type TRegisterEmailRequest = {
  email: string;
};

export type TRegisterEmailResponse = {
  message: string;
  userId: number;
};

export type TGenerateOTPRequest = {
  email: string;
};

export type TGenerateOTPResponse = {
  message: string;
  userId: number;
};

export type TVerifyOTPRequest = {
  email: string;
  otp: string;
};

export type TVerifyOTPResponse = {
  message: string;
  userId: number;
};

export type TResetPasswordRequest = {
    email: string;
    resetToken: string;
    password: string;
    confirmPassword: string;
}

export type TResetPasswordResponse = {
    message: string;
    userId: number;
}


export type TLoginRequest = {
    email: string;
    password: string;
}

type TListUser = {
  id: number;
  roleName: UserRoleEnum;
  isActive: boolean;
};

export type TLoginResponse = {
  tokenString: string;
  id: number;
  email: string;
  type: string;
  listUser: TListUser[];
};