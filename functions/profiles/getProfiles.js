const pool = require('../../config/db');

const getProfiles = async () => {
  try {
    const result = await pool.query(`
      SELECT * FROM profiles
      ORDER BY profile_id ASC
    `);

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: result.rows
      }),
    };

  } catch (err) {
    console.error('GET PROFILES ERROR:', err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message
      }),
    };
  }
};

module.exports = getProfiles;