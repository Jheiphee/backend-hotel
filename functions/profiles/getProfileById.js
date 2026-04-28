const pool = require('../../config/db');

const getProfileById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT * FROM profiles WHERE profile_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Profile not found'
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: result.rows[0]
      }),
    };

  } catch (err) {
    console.error('GET PROFILE BY ID ERROR:', err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message
      }),
    };
  }
};

module.exports = getProfileById;