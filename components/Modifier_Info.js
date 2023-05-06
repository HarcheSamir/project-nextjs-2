import React, { useState } from 'react';
import {User} from './User'
import "../App.css"

function Modifier_Info() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [job, setJob] = useState('');
  const [grade, setGrade] = useState('');
  const [situation, setSituation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [responsabilite, setResponsabilite] = useState({
    admin: false,
    responsable: false,
    comptable: false,
    funder: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  const handleResponsabiliteChange = (e) => {
    const { name, checked } = e.target;
    setResponsabilite(prevState => ({ ...prevState, [name]: checked }));
  }

  return (
    
    <div className="form-container">
      {User.map((val, key)=> {
         return(
      <form onSubmit={handleSubmit}>

        <h2 className='main-title'>MODIFIER INFORMATION :</h2>

        <div className="form-group-col">
        {User.map((val, key)=> {
         return(
        <div key={key} > {" "}
          <img src={val.picture} alt="" className="picture" />
          <div className="changer-photo"> Changer photo </div>
        </div>  
          )
         })}
      </div>
      

        <div className="form-group-row">

          <div className="form-group col">
            <label htmlFor="name">Name:</label>
            <input type="text" className='input' id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="form-group col">
            <label htmlFor="email">Email:</label>
            <input type="email" className='input' id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>

        
                <div className="form-group-row">

          <div className="form-group col">
            <label htmlFor="password">Password:</label>
            <input type="password" className='input' id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-group col">
            <label htmlFor="confirmPassword">Confirm password:</label>
            <input type="password" className='input' id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
        </div>

        <div className="form-group-row">
          <div className="form-group col">
            <label htmlFor="job">Job:</label>
            <select id="job" className='input' value={job} onChange={(e) => setJob(e.target.value)}>
              <option value="">-- Select Job --</option>
              <option value="enseignant">Enseignant</option>
              <option value="administrateur">Administrateur</option>
              <option value="secretaire">Secrétaire</option>
            </select>
          </div>

          <div className="form-group col">
            <label htmlFor="grade">Grade:</label>
            <select id="grade" className='input' value={grade} onChange={(e) => setGrade(e.target.value)}>
              <option value="">-- Select Grade --</option>
              <option value="maitre assistant">Maître Assistant</option>
              <option value="maitre conference">Maître de Conférence</option>
            </select>
          </div>
        </div>

    <div className="group">
        <div className="form-group">
          <label htmlFor="situation">Situation:</label>
          <select id="situation" className='input' value={situation} onChange={(e) => setSituation(e.target.value)}>
            <option value="">-- Select Situation --</option>
            <option value="Celibataire">Celibataire</option>
            <option value="Marie">Marie</option>
            <option value="Divorce">Divorce</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="responsabilite">Responsabilité:</label>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="admin" checked={responsabilite.admin} onChange={handleResponsabiliteChange} />
              Admin
            </label>
            <label>
              <input type="checkbox" name="responsable" checked={responsabilite.responsable} onChange={handleResponsabiliteChange} />
              Responsable des oeuvres sociales
            </label>
            <label>
              <input type="checkbox" name="funder" checked={responsabilite.funder} onChange={handleResponsabiliteChange} />
              Funder
            </label>
            <label>
              <input type="checkbox" name="comptable" checked={responsabilite.comptable} onChange={handleResponsabiliteChange} />
              Comptable
            </label>

            </div>
        </div>
        </div>  
        
        <button type="submit"className='button-annuler'>Annuler</button>
        <button type="submit"className='button-ajouter'>Enregistrer</button>



      </form>
      )
    })}
    </div>
  )}
  export default Modifier_Info;