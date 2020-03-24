import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from './layout';

const DocsPage = ({ title, updated, body }) => (
  <Layout>
    <h1>{title}</h1>
    <MDXRenderer>{body}</MDXRenderer>
    <p>This page was updated {updated}</p>
  </Layout>
);

export default DocsPage;
