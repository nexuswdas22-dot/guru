"use client";

/* eslint-disable @next/next/no-img-element */
export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <img
                    src="/img/logoprl.jpg"
                    alt="Logo Software Engineering Students Alliance"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                    }}
                />
            </div>

            <div className="logo">
                <img
                    src="/img/logocodex.jpeg"
                    alt="Logo CODE/X"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                    }}
                />
            </div>

            <div className="logo">
                <img
                    src="/img/logosmk.jpg"
                    alt="Logo SMK TI Garuda Nusantara"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                    }}
                />
            </div>
        </nav>
    );
}
