import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useTicketRaise = (initialData) => {
  const [data, setData] = useState({
    impacts: "",
    title: "",
    description: "",
    section: "",
    sub_section: "",
  });

  const handleChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRaiseTicket = () => {
    if(data.title === '' || data.description === ''){
      toast.warn('Please fill all Fields', { position: 'top-center' });
      return;
    }

    console.log("Submitted Data", data);
    toast.success('Ticket Raise Successfully', { position: 'top-center' });
  };

  return {
    data,
    handleChange,
    handleRaiseTicket,
  };
};

export default useTicketRaise;
