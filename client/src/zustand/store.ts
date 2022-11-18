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
  data: Table[]
  loading:boolean
  hasErrors:boolean
  fetchData:(url:string) => void
  removeRow:(id:number) => void
  addUsertoTable: (name:string, email:string, city:string, street:string, gender:string, phoneNumber:string) => void
  rowData:Table;
}


export const useTableStore = create<InitialState>((set) => ({
  data:[],
  loading: false,
  hasErrors: false,
  rowData:{ id:0,
    name:"",
    email:"",
    gender: "",
    address: {
      street:"",
      city: "",
    },
    phone: ""},
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
const newData = state.data.filter((el) => el.id !== id)
     return ({
        data: newData
      })
    }),

    // add a user to the table
    addUsertoTable: (name, email, city, street, gender, phoneNumber) => set((state) =>{
      const id = state.data.length + 1;

     //creating new user 
      const newUser = {id,name, email, address:{city, street}, gender, phone:phoneNumber};
      return({
        data:[...state.data, newUser]
      })
    }),
    getRowdata:(row:any) =>set((state) =>{
      return{
        rowData:row
      }
    })
}));


