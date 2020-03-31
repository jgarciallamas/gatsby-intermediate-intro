/** @jsx jsx */
import { jsx } from 'theme-ui';
// import React from 'react';
import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import Layout from '../components/layout';

export const query = graphql`
  query {
    image: file(name: { eq: "negroni" }) {
      cloudinary: childCloudinaryAsset {
        fluid(transformations: ["ar_18:9", "c_fill", "g_auto:subject"]) {
          ...CloudinaryAssetFluid
        }
      }
    }
  }
`;

const Index = ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <Image fluid={data.image.cloudinary.fluid} alt="Negroni." />
      <h1>Negronis: A Love Story</h1>
      <p>
        A Negroni, while simple, is a beautifully complex cocktail with endless
        opportunities to experiment with flavors.
      </p>
      <Link sx={{ variant: 'button.primary' }} to="/recipes">
        See Recipes
      </Link>
      <Link sx={{ variant: 'button.hollow', ml: 3 }} to="/history">
        Learn the History
      </Link>
      <Link sx={{ variant: 'button.hollow', ml: 3 }} to="/events">
        Upcoming Events
      </Link>
    </Layout>
  );
};

export default Index;
