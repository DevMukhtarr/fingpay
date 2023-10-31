import { Router } from "express";
import { 
    getFingerPrintDetails,
    sendFingerPrintDetails
 } from "../controllers/controller.js";
const router = Router();

router.route("/fingerprint-details").post(getFingerPrintDetails);
router.route("/fingerprint-details").get(sendFingerPrintDetails);

export default router;