import axios from 'axios';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../main';

const Navbar=() => {
	const { show, setShow }=useState(false);
	const { isAuthorized, setIsAuthorized, user }=useContext(Context);
	const navigateTo=useNavigate();
	const hangleLogout=async () => {
		try {
			const response=await axios.get('http://localhost:4000/api/v1/user/logout', { withCredentials: true })
			toast.success(response.data.message);
			setIsAuthorized(false);
			navigateTo('/login');
		} catch (error) {
			toast.error(error.response.data.message);
			setIsAuthorized(true)
		}
	}
	return (
		<>
			<nav className={isAuthorized? "navbarShow":"navbarHide"}>
				<div className="container">
					<div className="logo">
						<img src='JobZee-logos_white.png' alt='logo' />
					</div>
					<ul className={!show? "menu":"show-menu menu"}></ul>

					<li>
						<Link to={"/"} onClick={() => setShow(false)}>
							Home
						</Link>
					</li>
				</div>
			</nav>
		</>
	)
}

export default Navbar