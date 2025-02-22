import { Helmet } from "react-helmet-async";
import About from "../About/About";
import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";
import LatestForum from "../LatestForums/LatestForum";
import Newsletter from "../NewsLetter/Newsletter";
import OurTeam from "../OurTeam/OurTeam";
import PopularClass from "../PopularClass/PopularClass";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div className="">
            <Helmet>
                <title>MH Fitness Center | Home</title>
            </Helmet>
            <Banner />
            <div className='md:w-11/12 mx-auto lg:max-w-7xl'>
                <Featured />
                <About />
                <PopularClass />
                <Testimonials />
                <LatestForum />
                <Newsletter />
                <OurTeam />
            </div>
        </div>
    );
};

export default Home;