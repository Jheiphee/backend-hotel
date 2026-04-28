const pool = require('../../config/db');

const updateBooking = async (event, context) => {
  try {
    const { booking_id } = event.pathParameters;
    const data = JSON.parse(event.body);

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
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          message: 'Booking not found'
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        message: 'Booking updated successfully',
        data: result.rows[0]
      }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: error.message
      }),
    };
  }
};

module.exports.handler = updateBooking;