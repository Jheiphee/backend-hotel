const pool = require('../../config/db');

const getRooms = async () => {
  try {
    const result = await pool.query(`
      SELECT * FROM rooms
      ORDER BY room_id ASC
    `);

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: result.rows
      }),
    };

  } catch (err) {
    console.error('GET ROOMS ERROR:', err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message
      }),
    };
  }
};

module.exports = getRooms;