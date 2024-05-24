import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { addOneUser } from '../../api/user';


const Register = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmitForm = (e) => {
    e.preventDefault();

    let datas = {
      name: name,
      email: email,
      password: password,
    };

    addOneUser(datas)
      .then((res) => {
        if (res.status === 200) {
          setShowMessage(true);
        } else {
          console.log(res);
          setErrorMessage("erreur, merci de verifier que tous les champs soient corrects et au bon format")
        }
      })
      .catch((err) => {
        console.log('CATCH', err);
        setErrorMessage('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
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
    return <Navigate to="/login" />;
  }
  
  


  return (
      <main>
        <section id="register-section">
          <h2>S'enregistrer</h2>
          
          <form id="register-form"
                    onSubmit={onSubmitForm}
                >
                    <label htmlFor="name">nom</label>
                    <input type="text"
                        autoComplete="name"
                        placeholder="Votre nom"
                        onChange={(e)=>{
                            setName(e.currentTarget.value)
                        }}
                        required
                    />
                    <label htmlFor="email">Email</label>
                    <input type="email"
                    autoComplete="email"
                        placeholder="Votre mail"
                        onChange={(e)=>{
                            setEmail(e.currentTarget.value)
                        }}
                        required
                    />
                    <label htmlFor="password">Mot de passe (8 caractères min)</label>
                    <input type="password"
                        autoComplete="current-password"
                        placeholder="Votre mot de passe"
                        onChange={(e)=>{
                            setPassword(e.currentTarget.value)
                        }}
                        required
                    />
                    <input type="submit" name="Enregistrer" value="S'inscrire" className="submit" />                   
                </form>
                
                
          {showMessage &&<p className= "okMessage">Bravo tu es maintenant enregistré.e ! Redirection vers la page login en cours...</p>}
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </section>
      </main>
  );
};
export default Register;

