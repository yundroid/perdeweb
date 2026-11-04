# Perde İşletmesi Web Sitesi

Perde modellerini ve yapılan işleri sergileyen, WhatsApp'a yönlendiren ve teklif formu içeren statik web sitesi. Kurulum gerektirmez; `index.html` dosyasını tarayıcıda açmanız yeterli.

## Özellikler
- **Perde modelleri**: Tül, fon, stor, zebra, jaluzi, plise, dikey, blackout. Her kartta "Fiyat Sor" (WhatsApp) ve "Teklif Formu" butonu
- **Yaptığımız işler**: Kategori filtreli galeri (Ev / Ofis / İşyeri), tıklayınca büyüyen görüntüleyici
- **Teklif formu**: Doldurulan bilgiler hazır bir mesaj olarak WhatsApp'a aktarılır (sunucu gerekmez)
- **Sabit WhatsApp butonu**, telefonla arama, harita, SSS
- Mobil uyumlu

## Düzenleme
| Ne değişecek | Dosya |
|---|---|
| İşletme adı, WhatsApp numarası, telefon, adres, Instagram | `js/config.js` |
| Perde modelleri ve yapılan işler | `js/data.js` |
| Renkler ve yazı tipleri | `css/style.css` (en üstteki `:root`) |

### Gerçek fotoğraf eklemek
Fotoğrafları `images/` klasörüne koyun ve `js/data.js` içinde ilgili kayda `image` alanı ekleyin:
```js
{ title: "Salon – Tül & Fon", place: "Kadıköy", category: "Ev", type: "fon", image: "images/salon-1.jpg" }
```
Fotoğrafı olmayan kayıtlar için otomatik perde çizimi gösterilir.

## Yayınlama
Statik olduğu için GitHub Pages, Netlify veya Vercel'e doğrudan yüklenebilir.
