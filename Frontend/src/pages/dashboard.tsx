import React, { useState } from 'react'
// import SidebarNav from '../components/merchant/sidebar/SidebarNav'
// import SettingHeader from '../components/SettingHeader'
import Home from '../modules/home/components/Home'

import  SidebarNav from "../modules/home/components/SidebarNav"


export default function Dashboard() {
    let user ='admin'
    const [role, setRole] = useState('candidiate')
    const [toggle , setToggle] = useState(false)
  return (

    <div id='Mainn' style={{display:'flex'}} className='d-flex'>

          <SidebarNav/>
          {/* <Sidebar setToggle={setToggle} toggle={toggle} /> */}

        <div className='w-100 main-comp' style={{background: "rgb(246, 247, 249)"}}>
              {/* <SettingHeader/> */}
              <div style={{ paddingTop: '16px', paddingLeft: '32px', paddingRight: '32px', paddingBottom: '16px', fontWeight: '600', fontSize: '16px' }}>
  <span>Dashboard</span> <span style={{ color: '#6B7280' }}>Detail Today</span>
</div>

            <Home/>
        </div>

    </div>
  )
}
