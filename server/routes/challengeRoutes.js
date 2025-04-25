const express = require('express');
const router = express.Router();
const { createChallenge, getAllChallenges, getChallengeById, updateChallenge, deleteChallenge } = require('../controllers/challengeController');

const verifyToken = require('../middleware/authMiddleware'); // ← استدعاء middleware
const verifyOwnership = require('../middleware/ownershipMiddleware');

router.post('/', verifyToken, createChallenge); // ← حماية المسار بالتوكن
router.get('/', getAllChallenges); // كل التحديات
router.get('/:id', getChallengeById); // تحدي معيّن
router.put('/:id', verifyToken, verifyOwnership, updateChallenge); // تحديث تحدي معيّن
router.delete('/:id', verifyToken, verifyOwnership, deleteChallenge); // حذف تحدي معيّن

module.exports = router;
