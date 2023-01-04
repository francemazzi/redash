// USER TYPE and INTERFACE
export interface UserInterface {
  name?: string;
  email: string;
  password?: string;
}

export type UserType = {
  user?: UserInterface;
};
