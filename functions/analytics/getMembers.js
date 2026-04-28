const pool = require('../../config/db');

const getMembers = async () => {
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
      body: JSON.stringify({
        data: result.rows
      }),
    };

  } catch (err) {
    console.error('GET MEMBERS ERROR:', err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message
      }),
    };
  }
};

module.exports = getMembers;