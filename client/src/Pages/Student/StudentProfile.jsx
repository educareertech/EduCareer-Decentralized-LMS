import React from 'react'
import StudentSideNav from './StudentSideNav'
import ProfileComp from '../../Components/ProfileComp'

function StudentProfile() {
  return (
    <StudentSideNav>
        <ProfileComp></ProfileComp>
    </StudentSideNav>
  )
}

export default StudentProfile