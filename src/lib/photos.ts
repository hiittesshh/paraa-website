// Stand-in photographs for the three markets, from Wikimedia Commons via the c3 concept
// (D:\paraa-concepts\c3\assets\img\credits.json). Each needs its credit on the page (CC BY-SA): the footer prints one
// line linking to every source. Replace with owner-licensed photographs before launch.
export const PHOTOS = {
  us: {
    src: "/markets/us-stocks.jpg",
    width: 960,
    height: 640,
    alt: "Office towers of Lower Manhattan lit up at blue hour behind old pier posts",
    by: "Superbass",
    page: "https://commons.wikimedia.org/wiki/File:2024-11-17-Lower_Manhattan-0593.jpg",
  },
  gold: {
    src: "/markets/gold.jpg",
    width: 1280,
    height: 853,
    alt: "Molten gold pouring from a glowing crucible into an ingot mould",
    by: "Kriero",
    page: "https://commons.wikimedia.org/wiki/File:%D0%9E%D1%82%D0%BB%D0%B8%D0%B2%D0%BA%D0%B0_%D1%81%D0%BB%D0%B8%D1%82%D0%BA%D0%B0_%D0%B8%D0%B7_%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D0%B0.jpg",
  },
  oil: {
    src: "/markets/crude-oil.jpg",
    width: 1280,
    height: 853,
    alt: "An offshore oil platform in silhouette against the setting sun",
    by: "Peter J Markham",
    page: "https://commons.wikimedia.org/wiki/File:Sunset_over_an_oil_rig_seen_from_Huntington_Beach,_California,_USA_(9285).jpg",
  },
} as const;
