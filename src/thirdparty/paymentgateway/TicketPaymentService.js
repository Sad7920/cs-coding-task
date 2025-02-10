/* eslint-disable */
class TicketPaymentService {
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