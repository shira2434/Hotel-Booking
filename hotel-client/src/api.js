import axios from 'axios';

const BASE = 'http://localhost:8080';

// Rooms
export const getAllRooms = () => axios.get(`${BASE}/rooms/getAll`);
export const addRoom = (room) => axios.post(`${BASE}/rooms/add`, room);
export const updateRoom = (room) => axios.put(`${BASE}/rooms/update`, room);
export const deleteRoom = (id) => axios.delete(`${BASE}/rooms/delete/${id}`);
export const getAvailableRooms = (checkIn, checkOut) =>
  axios.get(`${BASE}/rooms/available?checkIn=${checkIn}&checkOut=${checkOut}`);

// Customers
export const getAllCustomers = () => axios.get(`${BASE}/customers/getAll`);
export const addCustomer = (c) => axios.post(`${BASE}/customers/add`, c);
export const updateCustomer = (c) => axios.put(`${BASE}/customers/update`, c);
export const deleteCustomer = (id) => axios.delete(`${BASE}/customers/delete/${id}`);

// Bookings
export const getAllBookings = () => axios.get(`${BASE}/bookings/getAll`);
export const addBooking = (b) => axios.post(`${BASE}/bookings/add`, b);
export const cancelBooking = (id) => axios.put(`${BASE}/bookings/cancel/${id}`);
export const getTotalRevenue = () => axios.get(`${BASE}/bookings/totalRevenue`);
export const getRevenueByRoomType = () => axios.get(`${BASE}/bookings/revenueByRoomType`);
export const extendBooking = (id, newCheckOut) =>
  axios.put(`${BASE}/bookings/extend/${id}?newCheckOut=${newCheckOut}`);
export const getBookingStats = () => axios.get(`${BASE}/bookings/stats`);
