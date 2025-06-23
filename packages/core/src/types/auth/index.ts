export interface IApiPostLogin {
  email: string;
  password: string;
}

export interface IApiPostRegister extends IApiPostLogin {}

export interface IApiResendVerification {
  email: string;
}
