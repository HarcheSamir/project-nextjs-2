import React from 'react';
import  './Form.css';
import { v4 as uuidv4 } from 'uuid';
import {useEffect} from "react";

function Form({input, setInput,employé,setEmployé, editemployé, setEditEmployé}) {
    const onInputChange = (event) => {
        setInput(event.target.value);
    };
    const updateemployé = (title,id,completed) => {
        const newemployé = employé.map((employé)=> {
            return employé.id ===id ?{title, id, completed} : employé;
        });
        setEmployé(newemployé);
        setEditEmployé('');
    };
    useEffect(()=>{
        if (editemployé){
            setInput(editemployé.title);
        }else{
            setInput("");
        }
    } , [setInput, editemployé]);
    const onFormSubmit = (event) => {
        event.preventDefault();
        if(!editemployé){
       
       setEmployé([...employé, { id: uuidv4(), title : input , completed : false}])
       setInput("");}else{
        updateemployé(input, editemployé.id, editemployé.completed)
       }
    };
  return (
   <div className='formm'>
    <form onSubmit={onFormSubmit}>
    <input type='text' placeholder="Enter name employé..." className='task-input'
    value={input}
    required
    onChange={onInputChange}
        />
    <button className='button-add' type='submit'>
    Add
    </button>
   
    </form>
    </div>
     );
}
export default Form;