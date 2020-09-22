import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import css from './topbar.module.scss';

const SEO = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const defaultTitle = site.siteMetadata?.title;

  return (
    <header className={css.topbar}>
      <h3>{defaultTitle}</h3>
    </header>
  );
};

export default React.memo(SEO);
