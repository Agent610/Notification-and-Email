import fs from "fs";
import path from "path";

const allowedTemplates = [
    "welcome.html",
    "notification.html",
    "password-reset.html",
    "catering-confirmation.html",
] as const;

export const loadEmailTemplate = (
    templateName: string,
    variables: Record<string, string>
): string => {
    if (
        !allowedTemplates.includes(
            templateName as (typeof allowedTemplates)[number]
        )
    ) {
        throw new Error("Invalid email template");
    }

    const templatePath = path.join(
        __dirname,
        "..",
        "templates",
        templateName
    );

    let template = fs.readFileSync(
        templatePath,
        "utf-8"
    );

    Object.entries(variables).forEach(
        ([key, value]) => {
            template = template.replace(
                new RegExp(`{{${key}}}`, "g"),
                value
            );
        }
    );

    return template;
};