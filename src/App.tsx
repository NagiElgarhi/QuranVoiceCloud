/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, ListMusic, Volume2, Heart, Share2, Info, ChevronDown, Cloud, Moon, BookOpen, Wifi, Menu, X, ChevronUp, FastForward, Rewind, Music } from "lucide-react";
import { SURAHS } from "./surahData";

const MURATTAL_RECITERS = [
  {
    id: "hosari",
    name: "محمود خليل الحصري",
    englishName: "Mahmoud Khalil Al-Hosari",
    playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/shsamirmostafa/sets/el-hosari-radio&color=%23065f46&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    description: `وُلد الشيخ محمود خليل الحصري في غرة ذي الحجة سنة 1335 هـ الموافق 17 سبتمبر عام 1917 في قرية شبرا النملة التابعة لطنطا بمحافظة الغربية بمصر. كان والده قبل ولادته قد انتقل من محافظة الفيوم إلى هذه القرية التي ولد فيها. أدخله والده الكتاب في سن الرابعة ليدرس القرآن الكريم، وأتم حفظ القرآن الكريم في الثامنة من عمره. كان يذهب من قريته إلى المسجد الأحمدي بطنطا يومياً ليحفظ القرآن الكريم، ولما بلغ الثانية عشرة التحق بالمعهد الديني بطنطا. ثم تعلم القراءات العشر بعد ذلك في الأزهر الشريف.`,
    image: "https://i.ytimg.com/vi/001-al-fatiha-hos/maxresdefault.jpg"
  },
  {
    id: "minshawi",
    name: "محمد صديق المنشاوي",
    englishName: "Mohamed Siddiq Al-Minshawi",
    playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/ahmedsherif1485/sets/5wqsv1d6xm8l&color=%23065f46&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    description: `وُلد الشيخ محمد صديق المنشاوي في 20 يناير من عام 1920 في مدينة المنشأة التابعة لمحافظة سوهاج في صعيد مصر. نشأ في بيت علم وقرآن، حيث كان والده الشيخ صديق المنشاوي وجده الشيخ طيب المنشاوي من مشاهير قراء القرآن الكريم في زمانهما. بدأ رحلته مع القرآن الكريم في سن مبكرة جداً، حيث ألحقه والده بكتاب القرية، وأتم حفظ القرآن الكريم كاملاً وهو في سن الثامنة من عمره، مما أظهر نبوغاً مبكراً وموهبة فذة في الحفظ والأداء.`,
    image: "https://picsum.photos/seed/minshawi/800/800"
  },
  {
    id: "abdulbasit",
    name: "عبد الباسط عبد الصمد",
    englishName: "Abdul Basit Abdul Samad",
    playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/shsamirmostafa/sets/abd-elbaseet-muratal-radio&color=%23065f46&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    description: "الشيخ عبد الباسط عبد الصمد، الملقب بالحنجرة الذهبية وصوت مكة، أحد أشهر القراء في العالم الإسلامي، تميز بطول نفسه وقوة صوته وجمال نبرته. وُلد في قرية المراعزة التابعة لمدينة أرمنت بمحافظة قنا في صعيد مصر. حفظ القرآن الكريم في كتاب القرية وأتمه في سن العاشرة. التحق بالإذاعة المصرية عام 1951، وكانت أول تلاواته من سورة فاطر. سافر إلى العديد من دول العالم، وحصل على العديد من الأوسمة والتكريمات تقديراً لدوره في خدمة القرآن الكريم.",
    image: "https://picsum.photos/seed/abdulbasit/800/800"
  },
  {
    id: "banna",
    name: "محمود علي البنا",
    englishName: "Mahmoud Ali Al-Banna",
    playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/shsamirmostafa/sets/elbannaa-muratal-radio&color=%23065f46&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    description: `وُلد الشيخ محمود علي البنا في 17 ديسمبر عام 1926 في قرية شبرا باص التابعة لمركز شبين الكوم بمحافظة المنوفية بمصر. حفظ القرآن الكريم في كتاب القرية على يد الشيخ موسى المنطاش، وأتم حفظه وهو في سن الحادية عشرة، ثم انتقل إلى مدينة طنطا ليدرس العلوم الشرعية بالجامع الأحمدي، وتلقى القراءات فيها على يد الشيخ إبراهيم بن شحاتة السمنودي.`,
    image: "https://picsum.photos/seed/banna/800/800"
  },
  {
    id: "ismail",
    name: "مصطفى إسماعيل",
    englishName: "Mustafa Ismail",
    playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/bshlw5ozyhpe/sets/umjtxtq0un0u&color=%23065f46&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    description: `وُلد الشيخ مصطفى إسماعيل في 17 يونيو عام 1905 في قرية ميت غزال التابعة لمركز السنطة بمحافظة الغربية بمصر. حفظ القرآن الكريم في كتاب القرية وهو لم يتجاوز الثانية عشرة من عمره، ثم التحق بالمعهد الأحمدي بطنطا ليتم حفظ القرآن وتجويده وقراءاته.`,
    image: "https://picsum.photos/seed/mustafaismail/800/800"
  },
  {
    id: "rifaat",
    name: "محمد رفعت",
    englishName: "Mohamed Rifaat",
    playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/shsamirmostafa/sets/mohamed-rifaat-radio&color=%23065f46&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    description: `وُلد الشيخ محمد رفعت في 9 مايو عام 1882 في حي المغربلين بالقاهرة. فقد بصره وهو في سن الثانية من عمره، لكن ذلك لم يمنعه من حفظ القرآن الكريم وتجويده في سن مبكرة جداً.`,
    image: "https://picsum.photos/seed/mohamedrifaat/800/800"
  },
  {
    id: "jebril",
    name: "محمد جبريل",
    englishName: "Mohamed Jebril",
    playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user51139184/sets/lzdjcmfez7xx&color=%23065f46&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    description: `الشيخ محمد جبريل، أحد أشهر قراء القرآن الكريم في مصر والعالم الإسلامي، وُلد في قرية طحوريا بمركز شبين القناطر بمحافظة القليوبية. حفظ القرآن الكريم في سن التاسعة، وحصل على العديد من الجوائز في المسابقات القرآنية.`,
    image: "https://picsum.photos/seed/mohamedjebril/800/800"
  },
  {
    id: "alnafis",
    name: "أحمد النفيس",
    englishName: "Ahmed Al-Nafis",
    playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/ibrahimasim/sets/yn2n2gacn8jy&color=%23065f46&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    description: `القارئ أحمد النفيس، من القراء الكويتيين المعاصرين المتميزين بصوت عذب وأداء هادئ يبعث على الطمأنينة. اشتهر بتلاواته الخاشعة التي انتشرت بشكل واسع عبر وسائل التواصل الاجتماعي، وأصبح له جمهور كبير من المحبين في مختلف أنحاء العالم الإسلامي.`,
    image: "https://picsum.photos/seed/alnafis/800/800"
  },
  {
    id: "alafasy",
    name: "مشاري العفاسي",
    englishName: "Mishary Alafasy",
    playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/junaid-ur-rahman-26/sets/mishary-rashid-alafasy-quran&color=%230a192f&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    description: `الشيخ مشاري بن راشد العفاسي، إمام المسجد الكبير بدولة الكويت وخطيب في وزارة الأوقاف والشؤون الإسلامية بدولة الكويت، صاحب أول قناة إسلامية كويتية قناة العفاسي الفضائية. وقارئ القرآن الكريم ومنشد ديني كويتي. يتمتع بصوت عذب وقوة في التحكم بطبقات الصوت وروعة الأداء.`,
    image: "https://picsum.photos/seed/alafasy/800/800"
  },
  {
    id: "sufi",
    name: "عبد الرشيد الصوفي",
    englishName: "Abdul Rashid Sufi",
    playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-258834376/sets/1qrp5ejeiqq0&color=%23065f46&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    description: `الشيخ عبد الرشيد بن علي بن عبد الرحمن الصوفي، قارئ صومالي الأصل، وُلد في الصومال ونشأ في بيئة علمية قرآنية. حفظ القرآن الكريم على يد والده الشيخ علي الصوفي، وأتم حفظه في سن مبكرة.`,
    image: "https://picsum.photos/seed/sufi/800/800"
  }
];

const MUJAWWAD_RECITERS = [
  {
    id: "minshawi-m-1",
    name: "محمد صديق المنشاوي",
    englishName: "Mohamed Siddiq Al-Minshawi",
    playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/quranwave/sets/mohammed-siddiq-al-minshawi-1&color=%230a192f&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    description: "المصحف المجود للشيخ محمد صديق المنشاوي",
    image: "https://picsum.photos/seed/minshawi-m/800/800"
  },
  {
    id: "abdulbasit-m-1",
    name: "عبد الباسط عبد الصمد (1)",
    englishName: "Abdul Basit Abdul Samad (1)",
    playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/bshlw5ozyhpe/sets/njrphze2nngf&color=%230a192f&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    description: "المصحف المجود للشيخ عبد الباسط عبد الصمد",
    image: "https://picsum.photos/seed/abdulbasit-m/800/800"
  },
  {
    id: "abdulbasit-m-2",
    name: "عبد الباسط عبد الصمد (2)",
    englishName: "Abdul Basit Abdul Samad (2)",
    playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/telawatcloud/sets/abdulbasithafs&color=%230a192f&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    description: "المصحف المجود للشيخ عبد الباسط عبد الصمد",
    image: "https://picsum.photos/seed/abdulbasit-m/800/800"
  },
  {
    id: "abdulbasit-m-3",
    name: "عبد الباسط عبد الصمد (3)",
    englishName: "Abdul Basit Abdul Samad (3)",
    playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/quranwave/sets/abdulbasit-abdulsamad-almusshaf-al-mojawwad&color=%230a192f&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    description: "المصحف المجود للشيخ عبد الباسط عبد الصمد",
    image: "https://picsum.photos/seed/abdulbasit-m/800/800"
  },
  {
    id: "hosari-m-1",
    name: "محمود خليل الحصري (1)",
    englishName: "Mahmoud Khalil Al-Hosari (1)",
    playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/telawatcloud/sets/hossarymogawwad&color=%230a192f&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    description: "المصحف المجود للشيخ محمود خليل الحصري",
    image: "https://picsum.photos/seed/hosari-m/800/800"
  },
  {
    id: "hosari-m-2",
    name: "محمود خليل الحصري (2)",
    englishName: "Mahmoud Khalil Al-Hosari (2)",
    playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/kitabmaknoon/sets/tiouho4xwjdk&color=%230a192f&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    description: "المصحف المجود للشيخ محمود خليل الحصري",
    image: "https://picsum.photos/seed/hosari-m/800/800"
  },
  {
    id: "banna-m",
    name: "محمود علي البنا",
    englishName: "Mahmoud Ali Al-Banna",
    playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/telawatcloud/sets/albannamogawwad&color=%230a192f&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    description: "المصحف المجود للشيخ محمود علي البنا",
    image: "https://picsum.photos/seed/banna-m/800/800"
  },
  {
    id: "tablawi-m",
    name: "محمد محمود الطبلاوي",
    englishName: "Mohamed Mahmoud Al-Tablawi",
    playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/way-to-allah-1/surah-at-takwir&color=%230a192f&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    description: "تلاوة مجودة للشيخ محمد محمود الطبلاوي",
    image: "https://picsum.photos/seed/tablawi-m/800/800"
  }
];

const TEN_RECITATIONS = [
  {
    id: "nafi",
    name: "نافع المدني",
    reciters: [
      { id: "nafi-1", name: "محمود خليل الحصري (ورش)", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/shsamirmostafa/sets/el-hosari-warsh-radio&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" },
      { id: "nafi-2", name: "محمود خليل الحصري (قالون)", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/shsamirmostafa/sets/el-hosari-qaloon-radio&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" },
      { id: "nafi-3", name: "محمود خليل الحصري — رواية ورش عن نافع (نسخة أخرى)", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/quranwave/sets/mahmoud-khalil-al-hussary-warsh&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" },
      { id: "nafi-4", name: "محمود خليل الحصري — رواية قالون عن نافع", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/kitabmaknoon/sets/qhcnal3jojnh&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" },
      { id: "nafi-5", name: "عبد الباسط عبد الصمد — رواية ورش عن نافع", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/quranwave/sets/abdulbasit-abdulsamad-warsh&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" },
      { id: "nafi-6", name: "محمد سايد — رواية ورش عن نافع", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/telawatcloud/sets/msayedwarsh&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" },
      { id: "nafi-7", name: "الدوكالى محمد العالم", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/voiceofislam00/sets/1nlkmgxg0kdz&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" },
      { id: "nafi-8", name: "لطيب كحل العيون — رواية ورش عن نافع", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/telawatcloud/sets/kohlwarsh&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" },
      { id: "nafi-9", name: "عبد الكريم الدغوش — رواية ورش عن نافع", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/telawatcloud/sets/daghoshwarsh&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" },
      { id: "nafi-10", name: "أحمد الحداد — رواية ورش عن نافع", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/telawatcloud/sets/alhaddadwarsh&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" },
      { id: "nafi-11", name: "حمد عثمان القريو — رواية قالون عن نافع", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/telawatcloud/sets/aoqarioqalon&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" },
      { id: "nafi-12", name: "جواد بلحنش — رواية ورش عن نافع", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/mohammed-belatar/sets/coran-belhnech&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" },
      { id: "nafi-13", name: "جعفر السعدي — رواية ورش عن نافع", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/omar-ebrahim-144834941/sets/km42v6a2vpit&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" },
      { id: "nafi-14", name: "يونس لوسكي — رواية ورش عن نافع", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/telawatcloud/sets/lweskywarsh&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" },
      { id: "nafi-15", name: "محمد الجابري الحياني — رواية ورش عن نافع", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/telawatcloud/sets/ghayaniwarsh&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" },
      { id: "nafi-16", name: "عبد المؤمن التلمساني — رواية ورش عن نافع", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/telawatcloud/sets/atelmesaniwarsh&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" },
      { id: "nafi-17", name: "عمر القزابري — رواية ورش عن نافع (نسخة أخرى)", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/mohamed-ghilan/sets/the-noble-quran-in-warsh&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" }
    ]
  },
  {
    id: "ibnkathir",
    name: "ابن كثير المكي",
    reciters: [
      { id: "ibnkathir-1", name: "عبد الرشيد الصوفي (البزي وقنبل)", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-258834376/sets/1qrp5ejeiqq0&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" }
    ]
  },
  {
    id: "abuamr",
    name: "أبو عمرو البصري",
    reciters: [
      { id: "abuamr-1", name: "محمود خليل الحصري (الدوري)", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/shsamirmostafa/sets/el-hosari-eldory-radio&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" }
    ]
  },
  { 
    id: "ibnamir", 
    name: "ابن عامر الشامي", 
    reciters: [
      { id: "ibnamir-1", name: "أمين إدريس فلاتة — رواية هشام عن ابن عامر", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/hafidhunq/sets/hesham_ibn_aamer&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" }
    ] 
  },
  { 
    id: "asim", 
    name: "عاصم الكوفي", 
    reciters: [
      { id: "asim-1", name: "حفص عن عاصم (المنشاوي)", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/ahmedsherif1485/sets/5wqsv1d6xm8l&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" }
    ] 
  },
  { 
    id: "hamzah", 
    name: "حمزة الكوفي", 
    reciters: [
      { id: "hamzah-1", name: "خلف عن حمزة (عبد الرشيد الصوفي)", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-258834376/sets/1qrp5ejeiqq0&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" },
      { id: "hamzah-2", name: "رمضان نبيه عبد الجواد — رواية خلاد عن حمزة", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/hafidhunq/sets/khallad&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" }
    ] 
  },
  { id: "kisai", name: "الكسائي الكوفي", reciters: [] },
  { id: "abujafar", name: "أبو جعفر المدني", reciters: [] },
  { 
    id: "yaqub", 
    name: "يعقوب الحضرمي", 
    reciters: [
      { id: "yaqub-1", name: "إبراهيم القرجاوي — رواية رويس عن يعقوب الحضرمي", playlistUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/hafidhunq/sets/ruwais&color=%230a192f&show_teaser=false&show_user=false&show_comments=false&show_reposts=false&hide_related=true" }
    ] 
  },
  { id: "khalaf", name: "خلف العاشر", reciters: [] }
];

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [selectedReciter, setSelectedReciter] = useState<any>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedRecitation, setSelectedRecitation] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState<any>(null);
  const [verses, setVerses] = useState<any[]>([]);
  const [isLoadingVerses, setIsLoadingVerses] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [activeMode, setActiveMode] = useState<'listening' | 'reading'>('listening');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: any;
    if (isAutoScrolling && scrollRef.current) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop += scrollSpeed;
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling, scrollSpeed]);

  const fetchVerses = async (surahId: number) => {
    setIsLoadingVerses(true);
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahId}`);
      const data = await response.json();
      setVerses(data.data.ayahs);
    } catch (error) {
      console.error("Error fetching verses:", error);
    } finally {
      setIsLoadingVerses(false);
    }
  };

  const handleSurahClick = (surah: any) => {
    setSelectedSurah(surah);
    fetchVerses(surah.id);
    setIsAutoScrolling(false);
    setActiveMode('reading');
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleReciterSelect = (reciter: any) => {
    setSelectedReciter(reciter);
    setActiveDropdown(null);
    setSelectedRecitation(null);
    setActiveMode('listening');
  };

  const handleRecitationSelect = (recitation: any) => {
    setSelectedRecitation(recitation);
  };

  if (showLanding) {
    return (
      <div 
        onClick={() => setShowLanding(false)}
        className="min-h-screen bg-[#0a192f] flex flex-col items-center justify-center relative overflow-hidden cursor-pointer"
      >
        {/* Starry Night Sky Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e3a8a] via-[#0a192f] to-black" />
          {/* Stars */}
          <div className="absolute top-10 left-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse" />
          <div className="absolute top-20 right-1/3 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_white] animate-pulse delay-75" />
          <div className="absolute top-40 left-1/5 w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_5px_white] animate-pulse delay-150" />
          <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse delay-300" />
          <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_white] animate-pulse delay-500" />
          <div className="absolute top-1/2 right-1/5 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse delay-200" />
        </div>

        {/* Crescent Moon */}
        <motion.div 
          initial={{ opacity: 0, x: -50, y: -50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-12 left-12 z-10"
        >
          <Moon size={80} className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" strokeWidth={1} />
        </motion.div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pt-20">
          
          {/* Title Section */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center mb-12 flex flex-col items-center"
          >
            <h1 className="text-7xl md:text-9xl font-serif font-bold text-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,0.6)] mb-2">
              Quran
            </h1>
            <div className="flex items-center gap-4 text-4xl md:text-6xl font-sans font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
              <span>Voice</span>
              <Wifi size={48} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
              <span>Cloud</span>
            </div>
          </motion.div>

          {/* Central Cloud & Waveform */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="relative flex flex-col items-center justify-center mb-16 w-full max-w-2xl"
          >
            {/* Fluffy Cloud */}
            <div className="relative w-32 h-16 md:w-48 md:h-24 mb-8 flex items-center justify-center">
              {/* Center Orb */}
              <div className="absolute inset-0 bg-white/90 rounded-full blur-xl shadow-[0_0_50px_rgba(255,255,255,0.8)]" />
              {/* Left Orb */}
              <div className="absolute top-1/2 -left-1/2 w-full h-full -translate-y-1/2 bg-white/90 rounded-full blur-xl shadow-[0_0_50px_rgba(255,255,255,0.8)]" />
              {/* Right Orb */}
              <div className="absolute top-1/2 -right-1/2 w-full h-full -translate-y-1/2 bg-white/90 rounded-full blur-xl shadow-[0_0_50px_rgba(255,255,255,0.8)]" />
              
              <Cloud size={125} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-[0_0_50px_rgba(255,255,255,1)]" fill="white" />
              
              <span className="relative z-10 text-[#0a192f] font-bold text-xs md:text-sm whitespace-nowrap mt-2">
                صلى الله على الحبيب محمد
              </span>
            </div>

            {/* Glowing Audio Waveform */}
            <div className="flex items-end justify-center gap-1 h-24 md:h-32 w-full px-8">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    height: ["20%", "100%", "20%"],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: "easeInOut"
                  }}
                  className="w-1.5 md:w-2 bg-[#0ea5e9] rounded-full shadow-[0_0_15px_rgba(14,165,233,0.8)]"
                  style={{
                    height: `${Math.max(20, Math.random() * 100)}%`
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Open Quran & Enter Button */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col items-center relative"
          >
            {/* Reflective Surface */}
            <div className="absolute bottom-12 w-[200%] h-32 bg-gradient-to-t from-[#0ea5e9]/20 to-transparent blur-2xl rounded-[100%]" />
            
            <BookOpen size={120} className="text-[#D4AF37] drop-shadow-[0_0_40px_rgba(212,175,55,0.8)] mb-8 relative z-10" strokeWidth={1.5} />
          </motion.div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a192f] text-white font-serif selection:bg-[#0ea5e9] selection:text-white relative overflow-x-hidden flex flex-col">
      {/* Starry Night Sky Background */}
      <div className="absolute inset-0 z-0 pointer-events-none fixed">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e3a8a] via-[#0a192f] to-black" />
        {/* Stars */}
        <div className="absolute top-10 left-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse" />
        <div className="absolute top-20 right-1/3 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_white] animate-pulse delay-75" />
        <div className="absolute top-40 left-1/5 w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_5px_white] animate-pulse delay-150" />
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse delay-300" />
        <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_white] animate-pulse delay-500" />
        <div className="absolute top-1/2 right-1/5 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse delay-200" />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-16 flex-grow w-full flex flex-col md:flex-row gap-8">
        {/* Sidebar Toggle for Mobile */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg text-[#0a192f]"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Surah Sidebar */}
        <aside className={`
          fixed md:relative top-0 right-0 h-full md:h-auto w-64 bg-[#0a192f]/90 backdrop-blur-2xl border-l border-white/10 z-50 transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
          flex flex-col
        `}>
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#D4AF37]">سور القرآن</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-white">
              <X size={20} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {SURAHS.map((surah) => (
              <button
                key={surah.id}
                onClick={() => handleSurahClick(surah)}
                className={`w-full p-3 text-right rounded-lg transition-all flex items-center justify-between group ${selectedSurah?.id === surah.id ? 'bg-[#D4AF37] text-[#0a192f]' : 'hover:bg-white/5 text-white/80'}`}
              >
                <span className="text-xs opacity-50">{surah.id}</span>
                <span className="font-medium">{surah.name}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-grow flex flex-col gap-8">
          {/* View Toggle */}
          {(selectedReciter || selectedSurah) && (
            <div className="flex items-center justify-center gap-4 mb-4">
              <button 
                onClick={() => setActiveMode('listening')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${activeMode === 'listening' ? 'bg-[#D4AF37] text-[#0a192f] border-[#D4AF37]' : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'}`}
              >
                استماع
              </button>
              <button 
                onClick={() => setActiveMode('reading')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${activeMode === 'reading' ? 'bg-[#D4AF37] text-[#0a192f] border-[#D4AF37]' : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'}`}
              >
                قراءة
              </button>
            </div>
          )}

          {/* Verse Display Container (Reading Mode) */}
          <div className={activeMode === 'reading' ? 'block' : 'hidden'}>
            {selectedSurah ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0a192f]/60 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
              >
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/50">السرعة:</span>
                      <select 
                        value={scrollSpeed}
                        onChange={(e) => setScrollSpeed(parseFloat(e.target.value))}
                        className="bg-white/5 border border-white/10 rounded-lg text-xs text-[#D4AF37] p-1.5 focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value={0.10}>0.10x</option>
                        <option value={0.15}>0.15x</option>
                        <option value={0.20}>0.20x</option>
                        <option value={0.25}>0.25x</option>
                        <option value={0.5}>0.5x</option>
                        <option value={1}>1x</option>
                        <option value={1.5}>1.5x</option>
                        <option value={2}>2x</option>
                        <option value={3}>3x</option>
                        <option value={5}>5x</option>
                      </select>
                    </div>
                    <button 
                      onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${isAutoScrolling ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                    >
                      {isAutoScrolling ? 'إيقاف التمرير' : 'بدء التمرير'}
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-[#D4AF37]">{selectedSurah.name}</h3>
                </div>
                
                <div 
                  ref={scrollRef}
                  className="h-[70vh] overflow-y-auto p-6 text-right space-y-4 custom-scrollbar relative"
                  style={{ direction: 'rtl' }}
                >
                  {isLoadingVerses ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37]" />
                    </div>
                  ) : (
                    <div className="text-3xl leading-[2] font-serif text-white/90">
                      {verses.map((ayah, idx) => (
                        <span key={idx} className="inline-block mb-8">
                          {ayah.text} <span className="text-[#D4AF37] text-lg mx-2">({ayah.numberInSurah})</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="h-[70vh] flex flex-col items-center justify-center text-white/40 border-2 border-dashed border-white/5 rounded-2xl">
                <BookOpen size={48} className="mb-4 opacity-20" />
                <p>الرجاء اختيار سورة من القائمة الجانبية للقراءة</p>
              </div>
            )}
          </div>

          {/* Branding & Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center mb-12 text-center cursor-pointer"
          onClick={() => {
            setShowLanding(true);
            setSelectedReciter(null);
            setActiveDropdown(null);
            setSelectedSurah(null);
            setVerses([]);
            setIsAutoScrolling(false);
            setActiveMode('listening');
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center mb-4 gap-4">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]">
              Quran
            </h1>
            <div className="flex items-center gap-3 text-3xl md:text-5xl font-sans font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              <span>Voice</span>
              <Wifi size={36} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              <span>Cloud</span>
            </div>
          </div>
        </motion.div>

        {/* Dropdowns Container */}
        {!selectedReciter && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 z-50 relative">
            {/* Murattal Dropdown */}
            <div className="relative">
            <button 
              onClick={() => toggleDropdown('murattal')}
              className={`w-full px-4 py-3 bg-[#0a192f]/60 backdrop-blur-xl rounded-xl shadow-sm border flex items-center justify-between transition-all ${activeDropdown === 'murattal' ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/30' : 'border-white/10'}`}
            >
              <span className="font-medium text-white">قرآن مرتل</span>
              <ChevronDown size={18} className={`text-white transition-transform ${activeDropdown === 'murattal' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'murattal' && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#0a192f]/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/10 overflow-hidden z-[60] max-h-64 overflow-y-auto"
                >
                  {MURATTAL_RECITERS.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => handleReciterSelect(r)}
                      className="w-full px-4 py-3 text-right hover:bg-white/10 text-white/90 transition-colors border-b border-white/5 last:border-0"
                    >
                      {r.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mujawwad Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('mujawwad')}
              className={`w-full px-4 py-3 bg-[#0a192f]/60 backdrop-blur-xl rounded-xl shadow-sm border flex items-center justify-between transition-all ${activeDropdown === 'mujawwad' ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/30' : 'border-white/10'}`}
            >
              <span className="font-medium text-white">قرآن مجود</span>
              <ChevronDown size={18} className={`text-white transition-transform ${activeDropdown === 'mujawwad' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'mujawwad' && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#0a192f]/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/10 overflow-hidden z-[60]"
                >
                  {MUJAWWAD_RECITERS.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => handleReciterSelect(r)}
                      className="w-full px-4 py-3 text-right hover:bg-white/10 text-white/90 transition-colors border-b border-white/5 last:border-0"
                    >
                      {r.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Ten Recitations Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('ten')}
              className={`w-full px-4 py-3 bg-[#0a192f]/60 backdrop-blur-xl rounded-xl shadow-sm border flex items-center justify-between transition-all ${activeDropdown === 'ten' ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/30' : 'border-white/10'}`}
            >
              <span className="font-medium text-white">قراءات العشر</span>
              <ChevronDown size={18} className={`text-white transition-transform ${activeDropdown === 'ten' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'ten' && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#0a192f]/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/10 overflow-hidden z-[60] flex flex-col"
                >
                  {!selectedRecitation ? (
                    <div className="max-h-64 overflow-y-auto">
                      {TEN_RECITATIONS.map((rec) => (
                        <button
                          key={rec.id}
                          onClick={() => handleRecitationSelect(rec)}
                          className="w-full px-4 py-3 text-right hover:bg-white/10 text-white/90 transition-colors border-b border-white/5 last:border-0 flex items-center justify-between"
                        >
                          <span>{rec.name}</span>
                          <ChevronDown size={14} className="-rotate-90" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <button 
                        onClick={() => setSelectedRecitation(null)}
                        className="px-4 py-2 bg-white/5 text-xs text-white/60 text-right hover:text-white transition-colors"
                      >
                        ← العودة للقائمة
                      </button>
                      <div className="max-h-64 overflow-y-auto">
                        {selectedRecitation.reciters.length > 0 ? (
                          selectedRecitation.reciters.map((r: any) => (
                            <button
                              key={r.id}
                              onClick={() => handleReciterSelect({
                                ...r,
                                englishName: selectedRecitation.name,
                                description: `تلاوة برواية من قراءات العشر: ${selectedRecitation.name}`
                              })}
                              className="w-full px-4 py-3 text-right hover:bg-white/10 text-white/90 transition-colors border-b border-white/5 last:border-0"
                            >
                              {r.name}
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center text-sm text-gray-400">قريباً إن شاء الله</div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        )}

        {/* Listening Mode Container */}
        <div className={activeMode === 'listening' ? 'block' : 'hidden'}>
          <AnimatePresence mode="wait">
            {selectedReciter ? (
              <motion.div
                key={selectedReciter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                {/* Player Container */}
                <div className="bg-[#0a192f]/60 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10">
                  <div className="px-8 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0a192f]">
                        <Play size={18} fill="currentColor" />
                      </div>
                      <span className="font-medium text-white">{selectedReciter.name}</span>
                    </div>
                  </div>

                  <div className="relative w-full h-[450px] md:h-[550px]">
                    <iframe
                      width="100%"
                      height="100%"
                      scrolling="yes"
                      frameBorder="no"
                      allow="autoplay"
                      src={selectedReciter.playlistUrl}
                      className="absolute inset-0"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-[450px] flex flex-col items-center justify-center text-white/40 border-2 border-dashed border-white/5 rounded-3xl">
                <Music size={48} className="mb-4 opacity-20" />
                <p>الرجاء اختيار قارئ من القائمة أعلاه للاستماع</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>

      {/* Footer */}
      <footer className="py-8 text-center opacity-70 border-t border-white/10 bg-transparent relative z-10">
        <p className="text-sm tracking-widest text-white/50 font-sans">
          All rights reserved © for NagiWay StepUp AI
        </p>
      </footer>
    </div>
  );
}
