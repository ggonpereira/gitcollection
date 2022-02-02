import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { api } from '../../services/api';
import Header from '../../components/Header';
import { Issues, RepoInfo, LoadMore, Animated } from './styles';
import { FiChevronRight } from 'react-icons/fi';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { Title } from '../Dashboard/styles';
import Loading from '../../assets/loading.svg';

interface RepositoryParams {
  repository: string;
}

interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    events_url: string;
  };
  html_url: string;
  description: null | string;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  forks: number;
  open_issues_count: number;
  has_issues: boolean;
}

interface RepositoryIssues {
  id: number;
  title: string;
  html_url: string;
  body: string;
  user: {
    login: string;
  };
}

export const Repo: React.FC = () => {
  const [repo, setRepo] = useState<GitHubRepository | null>(null);
  const [issues, setIssues] = useState<RepositoryIssues[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [issuesCount, setIssuesCount] = useState<number>(5);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem('@GitCollection:favorites');
    if (storedFavorites) return JSON.parse(storedFavorites);
    return [];
  });

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    localStorage.setItem('@GitCollection:favorites', JSON.stringify(favorites));
    console.log(favorites);
  }, [favorites]);

  function handleFavorite(id: string) {
    if (favorites.includes(id)) {
      const filteredFavorites = favorites.filter(fav => fav !== id);
      return setFavorites(filteredFavorites);
    }

    setFavorites(oldValues => [...oldValues, id]);
  }

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        setLoading(true);
        const responseRepo = await api.get<GitHubRepository>(
          `repos/${params.repository}`,
        );
        const repository = responseRepo.data;
        setRepo(repository);

        if (repository.has_issues) {
          const issuesRepo = await api.get<RepositoryIssues[]>(
            `repos/${params.repository}/issues`,
          );
          const issues = issuesRepo.data;
          setIssues(issues);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchRepo();
  }, [params.repository]);

  const handleShowMoreIssues = () => {
    if (issuesCount + 5 > issues.length) return setIssuesCount(issues.length);

    setIssuesCount(oldValue => oldValue + 5);
  };

  return (
    <>
      {loading ? (
        <Animated type="image/svg+xml" data={Loading} />
      ) : (
        <>
          <Header />

          <RepoInfo>
            <header>
              <img
                src={repo?.owner?.avatar_url}
                alt={`${repo?.owner?.login} photo`}
              />
              <div>
                <span>
                  <strong>{repo?.full_name}</strong>
                  <AiOutlineStar
                    size={30}
                    onClick={() => repo && handleFavorite(`${repo.id}`)}
                  />
                </span>

                <p>{repo?.description}</p>
              </div>
            </header>
            <ul>
              <li>
                <strong>{repo?.stargazers_count}</strong>
                <p>Stars</p>
              </li>
              <li>
                <strong>{repo?.forks}</strong>
                <p>Forks</p>
              </li>
              <li>
                <strong>{repo?.open_issues_count}</strong>
                <p>Open issues</p>
              </li>
            </ul>
            {issues.length > 0 &&
              issues.slice(0, issuesCount).map(issue => (
                <Issues key={issue.id} href={issue.html_url} target="_blank">
                  <div>
                    <strong>{issue.title}</strong>
                    {issue.body && <p>{issue.body}</p>}
                    <span>{issue.user.login}</span>
                  </div>

                  <FiChevronRight size={20} />
                </Issues>
              ))}
            {issues.length > 0 && issuesCount !== issues.length && (
              <LoadMore onClick={() => handleShowMoreIssues()}>
                Load more issues
              </LoadMore>
            )}

            {issues.length === 0 && (
              <Title width="100%" fontSize="36px">
                There are no issues in this repository
              </Title>
            )}
          </RepoInfo>
        </>
      )}
    </>
  );
};
