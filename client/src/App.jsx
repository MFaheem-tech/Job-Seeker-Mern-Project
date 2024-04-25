import React, { useEffect, useContext } from 'react'
import "./App.css";

import { Context } from './main.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Auth/login.jsx'
import Register from './components/Auth/register.jsx';
import Navbar from './components/Layout/Navbar.jsx';
import Footer from './components/Layout/Footer.jsx';
import Home from './components/Home/Home'
import MyJobs from './components/Job/MyJobs'
import PostJob from './components/Job/PostJob'
import Jobs from './components/Job/Jobs'
import JobDetails from './components/Job/JobDetails'
import MyApplications from './components/Application/MyApplications'
import Application from './components/Application/Application';
import NotFound from './components/NotFound/NotFound';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

const App=() => {
	const { isAuthorized, setIsAuthorized, setUser }=useContext(Context)

	useEffect(() => {
		const fetchUser=async () => {
			try {
				const response=await axios.get('http://localhost:4000/api/v1/user/profile', { withCredentials: true });
				setUser(response.data.user);
				setIsAuthorized(true)
			} catch (error) {
				setIsAuthorized(false)
			}
		}
		fetchUser();
	}, [isAuthorized])

	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/Login' element={<Login />} />
					<Route path='/Register' element={<Register />} />
					<Route path='/' element={<Home />} />
					<Route path='/job/getAll' element={<Jobs />} />
					<Route path='/job/:id' element={<JobDetails />} />
					<Route path='/job/post' element={<PostJob />} />
					<Route path='/job/me' element={<MyJobs />} />
					<Route path='/application/:id' element={<Application />} />
					<Route path='/application/me' element={<MyApplications />} />
					<Route path='/*' element={<NotFound />} />

				</Routes>
				<Footer />
				<Toaster />
			</Router>
		</>
	)
}

export default App;
