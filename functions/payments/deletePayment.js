const pool = require('../../config/db');

const deletePayment = async (id) => {
  try {
    const check = await pool.query(
      `SELECT * FROM payments WHERE payment_id = $1`,
      [id]
    );

    if (check.rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Payment not found'
        }),
      };
    }

    await pool.query(
      `DELETE FROM payments WHERE payment_id = $1`,
      [id]
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Payment deleted successfully'
      }),
    };

  } catch (err) {
    console.error('DELETE PAYMENT ERROR:', err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message
      }),
    };
  }
};

module.exports = deletePayment;