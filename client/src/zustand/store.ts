import create from "zustand";
import axios from "axios";

interface Table {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

interface InitialState {
  data: Table[];
  loading: boolean;
  hasErrors: boolean;
  fetchData: (url: string) => void;
  removeRow: (id: number) => void;
  addUsertoTable: (
    name: string,
    email: string,
    city: string,
    street: string,
    gender: string,
    phone: string
  ) => void;
  editUsertoTable: (
    id: number,
    name: string,
    email: string,
    city: string,
    street: string,
    gender: string,
    phone: string
  ) => void;
}

export const useTableStore = create<InitialState>((set) => ({
  data: [],
  loading: false,
  hasErrors: false,
  //@param response
  fetchData: async (url) => {
    set(() => ({ loading: true }));
    try {
      const response = await axios.get(url);
      set(() => ({ data: response.data, loading: false }));
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },

  //delete row by id
  removeRow: (id) =>
    set((state) => {
      const newData = state.data.filter((el) => el.id !== id);
      return {
        data: newData,
      };
    }),

  // add a user to the table
  addUsertoTable: (name, email, city, street, gender, phone) =>
    set((state) => {
      const id = state.data.length + 1;

      //creating new user
      const newUser = {
        id,
        name,
        email,
        address: { city, street },
        gender,
        phone,
      };
      return {
        data: [...state.data, newUser],
      };
    }),

  //find one and updata
  editUsertoTable: (id, name, email, city, street, gender, phone) =>
    set((state) => {
      const updataedUser = {
        id,
        name,
        email,
        address: { city, street },
        gender,
        phone,
      };
      const newData = state.data.map((item) => {
        if (item.id === id) {
          return updataedUser;
        }
        return item;
      });
      return {
        data: newData,
      };
    }),
}));
