import { useState, useEffect } from 'react';
import axios from 'axios';

const GITHUB_USERNAME = 'Sarvesh-Jhawar';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}

interface GitHubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export const useGitHub = () => {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          axios.get<GitHubProfile>(`https://api.github.com/users/${GITHUB_USERNAME}`),
          axios.get<GitHubRepo[]>(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6`
          ),
        ]);
        setProfile(profileRes.data);
        setRepos(reposRes.data);
      } catch (error) {
        console.error('GitHub API error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { profile, repos, loading };
};

// Language color map
export const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Go: '#00ADD8',
  Rust: '#dea584',
  Shell: '#89e051',
  Jupyter: '#DA5B0B',
  'Jupyter Notebook': '#DA5B0B',
};
