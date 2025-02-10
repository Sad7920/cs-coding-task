const VALID_TYPES = ['ADULT', 'CHILD', 'INFANT'];

class TicketTypeRequest {
    #type;
    #noOfTickets;

    constructor(type, noOfTickets) {
        if (!VALID_TYPES.includes(type)) {
            throw new TypeError(`type must be ${VALID_TYPES.slice(0, -1).join(', ')}, or ${VALID_TYPES.slice(-1)}`);
        }

        if (!Number.isInteger(noOfTickets) || noOfTickets <= 0) {
            throw new TypeError('noOfTickets must be a positive integer');
        }

        this.#type = type;
        this.#noOfTickets = noOfTickets;
    }

    getNoOfTickets() {
        return this.#noOfTickets;
    }

    getTicketType() {
        return this.#type;
    }
}

module.exports = TicketTypeRequest;  
