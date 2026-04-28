const pool = require('../../config/db');

const deleteProfile = async (id) => {
  try {
    // 🔹 check if exists
    const check = await pool.query(
      `SELECT * FROM profiles WHERE profile_id = $1`,
      [id]
    );

    if (check.rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Profile not found'
        }),
      };
    }

    // 🔹 delete
    await pool.query(
      `DELETE FROM profiles WHERE profile_id = $1`,
      [id]
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Profile deleted successfully'
      }),
    };

  } catch (err) {
    console.error('DELETE PROFILE ERROR:', err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message
      }),
    };
  }
};

module.exports = deleteProfile;