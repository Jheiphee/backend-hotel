const pool = require('../../config/db');

const updateGuest = async (id, data) => {
  try {
    const {
      profile_id,
      guest_type,
      is_member
    } = data;

    // 🔹 check if guest exists
    const check = await pool.query(
      `SELECT * FROM guests WHERE guest_id = $1`,
      [id]
    );

    if (check.rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Guest not found'
        }),
      };
    }

    // 🔹 check if profile exists (if updating profile_id)
    if (profile_id) {
      const profileCheck = await pool.query(
        `SELECT 1 FROM profiles WHERE profile_id = $1`,
        [profile_id]
      );

      if (profileCheck.rows.length === 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: 'Profile does not exist'
          }),
        };
      }
    }

    // 🔹 update guest
    const result = await pool.query(
      `
      UPDATE guests
      SET
        profile_id = COALESCE($1, profile_id),
        guest_type = COALESCE($2, guest_type),
        is_member = COALESCE($3, is_member)
      WHERE guest_id = $4
      RETURNING *
      `,
      [
        profile_id ?? null,
        guest_type ?? null,
        is_member ?? null,
        id
      ]
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Guest updated successfully',
        data: result.rows[0]
      }),
    };

  } catch (err) {
    console.error('UPDATE GUEST ERROR:', err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message
      }),
    };
  }
};

module.exports = updateGuest;