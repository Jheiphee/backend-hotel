const pool = require('../../config/db');

const getBookings = async (event, context) => {
  try {
    const result = await pool.query(`
      SELECT * FROM bookings
      ORDER BY check_in_date DESC
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

  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: error.message
      }),
    };
  }
};

module.exports.handler = async (event) => {
  return await getBookings(event);
};