import express from 'express';
import pollController from '../controller/polls';
import accountController from '../controller/accounts';
import { authenticate } from  '../middleware'


const router = express();

router.use('/account', accountController());
router.use('/poll', authenticate , pollController());


export default router;