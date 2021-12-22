import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ],
  filter: "",
};

const conatactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (state, action) => ({ ...state, items: [action.payload] }),
    addContacts: (state, action) => ({
      ...state,
      items: [action.payload, ...state.items],
    }),
    deleteContact: (state, action) => ({
      ...state,
      items: state.items.filter((contact) => contact.id !== action.payload),
    }),
    chengeFilter: (state, action) => ({ ...state, filter: action.payload }),
  },
});

export const { setContacts, addContacts, deleteContact, chengeFilter } =
  conatactsSlice.actions;

export default conatactsSlice.reducer;
