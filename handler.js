const pool = require('./config/db');

// 🔹 ANALYTICS
const topRevenueDate = require('./functions/analytics/topRevenueDate');
const topGuestPayment = require('./functions/analytics/topGuestPayment');
const topBookingDate = require('./functions/analytics/topBookingDate');
const getMembers = require('./functions/analytics/getMembers');
const getMembersCount = require('./functions/analytics/getMembersCount');
const bestRoomRevenue = require('./functions/analytics/bestRoomRevenue');
const bestRoomBookings = require('./functions/analytics/bestRoomBookings');

// 🔹 BOOKINGS
const createBooking = require('./functions/bookings/createBooking');
const getBookings = require('./functions/bookings/getBookings');
const getBookingById = require('./functions/bookings/getBookingById');
const updateBooking = require('./functions/bookings/updateBooking');
const deleteBooking = require('./functions/bookings/deleteBooking');

// 🔹 EMPLOYMENT
const getEmployment = require('./functions/employment/getEmployment');
const searchEmployment = require('./functions/employment/searchEmployment');

// 🔹 GUESTS
const createGuest = require('./functions/guests/createGuest');
const deleteGuest = require('./functions/guests/deleteGuest');
const getGuestById = require('./functions/guests/getGuestById');
const getGuests = require('./functions/guests/getGuests');
const updateGuest = require('./functions/guests/updateGuest');

// 🔹 PAYMENTS
const createPayment = require('./functions/payments/createPayment');
const deletePayment = require('./functions/payments/deletePayment');
const getPaymentById = require('./functions/payments/getPaymentById');
const getPayments = require('./functions/payments/getPayments');
const updatePayment = require('./functions/payments/updatePayment');

// 🔹 PROFILES
const createProfile = require('./functions/profiles/createProfile');
const deleteProfile = require('./functions/profiles/deleteProfile');
const getProfileById = require('./functions/profiles/getProfileById');
const getProfiles = require('./functions/profiles/getProfiles');
const updateProfile = require('./functions/profiles/updateProfile');

// 🔹 ROOMS
const createRoom = require('./functions/rooms/createRoom');
const deleteRoom = require('./functions/rooms/deleteRoom');
const getRoomById = require('./functions/rooms/getRoomById');
const getRooms = require('./functions/rooms/getRooms');
const updateRoom = require('./functions/rooms/updateRoom');

exports.handler = async (event) => {
  const path = event.rawPath;
  const method = event.requestContext?.http?.method;

  try {

    // =========================
    // ✅ ANALYTICS
    // =========================

    if (path === '/analytics/top-revenue-date' && method === 'GET') {
      return await topRevenueDate();
    }

    if (path === '/analytics/top-guest-payment' && method === 'GET') {
      return await topGuestPayment();
    }

    if (path === '/analytics/top-booking-date' && method === 'GET') {
      return await topBookingDate();
    }

    if (path === '/analytics/members' && method === 'GET') {
      return await getMembers();
    }

    if (path === '/analytics/members-count' && method === 'GET') {
      return await getMembersCount();
    }

    if (path === '/analytics/best-room-revenue' && method === 'GET') {
      return await bestRoomRevenue();
    }

    if (path === '/analytics/best-room-bookings' && method === 'GET') {
      return await bestRoomBookings();
    }

    // =========================
    // ✅ BOOKINGS
    // =========================

    if (path === '/bookings' && method === 'GET') {
      return await getBookings();
    }

    if (path === '/bookings' && method === 'POST') {
      const body = JSON.parse(event.body);
      return await createBooking(body);
    }

    if (path.startsWith('/bookings/') && method === 'GET') {
      const booking_id = path.split('/')[2];
      return await getBookingById(booking_id);
    }

    if (path.startsWith('/bookings/') && method === 'PUT') {
      const booking_id = path.split('/')[2];
      const body = JSON.parse(event.body);
      return await updateBooking(booking_id, body);
    }

    if (path.startsWith('/bookings/') && method === 'DELETE') {
      const booking_id = path.split('/')[2];
      return await deleteBooking(booking_id);
    }

    // =========================
    // ✅ EMPLOYMENT
    // =========================

    if (path === '/employment' && method === 'GET') {
      return await getEmployment();
    }

    if (path === '/employment/search' && method === 'GET') {
      const keyword = event.queryStringParameters?.q || '';
      return await searchEmployment(keyword);
    }

    // =========================
    // ✅ GUESTS
    // =========================
    if (path === '/guests' && method === 'POST') {
      const body = JSON.parse(event.body);
      return await createGuest(body);
    }

    if (path.startsWith('/guests/') && method === 'DELETE') {
      const guest_id = path.split('/')[2];
      return await deleteGuest(guest_id);
    }

    if (path.startsWith('/guests/') && method === 'GET') {
      const guest_id = path.split('/')[2];
      return await getGuestById(guest_id);
    }

    if (path === '/guests' && method === 'GET') {
      return await getGuests();
    }

    if (path.startsWith('/guests/') && method === 'PUT') {
      const guest_id = path.split('/')[2];
      const body = JSON.parse(event.body);
      return await updateGuest(guest_id, body);
    }

    // =========================
    // ✅ PAYMENTS
    // =========================

    if (path === '/payments' && method === 'POST') {
      const body = JSON.parse(event.body);
      return await createPayment(body);
    }

    if (path.startsWith('/payments/') && method === 'DELETE') {
      const payment_id = path.split('/')[2];
    return await deletePayment(payment_id);
    }

    if (path.startsWith('/payments/') && method === 'GET') {
      const payment_id = path.split('/')[2];
      return await getPaymentById(payment_id);
    }

    if (path === '/payments' && method === 'GET') {
      return await getPayments();
    }

    if (path.startsWith('/payments/') && method === 'PUT') {
      const payment_id = path.split('/')[2];
      const body = JSON.parse(event.body);
      return await updatePayment(payment_id, body);
    }

    // =========================
    // ✅ PROFILES
    // =========================

    if (path === '/profiles' && method === 'POST') {
      const body = JSON.parse(event.body);
      return await createProfile(body);
    }

    if (path.startsWith('/profiles/') && method === 'DELETE') {
      const profile_id = path.split('/')[2];
      return await deleteProfile(profile_id);
    }

    if (path.startsWith('/profiles/') && method === 'GET') {
      const profile_id = path.split('/')[2];
      return await getProfileById(profile_id);
    }

    if (path === '/profiles' && method === 'GET') {
      return await getProfiles();
    }
     
    if (path.startsWith('/profiles/') && method === 'PUT') {
      const profile_id = path.split('/')[2];
      const body = JSON.parse(event.body);
      return await updateProfile(profile_id, body);
    }

    // =========================
    // ✅ ROOMS
    // =========================
    
    if (path === '/rooms' && method === 'POST') {
      const body = JSON.parse(event.body);
      return await createRoom(body);
    }

    if (path.startsWith('/rooms/') && method === 'DELETE') {
      const room_id = path.split('/')[2];
      return await deleteRoom(room_id);
    }

    if (path.startsWith('/rooms/') && method === 'GET') {
      const room_id = path.split('/')[2];
      return await getRoomById(room_id);
    }

    if (path === '/rooms' && method === 'GET') {
      return await getRooms();
    }
    
    if (path.startsWith('/rooms/') && method === 'PUT') {
      const room_id = path.split('/')[2];
      const body = JSON.parse(event.body);
      return await updateRoom(room_id, body);
    }
    
    // =========================
    // ❌ DEFAULT
    // =========================

    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Route not found' }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};