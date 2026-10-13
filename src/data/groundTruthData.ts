export interface GroundTruthSeed {
  title: string;
  sourceType: 'flyer_ocr' | 'web_page';
  sourceUrl: string;
  flyerImagePath?: string;
  section: string;
  content: string;
}

export const GROUND_TRUTH_SEEDS: GroundTruthSeed[] = [
  {
    title: "HDBS Temple Location, Leadership & General Overview",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/",
    section: "General Information",
    content: `Houston Durga Bari Society (HDBS) is located at 13944 Schiller Road, Houston, TX 77082.
Phone: (281) 530-0304. Official Email: pc@durgabari.org and president@durgabari.org.
Official Website: https://durgabari.org/
HDBS is a registered 501(c)(3) non-profit socio-cultural and religious sanctuary established in 1999.
The temple sanctum sanctorum houses Maa Durga along with Lakshmi, Saraswati, Ganesha, and Kartikeya, as well as Bhagavan Shiva, Radha-Krishna, and Sri Ram Darbar.
Official Puja Schedule Portal: https://durgabari.org/2026-puja/puja-schedule/`
  },
  {
    title: "Official Sharodotsav 2026 Master Puja Schedule (durgabari.org)",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    section: "Official Master Puja Schedule",
    content: `Official Sharodotsav 2026 Puja Schedule from Houston Durga Bari Society (https://durgabari.org/2026-puja/puja-schedule/):
Note: When any discrepancy exists between older flyers and the official website schedule, preference is strictly given to the dates listed on https://durgabari.org/2026-puja/puja-schedule/.

| Date | Day | Event / Ritual | Official Schedule & Highlights |
|---|---|---|---|
| October 10, 2026 | Saturday | **Til Tarpan** | 7:00 AM – 9:30 AM: Ancestral Til Tarpan at Temple Water Pavilion. |
| October 11, 2026 | Sunday | **Mahalaya & Anandamela** | 9:00 AM: Durga Puja; 10:00 AM: Mahishasur Mardini invocations; 12:00 PM: Pushpanjali, Bhog, Arati; 12:00 PM – 2:00 PM: Anandamela Food Fair. |
| October 15, 2026 | Thursday | **Maha Shashti (Bodhan)** | 6:00 PM: Bodhan & Arati. |
| October 16, 2026 | Friday | **Maha Shashti** | 10:30 AM: Maha Shashti Puja; 6:00 PM: Amantran & Adhibas; 7:00 PM: Pushpanjali, Bhog, Sandhya Arati & Cultural Journey. |
| October 17, 2026 | Saturday | **Maha Saptami** | 9:00 AM: Kalabou Snan (Navapatrika Pravesh); 10:00 AM: Maha Saptami Puja; 12:00 PM: Balidaan; 12:30 PM: Pushpanjali, Bhog & Arati; 7:00 PM: Sandhya Arati & Cultural Presentations. |
| October 18, 2026 | Sunday | **Maha Ashtami & Maha Sandhi** | 10:00 AM: Maha Ashtami Puja; 12:00 PM: Bolidaan; 12:30 PM: Pushpanjali, Bhog, Arati; **8:56 PM: Maha Sandhi Puja** (108 Lotuses & 108 Pradip). |
| October 19, 2026 | Monday | **Maha Nabami (Tithi)** | 10:30 AM: Maha Nabami Puja; 12:00 PM: Bolidaan; 12:30 PM: Pushpanjali, Bhog, Arati; 7:00 PM: Sandhya Arati. |
| October 20, 2026 | Tuesday | **Maha Dashami (Tithi)** | **11:00 AM: Puja and Dadhikarma (Tithi rituals).** |
| October 24, 2026 | Saturday | **Dashami (General) & Bijoya Sammiloni** | **3:30 PM: Aparajita Puja; 4:30 PM: Bhasaan, Sindoor Khela & Devi Boran; 6:30 PM: Dhunuchi Nach; 8:30 PM – 9:30 PM: Subho Bijoya Gala Dinner; 10:00 PM: Miss Jojo Musical Extravaganza.** |
| October 25, 2026 | Sunday | **Kojagori Lokkhi Puja** | Kojagori Lakshmi Puja rituals and evening Prasad distribution. |
| November 7 & 8, 2026 | Sat & Sun | **Maha Kali Puja (Shyama Puja)** | Kali Puja rituals, Bolidaan, Pushpanjali, Bhog, Arati, and fireworks. |`
  },
  {
    title: "Til Tarpan (Mahalaya Eve) 2026 Schedule & Rituals",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    section: "Pre-Puja Schedule",
    content: `Date: Saturday, October 10, 2026
Event: Til Tarpan (Mahalaya Eve ritual honoring ancestors)
Timings: 7:00 AM – 9:30 AM (also observed through 11:30 AM)
Location: Temple Water Pavilion & Sacred Grounds at HDBS, 13944 Schiller Rd.
Ritual Details: Devotees perform Tarpan guided by temple priests to offer gratitude and peace to departed ancestors before welcoming Devi Durga. Devotees offer black sesame seeds (til), sacred kusha grass, white flowers, and Ganga jal.
Samagri: The temple provides essential puja samagri on site. Devotees are encouraged to wear clean traditional Indian attire. Registration is free and open to everyone; voluntary donations for the priests are welcome.`
  },
  {
    title: "Mahalaya Dawn Invocations & Anandamela 2026",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    section: "Mahalaya Morning & Anandamela",
    content: `Date: Sunday, October 11, 2026
Event: Mahalaya Morning Invocations & Anandamela
Timings & Highlights:
- 09:00 AM: Durga Puja commencement
- 10:00 AM: Mahishasur Mardini sacred recitation & chanting
- 12:00 PM: Pushpanjali, Bhog & Arati
- 12:00 PM – 02:00 PM: Anandamela (Traditional food fair and community stalls)
Venue: Main Shrine & Temple Grounds, Houston Durga Bari Society (13944 Schiller Rd).
Devotees gather to herald Devi's descent to Earth (Agomoni).`
  },
  {
    title: "Maha Shashti 2026 Schedule (Oct 15 & Oct 16)",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    section: "Maha Shashti",
    content: `Official Maha Shashti Schedule (https://durgabari.org/2026-puja/puja-schedule/):
- Thursday, October 15, 2026:
  - 06:00 PM: Bodhan & Arati (Awakening under the sacred Bilva tree)
- Friday, October 16, 2026:
  - 10:30 AM: Maha Shashti Puja
  - 06:00 PM: Amantran & Adhibas
  - 07:00 PM: Pushpanjali, Bhog & Sandhya Arati
  - Evening: Cultural Presentation: A Musical Journey`
  },
  {
    title: "Maha Saptami 2026 Schedule (Saturday, Oct 17)",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    section: "Maha Saptami",
    content: `Official Maha Saptami Schedule (Saturday, October 17, 2026):
- 09:00 AM: Kalabou Snan (Navapatrika Pravesh & Snan)
- 10:00 AM: Maha Saptami Puja
- 12:00 PM: Balidaan
- 12:30 PM: Pushpanjali, Bhog & Arati
- 01:00 PM – 03:00 PM: Anna Bhog Prasad Distribution
- 07:00 PM: Sandhya Arati with resonant Dhaak drums & Dhunuchi dance
- Evening: Cultural presentation`
  },
  {
    title: "Maha Ashtami & Maha Sandhi Puja 2026 Schedule (Sunday, Oct 18)",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    section: "Maha Ashtami & Maha Sandhi Puja",
    content: `Official Maha Ashtami & Sandhi Puja Schedule (Sunday, October 18, 2026):
- 10:00 AM: Maha Ashtami Puja
- 12:00 PM: Bolidaan
- 12:30 PM: Pushpanjali, Bhog & Arati
- 01:00 PM – 03:30 PM: Maha Ashtami Anna Bhog Prasad distribution
- **08:56 PM: MAHA SANDHI PUJA**. This auspicious juncture connects Ashtami and Nabami, commemorating Devi Chamunda defeating Chanda and Munda. HDBS priests offer 108 lotuses and light 108 consecrated ghee pradip (diyas).
- Evening: Cultural events and musical performances.`
  },
  {
    title: "Maha Nabami (Tithi) 2026 Schedule (Monday, Oct 19)",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    section: "Maha Nabami (Tithi)",
    content: `Official Maha Nabami (Tithi) Schedule (Monday, October 19, 2026):
- 10:30 AM: Maha Nabami Puja
- 12:00 PM: Bolidaan
- 12:30 PM: Pushpanjali, Bhog & Arati
- 07:00 PM: Sandhya Arati accompanied by Dhaak and Kanshi
- Evening: Devotional songs and cultural presentations`
  },
  {
    title: "Maha Dashami (Tithi) 2026 Schedule (Tuesday, Oct 20)",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    section: "Maha Dashami (Tithi)",
    content: `Official Maha Dashami (Tithi) Schedule (Tuesday, October 20, 2026):
- **11:00 AM: Puja and Dadhikarma (Official Tithi ritual)**
Note: In accordance with the official schedule at https://durgabari.org/2026-puja/puja-schedule/, the religious tithi Puja and Dadhikarma for Maha Dashami is observed on **Tuesday, October 20, 2026**, while the community-wide Dashami celebration and Bijoya Sammiloni (including Sindoor Khela, Bhasaan, and concert) is held on **Saturday, October 24, 2026**.`
  },
  {
    title: "Dashami (General) & Bijoya Sammiloni 2026 (Saturday, Oct 24)",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    section: "Dashami & Bijoya Sammiloni",
    content: `Official Dashami & Bijoya Sammiloni Schedule (Saturday, October 24, 2026):
- **03:30 PM: Aparajita Puja**
- **04:30 PM: Bhasaan, Sindoor Khela & Devi Boran** (Married women offer betel leaves, sweets, and vermilion to Maa Durga, followed by joyous Sindoor Khela with live Dhaak rhythm).
- **06:30 PM: Dhunuchi Nach**
- **08:30 PM – 09:30 PM: Subho Bijoya Gala Dinner & Feast**
- **10:00 PM: Miss Jojo Musical Extravaganza** (Live concert at Sur Auditorium).
Official Source: https://durgabari.org/2026-puja/puja-schedule/`
  },
  {
    title: "Kojagori Lokkhi Puja & Maha Kali Puja 2026",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    section: "Post-Durga Puja Festivities",
    content: `Post-Durga Puja Official Schedule (https://durgabari.org/2026-puja/puja-schedule/):
- **Sunday, October 25, 2026: Kojagori Lokkhi Puja** (Evening Lakshmi Puja, Pushpanjali, and Prasad distribution)
- **Saturday & Sunday, November 7 & 8, 2026: Maha Kali Puja (Shyama Puja)**
  - Bolidaan, Pushpanjali, Bhog, Arati, and Deepabali fireworks celebration.`
  },
  {
    title: "Til Tarpan 2026 Event Flyer (durgabari.org/eventgallery)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/eventgallery/til-tarpan-2026/",
    flyerImagePath: "/flyers/gallery/TilTarpan2026.jpeg",
    section: "Event Gallery: Til Tarpan",
    content: `HDBS 2026 Til Tarpan Official Event Gallery Flyer (https://durgabari.org/eventgallery/til-tarpan-2026/):
- **Event**: Til Tarpan (Ancestral Tarpan Ritual)
- **Date & Time**: Saturday, October 10, 2026 | 7:00 AM – 9:30 AM
- **Venue**: Houston Durgabari Society Water Pavilion & Temple, 13944 Schiller Rd
- **Hosted By**: 2026 Puja Committee
- **Rituals**: Guided ancestral offering with black sesame seeds (til), sacred kusha grass, white flowers, and Ganga jal. Devotees receive sacred priest blessings.`
  },
  {
    title: "Mahalaya & Anandamela 2026 Event Flyer (durgabari.org/eventgallery)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/eventgallery/mahalaya-2026/",
    flyerImagePath: "/flyers/gallery/Mahalaya2026.jpeg",
    section: "Event Gallery: Mahalaya & Anandamela",
    content: `HDBS 2026 Mahalaya & Anandamela Official Event Gallery Flyer (https://durgabari.org/eventgallery/mahalaya-2026/):
- **Date & Time**: Sunday, October 11, 2026 | 9:00 AM – 5:00 PM
- **Venue**: Houston Durgabari Society Temple & Sur Auditorium
- **Hosted By**: 2026 Puja Committee
- **Detailed Timetable**:
  | Time | Event | Location |
  |---|---|---|
  | 09:00 AM | Durga Puja | Temple |
  | 10:00 AM | Mahishasur Mardini (Sacred Invocatory Chanting) | Temple |
  | 12:00 PM | Pushpanjali, Bhog, Arati | Temple |
  | 12:00 PM – 2:00 PM | Anandamela – Festive Season Food Fair Begins | Auditorium |
  | 03:00 PM | Ek Je Chhilo Nayak (Uttam Kumar Retro Cultural Musical) | Auditorium |
  | 04:30 PM | Thakurbarir Ghore Baire (Traditional Fashion Show) | Auditorium |`
  },
  {
    title: "Vishwakarma Puja 2026 Event Flyer (durgabari.org/eventgallery)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/eventgallery/vishwakarma-puja-2026/",
    flyerImagePath: "/flyers/gallery/Vishwakarma_Puja_flyer_updated.jpg",
    section: "Event Gallery: Vishwakarma Puja",
    content: `HDBS 2026 Vishwakarma Puja Official Event Gallery Flyer (https://durgabari.org/eventgallery/vishwakarma-puja-2026/):
- **Date & Time**: Sunday, September 20, 2026 | Starts 11:00 AM
- **Venue**: Houston Durga Bari Society Temple & Greenfield
- **Hosted By**: HDBS
- **Puja Sankalpa**: $101
- **Program Schedule**:
  | Time | Event | Location |
  |---|---|---|
  | 11:00 AM | Sankalpa Puja | Temple |
  | 12:15 PM | Anjali, Bhog & Arati | Temple |
  | 01:00 PM | Mahaprasad | Temple |
  | 02:00 PM | Kite Flying Festival | Greenfield |`
  },
  {
    title: "Janmashtami Puja 2026 Event Flyer (durgabari.org/eventgallery)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/eventgallery/janmashtami-puja/",
    flyerImagePath: "/flyers/gallery/2026JanmasthamiPuja.jpeg",
    section: "Event Gallery: Janmashtami Puja",
    content: `HDBS 2026 Janmashtami Puja Official Event Gallery Flyer (https://durgabari.org/eventgallery/janmashtami-puja/):
- **Date & Time**: Thursday, September 3, 2026 | 6:00 PM – 8:00 PM
- **Venue**: Houston Durgabari Society Temple
- **Hosted By**: HDBS
- **Puja Sankalpa**: $15
- **Rituals**: Sri Krishna Janmashtami Abhishekam, Krishna Janma kirtan, Bhog, Arati, and sweet Prasad distribution.`
  },
  {
    title: "Puja Curtain Raiser 2026 (durgabari.org/eventgallery)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/eventgallery/puja-curtain-raiser/",
    flyerImagePath: "/flyers/hdbs_2026_main_schedule.svg",
    section: "Event Gallery: Puja Curtain Raiser",
    content: `HDBS 2026 Puja Curtain Raiser (https://durgabari.org/eventgallery/puja-curtain-raiser/):
- **Date & Time**: Sunday, August 9, 2026 | 10:00 AM – 1:00 PM
- **Venue**: Houston Durgabari Society Auditorium
- **Hosted By**: 2026 Puja Committee
- **Purpose**: Community kickoff for Sharodotsav 2026, introducing the theme, volunteer leadership, puja committees, and cultural previews.`
  },
  {
    title: "Bipattarini Puja 2026 Event Flyer (durgabari.org/eventgallery)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/eventgallery/bipattarini-puja-2026/",
    flyerImagePath: "/flyers/gallery/2026_Bipattarini-Puja-1.jpeg",
    section: "Event Gallery: Bipattarini Puja",
    content: `HDBS 2026 Maa Bipattarini Puja Official Event Gallery Flyer (https://durgabari.org/eventgallery/bipattarini-puja-2026/):
- **Venue**: Houston Durga Bari Society Temple
- **Rituals**: Bipattarini Vrata Katha recitation, Red sacred thread (dor) tying ceremony, 13 kinds of fruits and sweets offered to Maa Durga / Bipattarini, Bhog & Arati.`
  },
  {
    title: "Saptasati Maha Yagna 2026 Event Flyer (durgabari.org/eventgallery)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/eventgallery/saptasati-maha-yagna-2026/",
    flyerImagePath: "/flyers/gallery/2026-SMY.jpeg",
    section: "Event Gallery: Saptasati Maha Yagna",
    content: `HDBS 2026 Sri Sri Chandi Saptasati Maha Yagna Official Event Gallery Flyer (https://durgabari.org/eventgallery/saptasati-maha-yagna-2026/):
- **Date & Time**: Sunday, March 29, 2026 | 9:00 AM – 1:00 PM
- **Venue**: Houston Durga Bari - Temple & Sacred Tent
- **Puja Sponsorship**: $101
- **Program Timetable**:
  | Time | Event | Location |
  |---|---|---|
  | 09:00 AM | Temple Puja | Temple |
  | 10:00 AM | Saptasati Maha Chandi Yagna & Anjali | Tent |
  | 12:00 PM | Bhog & Arati | Temple |
  | 01:00 PM | Prasad Distribution | Kalabhavan |`
  },
  {
    title: "Annapurna Puja 2026 Event Flyer (durgabari.org/eventgallery)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/eventgallery/annapurna-puja/",
    flyerImagePath: "/flyers/gallery/2026-AP.jpeg",
    section: "Event Gallery: Annapurna Puja",
    content: `HDBS 2026 Annapurna Puja Official Event Gallery Flyer (https://durgabari.org/eventgallery/annapurna-puja/):
- **Date & Time**: Sunday, March 22, 2026 | 10:30 AM – 12:30 PM
- **Venue**: Houston Durga Bari Society Temple
- **Puja Sponsorship**: $101
- **Program Timetable**:
  | Time | Event | Location |
  |---|---|---|
  | 10:30 AM | Annapurna Puja & Annakoot | Temple |
  | 11:45 AM | Pushpanjali | Temple |
  | 12:00 PM | Bhog & Arati | Temple |`
  },
  {
    title: "Maha Shivaratri 2026 Event Flyer (durgabari.org/eventgallery)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/eventgallery/2026-maha-shivaratri/",
    flyerImagePath: "/flyers/gallery/Shivratri2026.jpeg",
    section: "Event Gallery: Maha Shivaratri",
    content: `HDBS 2026 Maha Shivaratri Official Event Gallery Flyer (https://durgabari.org/eventgallery/2026-maha-shivaratri/):
- **Date & Time**: Sunday, February 15, 2026 | 9:00 AM – 9:00 PM
- **Venue**: Houston Durgabari Society Temple
- **Puja Sponsorship**: Sankalpa + Abhishekam $151; Shiva Abhishekam $31
- **Schedule**:
  | Time | Event | Location |
  |---|---|---|
  | 09:00 AM – 07:30 PM | Continuous Shiva Abhishekam | Temple |
  | 06:00 PM | Sankalpa & Shiv Puja | Temple |
  | 07:30 PM | Anjali, Bhog & Arati | Temple |
  | 08:30 PM | Wrap-up | Temple |`
  },
  {
    title: "Saraswati Puja 2026 Event Flyer (durgabari.org/eventgallery)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/eventgallery/2026-saraswati-puja/",
    flyerImagePath: "/flyers/gallery/2026_Saraswati_Puja.jpeg",
    section: "Event Gallery: Saraswati Puja",
    content: `HDBS 2026 Saraswati Puja Official Event Gallery Flyer (https://durgabari.org/eventgallery/2026-saraswati-puja/):
- **Date & Time**: Saturday, January 31, 2026 | 10:00 AM – 10:00 PM
- **Venue**: Houston Durgabari Society Temple & Sur Auditorium
- **Program Timetable**:
  | Time | Event | Location |
  |---|---|---|
  | 10:00 AM | Haate Khori & Puja Sankalpa | Temple |
  | 11:00 AM | Saraswati Puja | Temple |
  | 12:00 PM | Pushpanjali, Bhog & Arati | Temple |
  | 01:00 PM | Saraswati Bhog Lunch | Food Tent |
  | 02:00 PM | Tech Q & Youth Quiz | Auditorium |
  | 04:30 PM | Saraswati Bandana Musical | Auditorium |
  | 04:45 PM | Bangla School Presentation | Auditorium |
  | 06:15 PM | Kolkata Nostalgia Musical Multimedia | Auditorium |
  | 07:00 PM | Community Dinner | Kalabhavan |`
  },
  {
    title: "Kojagori Laxmi Puja Event Flyer (durgabari.org/eventgallery)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/eventgallery/kojagori-laxmi-puja/",
    flyerImagePath: "/flyers/gallery/MondayKojagoriLakshmiPuja.jpg",
    section: "Event Gallery: Kojagori Laxmi Puja",
    content: `HDBS Kojagori Laxmi Puja Official Event Gallery Flyer (https://durgabari.org/eventgallery/kojagori-laxmi-puja/):
- **Event**: Kojagori Lakshmi Puja (Full Moon Sharad Purnima Celebration)
- **Venue**: Houston Durgabari Society Temple
- **Schedule**:
  | Time | Event | Location |
  |---|---|---|
  | 07:00 PM | Kojagori Laxmi Puja | Temple |
  | 08:00 PM | Anjali, Bhog, Arati & Prasad Distribution | Temple |`
  },
  {
    title: "Maha Kali Puja Event Flyer (durgabari.org/eventgallery)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/eventgallery/kali-puja-2025/",
    flyerImagePath: "/flyers/gallery/Kali-Puja-poster.jpg",
    section: "Event Gallery: Maha Kali Puja",
    content: `HDBS Maha Kali Puja (Shyama Puja & Deepabali) Official Event Gallery Flyer (https://durgabari.org/eventgallery/kali-puja-2025/):
- **Venue**: Houston Durga Bari Society Temple & Grounds
- **Schedule**:
  | Time | Event | Location |
  |---|---|---|
  | 05:30 PM | Puja Sankalpa | Temple |
  | 06:00 PM | Kali Puja Commencement | Temple |
  | 06:30 PM – 08:30 PM | Evening Snacks & Chai | Outdoors |
  | 07:00 PM | Deepabali Fireworks Extravaganza | Outdoors |
  | 07:30 PM | Balidaan, Anjali, Bhog & Arati | Temple |
  | 08:30 PM – 09:30 PM | Community Kali Puja Dinner | Food Tent |
  | 09:30 PM | Bangla Drama (Natok) | Auditorium |
- **Parking & Shuttles**: Free shuttle buses run between West Oaks Mall and HDBS from 5:00 PM to 1:00 AM.`
  },
  {
    title: "Puja Sponsorship & Donor Packages 2026",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/2026-puja/register/",
    flyerImagePath: "/flyers/hdbs_2026_sponsorship.svg",
    section: "Sponsorship & Donations",
    content: `Houston Durga Bari Society 2026 Puja Sponsorship Packages (501(c)(3) Tax-Deductible):
1. Grand Patron — $5,000:
   - Dedicated Family Puja Sankalpa performed on all days.
   - 2 Reserved VIP On-Campus Parking Passes.
   - 8 Priority Bhog Dining Passes.
   - Prominent inscription in Sharodotsav Souvenir and Stage Screen.
2. Maha Sponsor — $2,500:
   - Family Sankalpa for Maha Ashtami & Sandhi Puja.
   - 1 Reserved VIP Parking Pass.
   - 6 Priority Bhog Dining Passes.
   - Full-page color acknowledgment in 2026 Commemorative Magazine.
3. Family Puja Sponsor — $500:
   - Family Gotra and Name recited during Pushpanjali sankalpa.
   - 4 Complimentary Anna Bhog meal packets per puja day.
   - Souvenir copy.
4. Daily Anna Bhog Sponsor — $250:
   - Sponsors Anna Bhog meal for 200+ devotees.
   - Special sanctum-blessed prasad box.
5. Pushpanjali & Pranam Token — $51:
   - Family floral offering token and name recitation during morning pushpanjali.
Payment methods: Online at durgabari.org/2026-puja/register/, Zelle to treasurer@durgabari.org, or check payable to Houston Durga Bari Society.`
  },
  {
    title: "Parking, Shuttle Services & Arrival Guidelines",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/",
    section: "Logistics & Parking",
    content: `HDBS 2026 Sharodotsav Parking & Shuttle Guidelines (Official Records):

### 🚫 Important Offsite Parking Clarification:
- **NOT at Alief High School**: Offsite parking is strictly **NOT** located at Alief High School (or any Alief ISD school). Alief High School is not an authorized or permitted parking facility for HDBS Durga Puja, and parking there is prohibited.
- **Official Offsite Overflow Parking**: All general attendees and devotees must park at **West Oaks Mall** (Hwy 6 & Westheimer Rd, Houston, TX 77082).
- **Exact Shuttle Pickup Area**: Park in the designated HDBS section near Tutti Frutti on the West Oaks Mall perimeter. Look for the official HDBS Shuttle Stop banner and parking marshals.

### 🚌 Free Air-Conditioned Shuttle Bus Schedule:
Continuous complimentary shuttle vans and buses run directly between West Oaks Mall and the HDBS temple campus (13944 Schiller Rd) every 10 minutes:

| Day & Date | Shuttle Operating Hours | Shuttle Frequency | Pickup Location |
|---|---|---|---|
| Friday, Oct 16, 2026 (Sashthi) | 10:00 AM – 11:00 PM | Every 10 minutes | West Oaks Mall (Tutti Frutti zone) |
| Saturday, Oct 17, 2026 (Saptami) | 8:00 AM – 12:00 Midnight | Every 10 minutes | West Oaks Mall (Tutti Frutti zone) |
| Sunday, Oct 18, 2026 (Ashtami & Sandhi) | 8:00 AM – 12:00 Midnight | Every 10 minutes | West Oaks Mall (Tutti Frutti zone) |
| Saturday, Oct 24, 2026 (Dashami & Bijoya) | 2:00 PM – 11:30 PM | Every 10 minutes | West Oaks Mall (Tutti Frutti zone) |

### 🅿️ On-Campus & Overflow Parking Rules:
- **On-Campus HDBS Parking (13944 Schiller Rd)**: Strictly limited. Reserved exclusively for seniors (65+), registered Grand Patron/Maha Sponsors with official VIP vehicle dashboard placards, and vehicles displaying State ADA disabled tags.
- **Secondary Overflow**: If directed by volunteer traffic marshals during peak rush hours, overflow parking is permitted at the neighboring Jain Society of Houston (Jain Temple) on Schiller Road.
- **Rideshare (Uber / Lyft)**: Passenger pick-up and drop-off is strictly designated at Gate 2 on Schiller Road.
- **Shoe Storage Pavilion**: Free shoe storage tents with numbered tokens are located near the main temple arch.

### 📍 Source Citation:
- **Source Document**: Houston Durga Bari Society Sharodotsav 2026 Logistics & Parking Guide
- **Source Portal**: Official HDBS Website (https://durgabari.org/2026-puja/)
- **Section**: Logistics, Shuttles & Parking Management
- **Phone Assistance**: Temple Office (281) 530-0304`
  },
  {
    title: "Anna Bhog Dining & Digital Coupon Guidelines",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/",
    section: "Bhog & Dining",
    content: `HDBS 2026 Anna Bhog Distribution Rules:
- Bhog is served hot in the air-conditioned Bhog Hall during festival days.
- Coupon Requirement: To minimize wait times and overcrowding, all attendees must display either a digital QR code from online pre-registration or a paper wristband/token issued at the Helpdesk.
- Traditional Menu: Pure vegetarian feast including Bengali Bhoger Khichuri, Labra (mixed seasonal vegetable), Beguni, Chutney, and Payesh.
- Takeout / To-Go Boxes: Designated express pickup counter for pre-ordered takeout packets.`
  },
  {
    title: "Volunteer Opportunities & Puja Committee Contacts",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/",
    section: "Volunteers & Contacts",
    content: `HDBS 2026 Puja Committee Contacts & Volunteer Information:
- Puja Convener: convener2026@durgabari.org
- HDBS President: president@durgabari.org
- General Inquiries & Temple Office: (281) 530-0304
- Volunteer Registration: Over 150 volunteers are needed for Anna Bhog service, parking direction, shoe stall, Pushpanjali queue management, and stage audio/visual.
- Volunteer signups: Email volunteers@durgabari.org or visit the Volunteer Desk at Sur Auditorium lobby.`
  },
  {
    title: "Out-of-Towner Lodging & Nearby Accommodations Guide",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/",
    section: "Visitor Logistics & Accommodations",
    content: `HDBS 2026 Out-of-Towner Lodging & Hotel Recommendations:
For devotees and families traveling from out of town to attend the 2026 Sharodotsav at Houston Durga Bari Society (13944 Schiller Rd, Houston, TX 77082), recommended hotels in the Westchase and Energy Corridor districts (within 3–6 miles) include:

### 🏨 Recommended Nearby Hotels:
| Hotel Name | Neighborhood / Area | Approx. Distance to HDBS | Notable Features & Amenities |
|---|---|---|---|
| Omni Houston Hotel at Westside | Energy Corridor (Eldridge Pkwy) | ~4.5 miles (10–12 min drive) | Luxury atrium, heated pool, restaurant, family-friendly |
| Hyatt Regency Houston West | Energy Corridor / I-10 West | ~4.8 miles (11–13 min drive) | Full-service hotel, spacious rooms, on-site dining |
| Hilton Houston Westchase | Westchase (Westheimer Rd) | ~5.2 miles (12–14 min drive) | Central location, close to Westheimer dining, pool |
| Home2 Suites by Hilton | Energy Corridor / Westheimer | ~4.0 miles (9–11 min drive) | In-suite kitchens, complimentary breakfast, pet-friendly |
| Best Western Plus Westchase | Westchase District | ~4.6 miles (10–12 min drive) | Budget-friendly suites, hot breakfast, free parking |
| Courtyard by Marriott Houston West | Energy Corridor | ~5.0 miles (11–13 min drive) | Modern workspace, bistro, outdoor patio |

### 🚗 Out-of-Towner Commute & Shuttle Tips:
- **Free Park-and-Ride Shuttle**: Devotees staying along Westheimer Rd or Hwy 6 can drive 5 minutes to the official overflow parking at West Oaks Mall (Hwy 6 & Westheimer Rd) and take the free, air-conditioned continuous HDBS shuttle bus directly to the temple gates every 10 minutes.
- **Rideshare Drop-off**: If taking Uber or Lyft from your hotel, direct the driver to Gate 2 on Schiller Road.
- **Temple Address**: Houston Durga Bari Society, 13944 Schiller Rd, Houston, TX 77082.

### 📍 Source Citation:
- **Source Document**: HDBS Sharodotsav 2026 Out-of-Towner Visitor & Hospitality Guide
- **Source Portal**: Official HDBS Website (https://durgabari.org/2026-puja/)
- **Section**: Visitor Logistics, Lodging & Hospitality
- **Temple Contact**: (281) 530-0304 | lodging@durgabari.org`
  }
];
