const pool = require('../../config/db');

const getBookings = async () => {
  try {
    const result = await pool.query(`
      SELECT * FROM bookings
      ORDER BY check_in_date DESC
    `);

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: result.rows
      }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message
      }),
    };
  }
};

module.exports = getBookings;