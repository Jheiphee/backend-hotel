const pool = require('../../config/db');

const topRevenueDate = async () => {
  try {
    const result = await pool.query(`
      SELECT payment_date::date AS date,
             SUM(amount) AS total_revenue
      FROM payments
      GROUP BY date
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

module.exports = topRevenueDate;