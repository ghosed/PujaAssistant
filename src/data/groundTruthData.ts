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
Note: When any discrepancy exists between older flyers and the official website schedule, preference is strictly given to the schedule and columns listed on https://durgabari.org/2026-puja/puja-schedule/.

The official schedule contains two distinct columns: "Puja Timings" (for religious rituals, Bhog, Pushpanjali, and Sandhya Arati) and "Program Details" (for community programs, cultural events, and Lunch & Dinner serving hours).

| Date & Day | Event | Puja Timings | Program Details |
|---|---|---|---|
| 10-Oct-2026 Saturday | **Til Tarpan** | • 7:00 AM – 9:30 AM: Til Tarpan | — |
| 11-Oct-2026 Sunday | **Mahalaya / Anandamela** | • 9:00 AM: Durga Puja<br>• 10:00 AM: Mahishasur Mardini<br>• 12:00 PM: Pushpanjali, Bhog, Arati | • 12:00 PM – 2:00 PM: Food Fest<br>• 3:00 PM: Ek Je Chhilo Nayak (Uttam Kumar retro)<br>• 4:30 PM: Thakurbarir Ghore Baire (Fashion Show) |
| 15-Oct-2026 Thursday | **Maha Shashti (Bodhan)** | • 6:00 PM: Bodhan & Arati | — |
| 16-Oct-2026 Friday | **Maha Shashti** | • 10:30 AM: Maha Shashti Puja<br>• 6:00 PM: Amantran & Adhibas<br>• 7:00 PM: Pushpanjali, Bhog, Sandhya Arati | • 6:30 PM: Musical journey along Silk Route<br>• 7:30 PM: Udbodhan / Parikrama<br>• **8:30 PM – 9:30 PM: Dinner – Culinary Celebration**<br>• 10:00 PM: Ankita Bhattacharyya & Subhadeep Das Choudhury musical nite |
| 17-Oct-2026 Saturday | **Maha Saptami** | • 9:00 AM: Kalabou Snan<br>• 10:00 AM: Maha Saptami Puja<br>• 12:00 PM: Balidaan<br>• 12:30 PM: Pushpanjali, Bhog, Arati<br>• 7:00 PM: Sandhya Arati | • **1:00 PM – 2:00 PM: Lunch: Bengali cuisine treat**<br>• 6:30 PM: Saat Ronger Saat Paak (Wedding traditions)<br>• **8:30 PM – 9:30 PM: Dinner: Gastronomic experience**<br>• 10:00 PM: Mahalaxmi Iyer & Sourav Das magical melodies |
| 18-Oct-2026 Sunday | **Maha Ashtami** | • 10:00 AM: Maha Ashtami Puja<br>• 12:00 PM: Bolidaan<br>• 12:30 PM: Pushpanjali, Bhog, Arati<br>• 6:00 PM: Sandhya Arati<br>• **8:56 PM: Maha Sandhi Puja** | • **1:00 PM – 2:00 PM: Lunch: Maha Ashtami traditions on your plate**<br>• 2:45 PM: Alo Amar (Tagore Society Youth Orchestra)<br>• 3:30 PM: Pancho Kobir Monone Rashobodh (Homage to Bengal's 5 Bards)<br>• 4:30 PM: Boroder Adda (Seniors' Reminiscence)<br>• **8:30 PM – 9:30 PM: Dinner: Puja feast continues next weekend** |
| 19-Oct-2026 Monday | **Maha Nabami (Tithi)** | • 10:30 AM: Maha Nabami Puja<br>• 12:00 PM: Bolidaan<br>• 12:30 PM: Pushpanjali, Bhog, Arati<br>• 7:00 PM: Sandhya Arati | — |
| 20-Oct-2026 Tuesday | **Maha Dashami (Tithi)** | • 11:00 AM: Puja and Dadhikarma | — |
| 24-Oct-2026 Saturday | **Dashami & Bijoya Sammiloni** | • 3:30 PM – 4:30 PM: Aparajita Pujo (Temple)<br>• 4:30 PM – 5:15 PM: Bishorjon Procession and Immersion<br>• 5:30 PM – 6:30 PM: Sindoor Khela | • 6:30 PM: Next Gen Performance (ধুনুচি ও ঢাক / Dhunuchi & Dhaak)<br>• 7:00 PM – 8:00 PM: Dhunuchi Competition (তালে ও ছন্দে ধুনুচি / Taale o Chhonde Dhunuchi)<br>• 6:30 PM – 8:00 PM: Snacks (On Purchase until supplies last)<br>• **8:30 PM – 9:30 PM: Dinner: Subho Bijoya gala dinner**<br>• 9:30 PM: Ms. Jojo & Troupe Musical Extravaganza |
| 25-Oct-2026 Sunday | **Lokkhi Puja** | • 6:00 PM: Kojagari Lokkhi Puja, Pushpanjali, Bhog, Arati<br>• 7:30 PM: Prasad | — |
| 07-Nov-2026 Saturday | **Pre Kali Puja** | • 7:00 PM: Sandhya Arati<br>• 7:30 PM: Fireworks | • 6:00 PM: Muktomela (Open Stage for Community Kids)<br>• **8:30 PM – 9:30 PM: Dinner: Deepabali Sandhyo-Bhoj**<br>• 9:30 PM: Hilarious Kalipuja Drama |
| 08-Nov-2026 Sunday | **Kali (Shyama) Puja** | • 6:30 PM: Kali Puja, Bolidaan<br>• 7:30 PM: Pushpanjali, Bhog, Arati | • **8:30 PM – 9:30 PM: Dinner: Puja Savory** |
| 13-Feb-2027 Saturday | **Saraswati Puja** | • 10:00 AM: Haate Khori<br>• 11:00 AM: Puja<br>• 12:30 PM: Pushpanjali, Bhog, Arati<br>• 6:30 PM: Sandhya Arati | • **1:00 PM: Lunch – Traditional Puja Lunch**<br>• Afternoon-Evening: Quiz & Cultural Program<br>• **8:00 PM – 9:00 PM: Dinner** |`
  },
  {
    title: "Official HDBS 2026 Puja Food Menu (Lunch & Dinner Dishes)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/2026-puja/2026-puja-food-menu/",
    flyerImagePath: "/flyers/2026PujaFoodMenu.jpeg",
    section: "Puja Food Menu",
    content: `HDBS 2026 PUJA FOOD MENU — LUNCH & DINNER DISHES
Official Source: https://durgabari.org/2026-puja/2026-puja-food-menu/ (Official Flyer: 2026PujaFoodMenu.jpeg)

### 🍽️ COMPLETE PUJA FOOD MENU TABLE:
| Puja Dates | Lunch / Dinner | Adult / Kids | Source | Food Menu Items |
| :--- | :--- | :--- | :--- | :--- |
| **Friday, October 16** | **DINNER** (8:30 PM – 9:30 PM) | **ADULT** | IN HOUSE | Basmati Rice, Masoor Dal, Kurkure, Alubhaja, Sukto, Echorer Dalna, Gulab Jamun |
| | **DINNER** (8:30 PM – 9:30 PM) | **KIDS** | OUTSOURCED | Chicken / Veg Sandwich, Fries, Chocolate Chips, Cookie, Juice |
| **Saturday, October 17** | **LUNCH** (1:00 PM – 2:00 PM) | **ADULT** | OUTSOURCED | Basmati Rice, Yellow Dal, Alu Paratha, Navratan Korma, Malai Kofta, Rasmalai |
| | **LUNCH** (1:00 PM – 2:00 PM) | **KIDS** | OUTSOURCED | Butter Nan, Jeera Rice, Butter Chicken / Butter Paneer, Gulab Jamun, Water |
| | **DINNER** (8:30 PM – 9:30 PM) | **ADULT** | IN HOUSE | Basanti Pulao, Cholar Daal, Pakora, Alu Potol Rosha, Chilli Paneer, Malpoa |
| | **DINNER** (8:30 PM – 9:30 PM) | **KIDS** | OUTSOURCED | Noodles, Chilli Chicken / Veg Manchurian, Muffins, Water |
| **Sunday, October 18** | **LUNCH** (1:00 PM – 2:00 PM) | **ADULT** | IN HOUSE | Khichuri, Badhakopir Tarkari, Beguni, Tomato-Khejur Chutney, Rosogolla |
| | **LUNCH** (1:00 PM – 2:00 PM) | **KIDS** | OUTSOURCED | Pizza, Pirates Booty (Chips), Knott’s Strawberry Shortbread, Juice |
| | **DINNER** (8:30 PM – 9:30 PM) | **ADULT & KIDS** | OUTSOURCED | Choley / Bhatura (Onsite Frying), Veg Pulao, Pakora, Veg Diwani Handi, Kesar Halwa |
| **Saturday, October 24** | **DINNER** (8:30 PM – 9:30 PM) | **ADULT & KIDS (Non-Veg)** | IN HOUSE | Basmati Rice, Goat Curry or Chicken Curry, Kancha Amer Chutney, Ice Cream (Cup) |
| | **DINNER** (8:30 PM – 9:30 PM) | **ADULT & KIDS (Veg [V])** | IN HOUSE (V) | Basmati Rice, Tok Daal, Dhokar Dalna, Methi Saag (w begun), Alu Beans Posto, Kancha Amer Chutney, Ice Cream (Cup) |

### 📋 DETAILED DAY-BY-DAY FOOD MENU BREAKDOWN:

#### 1. Friday, October 16 (Maha Shashti)
- **Lunch**: No lunch scheduled.
- **Adult Dinner (In-House)**:
  * Basmati Rice
  * Masoor Dal
  * Kurkure
  * Alubhaja (Potato Fry)
  * Sukto
  * Echorer Dalna (Raw Jackfruit Curry)
  * Gulab Jamun
- **Kids Dinner (Outsourced)**:
  * Chicken / Veg Sandwich
  * French Fries
  * Chocolate Chips & Cookie
  * Juice

#### 2. Saturday, October 17 (Maha Saptami)
- **Adult Lunch (Outsourced)**:
  * Basmati Rice
  * Yellow Dal
  * Alu Paratha
  * Navratan Korma
  * Malai Kofta
  * Rasmalai
- **Kids Lunch (Outsourced)**:
  * Butter Nan
  * Jeera Rice
  * Butter Chicken / Butter Paneer
  * Gulab Jamun
  * Water
- **Adult Dinner (In-House)**:
  * Basanti Pulao
  * Cholar Daal
  * Pakora
  * Alu Potol Rosha
  * Chilli Paneer
  * Malpoa
- **Kids Dinner (Outsourced)**:
  * Noodles
  * Chilli Chicken / Veg Manchurian
  * Muffins
  * Water

#### 3. Sunday, October 18 (Maha Ashtami)
- **Adult Lunch (In-House Traditional Bhog)**:
  * Khichuri
  * Badhakopir Tarkari (Cabbage Curry)
  * Beguni (Eggplant Fritters)
  * Tomato-Khejur Chutney (Tomato Date Chutney)
  * Rosogolla
- **Kids Lunch (Outsourced)**:
  * Pizza
  * Pirates Booty (Chips)
  * Knott’s Strawberry Shortbread
  * Juice
- **Adult & Kids Dinner (Outsourced)**:
  * Choley / Bhatura (Fresh Onsite Frying)
  * Veg Pulao
  * Pakora
  * Veg Diwani Handi
  * Kesar Halwa

#### 4. Saturday, October 24 (Dashami & Bijoya Sammiloni Dinner)
- **Lunch**: No lunch scheduled.
- **Adult & Kids Dinner — Regular / Non-Vegetarian (In-House)**:
  * Basmati Rice
  * Goat Curry OR Chicken Curry
  * Kancha Amer Chutney (Raw Mango Chutney)
  * Ice Cream (Cup)
- **Adult & Kids Dinner — Vegetarian (In-House [V])**:
  * Basmati Rice
  * Tok Daal (Tangy Lentil Soup)
  * Dhokar Dalna (Lentil Cake Curry)
  * Methi Saag with Begun (Fenugreek Greens with Eggplant)
  * Alu Beans Posto (Potato & Green Beans in Poppy Seed Paste)
  * Kancha Amer Chutney (Raw Mango Chutney)
  * Ice Cream (Cup)

Additional Festive Dining Events:
- **Sunday, October 11 (Mahalaya & Anandamela)**: 12:00 PM – 2:00 PM: Food Fest (Anandamela community food fair).
- **Saturday, November 7 (Pre Kali Puja)**: 8:30 PM – 9:30 PM: Dinner: Deepabali Sandhyo-Bhoj.
- **Sunday, November 8 (Kali Shyama Puja)**: 8:30 PM – 9:30 PM: Dinner: Puja Savory.
- **Saturday, February 13, 2027 (Saraswati Puja)**: 1:00 PM: Lunch – Traditional Puja Lunch | 8:00 PM – 9:00 PM: Dinner.`
  },
  {
    title: "Official Durga Puja 2026 Puja Timings (Bhog, Pushpanjali, and Sandhya Arati)",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    section: "Puja Timings: Bhog, Pushpanjali & Sandhya Arati",
    content: `HDBS 2026 Durga Puja Official Puja Timings (Source: https://durgabari.org/2026-puja/puja-schedule/ Puja Timings column):

CRITICAL GUIDELINE:
- When asked about Bhog, Pushpanjali, and Sandhya Arati timings, refer strictly to the "Puja Timings" column.
- For community Lunch and Dinner schedules, refer to the "Program Details" column.

Official Ritual & Puja Timings by Day:
- **Saturday, October 10, 2026 (Til Tarpan)**:
  - 7:00 AM – 9:30 AM: Til Tarpan
- **Sunday, October 11, 2026 (Mahalaya / Anandamela)**:
  - 9:00 AM: Durga Puja
  - 10:00 AM: Mahishasur Mardini
  - **12:00 PM: Pushpanjali, Bhog, Arati**
- **Thursday, October 15, 2026 (Maha Shashti Bodhan)**:
  - 6:00 PM: Bodhan & Arati
- **Friday, October 16, 2026 (Maha Shashti)**:
  - 10:30 AM: Maha Shashti Puja
  - 6:00 PM: Amantran & Adhibas
  - **7:00 PM: Pushpanjali, Bhog, Sandhya Arati**
- **Saturday, October 17, 2026 (Maha Saptami)**:
  - 9:00 AM: Kalabou Snan
  - 10:00 AM: Maha Saptami Puja
  - 12:00 PM: Balidaan
  - **12:30 PM: Pushpanjali, Bhog, Arati**
  - **7:00 PM: Sandhya Arati**
- **Sunday, October 18, 2026 (Maha Ashtami)**:
  - 10:00 AM: Maha Ashtami Puja
  - 12:00 PM: Bolidaan
  - **12:30 PM: Pushpanjali, Bhog, Arati**
  - **6:00 PM: Sandhya Arati**
  - **8:56 PM: Maha Sandhi Puja** (108 Lotuses & 108 Pradip)
- **Monday, October 19, 2026 (Maha Nabami Tithi)**:
  - 10:30 AM: Maha Nabami Puja
  - 12:00 PM: Bolidaan
  - **12:30 PM: Pushpanjali, Bhog, Arati**
  - **7:00 PM: Sandhya Arati**
- **Tuesday, October 20, 2026 (Maha Dashami Tithi)**:
  - 11:00 AM: Puja and Dadhikarma
- **Saturday, October 24, 2026 (Dashami & Bijoya Sammiloni)**:
  - 3:30 PM – 4:30 PM: Aparajita Pujo (Temple)
  - 4:30 PM – 5:15 PM: Bishorjon Procession and Immersion
  - 5:30 PM – 6:30 PM: Sindoor Khela
- **Sunday, October 25, 2026 (Lokkhi Puja)**:
  - **6:00 PM: Kojagari Lokkhi Puja, Pushpanjali, Bhog, Arati**
  - 7:30 PM: Prasad
- **Saturday, November 7, 2026 (Pre Kali Puja)**:
  - **7:00 PM: Sandhya Arati**
  - 7:30 PM: Fireworks
- **Sunday, November 8, 2026 (Kali Shyama Puja)**:
  - 6:30 PM: Kali Puja, Bolidaan
  - **7:30 PM: Pushpanjali, Bhog, Arati**
- **Saturday, February 13, 2027 (Saraswati Puja)**:
  - 10:00 AM: Haate Khori
  - 11:00 AM: Puja
  - **12:30 PM: Pushpanjali, Bhog, Arati**
  - **6:30 PM: Sandhya Arati**`
  },
  {
    title: "Til Tarpan (Mahalaya Eve) 2026 Schedule & Rituals",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    section: "Pre-Puja Schedule",
    content: `Date: Saturday, October 10, 2026
Event: Til Tarpan (Mahalaya Eve ritual honoring ancestors)
Timings: 7:00 AM – 9:30 AM
Puja Timings: 7:00 AM – 9:30 AM: Til Tarpan
Program Details: —
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
Event: Mahalaya Morning Invocations & Anandamela (Source: https://durgabari.org/2026-puja/puja-schedule/)
Puja Timings:
- 09:00 AM: Durga Puja
- 10:00 AM: Mahishasur Mardini sacred recitation & chanting
- 12:00 PM: Pushpanjali, Bhog, Arati
Program Details:
- 12:00 PM – 2:00 PM: Food Fest (Anandamela traditional food fair and community stalls)
- 3:00 PM: Ek Je Chhilo Nayak (Uttam Kumar retro musical)
- 4:30 PM: Thakurbarir Ghore Baire (Fashion Show)
Venue: Main Shrine & Temple Grounds, Houston Durga Bari Society (13944 Schiller Rd).`
  },
  {
    title: "Maha Shashti 2026 Schedule (Oct 15 & Oct 16)",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    section: "Maha Shashti",
    content: `Official Maha Shashti Schedule (https://durgabari.org/2026-puja/puja-schedule/):
- Thursday, October 15, 2026:
  - Puja Timings: 06:00 PM: Bodhan & Arati (Awakening under the sacred Bilva tree)
  - Program Details: —
- Friday, October 16, 2026:
  - Puja Timings:
    - 10:30 AM: Maha Shashti Puja
    - 06:00 PM: Amantran & Adhibas
    - 07:00 PM: Pushpanjali, Bhog, Sandhya Arati
  - Program Details:
    - 06:30 PM: Musical journey along Silk Route
    - 07:30 PM: Udbodhan / Parikrama
    - **08:30 PM – 09:30 PM: Dinner – Culinary Celebration**
    - 10:00 PM: Ankita Bhattacharyya & Subhadeep Das Choudhury musical nite
  - *Note on Lunch*: No lunch is scheduled in Program Details for Friday, Oct 16.`
  },
  {
    title: "Maha Saptami 2026 Schedule (Saturday, Oct 17)",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    section: "Maha Saptami",
    content: `Official Maha Saptami Schedule (Saturday, October 17, 2026 from https://durgabari.org/2026-puja/puja-schedule/):
Puja Timings:
- 09:00 AM: Kalabou Snan (Navapatrika Pravesh & Snan)
- 10:00 AM: Maha Saptami Puja
- 12:00 PM: Balidaan
- 12:30 PM: Pushpanjali, Bhog, Arati
- 07:00 PM: Sandhya Arati with resonant Dhaak drums & Dhunuchi dance

Program Details (Lunch, Dinner & Cultural Programs):
- **01:00 PM – 02:00 PM: Lunch: Bengali cuisine treat**
- 06:30 PM: Saat Ronger Saat Paak (Wedding traditions)
- **08:30 PM – 09:30 PM: Dinner: Gastronomic experience**
- 10:00 PM: Mahalaxmi Iyer & Sourav Das magical melodies`
  },
  {
    title: "Maha Ashtami & Maha Sandhi Puja 2026 Schedule (Sunday, Oct 18)",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    section: "Maha Ashtami & Maha Sandhi Puja",
    content: `Official Maha Ashtami & Sandhi Puja Schedule (Sunday, October 18, 2026 from https://durgabari.org/2026-puja/puja-schedule/):
Puja Timings:
- 10:00 AM: Maha Ashtami Puja
- 12:00 PM: Bolidaan
- 12:30 PM: Pushpanjali, Bhog, Arati
- 06:00 PM: Sandhya Arati
- **08:56 PM: MAHA SANDHI PUJA** (Sacred juncture of Ashtami and Nabami; offering of 108 lotuses and 108 pradip)

Program Details (Lunch, Dinner & Cultural Programs):
- **01:00 PM – 02:00 PM: Lunch: Maha Ashtami traditions on your plate**
- 02:45 PM: Alo Amar (Tagore Society Youth Orchestra)
- 03:30 PM: Pancho Kobir Monone Rashobodh (Homage to Bengal's 5 Bards)
- 04:30 PM: Boroder Adda (Seniors' Reminiscence)
- **08:30 PM – 09:30 PM: Dinner: Puja feast continues next weekend**`
  },
  {
    title: "Maha Nabami (Tithi) 2026 Schedule (Monday, Oct 19)",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    section: "Maha Nabami (Tithi)",
    content: `Official Maha Nabami (Tithi) Schedule (Monday, October 19, 2026 from https://durgabari.org/2026-puja/puja-schedule/):
Puja Timings:
- 10:30 AM: Maha Nabami Puja
- 12:00 PM: Bolidaan
- 12:30 PM: Pushpanjali, Bhog, Arati
- 07:00 PM: Sandhya Arati accompanied by Dhaak and Kanshi
Program Details:
- — (No community lunch or dinner listed in Program Details)`
  },
  {
    title: "Maha Dashami (Tithi) 2026 Schedule (Tuesday, Oct 20)",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    section: "Maha Dashami (Tithi)",
    content: `Official Maha Dashami (Tithi) Schedule (Tuesday, October 20, 2026 from https://durgabari.org/2026-puja/puja-schedule/):
Puja Timings:
- **11:00 AM: Puja and Dadhikarma (Official Tithi ritual)**
Program Details:
- —
Note: In accordance with the official schedule at https://durgabari.org/2026-puja/puja-schedule/, the religious tithi Puja and Dadhikarma for Maha Dashami is observed on **Tuesday, October 20, 2026**, while the community-wide Dashami celebration and Bijoya Sammiloni (including Sindoor Khela, Bhasaan, and concert) is held on **Saturday, October 24, 2026**.`
  },
  {
    title: "Dashami (General) & Bijoya Sammiloni 2026 (Saturday, Oct 24)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    flyerImagePath: "/assets/aistudio/Oct24_Bijoy_Sammelini_Schedule_996bbe0e.jpeg",
    section: "Dashami & Bijoya Sammiloni",
    content: `Official Dashami & Bijoya Sammiloni Schedule (Saturday, October 24, 2026):
Source: Official Event Schedule Flyer (Oct24_Bijoy_Sammelini_Schedule_996bbe0e.jpeg) & https://durgabari.org/2026-puja/puja-schedule/

### 🌸 Official Saturday, 24th October Event Schedule:
- **3:30 PM – 4:30 PM**: **Aparajita Pujo (Temple)** — Concluding puja rituals in the temple.
- **4:30 PM – 5:15 PM**: **Bishorjon Procession and Immersion** — Sacred Bishorjon procession and idol immersion rituals accompanied by resonant Dhaak rhythms.
- **5:30 PM – 6:30 PM**: **Sindoor Khela** — Sacred traditional Sindoor Khela ceremony celebrating sisterhood, marital blessings, and victory.
- **6:30 PM**: **Next Gen Performance (ধুনুচি ও ঢাক / Dhunuchi & Dhaak)** — Youth & Next Gen performance showcasing traditional Dhunuchi dance to beats of Dhaak.
- **7:00 PM – 8:00 PM**: **Dhunuchi Competition (তালে ও ছন্দে ধুনুচি / Taale o Chhonde Dhunuchi)** — Grand energetic Dhunuchi dance competition celebrating rhythm and devotion.
- **6:30 PM – 8:00 PM**: **Snacks (On Purchase until supplies last)** — Evening savory refreshments and traditional snacks available on purchase at food stalls.
- **8:30 PM – 9:30 PM**: **Dinner (Subho Bijoya Gala Dinner)**:
  * Non-Vegetarian: Basmati Rice, Goat Curry or Chicken Curry, Kancha Amer Chutney, Ice Cream Cup.
  * Vegetarian: Basmati Rice, Tok Daal, Dhokar Dalna, Methi Saag (w begun), Alu Beans Posto, Kancha Amer Chutney, Ice Cream Cup.
- **9:30 PM**: **Ms. Jojo & Troupe Musical Extravaganza** — Grand live musical concert in Sur Auditorium featuring Ms. Jojo & Troupe.
- *Note on Lunch*: No lunch is scheduled in Program Details for Saturday, Oct 24.

### 🚌 Shuttle Service Notice:
- **Shuttle Service from West Oaks Mall will operate from 2:30 PM onwards till show ends**.
- Pickup Location: West Oaks Mall (Near Dillard's Clearance Center, 1000 West Oaks Mall #800, Houston, TX 77082). Free parking and continuous air-conditioned bus shuttle directly to/from HDBS temple campus.`
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
    title: "Official HDBS 2026 Puja Passes & Day Passes Policy (Limited Passes Available)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/2026-puja/registration/",
    flyerImagePath: "/flyers/PujaPasses2026.jpeg",
    section: "Puja Passes & Day Passes",
    content: `HDBS 2026 PUJA PASSES & DAY PASSES POLICY
Source: Official Registration Portal at https://durgabari.org/2026-puja/registration/ (Official Flyer: PujaPasses2026.jpeg)

### 🎟️ ARE DAY PASSES AVAILABLE?
YES. **LIMITED PASSES ARE AVAILABLE** for Houston Durga Bari Society Sharadotsav 2026.
- **How to Apply**: Visit **Puja Registration & Donation > Special Processing > Day Passes** on the online registration portal (https://puja.durgabari.org/HDBS_Puja_Payments/onlinepujapayments/onlinepujapayments via https://durgabari.org/2026-puja/registration/).
- **Full Registration Continues**: Both Onsite and Online.

### 💰 RATE TABLE (FAMILY / INDIVIDUAL RATES):
| Category / Residency | Fri Oct 16 (Evening) | Sat Oct 17 (Full Day) | Sat Oct 17 (Evening) | Sun Oct 18 (Full Day) | Sat Oct 24 (Evening) |
|---|---|---|---|---|---|
| **Greater Houston Residents** | NOT OFFERED | NOT OFFERED | NOT OFFERED | **$130 / $65** | NOT OFFERED |
| **Out of Towners** *(Online address validation)* | **$200 / $100** | **$260 / $130** | **$240 / $120** | **$130 / $65** | **$260 / $130** |

*Note: In the table above, rates are displayed as Family Rate / Individual Rate (e.g. $130 Family / $65 Individual).*

### 📋 NOTES & GUIDELINES FOR PASS HOLDERS:
1. **Cultural Programs Access**: Passes provide full access to all cultural programs in Sur Auditorium, including external invited artists and performances.
2. **Meals Included**:
   - **Day Pass**: Includes both **Lunch and Dinner**.
   - **Evening Pass**: Includes **Dinner only**.
3. **Parking Policy for Day/Evening Pass Holders**:
   - **NO onsite parking available** for Day or Evening Pass holders.
   - Registrants and pass holders can use the **free continuous shuttle bus service from West Oaks Mall** (near Dillard's Clearance Center) or use rideshare (Uber / Lyft).
4. **Temple Entry & Darshan**:
   - Visiting the temple sanctuary for Maa Durga's darshan, offering floral Pushpanjali, and witnessing sacred Arati is always **completely free and open to all devotees** without purchasing passes or tickets.

### 📞 CONTACTS FOR DAY PASSES:
- **Email**: registration@durgabari.org
- **Phone Contacts**:
  - Anindita: 713-808-5286
  - Sampurna: 346-257-1068`
  },
  {
    title: "Official HDBS 2026 Onsite Puja Registration, Decals & Badges Guide",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/2026-puja/registration/",
    flyerImagePath: "/flyers/PujaReg2026_2.jpeg",
    section: "Onsite Registration & Badges",
    content: `HOUSTON DURGA BARI SOCIETY - YOUR GUIDE TO ONSITE PUJA REGISTRATION
Source: Official Registration Portal at https://durgabari.org/2026-puja/registration/ (Official Flyer: PujaReg2026_2.jpeg)

### 🗓️ SCHEDULE & DISTRIBUTION DETAILS:
| Item / Activity | October 11 (12:30 – 3:00 PM) | October 14 (7:30 – 9:00 PM) | During Puja (Oct 16, 17, 18, 24) |
|---|---|---|---|
| **Parking Decals** | Distribution Session #3 | Last pre-Puja distribution | **Have not picked-up your decal?** Please use the shuttle from West Oaks Mall or use Uber/Lyft to come to DB and collect your decal. |
| **Registration Badges** | Distribution Session #1 (Badges & Magazine* - Collect lanyards & badge holders) | Last pre-Puja distribution (Badges & Magazine* - Collect lanyards & badge holders) | **Badge Distribution, Onsite Registration & Donation**:<br>• Oct 16: 6:30 PM<br>• Oct 17: 10:30 AM & 7:00 PM<br>• Oct 18: 11:00 AM & 7:30 PM<br>• Oct 24: 7:30 PM |

### 🚗 PARKING DECALS CRITICAL NOTES:
- Reserved parking continues to Kali Puja. Please preserve your decals.
- Parking decals are **not transferable**.
- Must be affixed to car windshields for admission to the premises.
- E-authorization is necessary if someone else is picking up on your behalf.

### 🏷️ REGISTRATION BADGES CRITICAL NOTES:
- Integrated badge covering both Durga Puja & Kali Puja.
- If you have registered for All 3 Pujas, preserve your badges for Kali Puja.
- E-authorization is necessary if someone else is picking up.
- Email: registration@durgabari.org`
  },
  {
    title: "Official HDBS 2026 Puja Sponsorship Tiers, Benefits & Parking Privileges",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/2026-puja/registration/",
    flyerImagePath: "/flyers/2026PujaSposorship.jpeg",
    section: "Sponsorship & Benefits",
    content: `HDBS 2026 PUJA SPONSORSHIP TIERS & BENEFITS
Source: Official Registration Portal at https://durgabari.org/2026-puja/registration/ (Official Flyer: 2026PujaSposorship.jpeg)

### 🏆 SPONSORSHIP TIERS & BENEFITS MATRIX (501(c)(3) Tax-Deductible):
| Sponsorship Benefits | Diamond ($5,000+) | Emerald ($2,200 – $4,999) | Platinum ($1,500 – $2,199) | Gold ($1,000 – $1,499) | Silver ($750 – $999) |
|---|---|---|---|---|---|
| **Reserved Parking** | Main Parking (Named slots for $10K+) | Main Parking | Main or Kala Bhavan (KB) Parking (in order of date of sponsorship) | Green Field Parking (KB Parking for CT Gold) | Green Field Parking (KB Parking for Senior CT Silver) |
| **Food & Registration** | Separate Lanes | Separate Lanes | Separate Lanes | Separate Lanes | Separate Lanes |
| **Parents Courtesy Registration** | ✓ Included | ✓ Included | ✓ Included | ✓ Included | ✓ Included |
| **Auditorium Front Rows** | ✓ Included | ✓ Included | ✓ Included | ✓ Included | — |
| **Priority Access to Snacks Stall** | ✓ Included | ✓ Included | — | — | — |
| **Reserved Table at Food Tent** | Close family members can join (eligibility conditions apply, registration mandatory, special badges) | Sponsors only | — | — | — |
| **Puja Sankalpa** | ✓ Included | ✓ Included | ✓ Included | ✓ Included | — |
| **Event Sponsorship & Special Recognition** | ✓ Included | — | — | — | — |

### 💳 RECURRING DONATIONS INFORMATION:
- Prefer to spread your donation over time? You can set up recurring ACH donations directly through your bank's online portal.
- Please contact **registration@durgabari.org** or **treasurer@durgabari.org** for HDBS Puja account and routing information.
- Sponsorship level will be based on total donation actually received.

### 📌 FOOTNOTES & DISCLAIMERS:
- Registration mandatory for sponsorship (optional for Diamond Sponsors).
- Auditorium seating subject to allocated capacity.
- Parking subject to availability. Devotees without assigned parking decals must park at West Oaks Mall overflow parking and take the free shuttle.

### 📞 SPONSORSHIP CONTACT DETAILS:
- **Email**: registration@durgabari.org | treasurer@durgabari.org
- **Calls**:
  - Subhas: 832-677-0860
  - Swapan: 713-254-1231
  - Souvik: 419-709-5527`
  },
  {
    title: "HDBS Puja Parking & Free Bus Shuttle Schedule Guidelines",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/2026-puja/parking-bus-schedule/",
    flyerImagePath: "/flyers/hdbs_2026_parking_bus_schedule.jpeg",
    section: "Logistics & Parking",
    content: `HDBS 2026 Puja Parking & Shuttle Guidelines (Official Flyer & Records):

### 🚌 Free Air-Conditioned Shuttle Bus Schedule (West Oaks Mall ⇄ HDBS Temple):
Shuttle bus transportation is provided FREE to/from Houston Durga Bari Society (13944 Schiller Rd).

#### Durga Puja Shuttle Timings:
| Date | Day | Shuttle Operating Hours | Location / Pickup Point |
|---|---|---|---|
| Friday, Oct 16, 2026 | Friday | 5:00 pm – 12:30 am | West Oaks Mall (Near Dillard's Clearance Center) |
| Saturday, Oct 17, 2026 | Saturday | 9:00 am – 12:30 am | West Oaks Mall (Near Dillard's Clearance Center) |
| Sunday, Oct 18, 2026 | Sunday | 9:00 am – 10:30 pm | West Oaks Mall (Near Dillard's Clearance Center) |
| Saturday, Oct 24, 2026 | Saturday | 2:30 pm onwards till show ends | West Oaks Mall (Near Dillard's Clearance Center) |

#### Kali Puja Shuttle Timings:
| Date | Day | Shuttle Operating Hours | Location / Pickup Point |
|---|---|---|---|
| Saturday, Nov 7, 2026 | Saturday | 5:00 pm – 12:30 am | West Oaks Mall (Near Dillard's Clearance Center) |
| Sunday, Nov 8, 2026 | Sunday | 5:00 pm – 10:30 pm | West Oaks Mall (Near Dillard's Clearance Center) |

### 🅿️ Off-Site Overflow Parking Details:
- **Designated Location**: WEST OAKS MALL
- **Address**: 1000 West Oaks Mall #800, Houston, TX 77082
- **Exact Landmark**: Near Dillard's Clearance Center
- **Perks & Amenities**: FREE parking, On-site security personnel, complimentary shuttle bus transportation directly to/from Durga Bari campus.
- **NOT at Alief High School**: Parking is strictly NOT permitted at Alief High School or any Alief ISD school.

### 🚗 On-Premises Parking Rules & Decal Requirement:
- "To park on the premises, all cars must have the approved DECAL clearly affixed to the windshield."
- Reserved for seniors (65+), registered Diamond/Emerald/Platinum/Gold/Silver sponsors with official vehicle decals, and authorized personnel.

### ♿ Disabled / Accessible Parking Policy:
- Limited disabled parking spots (per state law) assigned on a First-Come, First-Served basis.
- Once full, only drop-offs will be allowed for cars with State-issued disabled parking permits.
- Devotees with Green Field decals (in addition to disabled parking permits) will be asked to proceed to the Green Field for parking.

### 🚕 Uber / Rideshare Guidelines:
- UBER PICK UP AND DROP OFF ALLOWED (NO WAITING).
- Access route: Via Schiller Road.

### ⚠️ City Parking Advisory:
- CITY PARKING is NOT managed by HDBS or the Security team.
- Avoid parking there for prolonged hours (over 1 hour).
- HDBS is not answerable to any HPD (Houston Police Department) query or citations.

### 📍 Source Citation:
- **Source Document**: HDBS Puja Parking & Bus Schedule Flyer
- **Source Portal**: Official HDBS Website (https://durgabari.org/2026-puja/parking-bus-schedule/)
- **Section**: Puja Parking and Bus Schedule
- **Flyer File**: /flyers/hdbs_2026_parking_bus_schedule.jpeg`
  },
  {
    title: "Anna Bhog Dining, Lunch & Dinner Schedule Guidelines",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    section: "Bhog & Dining Logistics",
    content: `HDBS 2026 Dining, Lunch & Dinner Guidelines (Source: https://durgabari.org/2026-puja/puja-schedule/):
- **Official Lunch & Dinner Serving Schedule (Program Details Column)**:
  * **Friday, Oct 16 (Maha Shashti)**: Dinner: 8:30 PM – 9:30 PM (Dinner – Culinary Celebration). No lunch scheduled.
  * **Saturday, Oct 17 (Maha Saptami)**: Lunch: 1:00 PM – 2:00 PM (Lunch: Bengali cuisine treat) | Dinner: 8:30 PM – 9:30 PM (Dinner: Gastronomic experience).
  * **Sunday, Oct 18 (Maha Ashtami)**: Lunch: 1:00 PM – 2:00 PM (Lunch: Maha Ashtami traditions on your plate) | Dinner: 8:30 PM – 9:30 PM (Dinner: Puja feast continues next weekend).
  * **Saturday, Oct 24 (Dashami & Bijoya Sammiloni)**: Dinner: 8:30 PM – 9:30 PM (Dinner: Subho Bijoya gala dinner).
  * **Sunday, Oct 11 (Anandamela)**: 12:00 PM – 2:00 PM: Food Fest.
- **Puja Bhog Offerings (Puja Timings Column)**:
  * Maha Shashti (Oct 16): 7:00 PM (Bhog, Pushpanjali, Sandhya Arati)
  * Maha Saptami (Oct 17): 12:30 PM (Bhog, Pushpanjali, Arati)
  * Maha Ashtami (Oct 18): 12:30 PM (Bhog, Pushpanjali, Arati)
  * Maha Nabami (Oct 19): 12:30 PM (Bhog, Pushpanjali, Arati)
- Bhog is served hot in the air-conditioned Bhog Hall during festival days.
- Coupon Requirement: To minimize wait times, attendees display digital QR code or paper wristband/token issued at the Helpdesk.
- Traditional Menu: Pure vegetarian feast including Bengali Bhoger Khichuri, Labra (mixed seasonal vegetable), Beguni, Chutney, and Payesh.
- Takeout / To-Go Boxes: Designated express pickup counter for pre-ordered takeout packets.`
  },
  {
    title: "Official HDBS 2026 Puja Committee Leadership Directory & Leads",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/2026-puja-committee/",
    section: "Puja Committee Leadership",
    content: `HDBS 2026 PUJA COMMITTEE & LEADERSHIP DIRECTORY
Official Source: https://durgabari.org/2026-puja/2026-puja-committee/

### 🏛️ CORE PUJA LEADERSHIP:
- **Puja Chair / Chairman**: **Souvik Ghose**
- **Secretaries**: Piyali Chatterjee, Raj Sen
- **Treasurer**: Dhruba Ghose, Sujay Kahali (EB representative)
- **Procurement Planner**: Puja Committee (Souvik Ghose, Piyali Chatterjee, Raj Sen, Dhruba Ghose)

### 📋 COMPLETE COMMITTEE DIRECTORY (ROLES, LEADS & ASSOCIATES):
| Role / Committee | Leads & Associates |
|---|---|
| **Puja Chair (Chairman)** | **Souvik Ghose** |
| **Secretaries** | Piyali Chatterjee, Raj Sen |
| **Treasurer** | Dhruba Ghose, Sujay Kahali (EB representative) |
| **Priest Panel** | Buddhadev Bhattachariya, Amrit Achari, Jaidev Goswami, Partha Sarathi Chatterjee, Subhashis Mallick, Ranadip Ganguly |
| **Temple** | Paromita Nag, Poulami Bhattacharya (associate) |
| **Dhakis** | Devangshu Goswami, Rishiprotim Nag (associate) |
| **Mahalaya (Mahishasuramardini)** | Mita Shome |
| **Anandamela** | Suchitra Roy (advisor), Poulami Bhattacharya, Ujjayini Bhaduri |
| **Cultural** | Sayoni Rakshit, Shiladitya Sengupta, Arpita Mukhopadhayay (Advisor) |
| **SLAM Temple** | Sayontan Sinha |
| **SLAM (Non-Temple)** | Palas Chanda, Subhransu Sinha |
| **Parking & Security & Transportation** | Dip Kumar Das, Tanmoy Chatterjee, Sandip Dasgupta-Katy (associate), Samrat (associate), Partha Ghosal (advisor) |
| **Facility Management & Safety** | Shilpi Saha, Biren Das Biswas (associate) |
| **Resource Mgt (Paid Helpers - non-Kitchen, non-Temple)** | Swati Ghoshal, Shilp Saha (associate) |
| **Fundraising** | Ranadip Ganguly, Nirmalya Roy, Swapan Das (Advisor), Raj Sen, Souvik Ghose |
| **Tent Management** | Amal Ray, Arup Karmakar (associate) |
| **Registration** | Subhas Das, Amit Bhaduri (associate) |
| **Procurement Planner** | Puja Committee (Souvik Ghose, Piyali Chatterjee, Raj Sen, Dhruba Ghose) |
| **Kitchen (KFC, Food in-house, outsource)** | Pradip Saha, Rajib Datta |
| **Food Distribution (from Main Tent)** | Sukhen Ghosh, Nilotpal Chatterjee |
| **Snacks** | Santanu Mukhopadhyay |
| **Commercials, Advertisement** | Debasish Bose, Dipankar Sinha Roy |
| **Commercials Corp Advertisement** | Arijeet Majumdar |
| **Website & Communication** | Arup Karmakar |
| **IT Systems** | Shibir Chowdhury |
| **Communication Lead** | Madhumita Sengupta |
| **Social Channel** | Partha Sarathi Chatterjee |
| **EB Co-ordination** | Sandip Bhattacharya, Arnendu Bose |
| **Puja Vibes (Reel, Feed to Insta, pep-talk)** | Debarpita Ghosh, Baidurya Banerjee |
| **Decoration – Outdoor / Non-Temple area** | Sayoni Bhattacharya, Sourav Ghosh |
| **Foyer, Photo Booth, Street Alpona (retouch)** | Sayoni Bhattacharya, Sourav Ghosh |
| **Auditorium Entrance Alpona (retouch)** | Sreejita Chakraborty (associate) |
| **Snacks Area** | Arpita Mukhopadhya & Soma Saha |
| **Big Tent, Registration Tent, Infotainment Tent** | Sailaja Bandhopadhyay, Ujjawani Bhaduri (associate), Malobika Das (associate) |
| **Decoration – Temple (+Anjali Tent, Temple Entrance)** | Nivedita Hatty and team (associates) |
| **Electrical & Lightings** | Abhishek Banerjee, Suprakash Biswas (associates), Soubhik Sarkar (associate), Deb (Dibyendu) Ghosh (advisor) |
| **Digital Design (Poster, eCard, Invitation Card)** | Malobika Das, Manas Saha (associate) |
| **Infotainment** | Soovo Sen, Rajiv Saha |
| **Hospitality (External Artists)** | Sanjib Chouwdhary, Partha Sarkar, Debarpita Ghosh (associate), Samrat (associate) |
| **Magazine Lead** | Abhijit Bhattacharyya (Lead), Sumita Basu (advisor) |
| **Bengali Section** | Sumita Basu (associate), Partha Sen (associate), Shyamali Mitra (associate), Abhijit Mitra (associate), Debabrata Bhattacharya (associate) |
| **English Section** | Anushree Mukherjee (associate), Binita Roy (associate) |
| **Kids Section** | Debleena Banga (associate), Monalisa Sarkar (associate) |
| **Graduation Section** | Mithu Ghosh (associate), Soma Saha (associate) |
| **Digital Arts** | Piyal Sengupta (associate), Malobika Das (associate) |
| **Next Gen** | Jhilmil Hatty, Atom Sarkar |
| **Onsite Collection** | Shibir Chowdhury, Aruni Chakrabarti, Gargi Ghose |
| **Kids Corner** | Ankita Siddhanta, Aarti Roy, Rahul Chakraborty, Atom Sarkar (associate) |
| **Photography** | Samar Adhikari |
| **Safety & Crowd** | Anirban Mukherjee |
| **Vendor Management** | Suchetana Mukherjee, Jayati Roychoudhury, Sujay Kahali (advisor) |
| **Videography** | Julie Lara, Arijeet Majumdar |
| **Signage Planner** | Sandip Dasgupta (Sugarland), Piyush Prakash (associate), Ashok Biswas (associate) |

### 🤝 VOLUNTEER & GENERAL CONTACTS:
- General Inquiries & Temple Office: (281) 589-7700 / feedback@durgabari.org
- General inquiries email: pc@durgabari.org
- Volunteer Signups: volunteers@durgabari.org`
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

- **Free Park-and-Ride Shuttle**: Devotees staying along Westheimer Rd or Hwy 6 can park at the official overflow parking at West Oaks Mall (1000 West Oaks Mall #800, near Dillard's Clearance Center) and take the free, air-conditioned HDBS shuttle bus directly to the temple gates. Shuttle Hours: Friday Oct 16 (5:00 pm – 12:30 am), Saturday Oct 17 (9:00 am – 12:30 am), Sunday Oct 18 (9:00 am – 10:30 pm), Saturday Oct 24 (2:30 pm onwards till show ends).
- **Rideshare Drop-off**: If taking Uber or Lyft from your hotel, direct the driver to Gate 2 on Schiller Road (UBER pick-up and drop-off allowed, no waiting).
- **Temple Address**: Houston Durga Bari Society, 13944 Schiller Rd, Houston, TX 77082.

### 📍 Source Citation:
- **Source Document**: HDBS Sharodotsav 2026 Out-of-Towner Visitor & Hospitality Guide
- **Source Portal**: Official HDBS Website (https://durgabari.org/2026-puja/)
- **Section**: Visitor Logistics, Lodging & Hospitality
- **Temple Contact**: (281) 530-0304 | lodging@durgabari.org`
  },
  {
    title: "HDBS Saturday, 24th October Event Schedule Flyer (Bijoya Sammiloni Updated)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/2026-puja/puja-schedule/",
    flyerImagePath: "/assets/aistudio/Oct24_Bijoy_Sammelini_Schedule_996bbe0e.jpeg",
    section: "Bijoya Sammiloni Event Schedule",
    content: `HOUSTON DURGA BARI SOCIETY — SATURDAY, 24TH OCTOBER EVENT SCHEDULE (OFFICIAL FLYER)
Flyer Asset: Oct24_Bijoy_Sammelini_Schedule_996bbe0e.jpeg
Header: Saturday, 24th October Event Schedule

### 🌸 Official Schedule of Events:
- **3:30 PM – 4:30 PM**: **Aparajita Pujo (Temple)** — Concluding sacred puja ritual at the temple sanctum.
- **4:30 PM – 5:15 PM**: **Bishorjon Procession and Immersion** — Sacred Bishorjon procession and idol immersion rituals accompanied by live Dhaak rhythm.
- **5:30 PM – 6:30 PM**: **Sindoor Khela** — Sacred traditional Sindoor Khela ceremony celebrating sisterhood, marital blessings, and victory.
- **6:30 PM**: **Next Gen Performance (ধুনুচি ও ঢাক / Dhunuchi & Dhaak)** — Youth & Next Gen performance showcasing traditional Dhunuchi dance to the beats of Dhaak.
- **7:00 PM – 8:00 PM**: **Dhunuchi Competition (তালে ও ছন্দে ধুনুচি / Taale o Chhonde Dhunuchi)** — Grand energetic Dhunuchi dance competition celebrating rhythm and devotion.
- **6:30 PM – 8:00 PM**: **Snacks (On Purchase until supplies last)** — Evening savory refreshments and snacks available on purchase at food stalls.
- **8:30 PM – 9:30 PM**: **Dinner (Subho Bijoya Gala Dinner)** — Authentic festive Bengali dining:
  * Non-Vegetarian: Basmati Rice, Goat Curry or Chicken Curry, Kancha Amer Chutney, Ice Cream (Cup)
  * Vegetarian: Basmati Rice, Tok Daal, Dhokar Dalna, Methi Saag (w begun), Alu Beans Posto, Kancha Amer Chutney, Ice Cream (Cup)
- **9:30 PM**: **Ms. Jojo & Troupe Musical Extravaganza** — Live musical concert in Sur Auditorium featuring Ms. Jojo & Troupe.

### 🚌 Free Shuttle Service from West Oaks Mall:
- **SHUTTLE SERVICE FROM WEST OAKS MALL WILL OPERATE FROM 2:30 PM ONWARDS TILL SHOW ENDS**.
- Free continuous shuttle buses between West Oaks Mall (near Dillard's Clearance Center, 1000 West Oaks Mall #800, Houston, TX 77082) and Houston Durga Bari Society (13944 Schiller Rd).`
  }
];
