/* eslint-disable */

/**
 * Service responsible for processing ticket payments.
 * Ensures payment requests meet validation criteria before processing.
 */
class TicketPaymentService {
    /**
     * Processes a payment for a ticket purchase.
     * @param {number} accountId - The ID of the purchasing account (must be a positive integer).
     * @param {number} totalAmountToPay - The total amount to be charged (must be a non-negative integer).
     * @throws {TypeError} If `accountId` is not a positive integer.
     * @throws {TypeError} If `totalAmountToPay` is not a non-negative integer.
     */
    makePayment(accountId, totalAmountToPay) {
        if (!Number.isInteger(accountId) || accountId <= 0) {
            throw new TypeError('accountId must be a positive integer');
        }

        if (!Number.isInteger(totalAmountToPay) || totalAmountToPay < 0) {
            throw new TypeError('totalAmountToPay must be a non-negative integer');
        }

        console.log(`✅ Payment successful: £${totalAmountToPay} processed for Account ID: ${accountId}`);
    }
}

module.exports = TicketPaymentService;
