/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import TopBar from '@components/TopBar';
import css from '@components/Layout.module.scss';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className={css.layout}>
      <TopBar siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main>{children}</main>
      <footer className={css.footer}>
        © 2020, built by
        {` `}
        <a href="https://dev.karson.tk">karson</a>
      </footer>
    </div>
  );
};

export default Layout;
