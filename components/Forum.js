import styles from "../styles/Forum.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

function Forum() {
  const [allMessagesData, setAllMessagesData] = useState([]);
  const [message, setMessage] = useState([]);
  const [searchMsg, setSearchMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/message/allmessages") //searching all the values stored in the DB
      .then((response) => response.json())
      .then((data) => {
        
        setMessage(data.message); //setting it as the msg to return
        setAllMessagesData(data.message);
      });
  }, []);

  function formatDate(dateString) {
    var date = new Date(dateString);
    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    var year = date.getFullYear();

    return `${day}/${month}/${year}`; // changes the format on return
  }

  const allMessages = message.map((data, i) => {
    return (
      <MessageBox
        key={i}
        title={data.title}
        slug={data.slug}
        date_publish={formatDate(data.date_publish)}
        nbAnswers={data.answers.length}
      />
    );
  });

  //click to search the messages
  function handleSeach() {
    fetch(`http://localhost:3000/message/filtermessage/${searchMsg}`)
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      });
  }
  //sets the messages to 2 lists so that when 1 is changed by the search it
  // can copy the other and return it to the full list
  function handleReset() {
    setMessage([...allMessagesData]);
    setSearchMsg("");
  }

  return (
    <div className={styles.back}>
      <div className={styles.full}>
        <div className={styles.topContainer}>
          <h1 className={styles.title}>
            FORUM{" "}
           
          </h1>
          <div className={styles.publier}>            
            <div>
              <input
              value={searchMsg}
              onChange={(e) => setSearchMsg(e.target.value)} //e.target.value is the value of wtvr is written inside the searchbar
              type="textbox"
              className={styles.textbox}
            />
            <div className={styles.search}>
            <button
              type="Search"
              className={styles.recherche}
              onClick={() => handleSeach()}
            >
              Recherche
            </button>
            <button
              id="search"
              className={styles.recherche}
              onClick={() => handleReset()}
            >
              <FontAwesomeIcon icon={faRotateLeft} id="refresh" />
            </button>
            </div>
              </div>         
          
          <div>
            <Link href="/forum2">
              <button className={styles.pubbtn} id="publish button">
                Publier un post
              </button>
            </Link>
            </div>  
         
          </div>

          <div className={styles.categories}>
            <div>Sujets</div>

            <div className={styles.publish}>Date de publication</div>

            <div>Messages</div>
          </div>
          <div className={styles.box}>{allMessages}</div>
          <div className={styles.nav}>
            <button type="submit" className={styles.btnn}>
              1
            </button>
            <button type="submit" className={styles.btnn}>
              2
            </button>
            <button type="submit" className={styles.btnn}>
              3
            </button>
            <button type="submit" className={styles.btnn}>
              ...
            </button>
          </div>

          <div className={styles.foot}></div>
        </div>
      </div>
    </div>
  );
}

function MessageBox(props) {
  let title = props.title
  if (title.length > 20){
    title =title.slice(0,20)+"...";
  }
  return (
    <Link href={`/forum/${props.slug}`}>
      <div className={styles.bottom} style={{ cursor: "pointer" }}>
        <div className={styles.titleSubject}>{title}</div>
        <div className={styles.date}>{props.date_publish}</div>
        <div className={styles.answers}>{props.nbAnswers} réponses</div>
      </div>
    </Link>
  );
}

export default Forum;
