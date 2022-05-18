import React from 'react';
import Navbar from '../Components/Navbar';
import Header from '../Components/Header';
import Featured from '../Components/Featured';
import PropertyList from '../Components/PropertyList';
import FeaturedProperties from '../Components/FeaturedProperties';
import MailList from '../Components/MailList';

const Home = () => {
  return (
    <div>
        <Navbar />
        <Header />
        <div className="homeContainer">
          <Featured />
          <h1 className="homeTitle">Browse by property name</h1>
          <PropertyList/>
          <h1 className="homeTitle">Homes loved by guests</h1>
          <FeaturedProperties/>
          <MailList/>
        </div>
    </div>
  )
}

export default Home