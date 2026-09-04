export const isValidEmail = (
    email: string
): boolean => {
    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
};

export const isNonEmptyString = (
    value: unknown
): value is string => {
    return (
        typeof value === "string" &&
        value.trim().length > 0
    );
};

export const isValidNotificationType = (
    type: unknown
): type is "info" | "success" | "warning" | "error" => {
    return (
        type === "info" ||
        type === "success" ||
        type === "warning" ||
        type === "error"
    );
};

export const isValidPassword = (
    password: string
): boolean => {
    return password.length >= 8;
};