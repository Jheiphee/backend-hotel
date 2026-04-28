const pool = require('../../config/db');

const createProfile = async (data) => {
  try {
    const {
      first_name,
      last_name,
      date_of_birth,
      gender,
      marital_status,
      contact_number,
      profile_type
    } = data;

    // 🔹 validation
    if (!first_name || !last_name) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'first_name and last_name are required'
        }),
      };
    }

    // 🔹 insert
    const result = await pool.query(
      `
      INSERT INTO profiles (
        first_name,
        last_name,
        date_of_birth,
        gender,
        marital_status,
        contact_number,
        profile_type
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [
        first_name,
        last_name,
        date_of_birth || null,
        gender || null,
        marital_status || null,
        contact_number || null,
        profile_type || 'guest'
      ]
    );

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Profile created successfully',
        data: result.rows[0]
      }),
    };

  } catch (err) {
    console.error('CREATE PROFILE ERROR:', err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message
      }),
    };
  }
};

module.exports = createProfile;