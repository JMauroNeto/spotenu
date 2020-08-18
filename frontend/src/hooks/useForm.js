import {useState} from 'react'

export const useForm = (initialValues) => {
    const [form, setForm] = useState(initialValues);
  
    const changeFormValue = (name, value) => {
      setForm({ ...form, [name]: value });
    };

    const clearForm = () =>{
      setForm(initialValues);
    }
  
    return {form, changeFormValue, clearForm};
};