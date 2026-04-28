const pool = require('../../config/db');

const getEmployment = async (event, context) => {
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

module.exports.handler = getEmployment;