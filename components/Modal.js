import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Modal.module.css';
import { Modal, Button } from 'antd';
import { login, logout } from '../reducers/user';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt  } from "@fortawesome/free-solid-svg-icons";


function Modale() {

   //Fonctions connexion
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.value)
  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  //UseState ouverture/fermeture Modale
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(false);

 
  //Fonction cochage/décochage 
  const handleClick= () => {
    setSelectedOption(!selectedOption);
  };

//Fonctions ouverture/fermeture Modale

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  //Fonctions Connexion/déconnexion

  const handleConnection = () => {
    fetch('http://localhost:3000/users/signin', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: signInUsername, password: signInPassword}),
    }).then(response => response.json())
    .then(data => {
     
      if(data.result){
        dispatch(login({username: signInUsername, token: data.token}));
        setSignInUsername('');
        setSignInPassword('');
        setIsOpen(false);
      }
    })
  }

  const handleSignUp = () => {
    setIsOpen(false);
  }

  const handleLogout = () => {
    dispatch(logout());

  }
    let userSection;
    if (user.token) {
      
    userSection = (
      <div className={styles.userSection}>
        <Link href ="/profils">
        <p className={styles.user}>Bienvenue <br/>
        <FontAwesomeIcon icon={faUser} />{user.username}</p>
          </Link>
        <Button className={styles.bttn11} onClick={() => handleLogout()}>
        Déconnexion  
      </Button>
      </div>
    )}
  
    

  return (
    <div>
      {user.token ? 
      <>
      
        {userSection}
      </>
      :
<>
        <div>
        <Link href="/inscription"><Button  className={styles.bttn1}>Inscription</Button></Link>
        </div>
        <div>
      <Button className={styles.bttn1} onClick={() =>openModal()}>
        Connexion
      </Button>
        </div>
      </>  }
     
      <Modal className={styles.modal} 
        title="Se connecter"
        open={isOpen}
        onOk={openModal}
        onCancel={closeModal} footer= {null}>
        <div>
          <div className={styles.username}>
          <p className={styles.text}>Nom d'utilisateur</p>
          <input className={styles.input} type ='text' id='Nom utilisateur'onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} ></input>
          </div>
          <div className={styles.password}>
          <p className={styles.text}>Mot de passe</p>
          <input className={styles.input} type='password' id='Mot de passe' onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword}></input>
          </div>
        </div>
        <div className={styles.remember}>
          <div className={styles.rememberMe}>
            <input type="radio" checked={selectedOption} onClick={() => handleClick()}></input>
            <p>Se souvenir de moi</p>
            </div>
          <p className={styles.forgottenPassword} href=''>mot de passe oublié ?</p>
        </div>
        <div className={styles.click}>
            <Button className={styles.signInBttn} onClick={() => handleConnection()}>SE CONNECTER</Button>
          <Link href='/inscription'>
          <Button className={styles.signUpBttn} onClick={() => handleSignUp()}>CRÉER UN COMPTE</Button>
          </Link>
        </div>
      </Modal>
    </div>
  );
};

export default Modale;
