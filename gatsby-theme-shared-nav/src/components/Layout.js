import React from 'react';

import Nav from './Nav';

import '../styles/variables.css';
import '../styles/global.css';

import { content, footer } from '../styles/layout.module.css';

const Layout = (props) => {
  const { children } = props;

  return (
    <>
      <Nav />
      <main className={content}>{children}</main>
      <footer className={footer}>Build with the Shared Nav Gatsby theme</footer>
    </>
  );
};

export default Layout;
