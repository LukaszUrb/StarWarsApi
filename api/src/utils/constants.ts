export const Constants = {
    EMAIL_EXP: /^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u,
    ONE_HOUR_SEC: 60 * 60,
    TWELVE_FOUR_HOURS_SEC: 24 * 60 * 60,
    ONE_HOUR_MILLISEC: 1000 * 60 * 60,
    THIRTY_MINUTES_MILLISEC: 1000 * 60 * 60 * 0.5,
    TWO_HOURS_MILLISEC: 1000 * 60 * 60 * 2,
    SIX_HOURS_MILLISEC: 1000 * 60 * 60 * 6,
    TWELVE_HOURS_MILLISEC: 1000 * 60 * 60 * 12,
    TWENTY_FOUR_HOURS_MILLISEC: 1000 * 60 * 60 * 12,
    DEV: "development",
    PROD: "production"
};

export default Constants;
