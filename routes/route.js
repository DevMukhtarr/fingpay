import { Router } from "express";
import { 
    getFingerPrintDetails,
    sendFingerPrintDetails,
    createToken
 } from "../controllers/controller.js";
 import { verifyToken } from "../middlewares/auth.js"
const router = Router();

router.route("/fingerprint-details").post(verifyToken, getFingerPrintDetails);
router.route("/fingerprint-details").get(sendFingerPrintDetails);
router.route("/create-token").post(createToken);

export default router;