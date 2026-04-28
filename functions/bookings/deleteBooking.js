const pool = require('../../config/db');

const deleteBooking = async (booking_id) => {
  try {
    const result = await pool.query(
      'DELETE FROM bookings WHERE booking_id = $1 RETURNING *',
      [booking_id]
    );

    if (result.rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Booking not found'
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Booking deleted successfully',
        data: result.rows[0]
      }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message
      }),
    };
  }
};

module.exports = deleteBooking;