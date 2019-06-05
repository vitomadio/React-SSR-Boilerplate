const express = require('express');
const router = express.Router();
const pool = require('../db-config/db');


router.get('/', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err
        client.query('SELECT * FROM currency_pairs ORDER BY position ASC', (err, response) => {
            done()
            if (err) {
                res.send(err.stack)
            } else {
                res.send(response.rows)
            }
        })
    })
});

router.post('/update', (req, res) => {
    const old_idx = req.body.old_idx;
    const new_idx = req.body.new_idx;
    pool.connect((err, client, done) => {
        if (err) throw (err)
        client.query(
            `UPDATE currency_pairs SET position = 
                CASE  
                WHEN position=${old_idx} THEN ${new_idx}
                WHEN position=${new_idx} THEN ${old_idx}
                END
                WHERE position in (${old_idx},${new_idx})
            `
        ), (err, response) => {
            done()
            if (err) { res.send(err) }
            else { res.send(response) }
        }
    })
})

module.exports = router;