import { Router } from "express";
import { 
    getFingerPrintDetails,
    sendFingerPrintDetails
 } from "../controllers/controller.js";
 import { verifyToken } from "../middlewares/auth.js"
const router = Router();

router.route("/fingerprint-details").post(verifyToken, getFingerPrintDetails);
router.route("/fingerprint-details").get(sendFingerPrintDetails);

export default router;