
export const getAccountGitHub = (account: string) => {
  const BASE_URL = `https://api.github.com/users/${account}`;

  return fetch(BASE_URL).then(response => response.json());
};

export const getAccountRepo = (username: string | undefined) => {
  const BASE_URL = `https://api.github.com/users/${username}/repos`;

  return fetch(BASE_URL).then(response => response.json());
};