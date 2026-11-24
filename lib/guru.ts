import guruData from "@/data/guru.json";

export type Guru = {
    id: string;
    nama: string;
    mapel: string;
    deskripsi: string;
    foto: string;
    ucapan: string;
};

/**
 * Satu link video CODE/X yang dipakai bersama oleh semua card guru.
 * (Belum ada isinya? isi dengan URL videonya, mis. "https://youtu.be/xxxx")
 */
export const videoCodexUrl = "https://www.instagram.com/reel/DgIUVJ4vyD0/?cnvx=YjlqYjU1dWI5dHkw";

/**
 * Data guru dibaca dari data/guru.json saat build (static import),
 * sehingga tidak ada query ke server/manapun saat halaman diakses.
 *
 * `id` dibuat dari urutan data agar tetap unik walaupun ada dua guru
 * dengan nama yang sama (React butuh key yang unik).
 */
export const guruList: Guru[] = guruData.map((guru, index) => ({
    id: `guru-${index}`,
    ...guru,
}));

export function initialOf(nama: string): string {
    const letter = nama.replace(/[^A-Za-z]/g, "").charAt(0).toUpperCase();
    return letter || "?";
}
