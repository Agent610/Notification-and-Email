import bcrypt from "bcrypt";

export interface User {
    id: string;
    email: string;
    password: string;
}

export const createUser = async (
    email: string,
    password: string
): Promise<User> => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return {
        id: crypto.randomUUID(),
        email,
        password: hashedPassword,
    };
};

export const verifyPassword = async (
    password: string,
    hashedPassword: string
) : Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
}