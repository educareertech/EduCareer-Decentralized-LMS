import { LoggedInRoutes, AdminRoutes, TeacherRoutes, StudentRoutes } from './ProtectedRoutes';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as c from './Pages';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<c.Home />} />
        <Route path='/Login' element={<c.Login />} />
        <Route path='/Register' element={<c.Register />} />
        <Route path='/AboutUs' element={<c.AboutUs />} />
        <Route path='/Platform' element={<c.Platform />} />
        <Route path='/PDFGenerator' element={<c.PDFGenerator />} />
        <Route path='/Team' element={<c.Team />} />


        <Route element={<LoggedInRoutes />}>
          <Route path='/welcome' element={<c.Welcome />} />
          <Route path='/Institutes' element={<c.Institutes />} />
          <Route path='/Qualification/:id' element={<c.Qualification />} />
          <Route path='/StartApplication/:id' element={<c.StartApplication />} />
          <Route path='/InstituteLogin' element={<c.InstituteLogin />} />
          <Route path='/PrePortal' element={<c.PrePortal />} />
          <Route path='/CreateInstitute' element={<c.CreateInstitute />} />
          <Route path='/TechServices' element={<c.TechServices />} />
          <Route path='/UserProfile' element={<c.UserProfile />} />
        </Route>

        <Route element={<AdminRoutes />}>
          <Route path='/AdminPortal' element={<c.AdminDashboard />} />
          <Route path='/AdminProfile' element={<c.AdminProfile />} />
          <Route path='/AdminQualifications' element={<c.AdminQualifications />} />
          <Route path='/AddQualification' element={<c.AdminQualifications />} />
          <Route path='/AllQualifications' element={<c.AllQualifications />} />
          <Route path='/AllStudents' element={<c.AllStudents />} />
          <Route path='/AllTeachers' element={<c.AllTeachers />} />
          <Route path='/ProviderProfile' element={<c.ProviderProfile />} />
          <Route path='/CreateCertificate' element={<c.CreateCertificate />} />
          <Route path='/RegisteredCert' element={<c.RegisteredCert />} />
          <Route path='/IssuedCert/:schemaId' element={<c.IssuedCert />} />
          <Route path='/CheckInfoAccess' element={<c.CheckInfoAccess />} />
          <Route path='/ViewApplications' element={<c.ViewApplications />} />
          <Route path='/ProceedApplication/:id' element={<c.ProceedApplication />} />
        </Route>


        <Route element={<StudentRoutes />}>
          <Route path='/StudentPortal' element={<c.StudentPortal />} />
          <Route path='/StudentProfile' element={<c.StudentProfile />} />
          <Route path='/StdCertificates' element={<c.StdCertificates />} />
        </Route>

        <Route element={<TeacherRoutes />}>
          <Route path='/TeacherPortal' element={<c.TeacherDashboard />} />
          <Route path='/TeacherProfile' element={<c.TeacherProfile />} />
          <Route path='/TSubjects' element={<c.TSubjects />} />
          <Route path='/SubjectX/:subject' element={<c.SubjectX />} />
          <Route path='/Certificates' element={<c.Certificates />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
