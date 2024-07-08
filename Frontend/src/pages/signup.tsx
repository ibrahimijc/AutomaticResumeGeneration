import type { NextPage } from 'next';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useMediaQuery } from '@mui/material';
import { Typography } from '@mui/material';
import { Props } from 'html-react-parser/lib/attributes-to-props';
import Link from 'next/link';

const Alert = React.forwardRef(function Alert(props: Props, ref: React.Ref<HTMLDivElement>) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignupPage: NextPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [alertmsg, setAlertmsg] = useState('');
  const [severity, setSeverity] = useState('');
  const isExtraSmallScreen = useMediaQuery('(max-width: 600px)');
  const logoSize = isExtraSmallScreen ? '80vw' : '40vw';
  // const [error, setError] = useState('');
  const initialValues = {
    email: '',
    username: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  };
  interface FormData {
    email: string;
    username: string;
    fullName: string;
    password: string;
    confirmPassword: string;
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    username: Yup.string().required('Username is required'),
    fullName: Yup.string().required('Full Name is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  const onSubmit = (data: FormData) => {
    axios
      .post('https://resume.depchip.com/api/v1/User/SignUp', data)
      .then((response) => {
        console.log(response);
        setAlertmsg(response.data.data.message);
        setSeverity('success');
        setOpen(true);
        setTimeout(() => {
          router.push('/');
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setAlertmsg(error.response.data.error.message);
        setSeverity('error');
        setOpen(true);
      });
  };
  const handleClose = (event: React.SyntheticEvent<any> | Event, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const routetologin = () => {
    router.push('/login');
  };
  return (
    <div className="SignupPage">
      <nav className="sticky top-0 z-20 h-14 w-full bg-resume-800 flex py-2.5 px-4 xl:px-60 items-center shadow-level-8dp">
        <Link href="/">
          <Image src={'/icons/resume-icon.png'} alt="logo" height="36" width="36" />
        </Link>
      </nav>
      <div className="form">
        <Typography variant="h2" gutterBottom className="main">
          Sign Up
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="myformContainer">
            <div className="main_welcome d-flex mx-auto mb-10 justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="181"
                height="48"
                viewBox="0 0 181 48"
                fill="none"
              >
                <path
                  d="M25.5 13.3457C25.5 10.8734 24.7669 8.45669 23.3934 6.40108C22.0199 4.34546 20.0676 2.7433 17.7835 1.79721C15.4995 0.851114 12.9861 0.603572 10.5614 1.08589C8.13661 1.5682 5.90932 2.75871 4.16117 4.50687C2.41301 6.25502 1.2225 8.48231 0.740184 10.9071C0.257869 13.3318 0.50541 15.8452 1.45151 18.1292C2.3976 20.4133 3.99976 22.3656 6.05537 23.7391C8.11099 25.1126 10.5277 25.8457 13 25.8457V13.3457H25.5Z"
                  fill="#3276FA"
                ></path>
                <path
                  d="M164.092 39.0996L164.125 14.9395H168.219V29.704L174.846 20.9795H179.897L172.867 30.0396L180.501 39.0996H175.148L168.219 30.3751V39.0996H164.092Z"
                  fill="#1E1E1E"
                ></path>
                <path
                  d="M153.7 39.6034C151.832 39.6034 150.238 39.1895 148.918 38.3618C147.598 37.5229 146.586 36.382 145.881 34.9391C145.188 33.4962 144.835 31.8632 144.824 30.04C144.835 28.1832 145.199 26.539 145.915 25.1073C146.642 23.6644 147.671 22.5346 149.002 21.7181C150.333 20.8904 151.916 20.4766 153.75 20.4766C155.808 20.4766 157.547 20.9967 158.968 22.0369C160.4 23.0659 161.334 24.4753 161.77 26.2649L157.743 27.3555C157.43 26.3824 156.91 25.6274 156.183 25.0905C155.456 24.5424 154.628 24.2684 153.7 24.2684C152.648 24.2684 151.781 24.52 151.099 25.0234C150.417 25.5155 149.914 26.1978 149.589 27.0703C149.265 27.9427 149.103 28.9326 149.103 30.04C149.103 31.7625 149.488 33.1551 150.26 34.2177C151.032 35.2803 152.179 35.8116 153.7 35.8116C154.774 35.8116 155.618 35.5655 156.233 35.0733C156.86 34.5812 157.329 33.8709 157.643 32.9425L161.77 33.8653C161.211 35.7109 160.232 37.1314 158.834 38.1269C157.436 39.1112 155.724 39.6034 153.7 39.6034Z"
                  fill="#1E1E1E"
                ></path>
                <path
                  d="M132.571 39.6034C131.262 39.6034 130.155 39.3573 129.249 38.8651C128.343 38.3618 127.655 37.6963 127.185 36.8686C126.726 36.0409 126.497 35.1293 126.497 34.1338C126.497 33.2613 126.642 32.4783 126.933 31.7849C127.224 31.0802 127.672 30.4762 128.276 29.9728C128.88 29.4583 129.663 29.0389 130.624 28.7145C131.351 28.4796 132.202 28.2671 133.175 28.0769C134.159 27.8868 135.222 27.7134 136.362 27.5568C137.515 27.3891 138.717 27.2101 139.97 27.0199L138.527 27.8421C138.538 26.5893 138.258 25.6665 137.688 25.0737C137.117 24.4809 136.156 24.1845 134.802 24.1845C133.986 24.1845 133.197 24.3746 132.436 24.7549C131.676 25.1352 131.145 25.7896 130.843 26.7179L127.151 25.5603C127.599 24.0279 128.449 22.7975 129.702 21.8691C130.966 20.9408 132.666 20.4766 134.802 20.4766C136.413 20.4766 137.828 20.7394 139.047 21.2651C140.277 21.7908 141.189 22.6521 141.782 23.8489C142.106 24.4865 142.302 25.1408 142.369 25.8119C142.436 26.4719 142.47 27.1933 142.47 27.9763V39.1H138.929V35.174L139.517 35.8116C138.7 37.1202 137.744 38.0822 136.648 38.6974C135.563 39.3014 134.204 39.6034 132.571 39.6034ZM133.376 36.382C134.293 36.382 135.076 36.2198 135.725 35.8954C136.374 35.5711 136.888 35.174 137.268 34.7042C137.66 34.2344 137.923 33.7926 138.057 33.3788C138.27 32.8642 138.387 32.277 138.409 31.6171C138.443 30.946 138.46 30.4035 138.46 29.9896L139.701 30.3587C138.482 30.5489 137.436 30.7167 136.564 30.8621C135.691 31.0075 134.942 31.1473 134.316 31.2815C133.689 31.4046 133.136 31.5444 132.655 31.701C132.185 31.8687 131.788 32.0645 131.463 32.2882C131.139 32.5119 130.887 32.7692 130.708 33.06C130.541 33.3508 130.457 33.6919 130.457 34.0834C130.457 34.5308 130.569 34.9279 130.792 35.2747C131.016 35.6102 131.34 35.8787 131.765 36.08C132.202 36.2813 132.738 36.382 133.376 36.382Z"
                  fill="#1E1E1E"
                ></path>
                <path
                  d="M107.341 39.0996V14.9395H116.921C118.554 14.9395 119.891 15.2694 120.931 15.9293C121.982 16.5781 122.76 17.4114 123.263 18.4293C123.778 19.4471 124.035 20.4985 124.035 21.5835C124.035 22.9145 123.716 24.0443 123.078 24.9726C122.452 25.901 121.596 26.5274 120.511 26.8518V26.0129C122.033 26.3596 123.185 27.0811 123.968 28.1772C124.762 29.2734 125.159 30.5205 125.159 31.9187C125.159 33.3504 124.885 34.6031 124.337 35.6769C123.789 36.7507 122.972 37.5896 121.887 38.1936C120.813 38.7976 119.482 39.0996 117.894 39.0996H107.341ZM111.435 35.291H117.391C118.095 35.291 118.727 35.1512 119.287 34.8716C119.846 34.5808 120.282 34.1781 120.595 33.6636C120.92 33.1379 121.082 32.5171 121.082 31.8012C121.082 31.1525 120.942 30.5709 120.662 30.0563C120.383 29.5418 119.975 29.1335 119.438 28.8315C118.901 28.5184 118.258 28.3618 117.508 28.3618H111.435V35.291ZM111.435 24.5867H116.871C117.452 24.5867 117.972 24.4749 118.431 24.2512C118.89 24.0275 119.253 23.6975 119.522 23.2613C119.79 22.8251 119.924 22.2882 119.924 21.6506C119.924 20.8117 119.656 20.1126 119.119 19.5534C118.582 18.9941 117.833 18.7145 116.871 18.7145H111.435V24.5867Z"
                  fill="#1E1E1E"
                ></path>
                <path
                  d="M96.378 39.6034C94.6107 39.6034 93.1287 39.1839 91.9319 38.345C90.735 37.5061 89.8346 36.3652 89.2306 34.9223C88.6266 33.4682 88.3246 31.8408 88.3246 30.04C88.3246 28.2168 88.6266 26.5837 89.2306 25.1408C89.8346 23.6979 90.7183 22.5626 91.8815 21.7349C93.056 20.896 94.5045 20.4766 96.227 20.4766C97.9383 20.4766 99.4204 20.896 100.673 21.7349C101.937 22.5626 102.916 23.6979 103.609 25.1408C104.303 26.5725 104.649 28.2056 104.649 30.04C104.649 31.852 104.308 33.4794 103.626 34.9223C102.944 36.3652 101.982 37.5061 100.74 38.345C99.4987 39.1839 98.0446 39.6034 96.378 39.6034ZM87.6367 47.1534V20.9799H91.2104V33.6975H91.7137V47.1534H87.6367ZM95.7572 35.9793C96.8086 35.9793 97.6755 35.7165 98.3578 35.1908C99.0401 34.6651 99.5434 33.9548 99.8678 33.06C100.203 32.154 100.371 31.1473 100.371 30.04C100.371 28.9438 100.203 27.9483 99.8678 27.0535C99.5322 26.1475 99.0121 25.4316 98.3075 24.9059C97.6028 24.369 96.708 24.1006 95.623 24.1006C94.594 24.1006 93.7551 24.3523 93.1063 24.8556C92.4576 25.3477 91.9766 26.0412 91.6634 26.936C91.3614 27.8197 91.2104 28.8543 91.2104 30.04C91.2104 31.2144 91.3614 32.249 91.6634 33.1439C91.9766 34.0387 92.4632 34.7378 93.1231 35.2411C93.7942 35.7333 94.6722 35.9793 95.7572 35.9793Z"
                  fill="#1E1E1E"
                ></path>
                <path
                  d="M80.2574 39.1005V28.0942C80.2574 26.8526 79.9498 25.8851 79.3346 25.1916C78.7194 24.4869 77.8861 24.1346 76.8347 24.1346C76.1859 24.1346 75.6043 24.2856 75.0898 24.5876C74.5753 24.8784 74.167 25.3146 73.865 25.8963C73.563 26.4667 73.412 27.149 73.412 27.9432L71.6168 26.8862C71.6056 25.6334 71.8852 24.5317 72.4557 23.5809C73.0373 22.619 73.8203 21.8696 74.8046 21.3327C75.7889 20.7958 76.885 20.5273 78.093 20.5273C80.0952 20.5273 81.6276 21.1313 82.6902 22.3394C83.7639 23.5362 84.3008 25.1133 84.3008 27.0707V39.1005H80.2574ZM58.4629 39.1005V20.9803H62.0366V26.6009H62.5399V39.1005H58.4629ZM69.3853 39.1005V28.1445C69.3853 26.8806 69.0777 25.8963 68.4625 25.1916C67.8473 24.4869 67.0084 24.1346 65.9458 24.1346C64.9168 24.1346 64.0891 24.4869 63.4627 25.1916C62.8475 25.8963 62.5399 26.8135 62.5399 27.9432L60.7279 26.7352C60.7279 25.5607 61.0187 24.5037 61.6004 23.5641C62.182 22.6246 62.965 21.8864 63.9493 21.3495C64.9447 20.8014 66.0577 20.5273 67.2881 20.5273C68.6415 20.5273 69.7712 20.8182 70.6772 21.3998C71.5944 21.9702 72.2767 22.7532 72.7241 23.7487C73.1827 24.733 73.412 25.8459 73.412 27.0875V39.1005H69.3853Z"
                  fill="#1E1E1E"
                ></path>
                <path
                  d="M45.2927 39.6188C43.9505 39.6188 42.8431 39.395 41.9707 38.9476C41.0982 38.5002 40.4048 37.9298 39.8902 37.2363C39.3757 36.5428 38.9954 35.8046 38.7493 35.0216C38.5033 34.2386 38.3411 33.5004 38.2628 32.8069C38.1957 32.1023 38.1621 31.5318 38.1621 31.0956V20.9785H42.2559V29.703C42.2559 30.2623 42.2951 30.8942 42.3734 31.5989C42.4517 32.2924 42.6306 32.9635 42.9103 33.6123C43.2011 34.2498 43.6261 34.7755 44.1854 35.1894C44.7558 35.6032 45.522 35.8102 46.4839 35.8102C46.9985 35.8102 47.5074 35.7263 48.0107 35.5585C48.5141 35.3907 48.9671 35.1055 49.3697 34.7028C49.7836 34.289 50.1136 33.7241 50.3596 33.0083C50.6057 32.2924 50.7287 31.3864 50.7287 30.2902L53.128 31.3137C53.128 32.8573 52.826 34.2554 52.222 35.5082C51.6292 36.7609 50.7511 37.762 49.5879 38.5114C48.4246 39.2496 46.9929 39.6188 45.2927 39.6188ZM51.2153 39.0986V33.478H50.7287V20.9785H54.789V39.0986H51.2153Z"
                  fill="#1E1E1E"
                ></path>
                <path
                  d="M15.2881 39.0996V14.9395H19.3316V25.1069H30.7741V14.9395H34.8008V39.0996H30.7741V28.8987H19.3316V39.0996H15.2881Z"
                  fill="#1E1E1E"
                ></path>
              </svg>
            </div>
            <label htmlFor="email">  </label>
              Email: &nbsp;
              <ErrorMessage name="email" component="span" />
              <Field
                autoComplete="on"
                className="inputLoginPage formborder"
                id="email"
                name="email"
                placeholder="Email..."
              />
          
            <br />
            <label htmlFor="username">   </label>
              Username: &nbsp;
              <ErrorMessage name="username" component="span" />
              <Field
                autoComplete="off"
                className="inputLoginPage formborder"
                id="username"
                name="username"
                placeholder="Username..."
              />
        
            <br />
            <label htmlFor="fullName">   </label>
              Full Name: &nbsp;
              <ErrorMessage name="fullName" component="span" />
              <Field
                autoComplete="off"
                className="inputLoginPage formborder"
                id="fullName"
                name="fullName"
                placeholder="Full Name..."
              />
         
            <br />
            <label htmlFor="password">     </label>
              Password: &nbsp;
              <ErrorMessage name="password" component="span" />
              <Field
                autoComplete="off"
                type="password"
                className="inputLoginPage formborder"
                id="password"
                name="password"
                placeholder="Password..."
              />
       
            <br />
            <label htmlFor="confirmPassword">   </label>
              Confirm Password: &nbsp;
              <ErrorMessage name="confirmPassword" component="span" />
              <Field
                autoComplete="off"
                type="password"
                className="inputLoginPage formborder"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password..."
              />
         
            <button type="submit">Sign Up</button>
            <div className="flex justify-center  gap-2 mt-5">
              <div className="user">Already Have a Account ? </div>
              <div onClick={routetologin} className="register">
                {' '}
                Login Here
              </div>
            </div>
          </Form>
        </Formik>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity={severity} sx=" width: '100%' ">
          {alertmsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignupPage;
