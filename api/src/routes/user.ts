import { Router } from "express";
import { loginController, logoutController, registerController } from "../controllers";
import { auth, catchAsync, guest } from "../middleware";

const router = Router();

router.post("/register", guest, catchAsync(registerController));

router.post("/login", guest, catchAsync(loginController));

router.post("/logout", auth, catchAsync(logoutController));

export { router as userRoute };
