import React from 'react';

import { useStaticQuery, Link, graphql } from 'gatsby';

export const AuthorPage = () => {
  const data = useStaticQuery(graphql`
    query GetAllAuthors {
      allAuthor {
        nodes {
          name
          slug
        }
      }
    }
  `);

  const authors = data.allAuthor.nodes;

  return (
    <>
      <h1>Authors</h1>
      <ul>
        {authors.map((author) => (
          <li key={author.slug}>
            <Link to={`/${author.slug}`}>{author.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AuthorPage;
