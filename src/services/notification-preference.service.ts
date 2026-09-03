export interface NotificationPreference {
    userId: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    marketingEmails: boolean;
}

const notificationPreferences: NotificationPreference[] = [];

export const getNotificationPreferences = async (
    userId: string
): Promise<NotificationPreference> => {
    const existingPreference = notificationPreferences.find(
        (preference) => preference.userId === userId
    );

    if (existingPreference) {
        return existingPreference;
    }

    const defaultPreference: NotificationPreference = {
        userId,
        emailNotifications: true,
        pushNotifications: true,
        marketingEmails: false,
    };

    notificationPreferences.push(defaultPreference);
    
    return defaultPreference;
};

export const updateNotificationPreferences = async (
    userId: string,
    preferences: Partial<
    Omit<NotificationPreference, "userId">
    >
): Promise<NotificationPreference> => {
    const existingPreference = notificationPreferences.find(
        (preference) => preference.userId === userId
    );

    if (!existingPreference) {
        const newPreference: NotificationPreference = {
            userId,
            emailNotifications: preferences.emailNotifications ?? true,
            pushNotifications: preferences.pushNotifications ?? true,
            marketingEmails: preferences.marketingEmails ?? false,
        };

        notificationPreferences.push(newPreference);

        return newPreference;
    }

    if (preferences.emailNotifications !== undefined) {
        existingPreference.emailNotifications = 
        preferences.emailNotifications;
    }

    if (preferences.pushNotifications !== undefined) {
        existingPreference.pushNotifications = 
        preferences.pushNotifications;
    }

    if (preferences.marketingEmails !== undefined) {
        existingPreference.marketingEmails = 
        preferences.marketingEmails;
    }

    return existingPreference;
}