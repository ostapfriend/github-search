import React, { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { getAccountRepo } from "../../api";
import "./GitHubModal.scss";

import xSolid from "../../images/xSolid.svg";

type Props = {
  account: AccountGit | undefined;
  selectAccount: () => void;
};

const GitHubModal: React.FC<Props> = ({ account, selectAccount }) => {
  const [accountsRepo, setAccountsRepo] = useState<AccountRepo[]>();
  const [accountRepo, setAccountRepo] = useState<AccountRepo | null>();

  useEffect(() => {
    getAccountRepo(account?.login).then((res) => setAccountsRepo(res));
  }, []);

  const handleInputChange = (event: { target: { value: string } }) => {
    const currentAccount = accountsRepo?.find(
      (accountRepo) => accountRepo.name === event.target.value
    );

    setAccountRepo(currentAccount);
  };

  return (
    <div className="currentAccount__container">
      <section className="currentAccount">
        <div className="currentAccount__container-icon" onClick={selectAccount}>
          <img src={xSolid} alt="icon X" className="currentAccount__icon" />
        </div>
        <div className="currentAccount__info">
          <img
            src={account?.avatar_url}
            alt="avatar"
            className="currentAccount__img"
          />
          <ul className="currentAccount__list">
            <li className="currentAccount__item">
              <p>{`UserName: ${account?.login}`}</p>
            </li>
            <li className="currentAccount__item">
              <p>{`Email: ${account?.email || "janesmith@gmail.com"}`}</p>
            </li>
            <li className="currentAccount__item">
              <p>{`Location: ${account?.location || "Ukraine, Lviv"}`}</p>
            </li>
            <li className="currentAccount__item">
              <p>{`Join date: ${account?.created_at}`}</p>
            </li>
            <li className="currentAccount__item">
              <p>{`${account?.followers} followers`}</p>
            </li>
            <li className="currentAccount__item">
              <p>{`Following: ${account?.following}`}</p>
            </li>
          </ul>
        </div>
        <p className="currentAccount__biography">
          Biography:
          {account?.blog || " This user has not specified a biography"}
        </p>

        <DebounceInput
          type="text"
          minLength={5}
          onChange={handleInputChange}
          debounceTimeout={1000}
          className="input currentAccount__input"
          placeholder="Search github repositories..."
        />

        <div className="currentAccount__selectedRepository">
          <h1 className="currentAccount__title">Current repository</h1>

          {accountRepo ? (
            <div className="currentAccount__container-card">
              <a
                href={`https://github.com/${account?.login}/${accountRepo.name}`}
                className="currentAccount__repositories-link"
              >
                <div className='currentAccount__repositories-container'>
                  <h1 className="currentAccount__repositories-text">
                    {accountRepo.name}
                  </h1>
                  <div className="currentAccount__repositories-info">
                    <p className="currentAccount__repositories-text">{`Forks: ${accountRepo.forks_count}`}</p>
                    <p className="currentAccount__repositories-text">{`Stars: ${accountRepo.stargazers_count}`}</p>
                  </div>
                </div>
              </a>
              <div
                className="currentAccount__iconX"
                onClick={() => setAccountRepo(null)}
              >
                <img
                  src={xSolid}
                  alt="icon X"
                  className="currentAccount__iconX-img"
                />
              </div>
            </div>


          ) : (
            <p className="currentAccount__repositories-text currentAccount__repositories-text--title">
              Write the name of the repository
            </p>
          )}
        </div>

        <h1 className="currentAccount__title">All repositories</h1>

        <ul className="currentAccount__repositories-list">
          {accountsRepo?.map((accountRepo) => (
            <a
              href={`https://github.com/${account?.login}/${accountRepo.name}`}
              className="repositories-link"
            >
              <li className="currentAccount__repositories-item">
                <h1 className="currentAccount__repositories-text">
                  {accountRepo.name}
                </h1>
                <div className="currentAccount__repositories-info">
                  <p className="currentAccount__repositories-text">{`Forks: ${accountRepo.forks_count}`}</p>
                  <p className="currentAccount__repositories-text">{`Stars: ${accountRepo.stargazers_count}`}</p>
                </div>
              </li>
            </a>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default GitHubModal;
