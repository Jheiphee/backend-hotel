const pool = require('../../config/db');

const topBookingDate = async (event, context) => {
  try {
    const result = await pool.query(`
      SELECT 
        DATE(check_in_date) AS date,
        COUNT(*) AS total_bookings
      FROM bookings
      GROUP BY DATE(check_in_date)
      ORDER BY total_bookings DESC
      LIMIT 1
    `);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        data: result.rows[0] || null
      }),
    };

  } catch (err) {
    console.error('TOP BOOKING DATE ERROR:', err);

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

mmodule.exports.handler = async (event) => {
  return await topBookingDate(event);
};