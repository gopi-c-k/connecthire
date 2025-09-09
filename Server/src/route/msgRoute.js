import express from 'express';
import verifyMiddleware from '../middleware/userVerify.js';
import { verifyMsg } from '../middleware/msgVerify.js';
import { getMessage } from '../controllers/message/getMessage.js';
import { postMessage } from '../controllers/message/postMessage.js';

const router = express.Router();

router.get('/:conversationId',verifyMiddleware,verifyMsg,getMessage);
router.post('/:conversationId',verifyMiddleware,verifyMsg,postMessage);
export default router;