const pool = require('../../config/db');

const topGuestPayment = async (event, context) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.first_name,
        p.last_name,
        SUM(pay.payment_amount) AS total_payment
      FROM payments pay
      JOIN bookings b ON pay.booking_id = b.booking_id
      JOIN guests g ON b.guest_id = g.guest_id
      JOIN profiles p ON g.profile_id = p.profile_id
      GROUP BY p.first_name, p.last_name
      ORDER BY total_payment DESC
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

module.exports.handler = topGuestPayment;