import About from "../About/About";
import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";
import Newsletter from "../NewsLetter/Newsletter";
import OurTeam from "../OurTeam/OurTeam";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Banner />
            <div className='md:w-11/12 mx-auto lg:max-w-7xl'>
                <Featured />
                <About />
                <h2 className="mb-10">discover our popular Class </h2>
                <Testimonials />
                <h2>discover our latest news 
                     community forum</h2>
                <Newsletter />
                <OurTeam />
            </div>
        </div>
    );
};

export default Home;