export interface IResetEmail {
  email: string | null;
}

export interface IVerifyCode {
  resetCode: string | null;
}

export interface IResetPassword extends IResetEmail {
  newPassword: string | null;
}
