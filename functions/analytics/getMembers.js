const pool = require('../../config/db');

const getMembers = async (event, context) => {
  try {
    const result = await pool.query(`
      SELECT 
        g.guest_id,
        p.profile_id,
        p.first_name,
        p.last_name,
        p.profile_type AS role
      FROM guests g
      JOIN profiles p ON g.profile_id = p.profile_id
      WHERE g.is_member = true
      ORDER BY p.last_name ASC
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

  } catch (err) {
    console.error('GET MEMBERS ERROR:', err);

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

module.exports.handler = async (event) => {
  return await getMembers(event);
};