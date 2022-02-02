import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Header as HeaderWrapper, Link } from './styles';
import logo from '../../assets/logo.svg';
import { FiChevronLeft } from 'react-icons/fi';

const Header = () => {
  const { path } = useRouteMatch();

  return (
    <HeaderWrapper>
      <img src={logo} alt="GitCollection" />

      {path !== '/' && (
        <Link to="/">
          <FiChevronLeft /> Voltar
        </Link>
      )}
    </HeaderWrapper>
  );
};

export default Header;
