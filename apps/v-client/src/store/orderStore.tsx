import { create } from 'zustand';


interface PassengerDetail {
    emailID: string;
}

interface OrderStore {
    source: string,
    destination: string,
    data: string,
    time: string,
    ticketQuantity: number,
    price: number;
    passengerDetail: PassengerDetail[];
    addPassenger: (newRoll: string) => void;
    removePassenger: (emailID: string) => void;
}

export const useOrderStore = create<OrderStore>(set => ({
    source: '',
    destination: '',
    data: '',
    time: '',
    ticketQuantity: 0,
    price: 0,
    passengerDetail: [],
    addPassenger: newRoll =>
        set(state => ({
            ...state,
            passengerDetail: [...state.passengerDetail, { emailID: newRoll }]
        })),
    removePassenger: emailID =>
        set(state => ({
            ...state,
            passengerDetail: state.passengerDetail.filter(passenger => passenger.emailID !== emailID)
        })),
}))