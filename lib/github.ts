import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // Optional: add for higher rate limits
});

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export async function fetchGitHubRepos(
  username: string
): Promise<GitHubRepo[]> {
  try {
    const { data } = await octokit.repos.listForUser({
      username,
      sort: "updated",
      per_page: 100,
    });

    return data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      language: repo.language,
      topics: repo.topics || [],
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
    }));
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

export async function fetchFeaturedRepos(
  username: string,
  repoNames: string[]
): Promise<GitHubRepo[]> {
  try {
    const repos = await Promise.all(
      repoNames.map(async (repoName) => {
        try {
          const { data } = await octokit.repos.get({
            owner: username,
            repo: repoName,
          });

          return {
            id: data.id,
            name: data.name,
            full_name: data.full_name,
            description: data.description,
            html_url: data.html_url,
            homepage: data.homepage,
            stargazers_count: data.stargazers_count,
            forks_count: data.forks_count,
            language: data.language,
            topics: data.topics || [],
            created_at: data.created_at,
            updated_at: data.updated_at,
            pushed_at: data.pushed_at,
          };
        } catch (error) {
          console.error(`Error fetching repo ${repoName}:`, error);
          return null;
        }
      })
    );

    return repos.filter((repo): repo is GitHubRepo => repo !== null);
  } catch (error) {
    console.error("Error fetching featured repos:", error);
    return [];
  }
}

export function getRepoLanguageColor(language: string | null): string {
  const colors: { [key: string]: string } = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    Go: "#00ADD8",
    Rust: "#dea584",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Swift: "#ffac45",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
  };

  return colors[language || ""] || "#8b949e";
}
