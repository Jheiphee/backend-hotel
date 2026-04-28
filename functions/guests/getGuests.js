const pool = require('../../config/db');

const getGuests = async () => {
  try {
    const result = await pool.query(`
      SELECT 
        guest_id,
        profile_id,
        guest_type,
        is_member
      FROM guests
      ORDER BY guest_id ASC
    `);

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: result.rows
      }),
    };

  } catch (err) {
    console.error('GET GUESTS ERROR:', err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message
      }),
    };
  }
};

module.exports = getGuests;