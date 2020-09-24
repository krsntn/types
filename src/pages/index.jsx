import React from 'react';
import {Link} from 'gatsby';

import Layout from '@components/Layout';
import Typing from '@components/Typing';
import SEO from '@components/SEO';
import {DataProvider} from '@contexts/DataContext';

const IndexPage = () => (
  <DataProvider>
    <Layout>
      <SEO />
      <Typing />
    </Layout>
  </DataProvider>
);

export default IndexPage;
