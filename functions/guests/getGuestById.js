const pool = require('../../config/db');

const getGuestById = async (id) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        guest_id,
        profile_id,
        guest_type,
        is_member
      FROM guests
      WHERE guest_id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Guest not found'
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: result.rows[0]
      }),
    };

  } catch (err) {
    console.error('GET GUEST BY ID ERROR:', err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message
      }),
    };
  }
};

module.exports = getGuestById;