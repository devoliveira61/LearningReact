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

import { createUserWithEmailAndPassword } from "firebase/auth";

import { db, auth } from "./firebase/firebaseConnection";

// Alertas
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleAdd() {
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

 async function novoUsuario() {
  await createUserWithEmailAndPassword(auth, email, senha)
  .then(() => {
    toast.success("Cadastrado com sucesso")
    setEmail("")
    setSenha("")
  })
  .catch((error) => {
    toast.error("Erro ao cadastrar")
    console.log("O erro é:", error)
  })
}

  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      <h1>React.JS e Firebase</h1>

      <div className="container">
        <label>e-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite o seu e-mail"
        />

        <label>senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite a sua senha"
        />
        <button onClick={novoUsuario}>Criar conta</button>
      </div>

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
