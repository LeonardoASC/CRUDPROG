import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/cards";

export default function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(listCard);
  
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const dataAtual = `${ano}-${mes}-${dia}`;
  console.log('AQUIIIIIIIIIIII' + data)

  const handleRegisterGame = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      deadline: values.deadline,
      description: values.description,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        name: values.name,
        deadline: values.deadline,
        description: values.description,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            id: response.data[0].id,
            name: values.name,
            deadline: values.deadline,
            description: values.description,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Lista de Tarefas</h1>

        <input
          type="text"
          name="name"
          placeholder="Nome"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Descricão"
          name="description"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="date"
          min={dataAtual}
          placeholder="Prazo"
          name="deadline"
          className="register-input"
          onChange={handleaddValues}
        />

        <button onClick={handleRegisterGame} className="register-button">
          Criar
        </button>
      </div>

      {listCard.map((val) => (
        <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.id}
          id={val.id}
          name={val.name}
          deadline={val.deadline}
          description={val.description}
        />
      ))}
    </div>
  );
}
