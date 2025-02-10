/* eslint-disable */
class SeatReservationService {
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
