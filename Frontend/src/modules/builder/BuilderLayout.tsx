import EditorLayout from './editor/EditorLayout';
import Image from 'next/image';
import NavBarLayout from './nav-bar/NavBarLayout';
import ResumeHeader from './resume/components/ResumeHeader';
import { ResumeLayout } from './resume/ResumeLayout';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { Children, useEffect, useState } from 'react';
import GenratedResumeLayout from './resume/components/GenratedResumeLayout';
import { useRouter } from 'next/router';

const BuilderLayout = () => {
  const router = useRouter();

  // Check if the current route matches the desired route
  const isDesiredRoute = router.pathname === '/airesume';

  const pushtoairesume = () => {
    router.push('airesume');
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBarLayout />
      <main className="flex flex-1 max-h-[calc(100vh_-_3.5rem)] print:max-h-fit">
        <div>
          {isDesiredRoute && (
            <div>
              <GenratedResumeLayout />
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 justify-center bg-custom-grey100 print:bg-white">
          <header className="w-[210mm] mt-5 mb-3 mx-auto print:hidden">
            <ResumeHeader />
          </header>

          <div className="flex flex-row gap-5 mx-auto justify-center overflow-auto  ">
            <div className="overflow-auto no-scrollbar">
              <ResumeLayout />
            </div>
          </div>
        </div>
        <aside className="w-[25vw] min-w-[20rem] print:hidden">
          <EditorLayout />
        </aside>
      </main>

      <footer className="print:hidden">
        <Tooltip title="Share feedback">
          <div style={{ cursor: 'pointer' }} onClick={pushtoairesume}>
            <a
              //  href="https://forms.gle/YmpXEZLk6LYdnqet7"
              target="_blank"
              rel="noreferrer"
              className="fixed w-14 h-14 rounded-full bottom-4 left-4 flex justify-center items-center bg-resume-50 shadow-level-4dp"
            >
              <Image src="/icons/rate-review.svg" alt="Feedback button" width="24" height="24" />
            </a>
          </div>
        </Tooltip>
      </footer>
    </div>
  );
};

export default BuilderLayout;
