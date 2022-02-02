import React, { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

import { api } from '../../services/api';
import { Title, Form, Repos, Error } from './styles';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

interface GithubRepository {
  full_name: string;
  description: string;
  id: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export const Dashboard: React.FC = () => {
  const [repos, setRepos] = useState<GithubRepository[]>(() => {
    const storedRepos = localStorage.getItem('@GitCollection:repositories');

    if (storedRepos) {
      const parsedRepos = JSON.parse(storedRepos);
      const filteredRepos = parsedRepos.filter(
        (value: GithubRepository, index: number, self: GithubRepository[]) =>
          index === self.findIndex(t => t.id === value.id),
      );
      return filteredRepos;
    }
    return [];
  });
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');

  const storedFavorites = localStorage.getItem('@GitCollection:favorites');

  const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

  console.log(favorites);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewRepo(event.target.value);
  }

  useEffect(() => {
    localStorage.setItem('@GitCollection:repositories', JSON.stringify(repos));
  }, [repos]);

  async function handleAddRepo(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    try {
      if (!newRepo) {
        setInputError('Informe o username/repositório');
        return;
      }

      const response = await api.get<GithubRepository>(`repos/${newRepo}`);
      const repository = response.data;

      if (!repos.some(rep => rep.id === repository.id)) {
        setRepos([...repos, repository]);
        setNewRepo('');
        return setInputError('');
      }

      setInputError('Esse repositório já existe');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.status === 404)
        setInputError('O repositório não foi encontrado');
    }
  }

  return (
    <>
      <Header />
      <Title>Catálogo de repositórios do Github</Title>

      <Form hasError={Boolean(inputError)} onSubmit={handleAddRepo}>
        <input
          placeholder="username/repository_name"
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repos>
        {repos.map(repository => (
          <Link
            to={`/repositories/${repository.full_name}`}
            key={repository.full_name}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <span>
                {console.log(repository.id)}
                <strong>{repository.full_name}</strong>
                {favorites.includes(`${repository.id}`) ? (
                  <AiFillStar size={22} />
                ) : (
                  <AiOutlineStar size={22} />
                )}
              </span>

              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repos>
    </>
  );
};
