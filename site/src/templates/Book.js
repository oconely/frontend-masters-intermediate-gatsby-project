import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { listing, heading } from '../styles/book.module.css';

export const query = graphql`
  query BookPage($id: String) {
    book(id: { eq: $id }) {
      name
      author {
        name
        slug
      }
      series
      seriesOrder
      buyLink
      cover {
        childImageSharp {
          gatsbyImageData(width: 150)
        }
      }
    }
  }
`;

const BookPage = (props) => {
  const {
    data: { book },
  } = props;

  return (
    <>
      <div className={listing}>
        <GatsbyImage image={getImage(book.cover)} alt={book.name} />
        <div>
          <h1 className={heading}>{book.name}</h1>
          <p>
            Author: <Link to={`/${book.author.slug}`}>{book.author.name}</Link>
          </p>
          {book.series && (
            <p>
              This is book {book.seriesOrder} of the {book.series}
            </p>
          )}
        </div>
      </div>
      <Link to="/books">&larr; back to all books</Link>
    </>
  );
};

export default BookPage;
