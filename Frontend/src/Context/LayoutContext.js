import React, { createContext, useState } from 'react'

export const LayoutContext = createContext();

export default function LayoutContextProvider(props) {
    
    const [elements, setElements] = useState({
        title       : '',
        button      : '',
        mainPage    : '',
        edit        : false,
        scrollShadow: false,
        placeholder : '',
        borderBottom: false,
        switch      : '',
        backTitles  : [],
        selectedSideBar : 'Dashboard',
        toggleSidebar:false
    })

    const setLayout = (updates) => setElements({...elements, ...updates})

    return (
      <LayoutContext.Provider value={{elements, setLayout}}>
          {props.children}
      </LayoutContext.Provider>
    )
}
