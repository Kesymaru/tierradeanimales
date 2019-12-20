export interface IUser {
    id: string|number;
    firstName: string;
    lastName: string;
    email: string;
};

export interface IUserSignUp {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    terms?: boolean;
};

export interface IUserSingIn {
    email?: string;
    password?: string;
    remember?: boolean;
};

