export interface DiningRule {
  id: string;
  title: string;
  japanese: string;
  category: 'ramen_machine' | 'ichiran_booth' | 'standing_sushi' | 'counter_etiquette';
  badge: string;
  steps: { stepNumber: number; title: string; instruction: string }[];
  warningTip?: string;
  kanjiKeys?: { kanji: string; romaji: string; meaning: string }[];
}

export interface KonbiniItem {
  id: string;
  store: '7-Eleven' | 'Lawson' | 'FamilyMart';
  name: string;
  nameJa: string;
  priceYen: number;
  calories: number;
  tag: string;
  image: string;
  description: string;
  hackTip: string;
}

export const DINING_RULES: DiningRule[] = [
  {
    id: "ramen-ticket-machine",
    title: "How to Master the Ramen Ticket Machine (Shokkenki)",
    japanese: "食券機の使い方 (Shokkenki no Tsukaikata)",
    category: "ramen_machine",
    badge: "100% Cash / Suica Friendly",
    steps: [
      {
        stepNumber: 1,
        title: "Insert Money FIRST",
        instruction: "Unlike Western vending machines, you MUST insert cash (¥1,000 note or coins) or tap your digital Suica/Pasmo card BEFORE buttons light up!"
      },
      {
        stepNumber: 2,
        title: "Locate the Top-Left Button (O Susume)",
        instruction: "Standard Japanese layout rule: The top-left button is ALWAYS the shop's signature house specialty with all toppings (Char siu, seasoned egg, nori)."
      },
      {
        stepNumber: 3,
        title: "Select Noodle Size / Kaedama",
        instruction: "Ordinary size is 'Nami' (並). Large size is 'O-mori' (大盛). For Hakata tonkotsu ramen, choose 'Kaedama' (替玉) for an extra noodle refill."
      },
      {
        stepNumber: 4,
        title: "Collect Ticket & Change",
        instruction: "Pull the lever for change (おつり / Otsuri), grab the printed paper ticket, and place it on the counter in front of the chef."
      }
    ],
    warningTip: "Most vintage ramen ticket machines do NOT accept ¥5,000 or ¥10,000 bills. Ask the chef: 'Ryogae onegaishimasu' (Change please).",
    kanjiKeys: [
      { kanji: "ラーメン", romaji: "Ramen", meaning: "Standard Ramen" },
      { kanji: "味玉 / 煮玉子", romaji: "Ajitama / Nitamago", meaning: "Soft-Boiled Seasoned Egg" },
      { kanji: "チャーシュー", romaji: "Chashu", meaning: "Extra Pork Belly Slices" },
      { kanji: "替玉", romaji: "Kaedama", meaning: "Extra Noodle Refill" },
      { kanji: "大盛", romaji: "O-mori", meaning: "Large Portion" },
      { kanji: "おつり", romaji: "Otsuri", meaning: "Change Return Lever" }
    ]
  },
  {
    id: "ichiran-solo-booth",
    title: "Ichiran Ramen Solo Booth 'Aji Shuuchuu' Protocol",
    japanese: "一蘭 味集中カウンター (Flavor Concentration Booth)",
    category: "ichiran_booth",
    badge: "Zero Human Speech Required",
    steps: [
      {
        stepNumber: 1,
        title: "Check Seat Vacancy Light Board",
        instruction: "At entrance, inspect the electronic matrix 'Kuseki Annai-ban'. Green lit numbers indicate empty private booths. Walk straight in."
      },
      {
        stepNumber: 2,
        title: "Fill Out the Customization Sheet",
        instruction: "Grab the bilingual paper sheet. Customize: Dashi Richness (Rich), Garlic (1/2 clove), Green Onion (White or Green), Chashu (With), Secret Red Pepper Sauce (1/2 or Regular), Noodle Firmness (Firm / Katame)."
      },
      {
        stepNumber: 3,
        title: "Press the Call Button",
        instruction: "Press the small square button on your counter. A pair of hands will appear under the bamboo curtain, take your ticket and paper, and bow."
      },
      {
        stepNumber: 4,
        title: "Bamboo Curtain Closes — Solo Nirvana",
        instruction: "Your bowl arrives in 3 minutes. The bamboo curtain drops completely shut, leaving you in uninterrupted culinary solitude."
      }
    ],
    warningTip: "Want extra noodles? Place the small metal Kaedama tray onto the sensor plate on your counter; a chime will play automatically without speaking!"
  },
  {
    id: "standing-sushi-protocol",
    title: "Standing Sushi Bar Rules (Tachigui Sushi)",
    japanese: "立ち喰い寿司のマナー (Tachigui Sushi Etiquette)",
    category: "standing_sushi",
    badge: "Speedy & Budget High-Grade",
    steps: [
      {
        stepNumber: 1,
        title: "Take a Clean Counter Spot",
        instruction: "Stand at any unoccupied space. The chef will lay down a fresh bamboo leaf (sasa) or wooden slab in front of you."
      },
      {
        stepNumber: 2,
        title: "Order 2 Pieces at a Time",
        instruction: "Sushi is traditionally made and priced per pair (2 kan). Order by pointing or saying: 'Maguro to Sake o-negai-shimasu' (Tuna and salmon please)."
      },
      {
        stepNumber: 3,
        title: "Dip Fish Side Down",
        instruction: "Flip the sushi sideways and lightly touch the fish topping (neta) into soy sauce. Never dip the rice (shari) directly—it will crumble and absorb too much salt!"
      },
      {
        stepNumber: 4,
        title: "Self-Serve Free Green Tea (Agari)",
        instruction: "Put 2 spoonfuls of green matcha powder into your ceramic cup, push against the hot water spigot on the counter to brew, and enjoy."
      }
    ],
    warningTip: "Eat with your clean fingers or chopsticks—both are completely acceptable and traditional in Japanese sushi bars."
  }
];

export const KONBINI_ITEMS: KonbiniItem[] = [
  {
    id: "711-egg-sando",
    store: "7-Eleven",
    name: "Golden Egg Salad Sandwich (Tamago Sando)",
    nameJa: "たまごサンド",
    priceYen: 248,
    calories: 334,
    tag: "Anthony Bourdain Holy Grail",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    description: "Fluffy Japanese shokupan crustless white milk bread generously stuffed with luscious, rich Kewpie mayo egg salad.",
    hackTip: "Pair with 7-Eleven's cold brew iced coffee. The umami fat pairs impeccably with bright roasted coffee acidity."
  },
  {
    id: "familymart-famichiki",
    store: "FamilyMart",
    name: "Famichiki Boneless Fried Chicken",
    nameJa: "ファミチキ",
    priceYen: 230,
    calories: 252,
    tag: "Hot Snack Warm-Case King",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80",
    description: "Crispy, crackling seasoned batter casing an impossibly juicy thigh meat fillet. Wrapped in an easy-tear perforated cardboard pocket.",
    hackTip: "⚡ THE LEGENDARY VIRAL HACK: Buy the FamilyMart fluffy maple butter pancake (¥138), slide the piping hot Famichiki inside = instant Japanese hot honey fried chicken slider!"
  },
  {
    id: "lawson-karaage-kun",
    store: "Lawson",
    name: "Karaage-kun Red (Spicy Fried Chicken Nuggets)",
    nameJa: "からあげクン レッド",
    priceYen: 248,
    calories: 230,
    tag: "Spicy Midnight Fuel",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
    description: "Bite-sized tender Japanese fried chicken nuggets with mild togarashi chili kick, packed in the iconic rooster carton with toothpick.",
    hackTip: "Ask the clerk at counter: 'Kore o-negai-shimasu' and point to the glass warmer case beside the cash register."
  },
  {
    id: "711-salmon-onigiri",
    store: "7-Eleven",
    name: "Grilled Salmon Rice Ball (Sake Onigiri)",
    nameJa: "手巻おにぎり 炭火焼熟成紅鮭",
    priceYen: 172,
    calories: 178,
    tag: "Ultra Budget Breakfast (¥170)",
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80",
    description: "Crisp nori seaweed separated by an ingenious plastic film pulled via tabs 1-2-3 so seaweed stays shattering crisp until bite.",
    hackTip: "Follow pull tabs marked ① (pull down center), ② (pull right corner), ③ (pull left corner) to keep nori intact."
  },
  {
    id: "lawson-roll-cake",
    store: "Lawson",
    name: "Uchi Café Premium Roll Cake",
    nameJa: "プレミアムロールケーキ",
    priceYen: 194,
    calories: 227,
    tag: "Award-Winning Dessert",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80",
    description: "Cloud-like sponge ring filled with 100% Hokkaido pure fresh cream. Eaten with a spoon directly from the plastic cup.",
    hackTip: "On the 22nd of every month, Lawson places a free strawberry half on top of the roll cake for no extra charge!"
  },
  {
    id: "familymart-frappe",
    store: "FamilyMart",
    name: "Afternoon Tea Darjeeling Frappe",
    nameJa: "アフタヌーンティー ロイヤルミルクティーフラッペ",
    priceYen: 350,
    calories: 290,
    tag: "DIY Ice Machine Sensation",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
    description: "Frozen shaved ice cylinder taken from the ice cream freezer, massaged by hand, and brewed with hot milk at the coffee terminal.",
    hackTip: "Steps: 1. Take cup from freezer. 2. Pay at counter. 3. Squeeze cup thoroughly. 4. Place under machine and press 'Frappe' button."
  }
];

export const JAPANESE_DINING_PHRASES = [
  { phrase: "すみません！", romaji: "Sumimasen!", meaning: "Excuse me! (To call staff/chef)" },
  { phrase: "これをお願いします", romaji: "Kore o onegaishimasu", meaning: "This one please (Point at menu item)" },
  { phrase: "お会計をお願いします", romaji: "O-kaikei o onegaishimasu", meaning: "Bill / Check please" },
  { phrase: "お水をお願いします", romaji: "O-mizu o onegaishimasu", meaning: "Water please (Always free in Japan)" },
  { phrase: "ごちそうさまでした！", romaji: "Gochisousama deshita!", meaning: "Thank you for the meal! (Said upon leaving)" },
  { phrase: "Suicaで払えますか？", romaji: "Suika de haraemasu ka?", meaning: "Can I pay with Suica/Apple Wallet?" }
];
