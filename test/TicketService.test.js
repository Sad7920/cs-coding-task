const TicketService = require("../src/pairtest/TicketService.js");
const TicketTypeRequest = require("../src/pairtest/lib/TicketTypeRequest.js");

// Mocking External Services
const mockPaymentService = { makePayment: jest.fn() };
const mockReservationService = { reserveSeat: jest.fn() };

describe("TicketService", () => {
    let ticketService;

    beforeEach(() => {
        ticketService = new TicketService(mockPaymentService, mockReservationService);
        jest.clearAllMocks();
    });

    test("should throw an error for invalid account ID", () => {
        expect(() => ticketService.purchaseTickets(0, new TicketTypeRequest("ADULT", 1)))
            .toThrow("Invalid account ID: Must be a positive integer.");
        expect(() => ticketService.purchaseTickets(-3, new TicketTypeRequest("ADULT", 1)))
            .toThrow("Invalid account ID: Must be a positive integer.");
    });

    test("should throw an error when purchasing Child/Infant tickets without an Adult", () => {
        expect(() => ticketService.purchaseTickets(1, new TicketTypeRequest("CHILD", 2)))
            .toThrow("At least one Adult ticket is required for a valid purchase.");

        expect(() => ticketService.purchaseTickets(1, new TicketTypeRequest("INFANT", 1)))
            .toThrow("At least one Adult ticket is required for a valid purchase.");
    });

    test("should correctly process valid ticket purchases", () => {
        expect(() =>
            ticketService.purchaseTickets(
                1,
                new TicketTypeRequest("ADULT", 2),
                new TicketTypeRequest("CHILD", 1)
            )
        ).not.toThrow();

        expect(mockPaymentService.makePayment).toHaveBeenCalledWith(1, 65);
        expect(mockReservationService.reserveSeat).toHaveBeenCalledWith(1, 3);
    });

    test("should throw an error when purchasing more than 25 tickets", () => {
        expect(() => ticketService.purchaseTickets(1, new TicketTypeRequest("ADULT", 26)))
            .toThrow("Ticket limit exceeded: Cannot purchase more than 25 tickets at a time.");
    });

    test("should correctly process a purchase with infants", () => {
        ticketService.purchaseTickets(
            1,
            new TicketTypeRequest("ADULT", 2),
            new TicketTypeRequest("INFANT", 1)
        );

        expect(mockPaymentService.makePayment).toHaveBeenCalledWith(1, 50);
        expect(mockReservationService.reserveSeat).toHaveBeenCalledWith(1, 2); // No seat for infant
    });

    test("should call payment and reservation services correctly", () => {
        ticketService.purchaseTickets(
            1,
            new TicketTypeRequest("ADULT", 3),
            new TicketTypeRequest("CHILD", 2)
        );

        expect(mockPaymentService.makePayment).toHaveBeenCalledWith(1, 105);
        expect(mockReservationService.reserveSeat).toHaveBeenCalledWith(1, 5);
    });

    test("should throw an error if total ticket count exceeds 25", () => {
        expect(() =>
            ticketService.purchaseTickets(
                1,
                new TicketTypeRequest("ADULT", 20),
                new TicketTypeRequest("CHILD", 6)
            )
        ).toThrow("Ticket limit exceeded: Cannot purchase more than 25 tickets at a time.");
    });
});
