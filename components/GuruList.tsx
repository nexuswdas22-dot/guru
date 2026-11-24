"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { guruList, initialOf, type Guru } from "@/lib/guru";
import GuruDetail from "./GuruDetail";

export default function GuruList() {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<Guru | null>(null);

    const hasil = useMemo(() => {
        const q = query.trim().toLowerCase();
        return guruList.filter((guru) => guru.nama.toLowerCase().includes(q));
    }, [query]);

    /* Elemen dengan .reveal-on-scroll dianimasikan sekali saat masuk viewport */
    useEffect(() => {
        const targets = Array.from(
            document.querySelectorAll<HTMLElement>(".reveal-on-scroll:not(.is-visible)")
        );
        if (targets.length === 0) return;

        if (!("IntersectionObserver" in window)) {
            targets.forEach((el) => el.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        targets.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [hasil]);

    return (
        <section className="guru" id="guru">
            <div className="guru-head reveal-on-scroll">
                <h2>DAFTAR GURU</h2>
                <p>{guruList.length} guru di SMK TI Garuda Nusantara</p>
            </div>

            <div className="guru-search">
                <input
                    type="search"
                    placeholder="Cari nama guru..."
                    autoComplete="off"
                    aria-label="Cari nama guru"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="guru-grid">
                {hasil.map((guru, index) => (
                    <div
                        className="guru-card reveal-on-scroll"
                        key={guru.id}
                        style={{ "--i": index % 4 } as CSSProperties}
                    >
                        <button
                            type="button"
                            className="guru-card-main"
                            onClick={() => setSelected(guru)}
                        >
                            <span className="guru-photo">
                                <span className="guru-initial">{initialOf(guru.nama)}</span>
                                {guru.foto && (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                        src={guru.foto}
                                        alt={`Foto ${guru.nama}`}
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />
                                )}
                            </span>
                            <span className="guru-name">{guru.nama}</span>
                            <span className="guru-mapel">{guru.mapel}</span>
                        </button>
                    </div>
                ))}
            </div>

            {hasil.length === 0 && (
                <p className="guru-empty">Guru dengan nama &quot;{query.trim()}&quot; tidak ditemukan</p>
            )}

            <GuruDetail guru={selected} onClose={() => setSelected(null)} />
        </section>
    );
}
