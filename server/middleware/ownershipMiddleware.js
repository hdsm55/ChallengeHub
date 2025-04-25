const pool = require('../db');

const verifyOwnership = async (req, res, next) => {
    const challengeId = req.params.id;
    const userId = req.user.id;

    try {
    // جلب التحدي من قاعدة البيانات
    const result = await pool.query('SELECT creator_id FROM challenges WHERE id = $1', [challengeId]);

    if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Challenge not found' });
    }

    const challenge = result.rows[0];

    // تحقق من أن المستخدم هو مالك التحدي
    if (challenge.creator_id !== userId) {
    return res.status(403).json({ error: 'Access denied: Not the owner of this challenge' });
    }

    // إذا كان التحقق ناجحًا، ننتقل للخطوة التالية
    next();

    } catch (err) {
    console.error('❌ Ownership check failed:', err);
    res.status(500).json({ error: 'Internal server error during ownership verification' });
    }
};

module.exports = verifyOwnership;
