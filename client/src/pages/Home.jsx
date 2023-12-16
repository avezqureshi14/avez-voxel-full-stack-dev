//This is the home page which combines all other component in a single page 
// 1] Hero
// 2] Search
// 3] Startups 

import React, { useState } from 'react'
import Search from '../components/Search'
import Startups from '../components/Startups'
import { NavLink } from 'react-router-dom';
import Hero from '../components/Hero';

const Home = () => {
    const [isLoading,setIsLoading] = useState(true);
    return (
    <>
    <Hero/>
    <div className='flex m-3 mt-10' id="startups" >
    <NavLink to='/search' >
    <Search isLoading={isLoading} setIsLoading={setIsLoading} />
    </NavLink>
    </div>
    <Startups isLoading={isLoading} setIsLoading={setIsLoading} />
    </>
  )
}

export default Home