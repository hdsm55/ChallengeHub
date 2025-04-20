    const pool = require('../db');

    const createChallenge = async (req, res) => {
    const { title, description, creator_id, start_date, end_date } = req.body;

    try {
        const result = await pool.query(
        `INSERT INTO challenges (title, description, creator_id, start_date, end_date)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [title, description, creator_id, start_date, end_date]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('❌ Error creating challenge:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
    };


    const getAllChallenges = async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM challenges ORDER BY created_at DESC');
            res.status(200).json(result.rows);
        } catch (err) {
            console.error('❌ Error fetching challenges:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
        };

    const getChallengeById = async (req, res) => {
        const { id } = req.params;

        try {
            const result = await pool.query(
            'SELECT * FROM challenges WHERE id = $1',
            [id]
            );

            if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Challenge not found' });
            }

            res.status(200).json(result.rows[0]);
        } catch (err) {
            console.error('❌ Error fetching challenge:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
        };

        const updateChallenge = async (req, res) => {
            const { id } = req.params;
            const { title, description, start_date, end_date } = req.body;

            try {
              // 1. جلب التحدي أولًا
              const check = await pool.query('SELECT * FROM challenges WHERE id = $1', [id]);

                if (check.rows.length === 0) {
                return res.status(404).json({ error: 'Challenge not found' });
                }

                const challenge = check.rows[0];

              // 2. التأكد أن المستخدم هو صاحب التحدي
                if (challenge.creator_id !== req.user.id) {
                return res.status(403).json({ error: 'Not authorized to edit this challenge' });
                }

              // 3. تنفيذ التعديل
                const result = await pool.query(
                `UPDATE challenges
                SET title = $1, description = $2, start_date = $3, end_date = $4
                WHERE id = $5
                 RETURNING *`,
                [title, description, start_date, end_date, id]
                );

            res.status(200).json(result.rows[0]);
            } catch (err) {
            console.error('❌ Error updating challenge:', err);
            res.status(500).json({ error: 'Internal server error' });
            }
        };


    const deleteChallenge = async (req, res) => {
        const { id } = req.params;

        try {
            // 1. جلب التحدي
            const check = await pool.query('SELECT * FROM challenges WHERE id = $1', [id]);

            if (check.rows.length === 0) {
            return res.status(404).json({ error: 'Challenge not found' });
            }

            const challenge = check.rows[0];

            // 2. التحقق من ملكية التحدي
            if (challenge.creator_id !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized to delete this challenge' });
            }

            // 3. تنفيذ الحذف
            const result = await pool.query(
            'DELETE FROM challenges WHERE id = $1 RETURNING *',
            [id]
            );

            res.status(200).json({ message: 'Challenge deleted successfully', challenge: result.rows[0] });
        } catch (err) {
            console.error('❌ Error deleting challenge:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
        };


    module.exports = { createChallenge, getAllChallenges, getChallengeById, updateChallenge, deleteChallenge };