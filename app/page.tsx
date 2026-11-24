import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GuruList from "@/components/GuruList";

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <GuruList />

            <footer className="site-footer reveal-on-scroll">
                <p>
                    Website ini merupakan hasil kerja sama bersama
                    <strong> Guru Produktif RPL</strong> SMK TI Garuda Nusantara.
                </p>
            </footer>
        </>
    );
}
