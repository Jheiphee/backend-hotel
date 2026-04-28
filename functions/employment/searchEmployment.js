const pool = require('../../config/db');

const searchEmployment = async (keyword) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        employee_id,
        profile_id,
        job_title,
        position_level,
        status,
        shift
      FROM employment_details
      WHERE job_title ILIKE $1
         OR position_level ILIKE $1
         OR CAST(emp_type AS TEXT) ILIKE $1
         OR CAST(status AS TEXT) ILIKE $1
         OR CAST(shift AS TEXT) ILIKE $1
      `,
      [`%${keyword}%`]
    );

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

module.exports = searchEmployment;