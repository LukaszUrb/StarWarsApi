import { Router } from "express";
import { emailResendController, emailVerifyController, forgotPasswordController, loginController, logoutController, registerController, submitPasswordController } from "../controllers";
import { auth, catchAsync, guest } from "../middleware";

const router = Router();

router.post("/register", guest, catchAsync(registerController));

router.post("/login", guest, catchAsync(loginController));

router.post("/logout", auth, catchAsync(logoutController));

router.post("/password/forgot", guest, catchAsync(forgotPasswordController));
router.post("/password/submit", guest, catchAsync(submitPasswordController));

router.get("/email/verify", guest, catchAsync(emailVerifyController));
router.post("/email/resend", guest, catchAsync(emailResendController));

export { router as userRoute };
