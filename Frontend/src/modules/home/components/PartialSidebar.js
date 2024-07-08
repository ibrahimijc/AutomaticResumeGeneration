import React, { useState } from 'react'
import { useContext, useEffect } from 'react';
import SvgIcons from '../../../../public/images/SvgIcons';
// import { Link, useParams } from 'react-router-dom';
// import CustomButton from '../../CustomButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useNavigate } from "next/navigation";
import { LayoutContext } from '../../../Context/LayoutContext';
// import { UserContext } from '../../../context/UserContext';

import localforage from 'localforage';


export default function PartialSideBar({ setItemsSub, items, setSidebar, settoggleSidebar }) {

    const [myItems, setmyItems] = useState([]);
    const [box, setBox] = useState(false);
    const navigation = useRouter();
    const params = useRouter();
    const layout = useContext(LayoutContext)
    // const user = useContext(UserContext)


    const [selectedElement, setSelectedElement] = useState(null);
    const handlelogout = async() => {
       
    
    localforage.clear().then(res => window.location.assign('/'))

    }
    const handleMyProfile = () => {
        navigation('/myprofile')
    }
    const mySettings = () => {

        setmyItems(items)
        console.log("items check", myItems)
    }


    useEffect(() => {
        mySettings();
    }, [])
     // const partialClass = layout.elements.toggleSidebar == false ? "eachSetting-btn" : "eachSetting-btn2";

    const toNavigate = (link) => {
        navigation("/" + params.id + link)
    }
    return (

        <div className='main-sidebar' id="main-partialsidebar">

<div className="d-flex w-100 align-items-center main-logotxt" style={{ paddingLeft: layout?.elements?.toggleSidebar ? 0 : '', justifyContent: layout?.elements?.toggleSidebar ? 'center' : '' }}>
    {layout?.elements?.toggleSidebar ? <SvgIcons.HorsecloseLogo /> : <SvgIcons.HorseNewLogo />}
</div>


            {myItems.map((element, idx) => {
                return (
                    layout?.elements?.toggleSidebar ?
                        <div onClick={() => { toNavigate(element.link) }} style={{width : '100%'}} key={idx}>
                            <div className={`eachSetting-collapse `}>
                                {/* element?.logo || '' */}
                                {element.logo({ color: layout?.elements?.selectedSideBar == element.name ? '#304FBE' : '#201A18' })}

                            </div>
                        </div>

                        :

                        <div onClick={() => { toNavigate(element.link) }} style={{width : '100%'}} key={idx} >
                            <div
                                className={`eachSetting${selectedElement === element ? ' selected' : ''}`}
                                key={idx}
                            >
                                {element.logo({ color: layout?.elements?.selectedSideBar == element.name ? '#304FBE' : '#201A18' })}
                                {/* { element?.logo || ''  } */}
                                <span style={{ color: layout?.elements?.selectedSideBar == element.name ? '#304FBE' : '#000' }} className="name">{element.name}</span>
                            </div>

                        </div>
                )

            })
            }
            {
                box && <div style={{ position: 'absolute', bottom: '100px', cursor: 'pointer', width: '186px', height: '66.5px', background: '#FFF', border: '0px 10px 32px rgba(31, 47, 70, 0.12', borderRadius: '10px', padding: '9px' }}>
                    <div onClick={handleMyProfile}>Profile</div>
                    <div style={{ width: '178px', height: '1px', backgroundColor: '#FFF', borderBottom: '1px solid rgba(167, 161, 158, 0.10)' }}></div>
                    <div onClick={handlelogout}>Logout</div>


                </div>
            }
{/* 
            <div className={partialClass}>
                {
                    !layout.elements.toggleSidebar ?
                        <CustomButton

                            className="profile-btn"
                            size={"s"}
                            // width={"184px"}
                            height={"50px"}
                            btntext={"Robert Allen"}
                            icon={<img className='iconimg' src={Rectangle} />}
                            variant={"tert"}
                            endIcon={<SvgIcons.Drop />}
                            onClick={() => setBox(!box)}
                        /> :
                        <div onClick={() => setBox(!box)} style={{ width: 'fit-content' }}>
                            <img className='closeimg' src={Rectangle} />
                        </div>

                }

            </div> */}
        </div>
    )
}
