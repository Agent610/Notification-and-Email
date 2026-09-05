import bcrypt from "bcrypt";
import UserModel from "../models/User";

export const createUser = async (
    email: string,
    password: string
) => {
    const normalizedEmail = email.trim().toLowerCase();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
        email: normalizedEmail,
        password: hashedPassword,
    });

    return user;
};

export const findUserById = async (
    userId: string
) => {
    return UserModel.findById(userId);
};

export const findUserByEmail = async (
    email: string
) => {
    const normalizedEmail = email.trim().toLowerCase();

    return UserModel.findOne({
        email: normalizedEmail,
    });
};

export const verifyPassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};