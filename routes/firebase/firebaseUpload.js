import express from 'express';

const router = express.Router();

// Controllers
import { 
    filesUploadCtrl,
} from './../../controllers/firebaseUploadCtrl.js';

// middleWares
// import authMiddleware from './../../middleware/auth.js'

router.get(
    '',
    // authMiddleware,
    filesUploadCtrl
);

router.post(
    '',
    // authMiddleware,
    filesUploadCtrl
);

export default router;