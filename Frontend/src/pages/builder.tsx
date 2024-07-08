import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import BuilderLayout from 'src/modules/builder/BuilderLayout';

const BuilderPage: NextPage = () => {
  useEffect(() => {
    // Clear session resumeId when component mounts
    sessionStorage.removeItem('resumeId');
  }, []);
  return (
    <div>
      <Head>
        <title>E-Resume: Builder</title>
        <meta name="description" content="Single Page Resume Builder" />
        <link rel="icon" type="image/png" href="/icons/resume-icon.png" />
      </Head>

      <BuilderLayout />
    </div>
  );
};

export default BuilderPage;
