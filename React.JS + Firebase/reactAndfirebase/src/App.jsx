import { useState } from "react";
import "./App.css";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase/firebaseConnection";

// Alertas
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");

  const [posts, setPosts] = useState([]);

  async function handleAdd() {
    // await setDoc(doc(db, "posts", "12345"), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    //   .then(() => {
    //     toast.success('Dates register sucess!', {
    //       position: toast.POSITION.TOP_CENTER
    //     });
    //     console.log("Dates register sucess!");
    //   })
    //   .catch((error) => {
    //     console.log("ERROR" + error);
    //   });

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        toast.success("Cadastrado com sucesso!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setAutor("");
        setTitulo("");
      })
      .catch((error) => {
        console.log("ERROR" + error);
      });
  }

  async function buscarPost() {
    // const postRef = doc(db, "posts", "f78HDUU0C564qkud3cue");

    // await getDoc(postRef)
    //   .then((snapshot) => {
    //     setAutor(snapshot.data().autor);
    //     setTitulo(snapshot.data().titulo);
    //   })
    //   .catch(() => {
    //     console.log("Error ao buscar");
    //   });

    const postsRef = collection(db, "posts");
    await getDocs(postsRef)
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });

        setPosts(lista);
      })
      .catch((error) => {
        console.log("Ocorreu algum erro");
      });
  }

  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      <h1>React.JS e Firebase</h1>
      <div className="container">
        <label>Título:</label>
        <input
          type="text"
          placeholder="Digite aqui"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <label>Autor:</label>
        <input
          type="text"
          placeholder="Autor do post"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Busque</button>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <span id="titulo">
                  <strong>Título:</strong> {post.titulo}{" "}
                </span>
                <span>
                  <strong>Autor:</strong> {post.autor}{" "}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
