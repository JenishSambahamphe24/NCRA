import { fetch, remove, replace, store } from "@/lib/http.lib";
import { TGenerateOTPRequest, TGenerateOTPResponse, TIdRequest, TLoginRequest, TLoginResponse, TRegisterEmailRequest, TRegisterEmailResponse, TResetPasswordRequest, TResetPasswordResponse, TUser, TUserRequest, TVerifyOTPRequest, TVerifyOTPResponse } from "@/types/user.type";

const BASE_ENDPOINT = "/User";

export async function getUsers() {
  const response = await fetch<TUser[]>({
    endpoint: BASE_ENDPOINT,
  });
  return response;
}

export async function getUser({ id }: TIdRequest) {
  const response = await fetch<TUser>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
  });
  return response;
}

export async function editUser({ id, ...data }: TIdRequest &  TUserRequest ) {
  const response = await replace<TUser>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
    data,
  });
  return response;
}

export async function deleteUser({ id }: TIdRequest) {
  const response = await remove<TUser>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
  });
  return response;
}

export async function createUser({ data }: { data: TUserRequest }) {
  const response = await store<TUser>({
    endpoint: `${BASE_ENDPOINT}/register`,
    data,
  });
  return response;
}

export async function registerEmail({ email }: TRegisterEmailRequest) {
  const response = await store<TRegisterEmailResponse>({
    endpoint: `${BASE_ENDPOINT}/register-email`,
    data:email,
    config:{
        headers:{
            "Content-Type": "application/json",
        }
    }
  });
  return response;
}

export async function generateOTP({ email }: TGenerateOTPRequest) {
  const response = await store<TGenerateOTPResponse>({
    endpoint: `${BASE_ENDPOINT}/generateotp`,
    data:email,
    config:{
        headers:{
            "Content-Type": "application/json",
        }
    }
  });
  return response;
}
export async function verifyOTP({ email, otp }: TVerifyOTPRequest) {
  const response = await store<TVerifyOTPResponse>({
    endpoint: `${BASE_ENDPOINT}/verify-otp`,
    data:{
        email,
        otp,
    },
  });
  return response;
}

export async function resetPassword(data:TResetPasswordRequest){    
    const response = await store<TResetPasswordResponse>({
        endpoint: `${BASE_ENDPOINT}/reset-password`,
        data,
    });
    return response;
}


export async function login({ email, password }: TLoginRequest) {
  const response = await store<TLoginResponse>({
    endpoint: `${BASE_ENDPOINT}/login`,
    data: {
      email,
      password,
    },
  });
  return response;
}

export async function logout() {
    const response = await store<unknown>({
        endpoint: `${BASE_ENDPOINT}/logout`,
    });
    return response;
}