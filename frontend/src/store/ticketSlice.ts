import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllTickets, createTicket, modifyTicketStatus } from "../lib/api";
import { Ticket } from "../types";
import { AppDispatch, RootState } from ".";

interface TicketState {
  tickets: Ticket[];
  loading: boolean;
  creating: boolean;
  error: string | null;
}

const initialState: TicketState = {
  tickets: [],
  loading: false,
  creating: false,
  error: null,
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
      state.loading = false;
      state.error = null;
    },
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.push(action.payload);
      state.error = null;
      state.creating = false
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const index = state.tickets.findIndex(
        (t) => t._id === action.payload._id
      );
      if (index !== -1) state.tickets[index] = { ...action.payload };
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.creating = false;
    },
    setCreating: (state) => {
      state.creating = true;
      state.error = null;
    },
  },
});

export const { setTickets, addTicket, updateTicket, setError, setLoading, setCreating } =
  ticketSlice.actions;

export const fetchTickets =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setLoading());
    try {
      const token = getState().auth.token;
      const tickets = await getAllTickets(token);
      dispatch(setTickets(tickets));
    } catch (error) {
      dispatch(setError("Failed to fetch tickets."));
    }
  };

export const createNewTicket =
  (data: Partial<Ticket>) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setCreating())
    try {
      const token = getState().auth.token;
      const newTicket = await createTicket(data, token);
      dispatch(addTicket(newTicket));
    } catch (error) {
      dispatch(setError("Failed to create ticket."));
    }
  };

export const updateTicketStatus =
  (id: string, status: Ticket["status"]) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setLoading());
    try {
      const token = getState().auth.token;
      const updatedTicket = await modifyTicketStatus(id, { status }, token);
      dispatch(updateTicket(updatedTicket));
    } catch (error) {
      dispatch(setError("Failed to update ticket status."));
    }
  };

export default ticketSlice.reducer;
