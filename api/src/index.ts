import { APP_PORT, APP_ORIGIN } from "./config";
import { createApp } from "./app";

((): void => {
    const app = createApp();
    app.listen(APP_PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Server is up on ${APP_ORIGIN}`);
    });
})();