/* eslint-disable */

/**
 * Service responsible for reserving seats for ticket purchases.
 * Ensures seat reservation requests meet validation criteria before processing.
 */
class SeatReservationService {
    /**
     * Reserves seats for a ticket purchase.
     * @param {number} accountId - The ID of the purchasing account (must be a positive integer).
     * @param {number} totalSeatsToAllocate - The total number of seats to reserve (must be a non-negative integer).
     * @throws {TypeError} If `accountId` is not a positive integer.
     * @throws {TypeError} If `totalSeatsToAllocate` is not a non-negative integer.
     */
    reserveSeat(accountId, totalSeatsToAllocate) {
        if (!Number.isInteger(accountId) || accountId <= 0) {
            throw new TypeError('accountId must be a positive integer');
        }

        if (!Number.isInteger(totalSeatsToAllocate) || totalSeatsToAllocate < 0) {
            throw new TypeError('totalSeatsToAllocate must be a non-negative integer');
        }

        console.log(`🎟️ Seats Reserved: ${totalSeatsToAllocate} seats for Account ID: ${accountId}`);
    }
}

module.exports = SeatReservationService;
