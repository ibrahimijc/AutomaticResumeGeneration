import React, { useState, useEffect, useContext } from 'react'


import PartialSideBar from './PartialSidebar'
import SvgIcons from '../../../../public/images/SvgIcons';
import { LayoutContext } from '../../../Context/LayoutContext';

export default function SidebarNav() {

    const layout = useContext(LayoutContext);
    console.log('layout', layout);

    const [itemsSub, setItemsSub] = useState([])

    const items = [
        {
            link: '/dashboard',
            logo: SvgIcons.Dashboard,

            // logo: layout?.elements?.selectedSideBar == 'Dashboard' ? <SvgIcons.Dashboard color="#304FBE"/>:  <SvgIcons.Dashboard />,
            // className : `items middle mb_16`,
            name: 'All Resumes',
            subMenu: false,
            children: "",

        },




        {
            link: '/speedmap',
            logo: SvgIcons.SpeedMap,

            // logo: layout?.elements?.selectedSideBar == 'Dashboard' ? <SvgIcons.Dashboard color="#304FBE"/>:  <SvgIcons.Dashboard />,
            // className : `items middle mb_16`,
            name: 'Generated Resume',
            // subMenu: false,
            //children: "",

         },
        // {
        //     link: '/upcomingrace',
        //     logo: SvgIcons.upcomingrace,

        //     // logo: layout?.elements?.selectedSideBar == 'Dashboard' ? <SvgIcons.Dashboard color="#304FBE"/>:  <SvgIcons.Dashboard />,
        //     // className : `items middle mb_16`,
        //     name: 'Upcoming Races',
        //     // subMenu: false,
        //     //children: "",

        // },
        // {
        //     link: '/prediction',
        //     logo: SvgIcons.upcomingrace,

        //     // logo: layout?.elements?.selectedSideBar == 'Dashboard' ? <SvgIcons.Dashboard color="#304FBE"/>:  <SvgIcons.Dashboard />,
        //     // className : `items middle mb_16`,
        //     name: 'Predictions',
        //     // subMenu: false,
        //     //children: "",

        // },
        // {
        //     link: '/races',
        //     logo: SvgIcons.Races,

        //     // logo: layout?.elements?.selectedSideBar == 'Races' ? <SvgIcons.Races  color="#304FBE" /> : <SvgIcons.Races/>,
        //     // className : `items middle mb_16`,
        //     name: 'Races',
        //     // subMenu   : false,
        //     // childern  : '',
        //     // disabled  : false
        // },
        // {
        //     link: '/horses',
        //     // logo: layout?.elements?.selectedSideBar == 'Horses' ? <SvgIcons.Horses  color="#304FBE" /> : <SvgIcons.Horses/>,

        //     logo: SvgIcons.Horses,
        //     //className : 'items middle mb_16',
        //     // subMenu   : true,
        //     name: 'Horses',
        //     // childern  : '',
        //     // disabled  : false
        // },


        // {
        //     link: '/jockey',
        //     // logo: layout?.elements?.selectedSideBar == 'Horses' ? <SvgIcons.Horses  color="#304FBE" /> : <SvgIcons.Horses/>,

        //     logo: SvgIcons.Jockey,
        //     //className : 'items middle mb_16',
        //     // subMenu   : true,
        //     name: 'Jockey',
        //     // childern  : '',
        //     // disabled  : false
        // },

        // {
        //     link: '/trainer',
        //     // logo: layout?.elements?.selectedSideBar == 'Horses' ? <SvgIcons.Horses  color="#304FBE" /> : <SvgIcons.Horses/>,

        //     logo: SvgIcons.Trainer,
        //     //className : 'items middle mb_16',
        //     // subMenu   : true,
        //     name: 'Trainer',
        //     // childern  : '',
        //     // disabled  : false
        // },


        // {
        //     link: '/playground',
        //     // logo: layout?.elements?.selectedSideBar == 'Playground' ? <SvgIcons.Playground  color="#304FBE" /> : <SvgIcons.Playground/>,

        //     logo: SvgIcons.Playground,
        //     // className : 'items middle mb_16',
        //     // subMenu   : true,
        //     name: 'Playground',
        //     childern: '',
        //     disabled: false
        // },
        {
            link: '/mainsettings',
            // logo: layout?.elements?.selectedSideBar == 'Settings' ? <SvgIcons.Settings  color="#304FBE" /> : <SvgIcons.Settings/>,

            logo: SvgIcons.Settings,
            // className : 'items middle mb_16',
            // subMenu   : true,
            name: 'User Approval',
            // childern  : '',
            // disabled  : false
        },
    ]

    const onLoad = () => {
        items.map((element, idx) => (setItemsSub(element.childern)))
    }

    const [sideCollapse, setsideCollapse] = useState(false)
    const [toggleSidebar, settoggleSidebar] = useState(false)

    useEffect(onLoad, [])


    const sidebarToggler = () => {

        settoggleSidebar(!toggleSidebar);
        layout.setLayout({
            ...layout.elements,
            toggleSidebar: !layout.elements.toggleSidebar
        })

    }

    const sidebarClass = layout?.elements?.toggleSidebar ? "sidebar-close" : "sidebar-main";



    return (


        <div className={sidebarClass} >




            <div className={layout?.elements?.toggleSidebar === false ? 'collapse-icon ' : 'collapse-icon-close'} onClick={() => { sidebarToggler() }}>
                <SvgIcons.Collapse className="dd" />
            </div>

            <PartialSideBar
                isOpen={toggleSidebar}
                items={items}
                setItemsSub={setItemsSub}
                toggleSidebar={toggleSidebar}

            />

        </div>

    )
}
