const pool = require('../../config/db');

const getEmployment = async () => {
  try {
    const result = await pool.query(`
      SELECT 
        employee_id,
        profile_id,
        job_title,
        position_level,
        status,
        shift
      FROM employment_details
      ORDER BY employee_id ASC
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

module.exports = getEmployment;