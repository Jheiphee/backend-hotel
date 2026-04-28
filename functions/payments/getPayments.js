const pool = require('../../config/db');

const getPayments = async () => {
  try {
    const result = await pool.query(`
      SELECT 
        payment_id,
        booking_id,
        payment_date,
        payment_type,
        payment_method,
        payment_amount,
        total_discount,
        status
      FROM payments
      ORDER BY payment_date DESC
    `);

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: result.rows
      }),
    };

  } catch (err) {
    console.error('GET PAYMENTS ERROR:', err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message
      }),
    };
  }
};

module.exports = getPayments;