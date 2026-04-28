const pool = require('../../config/db');

const deleteRoom = async (event, context) => {
  try {
    const { id } = event.pathParameters;

    // 🔹 check if exists
    const check = await pool.query(
      `SELECT * FROM rooms WHERE room_id = $1`,
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
          message: 'Room not found'
        }),
      };
    }

    // 🔹 check if room is used in bookings
    const bookingCheck = await pool.query(
      `SELECT 1 FROM bookings WHERE room_id = $1 LIMIT 1`,
      [id]
    );

    if (bookingCheck.rows.length > 0) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          message: 'Cannot delete room with existing bookings'
        }),
      };
    }

    // 🔹 delete
    await pool.query(
      `DELETE FROM rooms WHERE room_id = $1`,
      [id]
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        message: 'Room deleted successfully'
      }),
    };

  } catch (err) {
    console.error('DELETE ROOM ERROR:', err);

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

module.exports.handler = deleteRoom;