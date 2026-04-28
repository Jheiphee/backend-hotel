const pool = require('../../config/db');

const deleteProfile = async (event, context) => {
  try {
    const { id } = event.pathParameters;

    // 🔹 check if exists
    const check = await pool.query(
      `SELECT * FROM profiles WHERE profile_id = $1`,
      [id]
    );

    if (check.rows.length === 0) {
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
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
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        message: 'Profile deleted successfully'
      }),
    };

  } catch (err) {
    console.error('DELETE PROFILE ERROR:', err);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: err.message
      }),
    };
  }
};

module.exports.handler = deleteProfile;