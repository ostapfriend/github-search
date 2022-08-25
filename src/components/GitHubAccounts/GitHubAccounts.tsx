import React, { useEffect, useState } from "react";
import { getAccountGitHub } from "../../api";

import { DebounceInput } from "react-debounce-input";

import "./GitHubAccounts.scss";
import { AccountItem } from "../AccountItem/AccountItem";
import GitHubModal from "../GitHubModal/GitHubModal";

import githubBrands from "../../images/githubBrands.svg";
import checkSolid from "../../images/checkSolid.svg";
import xSolid from "../../images/xSolid.svg";

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
  const [selectAccountGit, setSelectAccountGit] = useState<AccountGit>();
  const [isSelectedAccount, setIsSelectedAccount] = useState(false);
  const [isAccountFromServer, setIsAccountFromServer] = useState(false);
  const [query, setQuery] = useState("");

  const handleInputChange = (event: { target: { value: string } }) => {
    setQuery(event.target.value);

    getAccountGitHub(event.target.value).then((res) => {
      console.log(res);

      const isInLocale = accountsGit.find(accountGit => accountGit.id === res.id)

      if (res.hasOwnProperty('name') && !isInLocale) {
        setIsAccountFromServer(true);
        setAccountsGit((prev) => [...prev, res]);
        setQuery("");
      } else {
        setIsAccountFromServer(false);
      }
    });
  };

  const handleVisibleModal = (currentId: number) => {
    const currentAccount = accountsGit.find(
      (accountGit) => accountGit.id === currentId
    );

    if (currentAccount) {
      selectAccount();
      setSelectAccountGit(currentAccount);
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
          <div className="field">
            <label className="label title is-5 has-text-white">Write github account</label>
            <div className="control has-icons-left has-icons-right">
              <DebounceInput
                type="text"
                minLength={1}
                debounceTimeout={500}
                value={query}
                onChange={handleInputChange}
                className="input is-info github-accounts__input"
                placeholder="Search github user..."
              />
              <span className="icon is-small is-left">
                <img src={githubBrands} alt="icon" className="github-accounts__icon-input"/>
              </span>
              <span className="icon is-small is-right">
                {isAccountFromServer ? (
                  <img src={checkSolid} alt="check icon" className="github-accounts__icon-input"/>
                ) : (
                  <img src={xSolid} alt="check icon" className="github-accounts__icon-input"/>
                )}
              </span>
            </div>
            {isAccountFromServer && query.length === 0 && (
              <p className="help has-text-white">This account was found and added</p>
            )}

            {!isAccountFromServer && query.length > 0 && (
              <p className="help has-text-white">This account was not found or has already been added to the list</p>
            )}

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
          account={selectAccountGit}
          selectAccount={selectAccount}
        />
      )}
    </div>
  );
};

export default GitHubAccounts;
