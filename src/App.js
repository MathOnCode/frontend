import './App.css';
import axios from 'axios';
import { useState } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




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

    toast.info("formulário limpo!", {
    autoClose: 5000});
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
      //handleCleaning();
      toast.success("formulário enviado!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    catch (error){
      for (var i = 0; i < error.response.data.detail.length; i++){
        toast.error(error.response.data.detail[i], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
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
              <button type="button" className="primaryButton" disabled = {loading ? true : false } onClick={handleSubmit}>{loading ? "Enviando..." : "Enviar" }</button>
              <button type="button" className="secondaryButton" disabled = {loading ? true : false } onClick={handleCleaning}>Limpar</button> 
          </div>
        </form>
      </div>
      <ToastContainer/>
    </body>
  );
}

export default App;
