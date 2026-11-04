/*
 * İÇERİK: Perde modelleri ve yapılan işler.
 * Gerçek fotoğrafları "images/" klasörüne koyup "image" alanına yolunu yazın,
 * ör. image: "images/salon-tul-1.jpg". Fotoğraf yoksa otomatik çizim gösterilir.
 *
 * type: tul | fon | stor | zebra | jaluzi | plise | dikey | blackout
 */
window.CURTAIN_MODELS = [
  { id: "tul", type: "tul", name: "Tül Perde", color: "#f3efe7", accent: "#e2d8c6",
    desc: "Işığı yumuşatan, mekâna ferahlık katan ince dokulu tüller. Düz, desenli ve keten görünümlü seçenekler.",
    tags: ["Salon", "Yatak Odası"] },
  { id: "fon", type: "fon", name: "Fon Perde", color: "#8c5a3c", accent: "#6f4429",
    desc: "Tülle birlikte kullanılan, odaya derinlik ve sıcaklık veren dökümlü kumaş perdeler.",
    tags: ["Salon", "Otel"] },
  { id: "stor", type: "stor", name: "Stor Perde", color: "#c9b79c", accent: "#a8946f",
    desc: "Tek parça, sade ve kullanışlı. Mutfak, ofis ve banyo için ideal; ışık geçiren veya karartan kumaşlar.",
    tags: ["Mutfak", "Ofis"] },
  { id: "zebra", type: "zebra", name: "Zebra Perde", color: "#e8e1d4", accent: "#9e8f78",
    desc: "Şeffaf ve opak bantların kaydırılmasıyla ışığı istediğiniz kadar ayarlayın. Modern ve şık.",
    tags: ["Salon", "Ofis"] },
  { id: "jaluzi", type: "jaluzi", name: "Ahşap / Alüminyum Jaluzi", color: "#b88a5a", accent: "#94683c",
    desc: "Yatay lamelleriyle ışık ve mahremiyeti hassas kontrol. Ahşap ve alüminyum seçenekleri.",
    tags: ["Çalışma Odası", "Ofis"] },
  { id: "plise", type: "plise", name: "Plise Perde", color: "#d9cbb5", accent: "#b9a586",
    desc: "Akordeon kıvrımlı yapısıyla çatı pencereleri, cam balkonlar ve özel ölçüler için çözüm.",
    tags: ["Cam Balkon", "Çatı"] },
  { id: "dikey", type: "dikey", name: "Dikey Perde", color: "#cfd6d9", accent: "#a5b1b6",
    desc: "Geniş pencere ve kapılar için dikey şeritli, dayanıklı ve kolay temizlenen perdeler.",
    tags: ["Ofis", "Mağaza"] },
  { id: "blackout", type: "blackout", name: "Blackout (Karartma)", color: "#2f3a45", accent: "#1f2830",
    desc: "Işığı %100’e yakın keser, ısı ve ses yalıtımına katkı sağlar. Yatak ve çocuk odaları için.",
    tags: ["Yatak Odası", "Çocuk Odası"] }
];

window.PORTFOLIO = [
  { title: "Salon – Tül & Fon Takımı", place: "Kadıköy", category: "Ev", type: "fon", color: "#7d8a6a", accent: "#5f6b4f" },
  { title: "Ofis – Zebra Perde", place: "Ataşehir", category: "Ofis", type: "zebra", color: "#e6e2da", accent: "#7c7468" },
  { title: "Yatak Odası – Blackout", place: "Beşiktaş", category: "Ev", type: "blackout", color: "#41355a", accent: "#2c2340" },
  { title: "Kafe – Ahşap Jaluzi", place: "Moda", category: "İşyeri", type: "jaluzi", color: "#a87445", accent: "#7f532b" },
  { title: "Cam Balkon – Plise", place: "Maltepe", category: "Ev", type: "plise", color: "#eae3d6", accent: "#c5b89f" },
  { title: "Mutfak – Stor Perde", place: "Üsküdar", category: "Ev", type: "stor", color: "#9fb4a8", accent: "#7a9284" },
  { title: "Otel Odası – Fon Perde", place: "Şişli", category: "İşyeri", type: "fon", color: "#8b2f3c", accent: "#651f2a" },
  { title: "Toplantı Salonu – Dikey", place: "Levent", category: "Ofis", type: "dikey", color: "#b9c3c8", accent: "#8f9ba1" },
  { title: "Çocuk Odası – Tül", place: "Bakırköy", category: "Ev", type: "tul", color: "#f6eef0", accent: "#e6cfd5" }
];
