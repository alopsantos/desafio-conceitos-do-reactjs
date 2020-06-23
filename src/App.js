import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositoriees] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositoriees(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url: "https://github.com/alopsantos",
      techs: ["Node.js", "React", "Css"]
    });
    const repository = response.data;
    setRepositoriees([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    console.log(id)
    await api.delete(`repositories/${id}`);
    const filterRepositories = repositories.filter(repository => repository.id !== id);
    setRepositoriees(filterRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository =>
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(`${repository.id}`)}>
              Remover
          </button>
          </li>
        )}


      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
