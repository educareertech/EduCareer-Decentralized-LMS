import React, { useEffect, useState } from "react";
import './CompStyle.css'
import DefaultLayout from "./DefaultLayout";
import { ContextState } from "../Context/useContext";



function MenuLayout(props) {
    const [itemClicked, setItemClicked] = useState();
    const [defaultItem, setDefaultItem] = useState();

   
    const handleItemClick = (item)=>{
        localStorage.removeItem('clicked')
        localStorage.setItem('clicked', item)
        setItemClicked(item);
    }

    useEffect(()=>{
        setDefaultItem(props?.menuItems[0])
        const clicked = localStorage.getItem('clicked');
        if(clicked){
            setItemClicked(clicked);
        }
    },[])
    useEffect(()=>{
        localStorage.removeItem('clicked');
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