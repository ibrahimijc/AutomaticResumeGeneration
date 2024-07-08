import React, { Fragment, useEffect, useState } from 'react';
import { useBasicDetails } from 'src/stores/basic';
import BasicHeader from './components/BasicHeader';
import BasicPanel from './components/BasicPanel';
import { fetchResumeData } from 'src/services/basics';
import { OutlinedButton } from 'src/helpers/common/atoms/Buttons';
import { UpdateResumeData } from 'src/services/updateResume';

const tabTitles = ['Contacts', 'Links', 'About'];

const BasicLayout = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const { values: basicTabs, reset: onChangeText } = useBasicDetails();
  const [updatbasicresume, setUpdatebasicresume] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchResumeData(); // Fetch resume data
        if (data?.data?.basics) {
          onChangeText(data?.data?.basics);
          setUpdatebasicresume(data?.data);
        }
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchData();
  }, [onChangeText]);

  

  const changeActiveTab = (event: React.SyntheticEvent, activeTab: number) => {
    setActiveTab(activeTab);
  };

  const updatebasicdetail = async () => {
    try {
      // Create the final data object by replacing the basics with the updated basicTabs
      const finalData = {
        ...updatbasicresume,
        basics: basicTabs, // Use the updated basicTabs
      };

      console.log('finalData', finalData);

      // Call the API to update the resume data
      const response = await UpdateResumeData(finalData);

      // Handle the response if needed
      console.log('Update successful:', response);
    } catch (error) {
      console.error('Error updating basic details:', error);
    }
  };

  return (
    <Fragment>
      <BasicHeader
        activeTab={activeTab}
        changeActiveTab={changeActiveTab}
        tabTitles={tabTitles}
      ></BasicHeader>
      <BasicPanel
        activeTab={activeTab}
        basicTabs={basicTabs}
        onChangeText={onChangeText}
      ></BasicPanel>
      <OutlinedButton onClick={updatebasicdetail}>Update Basic Details</OutlinedButton>
    </Fragment>
  );
};

export default BasicLayout;
