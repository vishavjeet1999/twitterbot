// pages/index.tsx

import React from 'react';
import dynamic from 'next/dynamic';
import Layout from './layout';

const DynamicHomePage = dynamic(() => import('./homepage'), {
  ssr: false,
});

const HomePageWithLayout: React.FC = () => {
  return (
    <Layout>
      <DynamicHomePage />
    </Layout>
  );
};

export default HomePageWithLayout;
