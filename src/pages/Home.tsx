import React from "react";
import Hero from "@/components/Hero";
import Banner from "@/components/banner";
import Features from "@/components/Feature";
import Testimonials from "@/components/Testimonial";
import Calltoaction from "@/components/calltoaction";
import Footer from "@/components/Footer";

const Home: React.FC = () => { 
    return (
        <div>
            <Banner></Banner>
            <Hero></Hero>
            <Features></Features>
            <Testimonials></Testimonials>
            <Calltoaction></Calltoaction>
            <Footer></Footer>
        </div>
    )
}

export default Home 