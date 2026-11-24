# Deploy ke VPS (Ubuntu/Debian) + Cloudflare Tunnel

Prasyarat: Node.js v22, domain aktif di Cloudflare, file `cloudflared-linux-amd64.deb`.

## 1. Install dasar

```bash
apt update && apt install -y git nginx
apt install -y ./cloudflared-linux-amd64.deb
cloudflared --version
```

## 2. Clone + build

```bash
cd ~
git clone https://github.com/nexuswdas22-dot/guru.git
cd guru
npm ci
npm run build
```

## 3. Nginx sebagai origin lokal

```bash
mkdir -p /var/www/hari-guru
cp -r out/. /var/www/hari-guru/
cp deploy/nginx.conf /etc/nginx/sites-available/hari-guru
ln -sf /etc/nginx/sites-available/hari-guru /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
curl -I http://127.0.0.1    # harus HTTP/1.1 200 OK
```

## 4. Login Cloudflare (sekali saja)

```bash
cloudflared login
```

Copy URL yang muncul → buka di browser laptop → pilih domain → Authorize.

## 5. Buat tunnel + arahkan DNS

```bash
cloudflared tunnel create hari-guru

# arahkan domain utama (dan www jika perlu)
cloudflared tunnel route dns hari-guru DOMAIN.COM
cloudflared tunnel route dns hari-guru www.DOMAIN.COM   # opsional
```

## 6. Config tunnel

```bash
UUID=$(cloudflared tunnel list | grep -w hari-guru | awk '{print $1}')
sed "s/TUNNEL_UUID/${UUID}/g" deploy/cloudflared-config.yml > ~/.cloudflared/config.yml
sed -i 's/DOMAIN.COM/domainkamu.com/g' ~/.cloudflared/config.yml   # ← GANTI di sini
cat ~/.cloudflared/config.yml
```

## 7. Jalankan sebagai service (auto-start saat reboot)

```bash
cloudflared tunnel --config /root/.cloudflared/config.yml service install
systemctl enable cloudflared
systemctl start cloudflared
systemctl status cloudflared      # harus active (running)
```

## 8. Verifikasi

```bash
curl -sI https://DOMAIN.COM | head -5    # harus HTTP/2 200
```

Buka domain di HP → situs harus muncul dengan HTTPS.

## Update konten berikutnya

```bash
cd ~/guru && bash deploy/deploy.sh
```

(Tidak perlu restart service apa pun — Nginx menyajikan file baru langsung.)

## Troubleshooting

| Gejala | Cek |
|---|---|
| Tunnel mati | `journalctl -u cloudflared -n 50` |
| 502 Bad Gateway | Nginx mati? `systemctl status nginx`; origin jalan? `curl -I http://127.0.0.1` |
| 1033 error (Cloudflare) | Tunnel tidak jalan / DNS route belum dibuat |
| Halaman kosong | `ls /var/www/hari-guru` harus berisi `index.html` |
