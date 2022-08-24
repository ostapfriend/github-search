import React from "react";
import "./AccountItem.scss";

import xSolid from '../../images/xSolid.svg';

type Props = {
  accountGit: AccountGit;
  deleteAccount: (id: number) => void,
  onHandleVisibleModal: (currentId: number) => void,
};

export const AccountItem:React.FC<Props> = ({accountGit, deleteAccount, onHandleVisibleModal}) => {
  return <section className="account-item">
    <div className="account-item__container" onClick={() => onHandleVisibleModal(accountGit.id)}>
      <div className="account-item__container-img">
        <img
          src={accountGit.avatar_url}
          alt="avatar git"
          className='account-item__img'
        />
      </div>
      <h1 className="account-item__name">{`UserName: ${accountGit.login}`}</h1>
      <p className="account-item__repo">{`Number of repositories: ${accountGit.public_repos}`}</p>
    </div>
    <div
      className="account-item__container-icon"
      onClick={() => deleteAccount(accountGit.id)}
    >
      <img
        src={xSolid}
        alt="icon X"
        className="account-item__icon"
      />
    </div>
  </section>;
}
