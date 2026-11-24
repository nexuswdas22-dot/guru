"use client";

import { useEffect, useRef, useState } from "react";
import { initialOf, videoCodexUrl, type Guru } from "@/lib/guru";

type Props = {
    guru: Guru | null;
    onClose: () => void;
};

function DetailPhoto({ guru }: { guru: Guru }) {
    const [imgReady, setImgReady] = useState(false);

    return (
        <div className="detail-photo">
            <span className="guru-initial">{initialOf(guru.nama)}</span>
            {guru.foto && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                    src={guru.foto}
                    alt={`Foto ${guru.nama}`}
                    style={{ display: imgReady ? "block" : "none" }}
                    onLoad={() => setImgReady(true)}
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                    }}
                />
            )}
        </div>
    );
}

export default function GuruDetail({ guru, onClose }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (guru && !dialog.open) {
            dialog.showModal();
        }
        if (!guru && dialog.open) {
            dialog.close();
        }
    }, [guru]);

    return (
        <dialog
            className="guru-detail"
            ref={dialogRef}
            onClose={onClose}
            onClick={(e) => {
                if (e.target === dialogRef.current) {
                    onClose();
                }
            }}
        >
            <button
                className="detail-close"
                type="button"
                aria-label="Tutup detail guru"
                onClick={onClose}
            >
                ✕
            </button>

            {guru && (
                <div className="detail-body">
                    <DetailPhoto key={guru.foto} guru={guru} />

                    <div className="detail-info">
                        <h3 className="detail-name">{guru.nama}</h3>
                        <p className="detail-mapel">{guru.mapel}</p>
                        <p className="detail-desc">{guru.deskripsi}</p>

                        <div className="detail-actions">
                            {guru.ucapan ? (
                                <a
                                    className="detail-ucapan"
                                    href={guru.ucapan}
                                    target="_blank"
                                    rel="noopener"
                                >
                                    Lihat Ucapan
                                </a>
                            ) : (
                                <span className="ucapan-missing">Ucapan belum tersedia</span>
                            )}

                            {videoCodexUrl ? (
                                <a
                                    className="detail-ucapan"
                                    href={videoCodexUrl}
                                    target="_blank"
                                    rel="noopener"
                                >
                                    Lihat Video dari CODE/X
                                </a>
                            ) : (
                                <span className="ucapan-missing">Video belum tersedia</span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </dialog>
    );
}
