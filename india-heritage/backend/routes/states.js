const express = require('express');
const router = express.Router();

const statesData = {
  "andhra-pradesh": {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    capital: "Amaravati",
    language: "Telugu",
    region: "South India",
    population: "49.5 million",
    area: "162,975 km²",
    established: "November 1, 1956",
    emoji: "🏛️",
    color: "#FF6B35",
    tagline: "Land of the Koh-i-Noor Diamond",
    description: "Andhra Pradesh, situated on the southeastern coast of India, is a land of rich history, vibrant culture, and stunning natural beauty. From the ancient Buddhist stupas of Amaravati to the spicy cuisine that has conquered global palates, this state offers an unparalleled cultural tapestry.",
    heritage: {
      title: "Heritage & History",
      content: "Andhra Pradesh has a history spanning over 2,000 years. The region was home to the powerful Satavahana dynasty, followed by the Eastern Chalukyas and the Vijayanagara Empire. The famous Koh-i-Noor diamond originated from the Golconda mines. The Buddhist heritage is immense — Amaravati, Nagarjunakonda, and Guntupalle are among Asia's finest Buddhist sites.",
      sites: ["Charminar (Hyderabad)", "Golconda Fort", "Amaravati Stupa", "Lepakshi Temple", "Undavalli Caves", "Nagarjunakonda Island Museum"]
    },
    culture: {
      title: "Culture & Arts",
      content: "The culture is deeply rooted in classical arts. Kuchipudi, one of India's eight classical dance forms, originated here. Kalamkari — the ancient art of hand-painted or block-printed cotton textiles — is a UNESCO-recognized craft. Kondapalli toys and Tirupati wooden crafts are internationally recognized.",
      artForms: ["Kuchipudi Dance", "Kalamkari Painting", "Etikoppaka Wooden Toys", "Kondapalli Toys", "Budithi Brass Craft", "Leather Puppetry (Tholu Bommalata)"]
    },
    festivals: [
      { name: "Ugadi", month: "March/April", description: "Telugu New Year celebrated with neem flowers and jaggery — symbolizing life's mixed flavors" },
      { name: "Sankranti", month: "January", description: "Harvest festival with kite flying, Bhogi fires, and traditional cattle worship" },
      { name: "Brahmotsavam", month: "September/October", description: "9-day grand festival at Tirupati Balaji temple — world's most visited religious site" },
      { name: "Deccan Festival", month: "February", description: "Celebrates the composite culture of the Deccan with classical music and craft exhibitions" }
    ],
    attractions: [
      { name: "Tirupati Balaji Temple", type: "Religious", description: "World's richest and most visited temple, receiving 50,000+ pilgrims daily" },
      { name: "Araku Valley", type: "Nature", description: "Stunning hill station with coffee plantations and tribal culture" },
      { name: "Borra Caves", type: "Natural Wonder", description: "Million-year-old stalactite-stalagmite cave system in the Eastern Ghats" },
      { name: "Rishikonda Beach", type: "Beach", description: "Golden sands with the Eastern Ghats as backdrop near Visakhapatnam" },
      { name: "Belum Caves", type: "Natural Wonder", description: "Second longest caves in Indian subcontinent stretching 3.5 km" }
    ],
    cuisine: ["Pesarattu", "Gongura Mutton", "Hyderabadi Biryani", "Pulihora", "Bobbatlu", "Andhra Chicken Curry"],
    gallery: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Charminar_-_Hyderabad.jpg/1200px-Charminar_-_Hyderabad.jpg", caption: "Charminar, Hyderabad" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Tirumala_Tirupati_Temple.jpg/1200px-Tirumala_Tirupati_Temple.jpg", caption: "Tirupati Balaji" }
    ]
  },
  "rajasthan": {
    id: "rajasthan",
    name: "Rajasthan",
    capital: "Jaipur",
    language: "Rajasthani, Hindi",
    region: "North West India",
    population: "68.5 million",
    area: "342,239 km²",
    established: "November 1, 1956",
    emoji: "🏰",
    color: "#E85D04",
    tagline: "Land of Kings — Rajputana Glory",
    description: "Rajasthan, the 'Land of Kings', is India's largest state and perhaps its most iconic. With magnificent forts, ornate palaces, endless sand dunes, vibrant folk music, and colorful festivals, Rajasthan is a living museum of medieval Indian glory. The desert landscape of Thar, the majestic Aravalli hills, and the serene lakes create breathtaking vistas.",
    heritage: {
      title: "Heritage & History",
      content: "Rajasthan's history is written in the stones of its forts and palaces. The Rajput kingdoms that ruled here for centuries created some of the world's most spectacular architecture. The Amber Fort, Mehrangarh Fort, Chittorgarh, and the City Palace of Udaipur are masterpieces of Indo-Persian architecture. The state has 6 UNESCO World Heritage Sites.",
      sites: ["Amber Fort (Jaipur)", "Mehrangarh Fort (Jodhpur)", "City Palace (Udaipur)", "Chittorgarh Fort", "Jaisalmer Fort", "Ranthambore Fort", "Jantar Mantar"]
    },
    culture: {
      title: "Culture & Arts",
      content: "Rajasthani culture is extraordinarily vibrant — from the Ghoomar dance performed by Rajput women to the haunting melodies of the Manganiar and Langa folk musicians. Block printing from Sanganer, blue pottery of Jaipur, miniature paintings, and tie-dye textiles (bandhani) are world-famous crafts.",
      artForms: ["Ghoomar Dance", "Kalbelia Dance (UNESCO)", "Puppet Theatre (Kathputli)", "Block Printing", "Blue Pottery", "Miniature Painting", "Meenakari Jewellery"]
    },
    festivals: [
      { name: "Pushkar Camel Fair", month: "November", description: "One of the world's largest livestock fairs — 50,000+ camels with folk music and competitions" },
      { name: "Jaipur Literature Festival", month: "January", description: "World's largest free literary festival attracting Nobel laureates and international authors" },
      { name: "Desert Festival", month: "February", description: "Jaisalmer celebrates with camel races, folk performances on golden sand dunes" },
      { name: "Teej", month: "August", description: "Women's festival celebrating the onset of monsoon with processions and traditional songs" }
    ],
    attractions: [
      { name: "Jaipur Pink City", type: "Heritage City", description: "UNESCO World Heritage City — first planned city of India with stunning pink architecture" },
      { name: "Thar Desert", type: "Nature", description: "Vast golden desert with camel safaris, star gazing, and living villages" },
      { name: "Lake Pichola, Udaipur", type: "Scenic", description: "Romantic lake with the floating Lake Palace hotel and City Palace backdrop" },
      { name: "Ranthambore National Park", type: "Wildlife", description: "Famous for Bengal tigers in medieval fort ruins — a rare wildlife experience" },
      { name: "Jaisalmer Golden Fort", type: "Heritage", description: "World's only living fort — a UNESCO site where people still live within ancient walls" }
    ],
    cuisine: ["Dal Baati Churma", "Gatte ki Sabzi", "Ker Sangri", "Ghewar", "Mawa Kachori", "Laal Maas"],
    gallery: []
  },
  "kerala": {
    id: "kerala",
    name: "Kerala",
    capital: "Thiruvananthapuram",
    language: "Malayalam",
    region: "South India",
    population: "33.4 million",
    area: "38,852 km²",
    established: "November 1, 1956",
    emoji: "🌴",
    color: "#2D6A4F",
    tagline: "God's Own Country",
    description: "Kerala, aptly called 'God's Own Country', is a narrow strip of paradise along India's southwestern coast. Flanked by the Arabian Sea to the west and the Western Ghats to the east, Kerala boasts lush backwaters, pristine beaches, mist-covered hill stations, wildlife sanctuaries, and an ancient culture that is both distinct and deeply spiritual.",
    heritage: {
      title: "Heritage & History",
      content: "Kerala has one of the oldest continuous civilizations in India. The spice trade brought Greeks, Romans, Arabs, Chinese, and later Europeans to Kerala's shores. Vasco da Gama landed in Kozhikode in 1498. The ancient Jewish settlement in Kochi dates back 2,000 years. Kerala's ancient Ayurvedic texts form the backbone of traditional Indian medicine.",
      sites: ["Padmanabhaswamy Temple", "Mattancherry Palace", "Paradesi Synagogue (oldest in Commonwealth)", "Bekal Fort", "Thrissur Pooram Ground", "St. Francis Church (oldest European church in India)"]
    },
    culture: {
      title: "Culture & Arts",
      content: "Kerala's cultural heritage is extraordinary in depth. Kathakali — the elaborate classical dance-drama — is known globally for its intricate makeup and costumes. Mohiniyattam, the dance of the enchantress, is exclusively performed by women. Kalaripayattu, the world's oldest martial art, originated in Kerala.",
      artForms: ["Kathakali Dance Drama", "Mohiniyattam", "Kalaripayattu (Martial Art)", "Theyyam Ritual Art", "Ottamthullal", "Chakiarkoothu", "Kerala Mural Paintings"]
    },
    festivals: [
      { name: "Onam", month: "August/September", description: "Harvest festival with floral carpets (Pookalam), Vallamkali snake boat races, and sadya feast on banana leaf" },
      { name: "Thrissur Pooram", month: "April/May", description: "Spectacular temple festival with caparisoned elephants, percussion ensembles, and fireworks" },
      { name: "Vishu", month: "April", description: "Malayalam New Year — first sight of Vishukkani (auspicious golden spread) brings prosperity" },
      { name: "Nehru Trophy Boat Race", month: "August", description: "Iconic snake boat race on Punnamada Lake — hundreds of rowers competing" }
    ],
    attractions: [
      { name: "Kerala Backwaters", type: "Nature", description: "900 km of tranquil waterways through paddy fields on traditional houseboats (kettuvallam)" },
      { name: "Munnar", type: "Hill Station", description: "Emerald tea estates at 1600m altitude — some of the world's highest tea gardens" },
      { name: "Periyar Wildlife Sanctuary", type: "Wildlife", description: "One of India's most scenic wildlife reserves — watch elephants from bamboo rafts" },
      { name: "Kovalam Beach", type: "Beach", description: "Crescent-shaped beaches with lighthouse — top destination for Ayurvedic treatments" },
      { name: "Wayanad", type: "Nature/Heritage", description: "Tribal heritage meets green forests with cave paintings dating to Neolithic era" }
    ],
    cuisine: ["Appam & Stew", "Kerala Fish Curry", "Malabar Biryani", "Puttu & Kadala Curry", "Payasam", "Kerala Prawn Masala"],
    gallery: []
  },
  "uttar-pradesh": {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    capital: "Lucknow",
    language: "Hindi, Urdu",
    region: "North India",
    population: "200+ million",
    area: "240,928 km²",
    established: "January 24, 1950",
    emoji: "🕌",
    color: "#9B2226",
    tagline: "The Heart of Incredible India",
    description: "Uttar Pradesh is India's most populous state and its spiritual heartland. Home to the Taj Mahal — the world's greatest monument to love — and the sacred cities of Varanasi, Mathura, and Ayodhya, UP is where Indian civilization was shaped over 5,000 years. The Gangetic plains that nurtured multiple empires continue to inspire millions.",
    heritage: {
      title: "Heritage & History",
      content: "UP's history is India's history. The Maurya Empire, the Gupta Golden Age, the Delhi Sultanate, and the Mughal Empire all had deep roots here. Varanasi is considered the world's oldest continuously inhabited city. Prayagraj (Allahabad) hosted the first Congress session. The Mughal legacy is especially visible in the architectural marvels of Agra and Lucknow.",
      sites: ["Taj Mahal (UNESCO)", "Agra Fort (UNESCO)", "Fatehpur Sikri (UNESCO)", "Varanasi Ghats", "Sarnath (Buddha's first sermon)", "Ramabhar Stupa", "Bara Imambara, Lucknow"]
    },
    culture: {
      title: "Culture & Arts",
      content: "UP's cultural landscape is both Hindu and Islamic — a unique Ganga-Jamuni tehzeeb (composite culture). Lucknow is famous for Kathak dance, Chikankari embroidery, and Awadhi cuisine. Benares (Varanasi) produces the world's finest Banarasi silk sarees. The city is also the centre of Hindustani classical music.",
      artForms: ["Kathak Dance", "Chikankari Embroidery", "Banarasi Silk Weaving", "Zardozi Work", "Brassware of Moradabad", "Firozabad Glasswork"]
    },
    festivals: [
      { name: "Kumbh Mela", month: "Every 12 Years", description: "World's largest human gathering — 120 million pilgrims in 2019 at Prayagraj" },
      { name: "Dev Deepawali", month: "November", description: "Varanasi glows with 1 million earthen lamps on Ganga ghats — the festival of gods" },
      { name: "Taj Mahotsav", month: "February", description: "10-day craft and culture festival at the shadow of the Taj Mahal" },
      { name: "Lucknow Mahotsav", month: "November", description: "Classical music, Kathak performances, and Awadhi cuisine showcase Nawabi heritage" }
    ],
    attractions: [
      { name: "Taj Mahal, Agra", type: "Heritage", description: "UNESCO Wonder of the World — built by Shah Jahan in memory of Mumtaz Mahal (1632-1653)" },
      { name: "Varanasi Ghats", type: "Spiritual", description: "84 ghats along the Ganges — witness the eternal Ganga Aarti ceremony at Dashashwamedh Ghat" },
      { name: "Mathura-Vrindavan", type: "Spiritual", description: "Birthplace of Lord Krishna — especially magical during Holi and Janmashtami celebrations" },
      { name: "Ayodhya", type: "Spiritual", description: "Birthplace of Lord Ram — ancient holy city now home to the grand Ram Mandir" },
      { name: "Sarnath", type: "Buddhist Heritage", description: "Where Buddha gave his first sermon — beautiful Dhamek Stupa and archaeological museum" }
    ],
    cuisine: ["Awadhi Biryani", "Galouti Kebab", "Dum Pukht", "Baati Chokha", "Petha (Agra)", "Thandai"],
    gallery: []
  },
  "west-bengal": {
    id: "west-bengal",
    name: "West Bengal",
    capital: "Kolkata",
    language: "Bengali",
    region: "East India",
    population: "91.2 million",
    area: "88,752 km²",
    established: "January 26, 1950",
    emoji: "🐯",
    color: "#F4A261",
    tagline: "The Cultural Capital of India",
    description: "West Bengal is India's intellectual and cultural powerhouse. Home to Rabindranath Tagore, Satyajit Ray, Swami Vivekananda, and Mother Teresa, Bengal has produced an extraordinary number of Nobel laureates, poets, scientists, and revolutionaries. From the Sundarbans delta to the Darjeeling hills, its landscape is as diverse as its contributions to human civilization.",
    heritage: {
      title: "Heritage & History",
      content: "Bengal's history stretches from the Paharpur Buddhist Monastery (8th century) through the Bengal Sultanate, the Nawabs of Murshidabad, and the colonial era when Kolkata was the capital of British India. The Bengal Renaissance of the 19th century transformed Indian thought and gave birth to modern Indian literature, science, and social reform.",
      sites: ["Victoria Memorial, Kolkata", "Howrah Bridge", "Marble Palace", "Bishnupur Terracotta Temples", "Murshidabad Hazarduari", "Sundarbans Mangroves (UNESCO Biosphere)"]
    },
    culture: {
      title: "Culture & Arts",
      content: "Bengali culture is synonymous with literature, music, and film. Tagore's compositions (Rabindra Sangeet) are the national anthems of both India and Bangladesh. The Durga Puja festival is Bengal's greatest cultural event — a UNESCO-recognized cultural heritage. Bengali cinema, founded by Satyajit Ray, is internationally acclaimed.",
      artForms: ["Baul Music (UNESCO)", "Rabindra Sangeet", "Kantha Embroidery", "Terracotta Craft of Bishnupur", "Pattachitra Scroll Painting", "Dokra Metal Craft"]
    },
    festivals: [
      { name: "Durga Puja", month: "October", description: "UNESCO-recognized festival — Kolkata transforms with 5,000+ pandals in 5 days of extraordinary artistry" },
      { name: "Poila Boishakh", month: "April 14", description: "Bengali New Year celebrated with cultural programs, traditional clothes, and sweet exchanges" },
      { name: "Eid in Kolkata", month: "Varies", description: "Kolkata's Park Circus and Nakhoda Mosque host India's most vibrant Eid celebrations" },
      { name: "Kolkata Film Festival", month: "November", description: "International festival showcasing world cinema — South Asia's most prestigious film event" }
    ],
    attractions: [
      { name: "Sundarbans", type: "Wildlife/Nature", description: "World's largest mangrove delta — UNESCO site and home to the Royal Bengal Tiger" },
      { name: "Darjeeling", type: "Hill Station", description: "Queen of Hills with Himalayan views, world-famous tea, and the toy train (UNESCO)" },
      { name: "Victoria Memorial", type: "Heritage", description: "White marble marvel blending Mughal and British architecture — finest colonial monument in India" },
      { name: "Bishnupur", type: "Heritage", description: "Ancient temples built entirely of terracotta — unique architectural legacy of the Malla kings" },
      { name: "Kalimpong", type: "Nature", description: "Himalayan town famous for orchids, Buddhist monasteries, and views of Kanchenjunga" }
    ],
    cuisine: ["Hilsa Fish Curry", "Macher Jhol", "Rosogolla", "Sandesh", "Kathi Rolls (Kolkata origin)", "Mishti Doi"],
    gallery: []
  },
  "maharashtra": {
    id: "maharashtra",
    name: "Maharashtra",
    capital: "Mumbai",
    language: "Marathi",
    region: "West India",
    population: "112.4 million",
    area: "307,713 km²",
    established: "May 1, 1960",
    emoji: "🦁",
    color: "#FF9F1C",
    tagline: "Spirit of the Maratha Empire",
    description: "Maharashtra is India's economic powerhouse and cultural melting pot. From the bustling streets of Mumbai — India's financial capital and Bollywood's home — to the ancient rock-cut caves of Ajanta and Ellora, Maharashtra presents an extraordinary contrast of the ancient and the ultramodern. The legacy of Chhatrapati Shivaji Maharaj continues to inspire the nation.",
    heritage: {
      title: "Heritage & History",
      content: "Maharashtra's history is defined by the rise of the Maratha Empire under Chhatrapati Shivaji Maharaj (1674). His guerrilla warfare tactics and naval innovations created the last great Hindu empire. The ancient cave temples of Ajanta (2nd century BCE) and Ellora (6th-10th century CE) represent humanity's greatest rock-cut architectural achievements. Pune was the Peshwa capital.",
      sites: ["Ajanta Caves (UNESCO)", "Ellora Caves (UNESCO)", "Gateway of India, Mumbai", "Raigad Fort", "Sinhagad Fort", "Elephanta Caves (UNESCO)", "Shaniwar Wada, Pune"]
    },
    culture: {
      title: "Culture & Arts",
      content: "Maharashtrian culture balances its warrior heritage with devotional traditions. Lavani is the sensuous folk dance known for its fast rhythm. Tamasha is the folk theatre form. The Warkari movement's devotional traditions involving poet-saints like Tukaram and Dnyaneshwar continue to draw millions to Pandharpur on pilgrimages.",
      artForms: ["Lavani Dance", "Warli Tribal Painting", "Paithani Silk Weaving", "Kolhapuri Chappals", "Bidriware", "Tamasha Folk Theatre"]
    },
    festivals: [
      { name: "Ganesh Chaturthi", month: "August/September", description: "Mumbai's iconic 11-day festival — 150,000+ idols immersed, originated by Lokmanya Tilak" },
      { name: "Gudi Padwa", month: "March/April", description: "Marathi New Year with gudi (flag) raised outside homes and traditional processions" },
      { name: "Nag Panchami", month: "July/August", description: "Snake worship festival especially vibrant in Battis Shirala village" },
      { name: "Wari Pilgrimage", month: "June/November", description: "Millions walk hundreds of miles to Pandharpur — one of India's greatest spiritual journeys" }
    ],
    attractions: [
      { name: "Mumbai City", type: "Metropolitan", description: "India's financial capital with iconic Marine Drive, Bollywood studios, and street food" },
      { name: "Lonavala & Khandala", type: "Nature", description: "Scenic Western Ghats hill stations with waterfalls and monsoon magic" },
      { name: "Aurangabad", type: "Heritage", description: "Gateway city to Ajanta and Ellora — also home to Bibi Ka Maqbara (mini Taj)" },
      { name: "Nashik", type: "Spiritual/Wine", description: "Kumbh Mela site and emerging wine capital of India — unique spiritual-gastronomy combo" },
      { name: "Kolhapur", type: "Cultural", description: "Famous for Mahalakshmi temple, Kolhapuri cuisine, and traditional wrestling" }
    ],
    cuisine: ["Vada Pav", "Misal Pav", "Puran Poli", "Modak", "Kolhapuri Chicken", "Solkadhi"],
    gallery: []
  },
  "tamil-nadu": {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    capital: "Chennai",
    language: "Tamil",
    region: "South India",
    population: "72.1 million",
    area: "130,058 km²",
    established: "January 26, 1950",
    emoji: "🏟️",
    color: "#C1121F",
    tagline: "Classical Civilization at Its Finest",
    description: "Tamil Nadu is the cradle of one of the world's oldest living civilizations. Tamil language, literature, and culture have continued unbroken for over 2,000 years. The towering gopurams (temple towers) that define the skyline reflect an architectural tradition that produced the Brihadeeswarar Temple — a UNESCO marvel built over 1,000 years ago. The land of Dravidian excellence.",
    heritage: {
      title: "Heritage & History",
      content: "Tamil Nadu was home to the ancient Sangam civilization (300 BCE - 300 CE), producing some of world's oldest classical literature. The Chola Empire (9th-13th century) built awe-inspiring temples and extended their maritime power to Southeast Asia. The Pallava dynasty invented the Grantha script, which influenced Thai and Khmer scripts. Tamil is one of the world's oldest living languages.",
      sites: ["Brihadeeswarar Temple, Thanjavur (UNESCO)", "Airavatesvara Temple (UNESCO)", "Shore Temple, Mahabalipuram (UNESCO)", "Meenakshi Amman Temple, Madurai", "Chidambaram Nataraja Temple", "Rock Fort Temple, Trichy"]
    },
    culture: {
      title: "Culture & Arts",
      content: "Bharatanatyam — India's most ancient classical dance — was born in Tamil Nadu's temples, performed by devadasis for millennia. Carnatic music, one of India's two major classical music traditions, has its greatest centres in Tamil Nadu. Tanjore painting, a luminous art form using gold foil and precious stones, is unique to this region.",
      artForms: ["Bharatanatyam Dance", "Carnatic Music", "Tanjore Painting", "Bronze Casting (Chola style)", "Kolam (Floor Art)", "Silambam (Martial Art)"]
    },
    festivals: [
      { name: "Pongal", month: "January", description: "Tamil harvest festival — 4-day celebration of gratitude to sun, cattle, and nature" },
      { name: "Chithirai Festival", month: "April", description: "Madurai's celestial wedding of Meenakshi and Sundareshwar — one of South India's grandest" },
      { name: "Natyanjali Festival", month: "February", description: "Bharatanatyam dancers perform at Chidambaram temple during Maha Shivaratri" },
      { name: "Mahamaham", month: "Every 12 years", description: "Sacred bath festival at Kumbakonam's tank — as holy as Kumbh Mela" }
    ],
    attractions: [
      { name: "Madurai — Temple City", type: "Spiritual", description: "City that never sleeps — the Meenakshi temple complex has 45,000 sculptures" },
      { name: "Ooty (Udhagamandalam)", type: "Hill Station", description: "Queen of Nilgiris — UNESCO Nilgiri Mountain Railway passes through here" },
      { name: "Mahabalipuram", type: "Heritage", description: "UNESCO site with 7th-century rock sculptures and the ocean-kissed Shore Temple" },
      { name: "Kodaikanal", type: "Nature", description: "Princess of Hill Stations — the only lake in India formed by a meteorite impact" },
      { name: "Marina Beach, Chennai", type: "Beach", description: "World's second longest urban beach — 13 km of golden sand" }
    ],
    cuisine: ["Idli & Sambar", "Dosa", "Chettinad Chicken", "Rasam", "Pongal", "Murukku & Filter Coffee"],
    gallery: []
  },
  "gujarat": {
    id: "gujarat",
    name: "Gujarat",
    capital: "Gandhinagar",
    language: "Gujarati",
    region: "West India",
    population: "60.4 million",
    area: "196,024 km²",
    established: "May 1, 1960",
    emoji: "🦚",
    color: "#F77F00",
    tagline: "Jewel of Western India",
    description: "Gujarat is the land of Mahatma Gandhi and Lord Krishna, a state that has shaped India's destiny in profound ways. India's longest coastline, the world's largest salt flat (Rann of Kutch), the last Asiatic lions in Gir Forest, and the ancient Harappan site of Lothal all converge in this vibrant state. Gujarati entrepreneurship has spread to every corner of the world.",
    heritage: {
      title: "Heritage & History",
      content: "Gujarat is home to the Harappan civilization site of Dholavira and Lothal — proving 5,000 years of continuous civilization. The Somnath temple, though destroyed multiple times and rebuilt, remains a symbol of Hindu resilience. The stepwells (vavs) of Patan and Adalaj are architectural masterpieces of subterranean engineering.",
      sites: ["Rani ki Vav, Patan (UNESCO)", "Dholavira (UNESCO Harappan Site)", "Somnath Temple", "Palitana Jain Temples", "Lothal (Ancient Port)", "Champaner-Pavagadh (UNESCO)", "Dwarka Temple"]
    },
    culture: {
      title: "Culture & Arts",
      content: "Gujarat's cultural identity is visible in its textiles and crafts. The state's embroidery traditions — Kutchi, Rabari, and Ahir — are internationally celebrated. Patola silk sarees (double ikat) from Patan require 6 months to weave one sari. The Rogan art of Kutch — painted with castor oil paste — was practiced by only one family for generations.",
      artForms: ["Garba Dance (UNESCO)", "Dandiya Raas", "Kutchi Embroidery", "Patola Silk Weaving", "Rogan Painting", "Block Printing of Ajrakh"]
    },
    festivals: [
      { name: "Navratri", month: "October", description: "UNESCO-recognized 9-night Garba festival — the world's longest dance party, with millions participating" },
      { name: "Rann Utsav", month: "November-February", description: "Cultural festival on the shimmering white salt flats of Kutch under moonlit skies" },
      { name: "Uttarayan (Makar Sankranti)", month: "January 14", description: "India's greatest kite festival — Ahmedabad's skies fill with millions of kites" },
      { name: "Janmashtami", month: "August", description: "Dwarka and Mathura compete in celebrating Krishna's birth — dahi handi human pyramids" }
    ],
    attractions: [
      { name: "Gir National Park", type: "Wildlife", description: "Only place in the world to see Asiatic lions in the wild — last 600+ lions survive here" },
      { name: "Rann of Kutch", type: "Natural Wonder", description: "World's largest salt desert — blindingly white at day, magical under the full moon" },
      { name: "Somnath", type: "Spiritual", description: "First of 12 Jyotirlingas — rebuilt 7 times, standing defiantly against the Arabian Sea" },
      { name: "Ahmedabad Old City", type: "Heritage", description: "India's first UNESCO World Heritage City — 600-year-old labyrinthine Walled City" },
      { name: "Statue of Unity", type: "Modern Heritage", description: "World's tallest statue (182m) — tribute to Sardar Vallabhbhai Patel overlooking Narmada" }
    ],
    cuisine: ["Dhokla", "Thepla", "Undhiyu", "Fafda & Jalebi", "Gujarati Thali", "Khandvi"],
    gallery: []
  },
  "punjab": {
    id: "punjab",
    name: "Punjab",
    capital: "Chandigarh",
    language: "Punjabi",
    region: "North West India",
    population: "27.7 million",
    area: "50,362 km²",
    established: "November 1, 1966",
    emoji: "⚔️",
    color: "#FFC300",
    tagline: "Land of Five Rivers & Golden Fields",
    description: "Punjab — the 'Land of Five Rivers' — is the granary of India and the spiritual home of Sikhism. The Golden Temple in Amritsar, the world's most visited religious site, stands as a shimmering symbol of Sikh philosophy: equality, service, and devotion. Punjab's bhangra beats, butter chicken, and vibrant festivals reflect a people known for their exuberance and hospitality.",
    heritage: {
      title: "Heritage & History",
      content: "Punjab witnessed some of history's most decisive battles — Panipat (1526, 1556, 1761), where empires rose and fell. The Sikh Empire under Maharaja Ranjit Singh (19th century) was one of the most powerful kingdoms of the era. The Jallianwala Bagh massacre (1919) galvanized India's independence movement. Partition of 1947 created one of history's largest migrations.",
      sites: ["Golden Temple, Amritsar", "Wagah Border", "Jallianwala Bagh", "Qila Mubarak, Patiala", "Anandpur Sahib Gurudwara", "Rock Garden, Chandigarh (outsider art marvel)"]
    },
    culture: {
      title: "Culture & Arts",
      content: "Punjabi culture is joyous and communal. Bhangra and Giddha are not just dances but expressions of life force. Phulkari embroidery — where the entire cloth is covered in geometric patterns — is a bride's most precious possession. Punjab's folk music tradition, led by artists like Nusrat Fateh Ali Khan, reached international audiences.",
      artForms: ["Bhangra Dance", "Giddha Dance", "Phulkari Embroidery", "Punjabi Folk Music", "Gurbani Kirtan", "Jutti Making"]
    },
    festivals: [
      { name: "Vaisakhi", month: "April 13", description: "Harvest festival and Sikh New Year — the day Guru Gobind Singh founded the Khalsa in 1699" },
      { name: "Gurpurab", month: "November", description: "Birthday of Guru Nanak Dev Ji — Golden Temple glows through the night with 100,000 diyas" },
      { name: "Lohri", month: "January 13", description: "Winter bonfire festival celebrating end of winter solstice — bhangra and peanuts around the fire" },
      { name: "Hola Mohalla", month: "March", description: "Sikh martial arts festival at Anandpur Sahib — Nihang warriors display valor and horsemanship" }
    ],
    attractions: [
      { name: "Golden Temple (Harmandir Sahib)", type: "Spiritual", description: "Most visited site in the world — Sikh spiritual sanctum with free langar (meals) for 100,000 daily" },
      { name: "Wagah Border", type: "Patriotic", description: "Iconic flag-lowering ceremony at India-Pakistan border — thundering crowd patriotism" },
      { name: "Chandigarh", type: "Modern City", description: "Le Corbusier's planned city — unique modernist architecture and Rock Garden" },
      { name: "Amritsar Heritage Walk", type: "Heritage", description: "Old city lanes with Partition Museum, food bazaars, and colonial-era buildings" },
      { name: "Anandpur Sahib", type: "Spiritual", description: "Sikh holy city where Guru Gobind Singh created the Khalsa order in 1699" }
    ],
    cuisine: ["Butter Chicken (Amritsar origin)", "Dal Makhani", "Sarson da Saag & Makki Roti", "Amritsari Kulcha", "Lassi", "Pinni"],
    gallery: []
  },
  "odisha": {
    id: "odisha",
    name: "Odisha",
    capital: "Bhubaneswar",
    language: "Odia",
    region: "East India",
    population: "41.9 million",
    area: "155,707 km²",
    established: "April 1, 1936",
    emoji: "🐚",
    color: "#6A4C93",
    tagline: "The Soul of Incredible India",
    description: "Odisha is India's best-kept secret — a state of extraordinary temple architecture, pristine beaches, vibrant tribal cultures, and classical arts. The Konark Sun Temple, a UNESCO World Heritage Site shaped like a giant chariot, is one of India's most spectacular monuments. The Puri Jagannath Temple's Rath Yatra draws millions in the world's largest chariot procession.",
    heritage: {
      title: "Heritage & History",
      content: "The ancient Kalinga kingdom (present-day Odisha) was the site of the Battle of Kalinga (261 BCE) — after which Emperor Ashoka embraced Buddhism and nonviolence. The Kalinga school of temple architecture produced some of India's finest sculptural traditions. The medieval period saw the construction of 700+ temples in Bhubaneswar alone.",
      sites: ["Konark Sun Temple (UNESCO)", "Puri Jagannath Temple", "Lingaraj Temple, Bhubaneswar", "Udayagiri-Khandagiri Caves", "Ratnagiri-Lalitgiri Buddhist Complex", "Chilika Lake"]
    },
    culture: {
      title: "Culture & Arts",
      content: "Odissi is one of India's oldest classical dance forms, depicted in sculptures 2,000 years old. Pattachitra — scroll painting on cloth — narrates mythological stories with extraordinary detail. Dhokra craft, using lost-wax casting technique 4,000 years old, continues to be practiced by tribal artisans.",
      artForms: ["Odissi Dance", "Pattachitra Painting", "Dhokra Metal Craft", "Appliqué Work of Pipili", "Sambalpuri Weaving", "Sand Art (Puri speciality)"]
    },
    festivals: [
      { name: "Rath Yatra", month: "June/July", description: "Largest chariot procession — 45-foot wooden chariots carrying Lord Jagannath pulled by 1 million devotees" },
      { name: "Danda Nacha", month: "April", description: "Unique 21-day ritual performance combining devotion, martial arts, and dance drama" },
      { name: "Konark Dance Festival", month: "December", description: "Classical dance performances against the backdrop of the Sun Temple" },
      { name: "Magha Saptami", month: "January/February", description: "Sea bathing at Chandrabhaga near Konark — pilgrims worship the rising sun" }
    ],
    attractions: [
      { name: "Konark Sun Temple", type: "UNESCO Heritage", description: "13th-century masterpiece designed as a chariot with 24 wheels — 'Black Pagoda'" },
      { name: "Puri Beach & Jagannath Temple", type: "Spiritual/Beach", description: "Holy city where heaven meets the sea — one of Char Dhams of Hinduism" },
      { name: "Chilika Lake", type: "Wildlife/Nature", description: "Asia's largest lagoon — home to Irrawaddy dolphins and 160+ migratory bird species" },
      { name: "Simlipal National Park", type: "Wildlife", description: "Dense forest home to 27 tigers, 432 elephants, and rare Gaur" },
      { name: "Bhitarkanika", type: "Wildlife", description: "Second largest mangrove in India — world's highest concentration of saltwater crocodiles" }
    ],
    cuisine: ["Dalma", "Pakhala Bhata", "Chungdi Malai", "Chhena Poda", "Machha Besara", "Rasabali"],
    gallery: []
  }
};

// All states list (brief info for the states page)
const allStates = [
  { id: "andhra-pradesh", name: "Andhra Pradesh", capital: "Amaravati", emoji: "🏛️", color: "#FF6B35", region: "South India", tagline: "Land of the Koh-i-Noor Diamond" },
  { id: "arunachal-pradesh", name: "Arunachal Pradesh", capital: "Itanagar", emoji: "🌄", color: "#4CAF50", region: "North East India", tagline: "Land of the Rising Sun" },
  { id: "assam", name: "Assam", capital: "Dispur", emoji: "🦏", color: "#8BC34A", region: "North East India", tagline: "Land of the One-Horned Rhino" },
  { id: "bihar", name: "Bihar", capital: "Patna", emoji: "🕉️", color: "#FF9800", region: "East India", tagline: "Cradle of World Religions" },
  { id: "chhattisgarh", name: "Chhattisgarh", capital: "Raipur", emoji: "🌿", color: "#009688", region: "Central India", tagline: "Rice Bowl of India" },
  { id: "goa", name: "Goa", capital: "Panaji", emoji: "🏖️", color: "#00BCD4", region: "West India", tagline: "Pearl of the Orient" },
  { id: "gujarat", name: "Gujarat", capital: "Gandhinagar", emoji: "🦚", color: "#F77F00", region: "West India", tagline: "Jewel of Western India" },
  { id: "haryana", name: "Haryana", capital: "Chandigarh", emoji: "🌾", color: "#CDDC39", region: "North India", tagline: "Harit Pradesh — Green State" },
  { id: "himachal-pradesh", name: "Himachal Pradesh", capital: "Shimla", emoji: "🏔️", color: "#3F51B5", region: "North India", tagline: "Land of Gods — Dev Bhoomi" },
  { id: "jharkhand", name: "Jharkhand", capital: "Ranchi", emoji: "⛏️", color: "#795548", region: "East India", tagline: "Land of Forests and Waterfalls" },
  { id: "karnataka", name: "Karnataka", capital: "Bengaluru", emoji: "🌺", color: "#E91E63", region: "South India", tagline: "One State, Many Worlds" },
  { id: "kerala", name: "Kerala", capital: "Thiruvananthapuram", emoji: "🌴", color: "#2D6A4F", region: "South India", tagline: "God's Own Country" },
  { id: "madhya-pradesh", name: "Madhya Pradesh", capital: "Bhopal", emoji: "🐅", color: "#FF5722", region: "Central India", tagline: "Heart of Incredible India" },
  { id: "maharashtra", name: "Maharashtra", capital: "Mumbai", emoji: "🦁", color: "#FF9F1C", region: "West India", tagline: "Spirit of the Maratha Empire" },
  { id: "manipur", name: "Manipur", capital: "Imphal", emoji: "💎", color: "#9C27B0", region: "North East India", tagline: "Jewel of India" },
  { id: "meghalaya", name: "Meghalaya", capital: "Shillong", emoji: "☁️", color: "#607D8B", region: "North East India", tagline: "Abode of Clouds" },
  { id: "mizoram", name: "Mizoram", capital: "Aizawl", emoji: "🌿", color: "#4CAF50", region: "North East India", tagline: "Land of Blue Mountains" },
  { id: "nagaland", name: "Nagaland", capital: "Kohima", emoji: "🦅", color: "#FF5252", region: "North East India", tagline: "Land of Festivals" },
  { id: "odisha", name: "Odisha", capital: "Bhubaneswar", emoji: "🐚", color: "#6A4C93", region: "East India", tagline: "The Soul of Incredible India" },
  { id: "punjab", name: "Punjab", capital: "Chandigarh", emoji: "⚔️", color: "#FFC300", region: "North India", tagline: "Land of Five Rivers" },
  { id: "rajasthan", name: "Rajasthan", capital: "Jaipur", emoji: "🏰", color: "#E85D04", region: "North West India", tagline: "Land of Kings" },
  { id: "sikkim", name: "Sikkim", capital: "Gangtok", emoji: "❄️", color: "#00BCD4", region: "North East India", tagline: "Little Tibet of India" },
  { id: "tamil-nadu", name: "Tamil Nadu", capital: "Chennai", emoji: "🏟️", color: "#C1121F", region: "South India", tagline: "Classical Civilization at Its Finest" },
  { id: "telangana", name: "Telangana", capital: "Hyderabad", emoji: "💎", color: "#FF6F00", region: "South India", tagline: "The Nizam's Legacy" },
  { id: "tripura", name: "Tripura", capital: "Agartala", emoji: "🌸", color: "#E91E63", region: "North East India", tagline: "Queen of the East" },
  { id: "uttar-pradesh", name: "Uttar Pradesh", capital: "Lucknow", emoji: "🕌", color: "#9B2226", region: "North India", tagline: "Heart of Incredible India" },
  { id: "uttarakhand", name: "Uttarakhand", capital: "Dehradun", emoji: "🙏", color: "#558B2F", region: "North India", tagline: "Dev Bhoomi — Land of the Gods" },
  { id: "west-bengal", name: "West Bengal", capital: "Kolkata", emoji: "🐯", color: "#F4A261", region: "East India", tagline: "The Cultural Capital of India" }
];

router.get('/', (req, res) => {
  res.json({ states: allStates });
});

router.get('/:id', (req, res) => {
  const state = statesData[req.params.id];
  if (!state) {
    // Return basic info if detailed data not available
    const basicState = allStates.find(s => s.id === req.params.id);
    if (basicState) {
      return res.json({
        state: {
          ...basicState,
          description: `${basicState.name} is a beautiful state in ${basicState.region} with rich cultural heritage and traditions.`,
          heritage: { title: "Heritage", content: "Coming Soon", sites: [] },
          culture: { title: "Culture", content: "Coming Soon", artForms: [] },
          festivals: [],
          attractions: [],
          cuisine: [],
          gallery: []
        }
      });
    }
    return res.status(404).json({ message: 'State not found' });
  }
  res.json({ state });
});

module.exports = router;
