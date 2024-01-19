import styles from "../styles/Inscription.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { login, logout } from "../reducers/user";
import Link from "next/link";

function Inscription() {
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpPasswordCheck, setSignUpPasswordCheck] = useState("");
  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpLastname, setSignUpLastname] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpBirthday, setSignUpBirthday] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [picture, setPicture] = useState(null);
  const dispatch = useDispatch();

  //Pour être redirigé sur la page d'accueil
  const router = useRouter();

  const handleRegister = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword,
        passwordCheck: signUpPasswordCheck,
        firstname: signUpFirstname,
        lastname: signUpLastname,
        email: signUpEmail,
        birthday: signUpBirthday,
        phone: signUpPhone,
        picture: picture,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
       
        if (data.result) {
         
          dispatch(login({ username: signUpUsername, token: data.token }));
          setSignUpUsername("");
          setSignUpPassword("");
          setSignUpBirthday("");
          setSignUpEmail("");
          setSignUpFirstname("");
          setSignUpLastname("");
          setSignUpPasswordCheck("");
          setSignUpPhone("");
          //Redirection vers la page d'accueil
          router.push("/");
        }
      });
  };

  //Ajout d'une photo de profil
  const handleImageUpload = (e) => {
    console.log('Click')
    const file = e.target.files[0];
    setPicture(file);
  
  }

  return (
    <div>
      <h1 className={styles.title}>CRÉER UN COMPTE</h1>

      <div className={styles.container}>
        <div className={styles.fullContainer}>
          <label for="username">Nom d'utilisateur</label>
          <input
            className={styles.input}
            id="username"
            onChange={(e) => setSignUpUsername(e.target.value)}
            value={signUpUsername}
            type="text"
          />
        </div>

        <div className={styles.halfContainer}>
          <div>
            <label for="firstname">Prénom</label>
            <input
              className={styles.input}
              id="firstname"
              onChange={(e) => setSignUpFirstname(e.target.value)}
              value={signUpFirstname}
              type="text"
            />
          </div>
          <div>
            <label for="lastname">Nom</label>
            <input
              className={styles.input}
              id="lastname"
              onChange={(e) => setSignUpLastname(e.target.value)}
              value={signUpLastname}
              type="text"
            />
          </div>
        </div>

        <div className={styles.halfContainer}>
          <div>
            <label for="birthday">Date de naissance</label>
            <input
              className={styles.input}
              id="birthday"
              onChange={(e) => setSignUpBirthday(e.target.value)}
              value={signUpBirthday}
              type="date"
            />
          </div>
          <div>
            <label for="phone">Téléphone</label>
            <input
              className={styles.input}
              id="phone"
              onChange={(e) => setSignUpPhone(e.target.value)}
              value={signUpPhone}
              type="number"
            />
          </div>
        </div>

        <div className={styles.fullContainer}>
          <label for="email">E-mail</label>
          <input
            className={styles.input}
            id="email"
            onChange={(e) => setSignUpEmail(e.target.value)}
            value={signUpEmail}
            type="email"
          />
        </div>

        <div className={styles.halfContainer}>
          <div>
            <label for="password">Password</label>
            <input
              className={styles.input}
              id="password"
              onChange={(e) => setSignUpPassword(e.target.value)}
              value={signUpPassword}
              type="password"
            />
          </div>
          <div>
            <label for="passwordcheck">Confirmation du password</label>
            <input
              className={styles.input}
              id="passwordcheck"
              onChange={(e) => setSignUpPasswordCheck(e.target.value)}
              value={signUpPasswordCheck}
              type="password"
            />
          </div>
        </div>

        <div>
          <button className={styles.photo} >
           Ajouter une photo                         
          </button>
        </div>
        <div>
          <button className={styles.creer} onClick={() => handleRegister()}>
            Créer son compte
          </button>
        </div>
      </div>

      <div className={styles.bottom}></div>
    </div>
  );
}

export default Inscription;
