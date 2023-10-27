import React, { useEffect, useState } from 'react'
import { ContextState } from '../../Context/useContext'
import axios from 'axios';
import ProfileComp from '../../Components/ProfileComp';
import TeacherSideNav from '../../Components/TeacherSideNav';

function TeacherProfile() {

    return (
        <TeacherSideNav>
            <ProfileComp></ProfileComp>
        </TeacherSideNav>
    )
}

export default TeacherProfile