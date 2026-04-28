const pool = require('../../config/db');

const bestRoomRevenue = async () => {
  try {
    const result = await pool.query(`
      SELECT 
        r.room_number,
        SUM(p.payment_amount) AS total_revenue
      FROM payments p
      JOIN bookings b ON p.booking_id = b.booking_id
      JOIN rooms r ON b.room_id = r.room_id
      GROUP BY r.room_number
      ORDER BY total_revenue DESC
      LIMIT 1
    `);

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: result.rows[0] || null
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

module.exports = bestRoomRevenue;