import React, { useState, useEffect } from 'react'

import { Link, matchPath, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io"; 

import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links';
import ProfileDropDown from '../core/auth/ProfileDropDown';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/api';


function Navbar() {
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart); 
    
    const location = useLocation();
    
    const [subLinks, setSubLinks] = useState({});

    const fetchSublinks = async () => {
        try {
            const result = await apiConnector('GET', categories.CATEGORIES_API);
            console.log('printing sublinks results',result);
            setSubLinks(result.data.data);
        } catch(err) {
            console.log('Could not fetch the catalog list');
        }
    } 

    useEffect(() => {
        fetchSublinks();
    }, []);

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }

    return (
    <div className='h-14  flex items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            <Link to={'/'}>
            <img src={Logo} width={160} height={32} loading='lazy'/>
            </Link>

            {/* Nav links */}
            <nav>
                <ul className='flex flex-row gap-x-6 text-richblack-25'>
                {
                    NavbarLinks.map((item, index) => {
                        return (
                            <li key={index}>
                            {
                                item.title === 'Catalog' ? (
                                    <div className='relative flex gap-2 items-center group'>
                                        <p>{item.title}</p>
                                        <IoMdArrowDropdown />

                                        <div className='invisible absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>

                                            <div className='absolute left-1/2 top-0 translate-x-[80%] -translate-y-[30%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                            </div>
                                            {
                                                subLinks?.length ? (
                                                    subLinks.map((item, index) => (
                                                        <Link to={item.link} key={index}>
                                                            <p>{item.title}</p>
                                                        </Link>
                                                    ))
                                                ) : (<div></div>)
                                            }
                                        </div>

                                    </div>
                                    ) : (
                                    <Link to={item?.path}>
                                        <p className={`${matchRoute(item?.path) ? 'text-yellow-25' : 'text-richblack-100'}`}>{item.title}</p>
                                    </Link>
                                )
                            }
                            </li>
                        )
                    })
                }
                </ul>
            </nav>

            <div className='flex gap-x-4 '>
            {
                user && user.accountType != 'instructor' && (
                    <Link to={'/dashboard/cart'} className='relative'>
                        <AiOutlineShoppingCart/>
                        {
                            totalItems > 0 && (
                                <span>{totalItems}</span>
                            )
                        }
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to={'/login'}>
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]  text-richblack-100 rounded-md'>
                            Log in
                        </button>
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to={'/signup'}>
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]  text-richblack-100 rounded-md'>
                            Sign up
                        </button>
                    </Link>
                )
            }
            {
                token !== null && <ProfileDropDown/>
            }
            </div>

        </div>
    </div>
  )
}

export default Navbar