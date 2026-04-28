const pool = require('../../config/db');

const deleteGuest = async (id) => {
  try {
    // 🔹 check if guest exists
    const guestCheck = await pool.query(
      `SELECT 1 FROM guests WHERE guest_id = $1`,
      [id]
    );

    if (guestCheck.rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Guest not found'
        }),
      };
    }

    // 🔹 delete guest
    await pool.query(
      `DELETE FROM guests WHERE guest_id = $1`,
      [id]
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Guest deleted successfully'
      }),
    };

  } catch (err) {
    console.error('DELETE GUEST ERROR:', err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message
      }),
    };
  }
};

module.exports = deleteGuest;