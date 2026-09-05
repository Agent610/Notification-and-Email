import fs from "fs";
import path from "path";

export const loadEmailTemplate = (
    templateName: string,
    variables: Record<string, string>
): string => {
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
}