/**
 * Checks if the selected date range conflicts with any existing bookings for a selected stay.
 *
 * @param {string|Date} startDate - The start date of the range to check (inclusive).
 * @param {string|Date} endDate - The end date of the range to check (inclusive).
 * @param {Object} selectedStay - The stay object containing booking information.
 * @param {Array} selectedStay.bookings - Array of booking objects with dateFrom and dateTo properties.
 * @returns {boolean} Returns true if there is a date conflict, otherwise false.
 */

function CheckDateConflicts(startDate, endDate, selectedStay) {
  if (
    !selectedStay ||
    !selectedStay.bookings ||
    selectedStay.bookings.length === 0
  ) {
    console.error("Selected stay is missing booking data");
    return false;
  }

  const bookedDates = new Set();

  selectedStay.bookings.forEach((booking) => {
    const bookedStart = new Date(booking.dateFrom);
    const bookedEnd = new Date(booking.dateTo);

    let currentDate = new Date(bookedStart);
    while (currentDate <= bookedEnd) {
      bookedDates.add(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  let checkDate = new Date(startDate);
  while (checkDate <= new Date(endDate)) {
    const dateString = checkDate.toISOString().split("T")[0];
    if (bookedDates.has(dateString)) {
      return true;
    }
    checkDate.setDate(checkDate.getDate() + 1);
  }

  return false;
}

export default CheckDateConflicts;
