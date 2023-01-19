import express from 'express';

import {
  getUserProfile,
  getFriendList,
  addRemoveFriends,
  updateUserProfile
} from '../controllers/Users.js';

import { verifyToken } from '../middleware/Auth.js';

const router = express.Router();

/* READ */
router.get('/:id', verifyToken, getUserProfile);
router.get('/:id/friends', verifyToken, getFriendList);

/* UPDATE */
router.patch('/:id/:friendId', addRemoveFriends);

router.put('/edit-user/:id', updateUserProfile);

export default router;
