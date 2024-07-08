import { NavBarActions, StyledButton } from '../builder/nav-bar/atoms';
import { motion, useAnimation } from 'framer-motion';

import { BsGithub } from 'react-icons/bs';
import { Button, CircularProgress } from '@mui/material';
import FeatureSection from './components/Feature';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const HomeLayout = () => {
  const controls = useAnimation();
  const animationEffectsHoverEnter = { scale: 1.05 };
  const animationEffectsHoverLeave = { scale: 1 };
  const [accessTokenExists, setAccessTokenExists] = useState(false);

  const handleSignOut = useCallback(() => {
    setTimeout(() => {
      sessionStorage.clear();
      window.location.reload();
    }, 2000);
  }, []);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      setAccessTokenExists(true);
    } else {
      setAccessTokenExists(false);
    }
  }, []);

  const animationEffectsFirstLoad = {
    scale: [0.9, 1],
    opacity: [0, 1],
  };
  const transtionEffects = {
    type: 'spring',
    stiffness: 400,
    damping: 17,
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} className="scroll-smooth">
      <nav className="sticky top-0 z-20 h-14 w-full bg-resume-800 flex py-2.5 px-4 xl:px-60 items-center shadow-level-8dp">
        <Link href="/">
          <Image src={'/icons/resume-icon.png'} alt="logo" height="36" width="36" />
        </Link>
        <div className="flex-auto flex justify-between items-center ml-5">
          <NavBarActions>
            {accessTokenExists && (
              <Link href={{ pathname: '/builder', query: { isEditor: true } }} passHref={true}>
                <StyledButton variant="text">Editor</StyledButton>
              </Link>
            )}
          </NavBarActions>
          <NavBarActions>
            {!accessTokenExists && (
              <Link href="/login" passHref={true}>
                <StyledButton variant="text">Login</StyledButton>
              </Link>
            )}
            {!accessTokenExists && (
              <Link href="/signup" passHref={true}>
                <StyledButton variant="text">Sign Up</StyledButton>
              </Link>
            )}
            {accessTokenExists && (
              <Link href="/" passHref={true}>
                <StyledButton variant="text" onClick={handleSignOut}>
                  Sign Out
                </StyledButton>
              </Link>
            )}
            {/* <a
              href={'https://github.com/ibrahimijc'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsGithub className="h-6 w-6" fill="white" />
            </a> */}
          </NavBarActions>
        </div>
      </nav>
      <div
        style={{
          background: 'linear-gradient(180deg, #E7EEFA 50%, #FFFFFF 100%)',
        }}
      >
        <div className="mx-6 md:mx-40 xl:mx-60 mb-6">
          <motion.div
            className="grid grid-cols-12 pt-12 md:pt-24"
            initial={{ opacity: 0 }}
            animate={animationEffectsFirstLoad}
            transition={transtionEffects}
          >
            <div className="col-span-12 sm:col-span-4">
              <motion.img
                id="resume-3d"
                src="/resume.webp"
                alt="resume-3d"
                className="w-6/12 sm:w-9/12"
                onMouseEnter={() => {
                  controls.start(animationEffectsHoverEnter, transtionEffects);
                }}
                onMouseLeave={() => {
                  controls.start(animationEffectsHoverLeave, transtionEffects);
                }}
                animate={controls}
              />
            </div>
            <div className="col-span-12 sm:col-span-8">
              <h3 className="text-xl md:text-2xl mb-2 text-resume-400">SIMPLEST WAY TO BUILD A</h3>
              <h1 className="text-5xl mb-12 text-resume-800">Professional Resume</h1>

              <div className="flex mb-10">
                <div className="bg-resume-800 w-1 rounded-lg"></div>
                <p className="text-lg ml-3 text-resume-800">
                  &ldquo;The secret to getting ahead is getting started&rdquo;
                  <br />
                  —Mark Twain
                </p>
              </div>
              {accessTokenExists && (
                <Link href="/builder" passHref={true}>
                  <Button variant="contained" className="bg-resume-800 mb-2">
                    BUILD YOUR RESUME
                  </Button>
                </Link>
              )}
              <p
                className="xl:invisible text-resume-800"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Desktop screen recommended
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="mx-6 md:mx-40 xl:mx-60 my-32 w-75"
        style={{ fontFamily: "'Roboto Slab', serif" }}
        initial={{ opacity: 0 }}
        animate={animationEffectsFirstLoad}
        transition={transtionEffects}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FeatureSection />
        </div>
      </motion.div>

      <div className="bg-resume-50 my-32"></div>
    </motion.div>
  );
};

export default HomeLayout;
