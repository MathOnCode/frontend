import './App.css';
import axios from 'axios';
import { useState } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputMask from 'react-input-mask';




function App() {

    const url = "http://127.0.0.1:8000";

    const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [errors, setErros] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const [loading, setLoading] = useState();
  //const [mask, setMask] = useState();
  let mask = "(99) 99999-9999";

  function handleCleaning(){
    setUserData({
      name: '',
      email: '',
      phone: ''
    })

    setErros({
      name: '',
      email: '',
      phone: ''
    })

    toast.info("formulário limpo!", {
    autoClose: 8000})
  }

  function handleChange(event){
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value })

      /*if (userData.phone === 0) {
       mask = "";
      }
      else if (userData.phone === 8) {
        mask = "(99) 9999-9999";
      }
      else if (userData.phone === 9) {
        mask = "(99) 99999-9999";
      }*/
  }

  /*function formValidation() {
    const regexName = /^[A-Za-z]+(?:\s+[A-Za-z]+)*\s+[A-Za-z]+$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPhone = /^\(\d{2}\)\s\d{4,5}\-\d{4}$/;

    let checkErros = {}
    let verify = true;
  
    if (!regexName.test(userData.name)) {
      checkErros = {...checkErros, name: "Nome inválido!"};
      verify = false;
    }
  
    if (!regexEmail.test(userData.email)) {
      checkErros = {...checkErros, email: "E-mail inválido!"};
      verify = false;
    }
  
    if (!regexPhone.test(userData.phone)) {
      checkErros = {...checkErros, phone: "Telefone inválido!"};
      verify = false;
    }
  
    setErros(checkErros);
    return verify;
  }*/
  

  async function handleSubmit(event){
    event.preventDefault();
    /*const isValid = formValidation();
    if(isValid){*/
      try{
        await axios.post(url, {
          name: userData.name,
          email: userData.email,
          phone: userData.phone
        });

        setLoading(true);

        toast.success("formulário enviado!", {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

          setUserData({
            name: '',
            email: '',
            phone: ''
          })
      }
      catch (error){
        toast.error("Erro ao enviar formulário!", {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
      finally{
        setLoading(false);
      }
    //}
  }

  return (
    <body>
      <div className="App">
        <form>
          <div>
            <div>
              <h1>Formulário</h1>
            </div>
            <label>Nome</label>
            <div>
              <input placeholder="insira seu nome" name="name" value={userData.name} onChange={handleChange}></input>
              <div>
                <span>{errors.name}</span>
              </div>
            </div>
            <label>Email</label>
            <div>
              <input placeholder="exemplo@email.com" name="email" value={userData.email} onChange={handleChange}></input>
              <div>
                <span>{errors.email}</span>
              </div>
            </div>
            <label>Telefone</label>
            <div>
              <InputMask mask={mask} placeholder="(00) 00000-0000" name="phone" value={userData.phone} onChange={handleChange}></InputMask>
              <div>
                <span>{errors.phone}</span>
              </div>
            </div>
              <button type="button" className="secondaryButton" disabled = {loading ? true : false } onClick={handleCleaning}>Limpar</button> 
              <button type="button" className="primaryButton" disabled = {loading ? true : false } onClick={handleSubmit}>{loading ? "Enviando..." : "Enviar" }</button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </body>
  );
}

export default App;
