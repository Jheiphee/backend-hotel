const pool = require('../../config/db');

const topBookingDate = async () => {
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
      body: JSON.stringify({
        data: result.rows[0] || null
      }),
    };

  } catch (err) {
    console.error('TOP BOOKING DATE ERROR:', err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message
      }),
    };
  }
};

module.exports = topBookingDate;