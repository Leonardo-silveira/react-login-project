
import { useState } from "react";
import axios from "axios";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, SetError] = useState('');
    const [user, setUser] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();  

        console.log(email, password);

        try {
            const response = await axios.post('http://localhost:3000/login',
                JSON.stringify({email, password}),
                {   
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            console.log(response.data); 
            setUser('Acessado com sucesso!');  

        } catch (error){
            if (!error?.response) {
                SetError('Erro ao acessar o servidor');
            } else if (error.response.status == 401) {
                SetError('Usuário ou senha incorretos!');
            }
        }  
    };

    return (
      <div className="App">
        <header className="App-header">
          <div className="login-form-wrap">
            <h2>Login</h2>
            <form className='login-form'>
              <input type='email' 
                     name='email' 
                     placeholder='Email' 
                     required
                     onChange={(e) => setEmail(e.target.value)}
                     />
              <input type='password' 
                     name='password' 
                     placeholder='Password' 
                     required
                     onChange={(e) => setPassword(e.target.value)}/>
              <button type='submit' 
                      className='btn-login'
                      onClick={(e) => handleLogin(e)}>Acessar</button>
            </form>
            <p>{error}</p>
            <p>{user}</p>
          </div>
        </header>
      </div>
    );
  }
  export default Login;