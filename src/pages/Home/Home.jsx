import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import ArtisanCarousel from "../../components/ArtisanCarousel/ArtisanCarousel";
import styles from "./Home.module.css"

import Logo from "../../assets/icons/logo_vertical.png";

function Home() {
    return (
        <>
            <Navbar/>

            <section className={styles.heroSection}>
                <div className={styles.heroRight}>
                </div>
            </section>
            <ArtisanCarousel />
        </>
    );
};


export default Home;