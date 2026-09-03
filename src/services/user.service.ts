import bcrypt from "bcrypt";

export interface User {
    id: string;
    email: string;
    password: string;
}

const users: User[] = [];

export const createUser = async (
    email: string,
    password: string
): Promise<User> => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = {
        id: crypto.randomUUID(),
        email,
        password: hashedPassword,
    };

    users.push(user);
    return user;
};

export const findUserById = async (
    userId: string
): Promise<User | null> => {
    const user = users.find(
        (user) => user.id === userId
    );

    return user ?? null;
};

export const findUserByEmail = async (
    email: string
): Promise<User | null> => {
    const user = users.find(
        (user) => user.email === email
    );

    return user ?? null;
}

export const verifyPassword = async (
    password: string,
    hashedPassword: string
) : Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
}