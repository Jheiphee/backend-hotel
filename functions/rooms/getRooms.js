const pool = require('../../config/db');

const getRooms = async (event, context) => {
  try {
    const result = await pool.query(`
      SELECT * FROM rooms
      ORDER BY room_id ASC
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
    console.error('GET ROOMS ERROR:', err);

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
  return await getRooms();
};