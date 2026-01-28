export type CoffeeShop = {
  id: string; // Unique identifier
  date: string; // "April 30" or "May 4th"
  drink: string; // "Ice cafe mocha", "Mocha", etc.
  shopName: string; // "Starbucks", "Dark horse espresso bar"
  rating: number; // 8, 6, 9.85, etc.
  review: string; // Review text
  isChain: boolean; // true for Starbucks, false for single locations
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
};

// Helper to normalize shop names (for duplicate detection)
function normalizeShopName(name: string): string {
  const normalized = name.toLowerCase().trim();
  // Normalize Tim Hortons variations
  if (
    normalized.includes("tim") &&
    (normalized.includes("horton") ||
      normalized.includes("hortans") ||
      normalized.includes("hourntans"))
  ) {
    return "Tim Hortons";
  }
  // Normalize other chains
  if (normalized.includes("starbucks")) return "Starbucks";
  if (normalized.includes("second cup")) return "Second Cup";
  if (normalized.includes("pret")) return "Pret A Manger";
  if (normalized.includes("walmart")) return "Walmart";
  if (normalized.includes("costa coffee")) return "Costa Coffee";
  if (normalized.includes("aroma")) return "Aroma Espresso Bar";
  return name.trim();
}

// Helper to normalize dates for duplicate detection
function normalizeDate(dateStr: string): string {
  // Remove "th", "st", "nd", "rd" suffixes and normalize
  const cleaned = dateStr.replace(/(\d+)(th|st|nd|rd)/i, "$1").trim();
  return cleaned.toLowerCase();
}

// Helper to normalize drink names (for duplicate detection)
function normalizeDrink(drink: string): string {
  return drink.toLowerCase().trim();
}

// Chain shops list
const CHAIN_SHOPS = new Set([
  "Starbucks",
  "Tim Hortons",
  "Second Cup",
  "Pret A Manger",
  "Walmart",
  "Costa Coffee",
  "Aroma Espresso Bar",
]);

// Downtown Toronto center for map: 43.6532, -79.3832
// Individual shop locations can be added later
const DEFAULT_LOCATION = {
  lat: 43.6532,
  lng: -79.3832,
  address: "Downtown Toronto",
};

export const coffeeShops: CoffeeShop[] = [
  {
    id: "starbucks-march-1-2024",
    date: "March 1st, 2024",
    drink: "Blonde Vanilla Latte with 2 hazelnut shot",
    shopName: "Starbucks",
    rating: 6,
    review: "too sugary and watery",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "tim-hortons-march-10-2024",
    date: "March 10th, 2024",
    drink: "Coffee Mocha",
    shopName: "Tim Hortons",
    rating: 7,
    review: "Mid good but taste water and like bad hot chocolate",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "starbucks-march-11-2024",
    date: "March 11th, 2024",
    drink: "Café Mocha with whip cream",
    shopName: "Starbucks",
    rating: 8.5,
    review:
      "Does not need wiping cream. I had multiple times, it just tastes perfect",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "lesspresso-feb-20-2024",
    date: "Feb 20th, 2024",
    drink: "Mocha Latte",
    shopName: "L'Espresso Bar Mercurio",
    rating: 9,
    review: "Perfect",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "the-alley-feb-10-2024",
    date: "Feb 10th, 2024",
    drink: "Crunchy Cocoa Tea",
    shopName: "The Alley",
    rating: 3,
    review: "Taste like bad boba tea.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "balzacs-jan-12-2024",
    date: "Jan 12th, 2024",
    drink: "Peanut Mocha Coffee",
    shopName: "Balzac's",
    rating: 2,
    review:
      "The pentuc crunch. Much rather have orange juice. TASTES like I wanna throw up. SHOULD have NEVER added peanut butter. AT the bottom you can taste all the unblended peanut butter",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "tim-hortons-march-12-2024",
    date: "March 12th, 2024",
    drink: "London Fog",
    shopName: "Tim Hortons",
    rating: 2.5,
    review: "Awful, tastes like mint. More edible than peanut butter tho",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "tim-hortons-march-13-2024",
    date: "March 13th, 2024",
    drink: "Mocha Latte",
    shopName: "Tim Hortons",
    rating: 4,
    review: "Idk weird",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "starbucks-march-21-2024",
    date: "March 21st, 2024",
    drink: "Caramel Macchiato Hot",
    shopName: "Starbucks",
    rating: 8,
    review: "Good but very sugary",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "starbucks-march-22-2024",
    date: "March 22nd, 2024",
    drink: "Hot Chocolate Hot",
    shopName: "Starbucks",
    rating: 6,
    review: "Good but very chocolatey",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "starbucks-march-20-2024",
    date: "March 20th, 2024",
    drink: "Café Mocha",
    shopName: "Starbucks",
    rating: 9.5,
    review:
      "One of fav. I have it pretty regularly. I think It should be bit more good chocolate",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "little-pebbles-april-5-2024",
    date: "April 5th, 2024",
    drink: "Café Mocha",
    shopName: "Little Pebbles Café",
    rating: 9.7,
    review:
      "Very close to perfect. Tastes. The right amount of coffee and chocate. Ideally I want more hot coffee. The bliss is crazy.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "jimmys-april-9-2024",
    date: "April 9th, 2024",
    drink: "Mocha",
    shopName: "Jimmy's Coffee",
    rating: 9,
    review: "Somithin weird but really good. Very hot as well",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "coco-april-13-2024",
    date: "April 13th, 2024",
    drink: "Mocha",
    shopName: "Coco Espresso Bar",
    rating: 9.5,
    review: "Sweetly nice, I like it",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "tim-hortons-april-15-2024",
    date: "April 15th, 2024",
    drink: "Vanilla Latte",
    shopName: "Tim Hortons",
    rating: 4.4,
    review:
      "Either this isn't vanilla latte; I got a large cup so can't taste the vanilla. Or it taste pretty bad.",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "tim-hortons-april-16-2024",
    date: "April 16th, 2024",
    drink: "Mocha Latte",
    shopName: "Tim Hortons",
    rating: 6,
    review: "Very watery, too much viscoscity",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "black-bean-april-18-2024",
    date: "April 18th, 2024",
    drink: "Mocha",
    shopName: "Black Bean",
    rating: 7,
    review: "Very strong in my opinion",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "second-cup-april-22-2024",
    date: "April 22nd, 2024",
    drink: "Macchiato",
    shopName: "Second Cup",
    rating: 9.2,
    review: "Very good, smooth, creamy, choaclate",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "neo-april-25-2024",
    date: "April 25th, 2024",
    drink: "Mocha",
    shopName: "Neo Coffee Bar",
    rating: 9.6,
    review:
      "Idk if it's the fame of this place or I actually think this is really good but. The is pretty good but bit bitter at the end. I want more sugar but this could be how a real one supposed to be. I feel like Starbucks is better tho",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "aroma-april-30-2024",
    date: "April 30th, 2024",
    drink: "Aroma/Mocha+",
    shopName: "Aroma Espresso Bar",
    rating: 8,
    review:
      "The presentation was 9.6/10 like none other. Very good with wipp cream and everything. But after that all went away it tastes like the watery coffee Amma always used to drink",
    isChain: false,
    location: {
      lat: 43.64095,
      lng: -79.37817,
      address: "88 Queens Quay W, Toronto",
    },
  },
  {
    id: "starbucks-may-4-2024",
    date: "May 4th, 2024",
    drink: "Iced Café Mocha",
    shopName: "Starbucks",
    rating: 6,
    review: "Not very good. State like bitter milk water.",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "dark-horse-may-6-2024",
    date: "May 6th, 2024",
    drink: "Mocha",
    shopName: "Dark Horse Espresso Bar",
    rating: 9.85,
    review: "Jeez this is good. Sugar perfect. But I'd like it to hotter tho.",
    isChain: false,
    location: {
      lat: 43.6481609,
      lng: -79.3939648,
      address: "401 Richmond St W, Toronto",
    },
  },
  {
    id: "monopol-may-8-2024",
    date: "May 8th, 2024",
    drink: "Mocha",
    shopName: "Monopol Café",
    rating: 8,
    review: "If sugar had a name this would be it",
    isChain: false,
    location: {
      lat: 43.679467,
      lng: -79.345316,
      address: "706 Pape Ave, Toronto",
    },
  },
  {
    id: "rooster-may-15-2024",
    date: "May 15th, 2024",
    drink: "Mocha",
    shopName: "Rooster Coffee",
    rating: 9.75,
    review:
      "Really good but somthin is missing. It not full flavour. The beginning is nice. Great place to work.",
    isChain: false,
    location: {
      lat: 43.6691754,
      lng: -79.3527406,
      address: "479 Broadview Ave, Toronto",
    },
  },
  {
    id: "tim-hortons-may-30-2024",
    date: "May 30th, 2024",
    drink: "Mocha Iced Cap",
    shopName: "Tim Hortons",
    rating: 9,
    review:
      "If sugar had a dad it would be this. Initially It was a sugar overload. Then it became the new nornmal",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "dinners-june-10-2024",
    date: "June 10th, 2024",
    drink: "Mocha",
    shopName: "Dinner's Coffee",
    rating: 6,
    review:
      "Pretty standard. Had to put sugar and honey to make it statement better. Also the wifi and me had fight. I lost. Nothing special.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "page-one-june-11-2024",
    date: "June 11th, 2024",
    drink: "Nutella Latte",
    shopName: "Page One",
    rating: 9.8,
    review:
      "Superb. Idk if it's the Nutella or the ppl making it. The coffee is fire. plenty of aesthetic place to work but the window looks out the ugly tmu buildings. A hint of less sugar would be nice, for when it gets cold.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "tim-hortons-june-17-2024",
    date: "June 17th, 2024",
    drink: "Caramel Latte",
    shopName: "Tim Hortons",
    rating: 8,
    review: "Only a hint of caramel. Maybe it's cuz they only have a little",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "tim-hortons-june-30-2024",
    date: "June 30th, 2024",
    drink: "French Vanilla",
    shopName: "Tim Hortons",
    rating: 8,
    review: "Good drink but very watery, + sugar.",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "cafe-cofe-israel-july-4-2024",
    date: "July 4th, 2024",
    drink: "Mekupelet",
    shopName: "Café Coffee (Israel)",
    rating: 9.3,
    review: "Great. Sorta tastes like hot chocolate . Great place to work.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "kioscafe-july-18-2024",
    date: "July 18th, 2024",
    drink: "Chocolate Cappuccino",
    shopName: "kioscafe קיוסקפה חיפה",
    rating: 9,
    review:
      "Great coffee, but after it got cold. The cholcate becomes swirly. . great place to work.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "pauls-coffee-oct-9-2024",
    date: "Oct 9th, 2024",
    drink: "Mocha Latte",
    shopName: "Paul's Coffee UofT",
    rating: 6,
    review: "Dog water. Not smooth. Watery as hell too expensive",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "mos-moss-oct-15-2024",
    date: "Oct 15th, 2024",
    drink: "Mocha Latte",
    shopName: "Mos Moss",
    rating: 9.4,
    review:
      "Awesome at least it seems like it. I don't have my 9th sense today cuz of how nervous I am for a cal mid term. Good place to work. But not many chairs",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "quantum-oct-19-2024",
    date: "Oct 19th, 2024",
    drink: "Mocha Latte",
    shopName: "Quantum Coffee",
    rating: 9.82,
    review:
      "Almost perfect. Not too sugary. Perfection, foam everything. Not hot enough though. Good place to work in the summer. I went to the one at the well",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "versus-oct-21-2024",
    date: "Oct 21st, 2024",
    drink: "Mocha Latte",
    shopName: "Versus Coffee",
    rating: 8.5,
    review:
      "So much space and stuff to work on laptop. But the coffee is too cold. I sipped it in a few minutes. Way to watery.plain, I want rich Tates. Non of the. It takes old.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "tim-hortons-oct-29-2024",
    date: "Oct 29th, 2024",
    drink: "Hazelnut",
    shopName: "Tim Hortons",
    rating: 6,
    review:
      "It's good in the beginning but then it tastes like nut. Very bad after taste.",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "tim-hortons-oct-31-2024",
    date: "Oct 31st, 2024",
    drink: "Caramel Latte",
    shopName: "Tim Hortons",
    rating: 8,
    review: "fine.fine.fine. not great but good. Not special but something",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "tim-hortons-nov-1-2024",
    date: "Nov 1st, 2024",
    drink: "Vanilla Latte",
    shopName: "Tim Hortons",
    rating: 9.4,
    review:
      "Int;s not insane. No Love in the coffee. Lol. But it's good. Tate nice.",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "walmart-nov-15-2024",
    date: "Nov 15th, 2024",
    drink: "Van Houtte Belgian Chocolate Light Roast Coffee",
    shopName: "Walmart",
    rating: 6.5,
    review:
      "Since it's light roast the chocate taste isn't there but it's better than having normal coffee with milk.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "second-cup-nov-19-2024",
    date: "Nov 19th, 2024",
    drink: "Dark Chocolate Hazelnut Latte",
    shopName: "Second Cup",
    rating: 7,
    review:
      "I thought this would be significantly better than than the hazelnut thing from timz. It is but nothing significant. The chocolate does have an effect but nothiing massive. Good place to work. It went to one on college street near Uoft.",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "found-coffee-nov-25-2024",
    date: "Nov 25th, 2024",
    drink: "Mocha",
    shopName: "Found Coffee",
    rating: 3,
    review:
      "It's calm and good but no sasss. It's simple. Thinker than normal stuff which I like. The milk on top I nice as well.8/10 - although it started as a 8/10 it's actually 3/10. Awful. After 30 mins. Without microwaving it. The syrups and oils started floating at the top and presented some weird flaours. Very bad. Have to throw it out.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "tim-hortons-nov-26-2024",
    date: "Nov 26th, 2024",
    drink: "Latte",
    shopName: "Tim Hortons",
    rating: 8.5,
    review:
      "In its own way it's perfect. I would love a bit of of chelate or sugar but it's good. It's sold and also comparing the price to yesterday's thing which was 8 dollars. I can get 3 of these for the same price. Insane. This is perfect if it wasn't for the the homeless ppl smell.",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "pret-dec-6-2024",
    date: "Dec 6th, 2024",
    drink: "Mocha",
    shopName: "Pret A Manger",
    rating: 7,
    review:
      "Bad coffee but space is nice. I LOVE THE SPACE. Good place to work",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "tim-hortons-dec-11-2024",
    date: "Dec 11th, 2024",
    drink: "Bailey's Cream Coffee",
    shopName: "Tim Hortons",
    rating: 5,
    review: "Weird. Watery. Does not taste good. But better than normal coffee",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "le-gourmand-jan-16-2025",
    date: "Jan 16th, 2025",
    drink: "Hot Chocolate",
    shopName: "Le Gourmand",
    rating: 9,
    review:
      "Ngl. At best this host colcolate could be one of the best hot Cocolates. But at worst. It can be the normal powder hot chocolate with some fluffy milk. Ideally I want less viscus. More darker taste. But after it turns cold this is rely good and deep. Great place to work",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "lesspresso-jan-24-2025",
    date: "Jan 24th, 2025",
    drink: "Mocha Latte",
    shopName: "L'Espresso Bar Mercurio",
    rating: 9.9,
    review:
      "Litterly perfect. Idk what to say. + the view is awesome. Coming to school in the early morning, buy-in a cup of Joe and sitting down and guiding. That's what life is all about . Great place to work.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "le-gourmand-jan-31-2025",
    date: "Jan 31st, 2025",
    drink: "Mocha Latte",
    shopName: "Le Gourmand",
    rating: 9.4,
    review:
      "Very good. Nothing bad. But doesn't floor me. Cambery chressoint is really good. But cold sooo. I can at 9 30. Plenty of space to sit. I like that",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "la-gloria-feb-8-2025",
    date: "Feb 8th, 2025",
    drink: "Mexican Mocha",
    shopName: "La Gloria Mexican Coffee",
    rating: 9.4,
    review:
      "Really good. The space is awesome. Ideally I'd like most space to work. So much care went into each aspect of this place. I think it would be too busy on a normal weekday for me to able to do work. The coffee it self is really good. But hint of a new taste, presentation is really good. I like it.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "creeds-feb-14-2025",
    date: "Feb 14th, 2025",
    drink: "Mocha",
    shopName: "Creed's Coffee",
    rating: 9.7,
    review:
      "This is awesome. Although it was expensive. The amount of space and the lack of judgment for sitting here and working is what makes it 10/10. Along with a whole Bunch of other people who are also working. The coffee is great. Simple. Foamy, not too much coffee taste, nor chocolate. Perfect surgar. Plenty of space to sit. But the are around the place is 3/5 getto.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "carbonic-march-3-2025",
    date: "March 3rd, 2025",
    drink: "Dates Latte",
    shopName: "Carbonic Café",
    rating: 4,
    review:
      "One I don't \"LOVE \" the taste of dates. This taste like something else not dates. It's not worth the 6 dollars idk. But that's subjective. The make is really good. There is literally benches to work. Ideally I'd ilike more actual space. Idk what it is. Not dates. I got it. It smells and somewhat tastes like paysesum without the sugar. Actually literally. Fr. when I was there wifi was broken as well.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "maman-march-4-2025",
    date: "March 4th, 2025",
    drink: "Mocha",
    shopName: "Maman",
    rating: 1,
    review:
      "Dog water. Awful coffee. It taste like water. Powder mix. Not real coffee. Idk how it can be this bad. Tim Hortons does it better for sure. Really bad. No sugar. At all.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "le-beau-march-13-2025",
    date: "March 13th, 2025",
    drink: "Dark Mocha",
    shopName: "Le Beau Croissantière",
    rating: 9.5,
    review:
      "Really good coffee. Modern sorting nice outside neighbourhood vibes. But but. Do not work here. Not many chairs. Ppl just come here for convos. you're sitting in front of the recenption and the people ordering. No wifi either. So good spot for networking and coffee chats. Prizes are expensive but understnadable corssontnsta are really good. It's flakey Ngl.. it's insane how many rich new parents come here. Very budgey",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "soma-march-28-2025",
    date: "March 28th, 2025",
    drink: "Hot Chocolate",
    shopName: "Soma Chocolatemaker",
    rating: 9.7,
    review:
      "Probably the best hot chocolate I've ever had. I could really taste the chlorate /coco. But in the relativity of things it doesn't taste exponentially better than any other hot chocolate you could buy. Very good density but still feels like something I'm looking for Is missing from this. It's pretty perfectly sweet. But I'm talking something else.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "hazukido-april-1-2025",
    date: "April 1st, 2025",
    drink: "Latte",
    shopName: "Hazukido",
    rating: 7,
    review:
      "Space is REALLY NICE. But coffee is mid. Unfortunate. I love the have all tjhse windows. And space to sit. Idk if they specialize in cold stuff. Location is also really good",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "fusettes-april-15-2025",
    date: "April 15th, 2025",
    drink: "Mocha",
    shopName: "Fusettes",
    rating: 9.5,
    review:
      "Really good coffee. Plenty of space. Which is school and many students a swell. But the wifi is awful. It might be just day or cuz they started only 3 months ago. I had to use hotspot. Everything else is awesome. The coffee is really good. But a hint of bit two sweet but when it's hot it's perfect. I think they added a coco syrup instead of something else but maybe that made it better. I liked it Avery much.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "cafe23-may-9-2025",
    date: "May 9th, 2025",
    drink: "Mocha",
    shopName: "Café23",
    rating: 9.99,
    review:
      "Probably the or top 3 of the best cafe's I've ever been to. Has literal birds in it. Awesome place. It's probably only good I the summer. Great. Patio. You get to sit there and drink coffee. Doesn't feel like you're taking up everyone's space. Design is awesome. And coffee is pretty perfect. meaning nothing bad. Everything is was. I can't describe it any other way. Idk if it's better than top 5 coffee but perfect because of the environment. It really does play a role. I had a huge problem with wifi. If I persists the second time I go there. Never again, cuz I need wifi. Maybe it was the place I was sitting.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "ritual-june-19-2025",
    date: "June 19th, 2025",
    drink: "Mocha",
    shopName: "Ritual Coffee (San Francisco)",
    rating: 8,
    review:
      "The coffee is fine. It's not special. The viscosity of the drink is really nice. The space outside is really nice but it's not provided by the coffee people to the very small space but it's not anything special. The mocha really needs more sugar in my liking, but I guess people don't like that much sugar in their coffee even after adding a ton of sugar it still doesn't taste very nice.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "story-coffee-june-15-2025",
    date: "June 15th, 2025",
    drink: "Iced Latte",
    shopName: "Story Coffee (Livermore, CA)",
    rating: 6,
    review:
      "very nice coffee, but not enough sugar viscosity for an ice latte is very nice. Vibe is very nice, but I wish they had more tears outside. Not my cup of tea",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "tatte-june-29-2025",
    date: "June 29th, 2025",
    drink: "Iced Mocha",
    shopName: "Tatte Bakery & Café (Washington, DC)",
    rating: 9.5,
    review:
      "Best iced mocha I've had. Much more viscous than other ones. Rich in Taste sweet and everything. The best part is there is too much space to sit in and outside. And in the nearby plaza. The almond croissant was awesome but I do wish they take the incicitive to warm it it up. Since it's my first time buying an almond croissant I didn't know you should warm it up so didn't the taste of that is 8/10 becuz of that. I don't know the customs and I could've asked later but I was waiting for my lyft",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "coffee-fellows-july-4-2025",
    date: "July 4th, 2025",
    drink: "Cappuccino",
    shopName: "Coffee Fellows (Frankfurt, Germany)",
    rating: 9,
    review:
      "Great coffee. Right viscosity maybe it's just the way I like my coffee but I need more sugar.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "costa-july-6-2025",
    date: "July 6th, 2025",
    drink: "Chocolate Frappe Cold",
    shopName: "Costa Coffee",
    rating: 9.2,
    review:
      "Probably the best cold drink I've had. There is coffee in it but chocolate is the think",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "tim-hortons-nov-6-2025",
    date: "Nov 6th, 2025",
    drink: "Double Double",
    shopName: "Tim Hortons",
    rating: 9,
    review:
      "Smooth Drink, taste good, but a bit too sugary. but I feel like it is more water than milk.",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "tim-hortons-oct-30-2025",
    date: "Oct 30th, 2025",
    drink: "Iced Cap with Protein",
    shopName: "Tim Hortons",
    rating: 9.2,
    review:
      "Reply good. Simple. The protein milk I think it makes it thinker and bit better than the normal thing.",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
  {
    id: "moonbean-nov-18-2025",
    date: "Nov 18th, 2025",
    drink: "Mocha",
    shopName: "Moonbean Coffee Company",
    rating: 8.7,
    review:
      "Coffee. It is true my pallet more diabitites than off other people but the coffee is good. The bean is good. But nothgins tanks out. But I'm a simple man. The people are awesome so it boosts it a lot. A lot of cool oeioke, and regular customers. So you can tell. Cheaper than the other places. The food looks good.",
    isChain: false,
    location: DEFAULT_LOCATION,
  },
  {
    id: "tim-hortons-dec-22-2025",
    date: "Dec 22nd, 2025",
    drink: "Tim Double Double Dark Roast",
    shopName: "Tim Hortons",
    rating: 9,
    review:
      "prime coffee. great coffee. bit milkey tho but def worth the money.",
    isChain: true,
    location: DEFAULT_LOCATION,
  },
];
