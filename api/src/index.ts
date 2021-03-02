import express from "express";

const APP_PORT = 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "OK" });
});

app.listen(APP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is up on port ${APP_PORT}`);
}); 
