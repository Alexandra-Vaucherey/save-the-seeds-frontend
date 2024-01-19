import styles from "../styles/profil.module.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
function Profil() {
  const { token } = useSelector((state) => state.user.value);
  const [newPlant, setNewPlant] = useState("");
  // etat pour stocker les plantes qu on va incrementer
  const [listePlantes, setListePlantes] = useState(0);
  useEffect(() => {
   
    fetch(`http://localhost:3000/seeds/findseeds`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setListePlantes(data.value);
      });
  }, []);
  //affiche la liste des plantes

  //fonction pour ajouter une nouvelle plante

  function handleclick(e) {
    e.preventDefault(); //empeche le raffraichissement de la page

    //mettre à jour l'etat en ajoutant la nouvelle plante à la liste
    if (newPlant === "") {
      return;
    }
    setListePlantes((prevValue) => prevValue + 1);
    fetch("http://localhost:3000/seeds/newseed", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seedname: newPlant,
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setNewPlant("");
         
        }
      });
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.fullContainer}>
        <h3 className={styles.title}>
         
          Votre Profil
          
        </h3>
        <div className={styles.vi}>
          <div>Votre impact: </div>
        </div>
        <div className={styles.impact}>
          <div className={styles.plants}>Plantes : {listePlantes} </div>
          <div className={styles.co2}>
            {/* on reprend le tableau et on multiplis par la valeur du nbre de CO2 absorbé par an (une moyenne de 19kg) */}
            CO₂ Absorbé : {listePlantes * 19} kg/an.
          </div>
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.liste}>Liste des derniers semis : </div>
          <form className={styles.input}>
            <input
              onChange={(e) => setNewPlant(e.target.value)}
              value={newPlant}
              type="text"
              placeholder="Semis..."
            />

            <button
              type="submit" //permet de faire en sorte que quand on appuis sur "enter" ça fasse un click
              onClick={(e) => handleclick(e)}
              style={{ border: "0", backgroundColor: "transparent" }}
            >
              <img
                src="https://res.cloudinary.com/dt30jr39q/image/upload/v1702637124/slxtmmru1hmabbguowjf.avif"
                className={styles.plantbtn}
                alt="Ajouter une plante"
              />
            </button>
          </form>
        </div>

        <div className={styles.users}>
          <div>
            <div>User 1</div>
            <img
              src="https://res.cloudinary.com/dt30jr39q/image/upload/v1702466127/nj7pmv7lupeqs2ycmfbj.webp"
              className={styles.user}
            ></img>
          </div>

          <div>
            <div>User 2</div>
            <img
              src="https://res.cloudinary.com/dt30jr39q/image/upload/v1702466451/kz3zy5e8dpzxezrwxax3.jpg"
              className={styles.user}
            ></img>
          </div>

          <div>
            <div>User 3</div>
            <img
              src="https://res.cloudinary.com/dt30jr39q/image/upload/v1702466863/lulwabjafvxl6xlsxrd4.jpg"
              className={styles.user}
            ></img>
          </div>
          <div>
            <div>User 4</div>
            <img
              src="https://res.cloudinary.com/dt30jr39q/image/upload/v1702457967/xhubnkghe7wr70vfx04u.jpg"
              className={styles.user}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
