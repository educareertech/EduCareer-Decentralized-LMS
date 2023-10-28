import React, { useEffect, useState } from "react";
import './CompStyle.css'
import DefaultLayout from "./DefaultLayout";
import { ContextState } from "../Context/useContext";



function MenuLayout(props) {
    const [itemClicked, setItemClicked] = useState();
    const [defaultItem, setDefaultItem] = useState();

   
    const handleItemClick = (item)=>{
        sessionStorage.removeItem('clicked')
        sessionStorage.setItem('clicked', item)
        setItemClicked(item);
    }

    useEffect(()=>{
        setDefaultItem(props?.menuItems[0])
        const clicked = sessionStorage.getItem('clicked');
        if(clicked){
            setItemClicked(clicked);
        }
    },[])
    useEffect(()=>{
        sessionStorage.removeItem('clicked');
    },[props])

    return (
        <DefaultLayout>
            <div className="menuLayout  h-100">
                <div className="col-2 bg-secondary">
                    <ul>
                        {(props?.menuItems) &&
                            props?.menuItems?.map((item)=>(
                                <li onClick={() =>handleItemClick(item)}>{item}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-10">
                    {itemClicked ?
                        <>
                    <div className="heading">
                        {props?.subjectName ? 
                        <h2>{props.subjectName}</h2> :
                        <h2>{itemClicked}</h2>
                        }
                    </div>
                    {props.data[itemClicked]}
                    </>
                    :
                    <>
                    <div className="heading">
                        <h2>{defaultItem}</h2>
                    </div>
                    {props.data[defaultItem]}
                    </>
                }
                </div>

            </div>
        </DefaultLayout>
    )
}
export default MenuLayout;