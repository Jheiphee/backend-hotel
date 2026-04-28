const pool = require('../../config/db');

const getGuestById = async (event, context) => {
  try {
    const { id } = event.pathParameters;

    const result = await pool.query(
      `
      SELECT 
        guest_id,
        profile_id,
        guest_type,
        is_member
      FROM guests
      WHERE guest_id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          message: 'Guest not found'
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
        data: result.rows[0]
      }),
    };

  } catch (err) {
    console.error('GET GUEST BY ID ERROR:', err);

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
  return await getGuestById(event);
};