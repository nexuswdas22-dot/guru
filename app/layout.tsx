import type { Metadata, Viewport } from "next";
import { Montserrat, Patrick_Hand } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "600", "700", "800"],
    style: ["normal", "italic"],
    variable: "--font-montserrat",
    display: "swap",
});

const patrickHand = Patrick_Hand({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-patrick-hand",
    display: "swap",
});

export const metadata: Metadata = {
    title: "HARI GURU SMK TI GARUDA NUSANTARA",
    description: "Ucapan Hari Guru dari Himpunan CODE/X - SMK TI Garuda Nusantara",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    // Keyboard Android tidak menaikkan layout halaman
    interactiveWidget: "resizes-visual",
    themeColor: "#3380bb",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="id" className={`${montserrat.variable} ${patrickHand.variable}`}>
            <body>
                {children}
                {/* Tanpa JS: paksa semua elemen reveal tetap tampil */}
                <noscript>
                    <style>{`.reveal-on-scroll{opacity:1!important;transform:none!important}`}</style>
                </noscript>
            </body>
        </html>
    );
}
