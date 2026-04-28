const pool = require('../../config/db');

const getMembersCount = async (event, context) => {
  try {
    const result = await pool.query(`
      SELECT COUNT(*) AS total_members
      FROM guests
      WHERE is_member = true
    `);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        total_members: Number(result.rows[0].total_members)
      }),
    };

  } catch (err) {
    console.error('GET MEMBERS COUNT ERROR:', err);

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

module.exports.handler = getMembersCount;