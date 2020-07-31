import React from "react";

import "./styles.css";
import { useEffect } from "react";
import { useState } from "react";
import api from "./services/api";

function App() {
  const [respositories, setRepositories] = useState([])

  useEffect(() => {
    const getRepo = async () => {
      const response = await api.get('repositories')
      setRepositories(response.data)
    }
    getRepo();
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio: ${Date.now()}`,
      url: `localhost.com`,
      techs: ['react', 'nodejs']
    });

    setRepositories([...respositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    setRepositories(respositories.filter(repo => repo.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respositories && respositories.map(repository => (
          <li key={repository.id}>
           {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
