import { Navigate, Outlet } from 'react-router-dom';
import React from 'react'

function LoggedInRoutes() {
    const userDid = sessionStorage.getItem('userDid');
    if (userDid) {
        return <Outlet />
    } else {
        return <Navigate to='/login' />
    }
}

function AdminRoutes() {
    const userDid = sessionStorage.getItem('userDid');
    const AdminDid = sessionStorage.getItem('InstituteAdmin');

    if (userDid) {
        if(userDid === AdminDid){
            return <Outlet />
        }else{
            return <Navigate to='/welcome' />
        }
    } else {
        return <Navigate to='/login' />
    }
}

function TeacherRoutes() {
    const userDid = sessionStorage.getItem('userDid');
    const teacherDid = sessionStorage.getItem('InstituteTeacher');
    if (userDid) {
        if(userDid === teacherDid){
            return <Outlet />
        }else{
            return <Navigate to='/welcome' />
        }
    } else {
        return <Navigate to='/login' />
    }
}

function StudentRoutes() {
    const userDid = sessionStorage.getItem('userDid');
    const stdDid = sessionStorage.getItem('InstituteStudent');
    if (userDid) {
        if(userDid === stdDid){
            return <Outlet />
        }else{
            return <Navigate to='/welcome' />
        }
    } else {
        return <Navigate to='/login' />
    }
}


export { LoggedInRoutes, AdminRoutes, TeacherRoutes, StudentRoutes }
