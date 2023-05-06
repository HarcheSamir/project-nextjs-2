import React from 'react'
import './List_employé.css'
const List_employé = ({employé, setEmployé, setEditEmployé}) => {
 const handleDelete = ({id}) => {
  setEmployé(employé.filter((employé)=> employé.id !== id)); };
  const handleEdit= ({id}) => {
    const findemployé = employé.find((employé)=> employé.id === id); 
    setEditEmployé(findemployé);
  };
    
  return (
    <div className='lis'>
      {employé.map((employé) => (
        <li className='employé-list' key={employé.id}>
          <input
          type='text'
          value={employé.title} 
          className='list-item'
          onChange={(event)=> event.preventDefault()}
          /> 
          <div>
          <button className='button-delete task-button' onClick={()=> handleDelete(employé)}>
             Delete
          </button>
          <button className='button-edit task-button'  onClick={()=> handleEdit(employé)}>
          Edit
          </button>
         
          </div>
           </li> 
      ))}
    </div>
  )
}

export default List_employé