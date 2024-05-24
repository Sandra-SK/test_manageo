  import React, { useState, useEffect } from 'react';
  import { useSelector, useDispatch } from 'react-redux';
  import { selectUser } from '../../slices/userSlice';
  import { updateProfil, deleteUser } from '../../api/user';

  const Profil = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [msg, setMsg] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
      setName(user.infos.name || '');
      setEmail(user.infos.email || ''); ;
      setBio(user.infos.bio || '');
    }, [user]);

    const onSubmitForm = (event) => {
      event.preventDefault();
      const datas = {
        name: name,
        email: email,
        bio: bio,
      };

      updateProfil(datas, user.infos.user_id)
        .then((res) => {
          console.log(res);
          if (res.status !== 200) {
            setErrorMessage('Erreur lors de la modification');
            return;
          }
          setMsg('Profil modifié avec succès!');
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage('Une erreur est survenue lors de la modification.');
        });
    };

    const handleDeleteUser = () => {
      deleteUser(user.infos.user_id)
        .then((res) => {
          console.log(res);
          // Redirection vers la page de connexion après la suppression du profil
          window.location.href = '/login';
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage('Une erreur est survenue lors de la suppression du profil.');
        });
    };

    return (
      <main>
        <section id="profil-section">
          <h1>Mon profil</h1>
          <form id="profil-form" onSubmit={onSubmitForm}>
            <label htmlFor="name">Nom:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="bio">Bio:</label>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <input
              type="submit"
              value="Mise à jour"
              name="Modifier"
              className="submit"
            />
          </form>
          <p>
            Vos informations de profil ont changé?<br /> Saisir vos nouvelles
            informations dans les champs concernés, puis cliquer sur "Mise à jour".
          </p>
          <button
            onClick={handleDeleteUser} 
            className="delete-button"
          >
            Supprimer le Profil
          </button>
          <button className="logout-button">
            <a href="/logout">Se déconnecter</a>
          </button>

          {msg && <p className="okMessage">{msg}</p>}
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </section>
      </main>
    );
  };

  export default Profil;
