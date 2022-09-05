import express from 'express';
import { body } from 'express-validator';
import bodyParser from 'body-parser';

const router = express.Router();

// Controllers
import { 
    sendMailCtr
} from './../../controllers/sendMail.js';

router.use(bodyParser.json());

// send email
router.get(
    '',
    [
        body('htmlText').trim().not().isEmpty(),
        body('mailText').trim().not().isEmpty(),
        body('subject').trim().not().isEmpty(),

        // body('replyTo').trim()
        // .isEmail().withMessage('Please enter a valid email')
        // .normalizeEmail(),

        body('receiverEmail').trim()
        .isEmail().withMessage('Please enter a valid email')
        .normalizeEmail(),
    ],
    sendMailCtr
);

// send email
router.post(
    '',
    [
        body('htmlText').trim().not().isEmpty(),
        body('mailText').trim().not().isEmpty(),
        body('subject').trim().not().isEmpty(),

        // body('replyTo').trim()
        // .isEmail().withMessage('Please enter a valid email')
        // .normalizeEmail(),

        body('receiverEmail').trim()
        .isEmail().withMessage('Please enter a valid email')
        .normalizeEmail(),
    ],
    sendMailCtr
);

export default router;