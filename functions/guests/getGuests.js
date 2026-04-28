const pool = require('../../config/db');

const getGuests = async (event, context) => {
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
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        data: result.rows
      }),
    };

  } catch (err) {
    console.error('GET GUESTS ERROR:', err);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: err.message
      }),
    };
  }
};

module.exports.handler = async (event) => {
  return await getGuests(event);
};