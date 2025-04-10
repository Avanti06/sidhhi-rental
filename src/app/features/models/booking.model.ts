export interface Booking {
    _id: string;
    tripType: string;
    startDate: string;
    endDate: string;
    pickupLocation: string;
    dropLocation: string;
    totalAmount: number;
    bookingAmount: number;
    remainingAmount: number;
    paymentStatus: string;
    status: string;
    vehicleId: {
      _id: string;
      name: string;
      category: string;
    };
  }
  