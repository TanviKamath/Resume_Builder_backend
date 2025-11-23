import React from "react";
import Hero from "@/components/Hero";
import Banner from "@/components/banner";
import Features from "@/components/Feature";
import Testimonials from "@/components/Testimonial";

const Home: React.FC = () => { 
    return (
        <div>
            <Banner></Banner>
            <Hero></Hero>
            <Features></Features>
            <Testimonials></Testimonials>
        </div>
    )
}

export default Home 