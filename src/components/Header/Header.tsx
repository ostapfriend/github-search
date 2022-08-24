import githubBrands from "../../images/githubBrands.svg";

import "./Header.scss";

const Header = () => {
  return (
    <section className="header">
      <img src={githubBrands} alt="github logo" className="header__icon" />
      <h1 className="header__title title">GitHub Searcher</h1>
    </section>
  );
};

export default Header;
