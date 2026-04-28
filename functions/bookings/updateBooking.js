const pool = require('../../config/db');

const updateBooking = async (booking_id, data) => {
  try {
    const {
      number_of_guests,
      check_in_date,
      check_out_date,
      status
    } = data;

    const result = await pool.query(
      `UPDATE bookings
       SET number_of_guests = $1,
           check_in_date = $2,
           check_out_date = $3,
           status = $4
       WHERE booking_id = $5
       RETURNING *`,
      [number_of_guests, check_in_date, check_out_date, status, booking_id]
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
        message: 'Booking updated successfully',
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

module.exports = updateBooking;