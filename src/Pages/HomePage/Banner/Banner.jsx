import { useEffect } from "react";
import Glide from "@glidejs/glide";

const Banner = () => {
    useEffect(() => {
        const slider = new Glide(".glide-01", {
            type: "carousel",
            focusAt: "center",
            perView: 1, // Ensure only one slide is visible at a time
            autoplay: 5000,
            animationDuration: 700,
            gap: 0, // Remove gap for seamless full-width experience
            breakpoints: {
                1024: {
                    perView: 1,
                },
                640: {
                    perView: 1,
                },
            },
        }).mount();

        return () => {
            slider.destroy();
        };
    }, []);

    const slides = [
        {
            id: 1,
            backgroundImage: "https://i.ibb.co.com/wgpSKN0/istockphoto-1366052585-612x612.jpg",
            title: "Transform Your Body, Elevate Your Health",
            description: "Join us on a journey to a healthier, stronger you. Discover expert workout plans, nutrition tips, and the motivation to reach your fitness goals. Whether you're a beginner or a seasoned athlete, we have everything you need to succeed.",
        },
        {
            id: 2,
            backgroundImage: "https://i.ibb.co.com/X7F1QxJ/images-4.jpg",
            title: "Build Strength, Build Confidence",
            description: "Unleash your potential with strength training that enhances muscle tone, boosts endurance, and fosters a sense of achievement.",
        },
        {
            id: 3,
            backgroundImage: "https://i.ibb.co.com/JWZf0rj/images.jpg",
            title: "Achieve Your Fitness Goals",
            description: "Whether you're aiming for weight loss, muscle gain, or overall health, our resources will help you set and smash your fitness milestones.",
        },
        {
            id: 4,
            backgroundImage: "https://i.ibb.co.com/kKNPVmQ/images-3.jpg",
            title: "Fuel Your Body, Fuel Your Life",
            description: "Nourish your body with the right nutrition. Learn about healthy eating habits and meal plans that work for your fitness journey.",
        },
        {
            id: 5,
            backgroundImage: "https://i.ibb.co.com/6FXVp13/images-2.jpg",
            title: "Train Smart, Not Hard",
            description: "Get the most out of every workout with efficient and effective training programs designed for maximum results in less time.",
        }
    ];

    return (
        <div className="glide-01 relative w-full mb-4 md:mb-10 lg:mb-20">
            <div className="overflow-hidden w-full" data-glide-el="track">
                <ul className="flex w-full overflow-hidden p-0">
                    {slides.map((slide) => (
                        <li
                            key={slide.id}
                            className="relative h-[400px] w-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${slide.backgroundImage})`,
                            }}
                        >
                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
                                <h3 className=" text-xl md:text-3xl lg:text-5xl font-bold mb-4">{slide.title}</h3>
                                <p className="text-[10px] md:text-base w-3/4">{slide.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Controls */}
            <div
                className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 justify-between px-4"
                data-glide-el="controls"
            >
                <button
                    className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white hover:text-black"
                    data-glide-dir="<"
                >
                    &#x2039;
                </button>
                <button
                    className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white hover:text-black"
                    data-glide-dir=">"
                >
                    &#x203A;
                </button>
            </div>
        </div>
    );
};

export default Banner;
