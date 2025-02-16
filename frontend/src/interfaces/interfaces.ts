export interface UserInfo {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface AuthState {
  userInfo: UserInfo | null;
}
