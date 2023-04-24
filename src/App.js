import './App.css';
import axios from 'axios';
import { useState } from 'react';




function App() {

    const url = "http://127.0.0.1:8000";

    const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const [loading, setLoading] = useState();

  function handleCleaning(){
    setUserData({
      name: '',
      email: '',
      phone: ''
    })
  }

  function handleChange(event){
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value })
  }

  async function handleSubmit(event){
    event.preventDefault();
    setLoading(true);
    
    try{
      await axios.post(url, {
        name: userData.name,
        email: userData.email,
        phone: userData.phone
      });
      handleCleaning();
      alert("Formulário enviado!");
    }
    catch (error){
      alert(error.response.data.detail);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <body>
    <div className="App">
    <form>
      <div>
        <div>
          <h1>Formulário</h1>
        </div>
        <text>Nome</text>
        <div>
          <input placeholder="insira seu nome" name="name" value={userData.name} onChange={handleChange}></input>
        </div>
        <text>Email</text>
        <div>
          <input placeholder="exemplo@email.com" name="email" value={userData.email} onChange={handleChange}></input>
        </div>
        <text>Telefone</text>
        <div>
          <input mask="(99) 99999-9999" placeholder="(00) 00000-0000" name="phone" value={userData.phone} onChange={handleChange}></input>
        </div>
        <div>
          <button type="button" disabled = {loading ? true : false } onClick={handleSubmit}>{loading ? "Enviando..." : "Enviar" }</button> 
        </div> 
        <div>
          <button type="button" disabled = {loading ? true : false } onClick={handleCleaning}>Limpar</button>
        </div>
      </div>
    </form>
    </div>
    </body>
  );
}

export default App;
