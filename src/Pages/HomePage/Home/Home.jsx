import About from "../About/About";
import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Banner />
            <div className='md:w-11/12 mx-auto lg:max-w-7xl'>
                <Featured />
                <About />
                <h2 className="mb-10">Featured </h2>
                <Testimonials />
            </div>
        </div>
    );
};

export default Home;