import type { MenuCategory, MenuItem, GalleryImage } from "@/types";

export const MOCK_CATEGORIES: MenuCategory[] = [
  { id: 1, name: "Polévky", slug: "polevky", sort_order: 1, created_at: "" },
  { id: 2, name: "Předkrmy", slug: "predkrmy", sort_order: 2, created_at: "" },
  { id: 6, name: "Kachna", slug: "kachna", sort_order: 6, created_at: "" },
  { id: 7, name: "Kuřecí maso", slug: "kureciho-masa", sort_order: 7, created_at: "" },
  { id: 8, name: "Hovězí maso", slug: "hovaziho-masa", sort_order: 8, created_at: "" },
  { id: 9, name: "Vepřové maso", slug: "veproveho-masa", sort_order: 9, created_at: "" },
  { id: 10, name: "Mořské plody", slug: "morske-plody", sort_order: 10, created_at: "" },
  { id: 11, name: "Vegetariánské", slug: "vegetarianske", sort_order: 11, created_at: "" },
  { id: 4, name: "Nudle", slug: "nudle", sort_order: 4, created_at: "" },
  { id: 5, name: "Rýže", slug: "ryze", sort_order: 5, created_at: "" },
  { id: 12, name: "Dezerty", slug: "dezerty", sort_order: 12, created_at: "" },
  { id: 13, name: "Nápoje", slug: "napoje", sort_order: 13, created_at: "" },
];

export const MOCK_MENU_ITEMS: MenuItem[] = [
  // Polévky
  { id: 1, category_id: 1, name: "Pekingská polévka", description: "Tradiční čínská polévka s vejci, bambusovými výhonky a tofu", price: 89, image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=70", spicy_level: 0, is_vegetarian: false, is_available: true, sort_order: 1, created_at: "", updated_at: "" },
  { id: 2, category_id: 1, name: "Ostrá a kyselá polévka", description: "Pikantní polévka s vepřovým masem, houbami a tofu", price: 99, image_url: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=70", spicy_level: 2, is_vegetarian: false, is_available: true, sort_order: 2, created_at: "", updated_at: "" },
  { id: 3, category_id: 1, name: "Wonton polévka", description: "Jemné wontonové taštičky s vepřovým masem ve voňavém vývaru", price: 109, image_url: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=70", spicy_level: 0, is_vegetarian: false, is_available: true, sort_order: 3, created_at: "", updated_at: "" },
  // Předkrmy
  { id: 4, category_id: 2, name: "Jarní závitky (4 ks)", description: "Křupavé jarní závitky plněné zeleninou a vepřovým masem", price: 129, image_url: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&q=70", spicy_level: 0, is_vegetarian: false, is_available: true, sort_order: 1, created_at: "", updated_at: "" },
  { id: 5, category_id: 2, name: "Krevety v těstíčku", description: "Smažené krevety ve zlatavém tempura těstíčku s chilli omáčkou", price: 169, image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=70", spicy_level: 1, is_vegetarian: false, is_available: true, sort_order: 2, created_at: "", updated_at: "" },
  { id: 6, category_id: 2, name: "Dim sum výběr (6 ks)", description: "Tradiční dim sum košíčky s vepřovým, kuřecím a krevetovým nádivkou", price: 189, image_url: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=70", spicy_level: 0, is_vegetarian: false, is_available: true, sort_order: 3, created_at: "", updated_at: "" },
  // Kachna
  { id: 7, category_id: 6, name: "Pekingská kachna (půl)", description: "Tradiční Pekingská kachna se svěží okurkou, jarní cibulkou a hoisin omáčkou zabalená v palačinkách", price: 549, image_url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=70", spicy_level: 0, is_vegetarian: false, is_available: true, sort_order: 1, created_at: "", updated_at: "" },
  { id: 8, category_id: 6, name: "Pekingská kachna (celá)", description: "Celá tradiční Pekingská kachna pro 3–4 osoby se všemi přílohami", price: 989, image_url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=70", spicy_level: 0, is_vegetarian: false, is_available: true, sort_order: 2, created_at: "", updated_at: "" },
  { id: 9, category_id: 6, name: "Kachna s pomerančovou omáčkou", description: "Křupavá kachna s jemnou pomerančovou omáčkou a jasmínovou rýží", price: 329, image_url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=70", spicy_level: 0, is_vegetarian: false, is_available: true, sort_order: 3, created_at: "", updated_at: "" },
  // Kuřecí
  { id: 10, category_id: 7, name: "Kung Pao kuře", description: "Klasické Si-čchuanské kuře s arašídy, bambusovými výhonky a sušenými chilli", price: 249, image_url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=70", spicy_level: 3, is_vegetarian: false, is_available: true, sort_order: 1, created_at: "", updated_at: "" },
  { id: 11, category_id: 7, name: "Citronové kuře", description: "Jemné kuřecí maso v lehké citronové omáčce s jasmínovou rýží", price: 239, image_url: "https://images.unsplash.com/photo-1598103442097-8b74394b95c8?w=400&q=70", spicy_level: 0, is_vegetarian: false, is_available: true, sort_order: 2, created_at: "", updated_at: "" },
  { id: 12, category_id: 7, name: "Kuře s kešu ořechy", description: "Kuřecí filé s kešu ořechy a zeleninou v lehkém bujonovém vývaru", price: 259, image_url: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=70", spicy_level: 0, is_vegetarian: false, is_available: true, sort_order: 3, created_at: "", updated_at: "" },
  // Hovězí
  { id: 13, category_id: 8, name: "Hovězí Mongolian", description: "Jemné hovězí maso s jarní cibulkou v bohaté mongolské omáčce", price: 279, image_url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=70", spicy_level: 1, is_vegetarian: false, is_available: true, sort_order: 1, created_at: "", updated_at: "" },
  { id: 14, category_id: 8, name: "Hovězí broccoli", description: "Šťavnaté hovězí maso s brokolicí v česnekové sojové omáčce", price: 269, image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=70", spicy_level: 0, is_vegetarian: false, is_available: true, sort_order: 2, created_at: "", updated_at: "" },
  { id: 15, category_id: 8, name: "Pepřové hovězí", description: "Hovězí maso s barevnou paprikou v pikantní pepřové omáčce", price: 289, image_url: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&q=70", spicy_level: 2, is_vegetarian: false, is_available: true, sort_order: 3, created_at: "", updated_at: "" },
  // Vepřové
  { id: 16, category_id: 9, name: "Sweet & Sour pork", description: "Klasické pečené vepřové maso v kyselé-sladké omáčce s ananasem", price: 249, image_url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=70", spicy_level: 0, is_vegetarian: false, is_available: true, sort_order: 1, created_at: "", updated_at: "" },
  { id: 17, category_id: 9, name: "Char Siu", description: "Tradiční kantonské BBQ vepřové maso, 3 hodiny marinované a opékané", price: 269, image_url: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=70", spicy_level: 0, is_vegetarian: false, is_available: true, sort_order: 2, created_at: "", updated_at: "" },
  // Mořské plody
  { id: 18, category_id: 10, name: "Krevety s česnekovou omáčkou", description: "Tigrí krevety smažené s čerstvým česnekem, zázvorem a jarní cibulkou", price: 319, image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=70", spicy_level: 1, is_vegetarian: false, is_available: true, sort_order: 1, created_at: "", updated_at: "" },
  { id: 19, category_id: 10, name: "Pad Thai s krevetami", description: "Thajské nudle s krevetami, vejci, klíčky a arašídy", price: 289, image_url: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&q=70", spicy_level: 1, is_vegetarian: false, is_available: true, sort_order: 2, created_at: "", updated_at: "" },
  // Vegetariánské
  { id: 20, category_id: 11, name: "Mapo tofu", description: "Čínský klasik — hedvábné tofu v pikantní sečuánské omáčce s houbami", price: 219, image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=70", spicy_level: 3, is_vegetarian: true, is_available: true, sort_order: 1, created_at: "", updated_at: "" },
  { id: 21, category_id: 11, name: "Buddha bowl", description: "Miska s rýží, dušenou zeleninou, tofu, kimchi a sezamovým dressingem", price: 229, image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=70", spicy_level: 1, is_vegetarian: true, is_available: true, sort_order: 2, created_at: "", updated_at: "" },
  { id: 22, category_id: 11, name: "Vegetariánský chow mein", description: "Nudle se zeleninou a houbami v aromatické sojové omáčce", price: 209, image_url: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&q=70", spicy_level: 0, is_vegetarian: true, is_available: true, sort_order: 3, created_at: "", updated_at: "" },
  // Nudle
  { id: 23, category_id: 4, name: "Dan Dan nudle", description: "Si-čchuanské nudle s mletým vepřovým masem, tahini a chilli olejem", price: 229, image_url: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&q=70", spicy_level: 3, is_vegetarian: false, is_available: true, sort_order: 1, created_at: "", updated_at: "" },
  { id: 24, category_id: 4, name: "Lo Mein s kuřecím masem", description: "Vejčité nudle s kuřecím masem a crispy zeleninou", price: 239, image_url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=70", spicy_level: 0, is_vegetarian: false, is_available: true, sort_order: 2, created_at: "", updated_at: "" },
  // Rýže
  { id: 25, category_id: 5, name: "Smažená rýže Yangzhou", description: "Klasická smažená rýže s vejci, krevetami a zeleninou", price: 159, image_url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=70", spicy_level: 0, is_vegetarian: false, is_available: true, sort_order: 1, created_at: "", updated_at: "" },
  { id: 26, category_id: 5, name: "Jasmínová rýže", description: "Přirozeně voňavá thajská jasmínová rýže", price: 49, image_url: null, spicy_level: 0, is_vegetarian: true, is_available: true, sort_order: 2, created_at: "", updated_at: "" },
  // Dezerty
  { id: 27, category_id: 12, name: "Smažené banány s medem", description: "Zlatavé smažené banány s pramenitým medem a vanilkovou zmrzlinou", price: 109, image_url: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=70", spicy_level: 0, is_vegetarian: true, is_available: true, sort_order: 1, created_at: "", updated_at: "" },
  { id: 28, category_id: 12, name: "Mango pudink", description: "Hedvábně hladký mango pudink s čerstvým mangem", price: 119, image_url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=70", spicy_level: 0, is_vegetarian: true, is_available: true, sort_order: 2, created_at: "", updated_at: "" },
  // Nápoje
  { id: 29, category_id: 13, name: "Čínský zelený čaj", description: "Prémiový zelený čaj Dragon Well", price: 69, image_url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=70", spicy_level: 0, is_vegetarian: true, is_available: true, sort_order: 1, created_at: "", updated_at: "" },
  { id: 30, category_id: 13, name: "Tsingtao pivo (330ml)", description: "Čínské prémiové světlé pivo", price: 79, image_url: null, spicy_level: 0, is_vegetarian: false, is_available: true, sort_order: 2, created_at: "", updated_at: "" },
];

export const MOCK_GALLERY: GalleryImage[] = [
  { id: 1, url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800", caption: "Pekingská kachna — tradiční příprava", category: "food", sort_order: 1, created_at: "" },
  { id: 2, url: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800", caption: "Dim sum výběr", category: "food", sort_order: 2, created_at: "" },
  { id: 3, url: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800", caption: "Atmosféra restaurace", category: "interior", sort_order: 3, created_at: "" },
  { id: 4, url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800", caption: "Kung Pao kuře", category: "food", sort_order: 4, created_at: "" },
  { id: 5, url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800", caption: "Čínský čaj servis", category: "drinks", sort_order: 5, created_at: "" },
  { id: 6, url: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800", caption: "Privátní jídelna", category: "interior", sort_order: 6, created_at: "" },
  { id: 7, url: "https://images.unsplash.com/photo-1578020190125-f4f7c18bc9cb?w=800", caption: "Smažené nudle", category: "food", sort_order: 7, created_at: "" },
  { id: 8, url: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800", caption: "Dim sum košíčky", category: "food", sort_order: 8, created_at: "" },
  { id: 9, url: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800", caption: "Restaurace večer", category: "interior", sort_order: 9, created_at: "" },
  { id: 10, url: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=800", caption: "Wok příprava", category: "kitchen", sort_order: 10, created_at: "" },
  { id: 11, url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800", caption: "Sweet & Sour pork", category: "food", sort_order: 11, created_at: "" },
  { id: 12, url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", caption: "Vegetariánský výběr", category: "food", sort_order: 12, created_at: "" },
];
