import styles from "../styles/Forum2.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { text } from "@fortawesome/fontawesome-svg-core";

function Forum2() {
  const user = useSelector((state) => state.user.value);

  const router = useRouter();
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");

  const onClickHandler = () => {
    if (user.token === null) {
      //to not allow someone to submit a post ithout a token
     
    } else {
      fetch("http://localhost:3000/message/newmessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          text: comment,
          token: user.token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === true) {
            router.push("/forum");
          } else {
            
          }
        });
    }
  };

  

  const onChangeTitleHandler = (e) => {
    setTitle(e.target.value);
  };

  const onChangeCommentHandler = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        FORUM{" "}
      </div>
      <div className={styles.container}>
        <div>
          <div className={styles.text}>Intitulé du poste</div>
          <input
            type="text"
            className={styles.textbox}
            value={title}
            onChange={onChangeTitleHandler}
          ></input>
        </div>
        <div>
          <div className={styles.text2}>Contenu du poste</div>
          <textarea
            placeholder='Mettez ici votre commentaire'
            value={comment}
            onChange={onChangeCommentHandler}
            className={styles.textbox2}
          ></textarea>
        </div>
      </div>
      <div className={styles.bttn}>
      <button type="submit" className={styles.submit} onClick={onClickHandler}>
        Poster
      </button>
      </div>
    </div>
  );
}

export default Forum2;
