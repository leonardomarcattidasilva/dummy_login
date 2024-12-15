import { login } from './utils';
import './index.css';
import { useState, useEffect } from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// Desabilite o botão de Login equanto você está executando o login.
// Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(null);

  const handleState = e => {
    const {value, name} = e.target;
    if (name === 'email') {
      setEmailState(value);      
    } else {
      setPasswordState(value);
    }
  }

  const emailIsValid = emailState;
  const passwordIsValid = passwordState;

  useEffect(() => {
    setIsValid(emailIsValid.includes('@') && emailIsValid.includes('.com') && passwordIsValid.trim().length >= 6)
  }, [emailIsValid, passwordIsValid]);

  const submitForm = () => {
    const values = {email: emailState, password: passwordState};
    setError(null);
    setIsValid(false);
    login(values)
    .then(() => {
      alert('Login efetuado com sucesso!')
    })
    .catch(error => setError(error.message))
    .finally(() => setIsValid(true))
  };

  return (
    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        {
          error && <div className='errorMessage'>{error}</div>
        }
        <div className='row'>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" autoComplete='off' value={emailState} onChange={handleState}/>
        </div>
        <div className='row'>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" value={passwordState} onChange={handleState}/>
        </div>

        <div className='button'>
          <button disabled={!isValid} onClick={submitForm}>Login</button>
        </div>
      </div>
    </div>
  );
}
