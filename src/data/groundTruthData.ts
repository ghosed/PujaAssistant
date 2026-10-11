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
Phone: (281) 530-0304. Official Email: pujacommittee@durgabari.org and president@durgabari.org.
Official Website: https://durgabari.org/
HDBS is a registered 501(c)(3) non-profit socio-cultural and religious sanctuary established in 1999.
The temple sanctum sanctorum houses Maa Durga along with Lakshmi, Saraswati, Ganesha, and Kartikeya, as well as Bhagavan Shiva, Radha-Krishna, and Sri Ram Darbar.
The 2026 Sharodotsav (Durga Puja) festivities span October 2026, comprising Til Tarpan on Saturday, October 10, Mahalaya & Anandamela on Sunday, October 11, and the main Durga Puja from Friday, October 16 through Sunday, October 18, 2026.`
  },
  {
    title: "Til Tarpan (Mahalaya Eve) 2026 Schedule & Rituals",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/",
    section: "Pre-Puja Schedule",
    content: `Date: Saturday, October 10, 2026
Event: Til Tarpan (Mahalaya Eve ritual honoring ancestors)
Timings: 8:00 AM – 11:30 AM
Location: Temple Water Pavilion & Sacred Grounds at HDBS, 13944 Schiller Rd.
Ritual Details: Devotees perform Tarpan guided by temple priests to offer gratitude and peace to departed ancestors before welcoming Maa Durga. Devotees offer black sesame seeds (til), sacred kusha grass, white flowers, and Ganga jal.
Samagri: The temple provides essential puja samagri on site. Devotees are encouraged to wear clean traditional Indian attire. Registration is free and open to everyone; voluntary donations for the priests are welcome.`
  },
  {
    title: "Mahalaya Dawn Invocations & Chandi Path 2026",
    sourceType: "web_page",
    sourceUrl: "https://durgabari.org/2026-puja/",
    section: "Mahalaya Morning",
    content: `Date: Sunday, October 11, 2026
Event: Mahalaya Morning Invocations
Timings: 6:00 AM – 8:30 AM
Venue: Main Shrine, Houston Durga Bari Society (13944 Schiller Rd).
Details:
- 6:00 AM – 8:00 AM: Sacred live broadcast and recitation of Birendra Krishna Bhadra's immortal 'Mahishasuramardini' musical chants in the temple sanctum.
- 8:00 AM: Chandi Path chanted by HDBS Vedic priests.
- 8:30 AM: Morning Arati and floral pushpanjali offering by devotees.
- 9:00 AM: Morning prasad distribution.
Devotees gather at dawn to herald Devi's descent to Earth (Agomoni).`
  },
  {
    title: "Anandamela 2026: Grand Bengali Food Festival",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/2026-puja/",
    flyerImagePath: "/flyers/hdbs_2026_anandamela.svg",
    section: "Anandamela Food Festival",
    content: `Date: Sunday, October 11, 2026
Event: Anandamela (The Grand Bengali Culinary & Cultural Fair)
Timings: 4:00 PM – 10:00 PM
Venue: HDBS Festival Grounds, 13944 Schiller Rd, Houston, TX 77082.
Admission: Free entry to all community members and guests.
Culinary Offerings: Over 25 community food stalls featuring authentic homestyle delicacies:
- Appetizers & Street Food: Kolkata Style Phuchka & Churmur, Bhetki Fish Fry with Kasundi mustard, Vegetable & Mochar Chop, Kolkata Egg/Chicken Rolls, Singara, Bengali Ghugni.
- Entrees: Kosha Mangsho with hot Luchi, Mughlai Paratha with Aloo Kasha, Dhokar Dalna, and Basanti Pulao.
- Traditional Sweets: Earthen pot Mishti Doi, fresh hot Rosogolla, Pantua, Kheer Kadam, artisanal Pati Shapta, and Malpua.
Food Purchase: Purchased through token booths (digital & cash) and booth credit cards.
Stall Registration: $150 per food booth (includes 6ft table, 2 chairs, power outlet). Health permit compliance required.`
  },
  {
    title: "Anandamela 2026 Cultural Evening Program",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/2026-puja/",
    flyerImagePath: "/flyers/hdbs_2026_anandamela.svg",
    section: "Anandamela Cultural Program",
    content: `Anandamela Cultural Program Schedule at Sur Auditorium (Sunday, Oct 11, 2026):
- 04:30 PM: Welcome Address by HDBS President and 2026 Puja Convener.
- 05:15 PM: Houston Youth Orchestra presents 'Melodies of Bengal'.
- 06:30 PM: Agomoni Dance Drama 'Mahishasura Mardini' performed by students of HDBS Kala Bhavan.
- 07:45 PM: Community Chorus singing timeless songs of Rabindranath Tagore and D.L. Roy.
- 08:45 PM: Folk Band 'Baul & Bhatiyali Fusion' live acoustic performance.
- 10:00 PM: Anandamela Closing Ceremony and Announcement of the Best Food Stall Award.
Sur Auditorium seating is first-come, first-served. Admission is free.`
  },
  {
    title: "Maha Sashthi & Maha Saptami Schedule (Friday, Oct 16, 2026)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/2026-puja/",
    flyerImagePath: "/flyers/hdbs_2026_main_schedule.svg",
    section: "Puja Schedule Day 1",
    content: `Friday, October 16, 2026: Maha Sashthi & Maha Saptami
Schedule:
- 08:00 AM: Bodhan, Amantran & Adhivas (Ritual awakening of Maa Durga under the sacred Bilva tree).
- 09:30 AM: Navapatrika Pravesh & Snan (Kola Bou Snan ritual at temple pond).
- 10:30 AM: Maha Saptami Puja begins with solemn Sanskrit chants.
- 12:00 PM: Maha Saptami Pushpanjali for all devotees (Batch 1 at 12:00 PM, Batch 2 at 12:30 PM).
- 01:00 PM – 03:00 PM: Anna Bhog Prasad Distribution (Authentic Khichuri, Labra, Beguni, Tomato Chutney, Payesh).
- 05:30 PM: Sandhya Arati with resonant Dhaak drums and joyous Dhunuchi dance.
- 07:30 PM: Inaugural Cultural Night in Sur Auditorium featuring classical Sitar recital and youth musical drama 'Agomonir Sur'.
- 10:00 PM: Shanti Paath and late evening prasad.`
  },
  {
    title: "Maha Ashtami & Kumari Puja Schedule (Saturday, Oct 17, 2026)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/2026-puja/",
    flyerImagePath: "/flyers/hdbs_2026_main_schedule.svg",
    section: "Puja Schedule Day 2 - Morning",
    content: `Saturday, October 17, 2026: Maha Ashtami Schedule
- 08:30 AM: Maha Ashtami Puja commencement with Chandi Recitation.
- 10:30 AM: Maha Ashtami Pushpanjali Batch 1.
- 11:15 AM: Maha Ashtami Pushpanjali Batch 2.
- 12:00 PM: Maha Ashtami Pushpanjali Batch 3.
- 12:15 PM: Kumari Puja (Veneration of a young prepubescent girl as the living embodiment of Devi Durga, adorned in red sari, flowers, and ornaments).
- 01:00 PM – 03:30 PM: Maha Ashtami Anna Bhog Prasad distribution (Basanti Pulao, Paneer/Chhanar Dalna, Tomato-Khejur Chutney, Rosogolla).
Digital coupons or sponsor wristbands must be shown at the Anna Bhog pavilion.`
  },
  {
    title: "Sandhi Puja & Maha Nabami Schedule (Saturday, Oct 17, 2026)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/2026-puja/",
    flyerImagePath: "/flyers/hdbs_2026_main_schedule.svg",
    section: "Puja Schedule Day 2 - Evening",
    content: `Saturday, October 17, 2026: Sandhi Puja & Maha Nabami Schedule
- 04:45 PM – 05:33 PM: SANDHI PUJA. This auspicious 48-minute juncture connects the last 24 minutes of Ashtami and the first 24 minutes of Nabami, commemorating Chamunda defeating Chanda and Munda. HDBS priests offer exactly 108 blue lotuses and light 108 consecrated ghee pradip (diyas). Strict silence and devotion observed.
- 06:00 PM: Maha Nabami Puja and Maha Yajna / Homa (Sacred fire sacrifice with bilva leaves and ghee).
- 07:00 PM: Grand Evening Arati accompanied by thundering Dhaak and Kanshi.
- 08:00 PM: Annual Dhunuchi Naach Competition (Categories: Youth, Women, Open/Men).
- 09:00 PM: Star Musical Night in Sur Auditorium featuring a Kolkata Guest Artiste Concert.
- 11:00 PM: Community Prasad distribution.`
  },
  {
    title: "Vijaya Dashami & Sindoor Khela Schedule (Sunday, Oct 18, 2026)",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/2026-puja/",
    flyerImagePath: "/flyers/hdbs_2026_main_schedule.svg",
    section: "Puja Schedule Day 3",
    content: `Sunday, October 18, 2026: Vijaya Dashami Schedule
- 09:00 AM: Vijaya Dashami Puja begins.
- 10:00 AM: Darpan Visarjan (Immersing Maa Durga's sacred reflection in a brass water vessel via mirror).
- 10:30 AM: Aparajita Puja & Shanti Paath.
- 11:30 AM – 02:00 PM: Devi Boran & Sindoor Khela (Married women offer betel leaves, sweets, and vermilion to Maa Durga, followed by exuberant community Sindoor Khela with live Dhaak rhythm).
- 01:30 PM: Vijaya Bhog & Mishti Mukh (Distribution of sweets, Nimki, Ghugni, and Laddoo).
- 03:30 PM: Shanti Jal sprinkling on devotees & Kolakoli (Traditional Bengali embrace and warm greetings).
- 04:30 PM: Bisarjan Procession & Symbolic Ghat Visarjan ceremony at temple grounds.
- 06:00 PM: Vijaya Sammelani Cultural Wrap-up & Committee appreciation ceremony.`
  },
  {
    title: "Puja Sponsorship & Donor Packages 2026",
    sourceType: "flyer_ocr",
    sourceUrl: "https://durgabari.org/2026-puja/register/",
    flyerImagePath: "/flyers/hdbs_2026_sponsorship.svg",
    section: "Sponsorship & Donations",
    content: `Houston Durga Bari Society 2026 Puja Sponsorship Packages (501(c)(3) Tax-Deductible):
1. Grand Patron — $5,000:
   - Dedicated Family Puja Sankalpa performed on all days (Saptami, Ashtami, Nabami).
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
   - Sponsors Anna Bhog meal for 200+ devotees on Friday, Saturday, or Sunday.
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
| Friday, Oct 16, 2026 (Sashthi & Saptami) | 10:00 AM – 11:00 PM | Every 10 minutes | West Oaks Mall (Tutti Frutti zone) |
| Saturday, Oct 17, 2026 (Ashtami & Nabami) | 8:00 AM – 12:00 Midnight | Every 10 minutes | West Oaks Mall (Tutti Frutti zone) |
| Sunday, Oct 18, 2026 (Vijaya Dashami) | 8:30 AM – 9:00 PM | Every 10 minutes | West Oaks Mall (Tutti Frutti zone) |

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
- Bhog is served hot in the air-conditioned Bhog Hall on Friday Oct 16 (1:00 PM - 3:00 PM), Saturday Oct 17 (1:00 PM - 3:30 PM), and Sunday Oct 18 (1:30 PM).
- Coupon Requirement: To minimize wait times and overcrowding, all attendees must display either a digital QR code from online pre-registration or a paper wristband/token issued at the Helpdesk.
- Traditional Menu: Pure vegetarian feast including Bengali Bhoger Khichuri, Labra (mixed seasonal vegetable), Beguni, Chutney, and Payesh. Saturday includes Pulao and Chhanar Dalna.
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
