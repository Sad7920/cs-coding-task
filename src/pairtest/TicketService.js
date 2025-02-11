const TicketTypeRequest = require('./lib/TicketTypeRequest.js');
const InvalidPurchaseException = require('./lib/InvalidPurchaseException.js');

/**
 * Service for handling ticket purchase requests.
 * Ensures that all business rules are followed, payments are processed, and seats are reserved.
 */
class TicketService {
    /**
     * Creates an instance of TicketService.
     * @param {object} paymentService - Service responsible for processing ticket payments.
     * @param {object} reservationService - Service responsible for reserving seats.
     * @throws {Error} If required dependencies are missing.
     */
    constructor(paymentService, reservationService) {
        if (!paymentService || !reservationService) {
            throw new Error("PaymentService and ReservationService are required dependencies.");
        }
        this.paymentService = paymentService;
        this.reservationService = reservationService;
    }

    /**
     * Processes ticket purchase requests.
     * Ensures that the request is valid, processes payment, and reserves the required number of seats.
     * @param {number} accountId - The ID of the purchasing account.
     * @param {...TicketTypeRequest} ticketTypeRequests - List of requested ticket types and quantities.
     * @throws {InvalidPurchaseException} If the purchase request violates business rules.
     */
    purchaseTickets(accountId, ...ticketTypeRequests) {
        this.#validateAccountId(accountId);
        const { totalAmount, totalSeats, hasAdult } = this.#processTicketRequests(ticketTypeRequests);

        if (!hasAdult) {
            throw new InvalidPurchaseException("At least one Adult ticket is required for a valid purchase.");
        }

        // Process payment and reserve seats
        this.paymentService.makePayment(accountId, totalAmount);
        this.reservationService.reserveSeat(accountId, totalSeats);
    }

    /**
     * Validates if the account ID is a positive integer.
     * @param {number} accountId - The account ID.
     * @throws {InvalidPurchaseException} If the account ID is invalid.
     * @private
     */
    #validateAccountId(accountId) {
        if (!Number.isInteger(accountId) || accountId <= 0) {
            throw new InvalidPurchaseException("Invalid account ID: Must be a positive integer.");
        }
    }

    /**
     * Processes the ticket requests, calculates the total cost and required seats.
     * @param {TicketTypeRequest[]} ticketTypeRequests - Array of ticket requests.
     * @returns {{totalAmount: number, totalSeats: number, hasAdult: boolean}} - Computed totals.
     * @throws {InvalidPurchaseException} If business rules are violated.
     * @private
     */
    #processTicketRequests(ticketTypeRequests) {
        const PRICES = { INFANT: 0, CHILD: 15, ADULT: 25 };
        let totalAmount = 0;
        let totalSeats = 0;
        let totalTickets = 0;
        let hasAdult = false;

        for (const request of ticketTypeRequests) {
            const type = request.getTicketType();
            const quantity = request.getNoOfTickets();

            if (type === "ADULT") hasAdult = true;
            totalTickets += quantity;

            if (type !== "INFANT") {
                totalSeats += quantity;
            }

            totalAmount += PRICES[type] * quantity;
        }

        if (totalTickets > 25) {
            throw new InvalidPurchaseException("Ticket limit exceeded: Cannot purchase more than 25 tickets at a time.");
        }

        return { totalAmount, totalSeats, hasAdult };
    }
}

module.exports = TicketService;
