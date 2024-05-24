/*import React, { useState, useEffect } from 'react';
import { loginUser } from '../../api/user';
import { Navigate } from 'react-router-dom';


const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmitForm = (e) => {
    e.preventDefault();

    let datas = {
      email: email,
      password: password,
    };

    loginUser(datas)
      .then((res) => {
        if (res.status === 200) {
          window.localStorage.setItem(process.env.REACT_APP_TOKEN_SECRET, res.token);
          setShowMessage(true);
          setRedirect(true);
        } else {
          setErrorMessage('Erreur de connexion. Veuillez vérifier vos identifiants.');
          console.log(res);
        }
      })
      .catch((err) => {
        setErrorMessage('Une erreur est survenue lors de la connexion.');
        console.log('CATCH', err);
      });
  };

  useEffect(() => {
    let errorTimeout;
    if (errorMessage) {
      errorTimeout = setTimeout(() => {
        setErrorMessage('');
      }, 3000); 
    }
    return () => clearTimeout(errorTimeout);
  }, [errorMessage]);
  
  
  useEffect(() => {
    let timeout;
    if (showMessage) {
      timeout = setTimeout(() => {
        setRedirect(true);
      }, 2000); 
    }
    return () => clearTimeout(timeout);
  }, [showMessage]);
  
  if (redirect) {
    return <Navigate to="/" />; 
  }
  

  return (
      <main>
        <section>
          <h2>Se connecter</h2>
    
          <form onSubmit={onSubmitForm}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              autoComplete="email"
              placeholder="Votre mail"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              required
            />
            <label htmlFor="password">Mot de Passe</label>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Votre mot de passe"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              required
            />
    
            <input type="submit" name="log" className="submit" />
            <a href= "/register">s'enregistrer</a>
          </form>
          
          {showMessage && <p className = "okMessage">Connexion réussie ! Redirection vers la page profil en cours...</p>}
          {errorMessage && <p className = "errorMessage">{errorMessage}</p>}
        </section>
      </main>
  );
};

export default Login;

*/


import React, { useState, useEffect } from 'react';
import { loginUser } from '../../api/user';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmitForm = (e) => {
    e.preventDefault();

    const datas = {
      email: email,
      password: password,
    };

    loginUser(datas)
      .then((res) => {
        if (res.status === 200) {
          window.localStorage.setItem(process.env.REACT_APP_TOKEN_SECRET, res.token);
          setShowMessage(true);
          setRedirect(true);
        } else {
          setErrorMessage('Erreur de connexion. Veuillez vérifier vos identifiants.');
        }
      })
      .catch((err) => {
        setErrorMessage('Une erreur est survenue lors de la connexion.');
        console.log('CATCH', err);
      });
  };

  useEffect(() => {
    let errorTimeout;
    if (errorMessage) {
      errorTimeout = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
    return () => clearTimeout(errorTimeout);
  }, [errorMessage]);

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <main>
      <section>
        <h2>Se connecter</h2>

        <form onSubmit={onSubmitForm}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            autoComplete="email"
            placeholder="Votre mail"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />
          <label htmlFor="password">Mot de Passe</label>
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />

          <input type="submit" name="log" className="submit" value="Se connecter" />
          <a href="/register">S'enregistrer</a>
        </form>

        {showMessage && <p className="okMessage">Connexion réussie ! Redirection vers la page profil en cours...</p>}
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      </section>
    </main>
  );
};

export default Login;
