import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllTickets, createTicket, modifyTicketStatus } from '../lib/api';
import { Ticket } from '../types';
import { AppDispatch, RootState } from '.';

interface TicketState {
  tickets: Ticket[];
}

const initialState: TicketState = {
  tickets: [],
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
    },
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.push(action.payload);
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const index = state.tickets.findIndex((t) => t._id === action.payload._id);
      if (index !== -1) state.tickets[index] = action.payload;
    },
  },
});

export const { setTickets, addTicket, updateTicket } = ticketSlice.actions;

export const fetchTickets = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const token = getState().auth.token;
  const tickets = await getAllTickets(token);
  dispatch(setTickets(tickets));
};

export const createNewTicket = (data: Partial<Ticket>) => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  const token = getState().auth.token;
  const newTicket = await createTicket(data, token);
  dispatch(addTicket(newTicket));
};

export const updateTicketStatus = (id: string, status: Ticket['status']) => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  const token = getState().auth.token;
  const updatedTicket = await modifyTicketStatus(id, { status }, token);
  dispatch(updateTicket(updatedTicket));
};

export default ticketSlice.reducer;