import { Router } from 'express';
import { register, login, confirmAuth } from 'controllers/admins';
import checkAdminAuth from 'middleware/adminAuth';
const router = Router();

// Admin Register
router.post('/', register);
router.post('/login', login);
router.get('/auth', checkAdminAuth, confirmAuth);

module.exports = router;
