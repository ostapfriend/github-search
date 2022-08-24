import React, { useEffect, useState } from "react";
import { getAccountGitHub } from "../../api";

import { DebounceInput } from "react-debounce-input";

import "./GitHubAccounts.scss";
import { AccountItem } from "../AccountItem/AccountItem";
import GitHubModal from "../GitHubModal/GitHubModal";

const useLocalStorage = () => {
  const accountsFromLocaleStorage = localStorage.getItem("accountsGit");

  try {
    return accountsFromLocaleStorage
      ? JSON.parse(accountsFromLocaleStorage)
      : [];
  } catch {
    return [];
  }
};

const GitHubAccounts = () => {
  const [accountsGit, setAccountsGit] = useState<AccountGit[]>(useLocalStorage);
  const [selectGitHubAccount, setSelectGitHubAccount] = useState<AccountGit>();
  const [isSelectedAccount, setIsSelectedAccount] = useState(false);

  const handleInputChange = (event: { target: { value: string } }) => {
    getAccountGitHub(event.target.value).then((res) => {

      const isInLocale = accountsGit.find(accountGit => accountGit.id === res.id)

      if (res.hasOwnProperty('name') && !isInLocale) {
        setAccountsGit((prev) => [...prev, res]);
      }
    });
  };

  const handleVisibleModal = (currentId: number) => {
    const currentAccount = accountsGit.find(
      (accountGit) => accountGit.id === currentId
    );

    if (currentAccount) {
      selectAccount();
      setSelectGitHubAccount(currentAccount);
    } else {
      selectAccount();
    }
  };

  const deleteAccount = (id: number) => {
    const currentAccounts = accountsGit.filter(
      (accountGit) => accountGit.id !== id
    );

    setAccountsGit(currentAccounts);
  };

  const selectAccount = () => {
    setIsSelectedAccount(prev => !prev);
  };

  useEffect(() => {
    localStorage.setItem("accountsGit", JSON.stringify(accountsGit));
  }, [accountsGit]);

  return (
    <div className="container">
      <h1 className="github-accounts__title title is-1">GitHub Searcher</h1>
      {!isSelectedAccount && (
        <section className="github-accounts">
          <div className="github-accounts__container-input">
            <DebounceInput
              type="text"
              minLength={5}
              debounceTimeout={1000}
              onChange={handleInputChange}
              className="input is-info github-accounts__input"
              placeholder="Search github user..."
            />
          </div>

          <ul className="github-accounts__list">
            {accountsGit.map((accountGit) => (
              <li
                className="github-accounts__item"
                key={accountGit.id}
              >
                <AccountItem
                  accountGit={accountGit}
                  deleteAccount={deleteAccount}
                  onHandleVisibleModal={handleVisibleModal}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {isSelectedAccount && (
        <GitHubModal
          account={selectGitHubAccount}
          selectAccount={selectAccount}
        />
      )}
    </div>
  );
};

export default GitHubAccounts;
