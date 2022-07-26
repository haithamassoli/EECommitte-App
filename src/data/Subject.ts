const subjects = [
  {
    id: 1,
    name: "كالكولاس 101",
    name2: "Calculus 101",
    subjectLink:
      "https://drive.google.com/drive/folders/1XpDaeHl3tr4Dq8LIoY2NWsUrtvNrcCpW",
  },
  {
    id: 2,
    name: "كالكولاس 102",
    name2: "Calculus 102",
    subjectLink:
      "https://drive.google.com/drive/folders/1hd55cSyowVMo8RdjJF_gdhhfuJxFqX1h",
  },
  {
    id: 3,
    name: "ديف",
    name2: "Differential Equations",
    subjectLink:
      "https://drive.google.com/drive/folders/12myDjgk9KlL7o6nHOGn1kfkUb7AFM2PS",
  },
  {
    id: 4,
    name: "تحليل وسيط",
    name2: "Intermediate Analysis",
    subjectLink:
      "https://drive.google.com/drive/folders/1XtSfEHfrPJdClPu0v-yu1CF_7qek7oN9",
  },
  {
    id: 5,
    name: "اقتصاد",
    name2: "Economy",
    subjectLink:
      "https://drive.google.com/drive/folders/184-a6qnVX5XUX8D31OsC8peoJq-v4d00",
  },
  {
    id: 6,
    name: "فيزياء 101",
    name2: "Physics 101",
    subjectLink:
      "https://drive.google.com/drive/folders/1tfZb3jWZG9ke5LWl5qUxLGtPEyb7dBTZ",
  },
  {
    id: 7,
    name: "فيزياء 102",
    name2: "Physics 102",
    subjectLink:
      "https://drive.google.com/drive/folders/1O9mZS-IokYRtASgGyuNOS-7KzmW32aro",
  },
  {
    id: 8,
    name: "لاب فيزياء",
    name2: "Physics Lab",
    subjectLink:
      "https://drive.google.com/drive/folders/12eNf-ZwZAAtuTaKYt8oofsAMwjBuwLHj",
  },
  {
    id: 9,
    name: "مقدمة في البرمجة",
    name2: "C++",
    subjectLink:
      "https://drive.google.com/drive/folders/1K1umST-_KpOCjeFyDD99T4nYoMkjRmhR",
  },
  {
    id: 10,
    name: "لاب مقدمة في البرمجة",
    name2: "C++ lab",
    subjectLink:
      "https://drive.google.com/drive/folders/16eEGjkF49xFI4hvVObo6wTazFgeou1s2",
  },
  {
    id: 11,
    name: "نيوماريكال",
    name2: "Numerical",
    subjectLink:
      "https://drive.google.com/drive/folders/17GWLpTmfLZyk7p6puW0YrZa-yuRvPMqQ",
  },
  {
    id: 12,
    name: "حاسوب استدراكي",
    name2: "Computer Skills",
    subjectLink:
      "https://drive.google.com/drive/folders/1su0sPAxw7jGox4uEPli4wf9Welvidwfm",
  },
  {
    id: 13,
    name: "مايكرو كنترول",
    name2: "Micro Controllers",
    subjectLink:
      "https://drive.google.com/drive/folders/1qXFyTIVr9Iv0ds67ClEaj-nTLdshRp_w",
  },
  {
    id: 14,
    name: "مايكرو بروسيسر",
    name2: "Micro Processor",
    subjectLink:
      "https://drive.google.com/drive/folders/12D9DOHB4UmuAZzYy6m4a5lziFggSwoGO",
  },
  {
    id: 15,
    name: "لاب مايكرو كنترول",
    name2: "Micro Controllers Lab",
    subjectLink:
      "https://drive.google.com/drive/folders/1MVIKjIDhMkcJWdVXxid7qYweegrcnJiX",
  },
  {
    id: 16,
    name: "ميكانيكا هندسية",
    name2: "Engineering Mechanics Statics",
    subjectLink:
      "https://drive.google.com/drive/folders/1iW5oucjwv_smrDtG5O0gpHurMHM5OVW0",
  },
  {
    id: 17,
    name: "ريادة وابداع",
    name2: "Entrepreneurship and Entrepreneurs",
    subjectLink:
      "https://drive.google.com/drive/folders/1fgGiPCeYsCjFEZXJjQ_xpuNXSb4vzj5z",
  },
  {
    id: 18,
    name: "اللغة الانجليزية 112",
    name2: "English 112",
    subjectLink:
      "https://drive.google.com/drive/folders/1-5Y3tudSh8J3uUr0AipINbjdwxQ6ikBx",
  },
  {
    id: 19,
    name: "مهارات عامة",
    name2: "General Skills",
    subjectLink:
      "https://drive.google.com/drive/folders/1LmaIaY4YMLmgHkMJ1CWbwCrzCqSZYJ1Q",
  },
  {
    id: 20,
    name: "سيركت 1",
    name2: "Circuits 1",
    subjectLink:
      "https://drive.google.com/drive/folders/1KB3mOWz-CTxuucVTNxi0vVTsyKOvlznc",
  },
  {
    id: 21,
    name: "سيركت 2",
    name2: "Circuits 2",
    subjectLink:
      "https://drive.google.com/drive/folders/1EislPiv_7tHpcfjTXeyMZxfvQZlZWSCe",
  },
  {
    id: 22,
    name: "لاب سيركت",
    name2: "Circuits lab",
    subjectLink:
      "https://drive.google.com/drive/folders/1V6a4fFtCWxihAd6iP3Xc1W3RSWHLdwkO",
  },
  {
    id: 23,
    name: "لينير",
    name2: "Linear",
    subjectLink:
      "https://drive.google.com/drive/folders/157YlJF7l78r0w3kRvPuOydXRprbvL8bR",
  },
  {
    id: 24,
    name: "سيجنال",
    name2: "Signal",
    subjectLink:
      "https://drive.google.com/drive/folders/1kspjYTBsnIBUtXBUivYUNMFOTyVaXe8M",
  },
  {
    id: 25,
    name: "الكترونيات 1",
    name2: "Electronics 1",
    subjectLink:
      "https://drive.google.com/drive/folders/14Iz1mDrJFAbf2U2bGioDcrXosGI3aDMy",
  },
  {
    id: 26,
    name: "الكترونيات 2",
    name2: "Electronics 2",
    subjectLink:
      "https://drive.google.com/drive/folders/1kR-Sjiql_Vvh8S1qWU7wJ5AeRXWOomJX",
  },
  {
    id: 27,
    name: "الكهرومغناطيسية 1",
    name2: "Electromagnetic 1",
    subjectLink:
      "https://drive.google.com/drive/folders/1LpHZNHf2le74Grwg7Axf27HAnWHf3aQL",
  },
  {
    id: 28,
    name: "الكهرومغناطيسية 2",
    name2: "Electromagnetic 2",
    subjectLink:
      "https://drive.google.com/drive/folders/17TbLmhUcXsTrdmf04nysXWKHrq2uQtgi",
  },
  {
    id: 29,
    name: "كيمياء 101",
    name2: "Chemistry 101",
    subjectLink:
      "https://drive.google.com/drive/folders/1vH0PIKXCJLnyyw1TrsKfVec5NrgaQI5F",
  },
  {
    id: 30,
    name: "كيمياء 102",
    name2: "Chemistry 102",
    subjectLink:
      "https://drive.google.com/drive/folders/1ds80Tu9d2IRMwSTNMG1EnT0UWuGvgNpj",
  },
  {
    id: 31,
    name: "لاب كيمياء",
    name2: "Chemistry Lab",
    subjectLink:
      "https://drive.google.com/drive/folders/1LQOaVp5PrKvpyBO74pOkjR4Kbl-guAcM",
  },
  {
    id: 32,
    name: "لاب الكترونيات",
    name2: "Electronics lab",
    subjectLink:
      "https://drive.google.com/drive/folders/1rtxqwWHZuIPTAL3AWWnA3m2sLlelfTl3",
  },
  {
    id: 33,
    name: "DE",
    name2: "Digital electronics",
    subjectLink:
      "https://drive.google.com/drive/folders/1_bNAiIop0Le2F-csmRFAFB1_6d7TQnPO",
  },
  {
    id: 34,
    name: "Digital electronics Lab",
    name2: "Digital electronics Lab",
    subjectLink:
      "https://drive.google.com/drive/folders/1b3n3FILgYSZrB893ZMWwcY1TbndRuwHF",
  },
  {
    id: 35,
    name: "انسترو",
    name2: "Instrumentation",
    subjectLink:
      "https://drive.google.com/drive/folders/1TKoNimnZkIWiIqeXK_oihO9NZBsW5GH0",
  },
  {
    id: 36,
    name: "بروب احتمالات",
    name2: "Probabilities",
    subjectLink:
      "https://drive.google.com/drive/folders/1lPBI9cUxXjtKEIsvdwJWxNQJF3P3syep",
  },
  {
    id: 37,
    name: "أنظمة تحكم",
    name2: "Control systems",
    subjectLink:
      "https://drive.google.com/drive/folders/1Ti9ew6wj-X7StVmCIStku1QE0NQLI1u-",
  },
  {
    id: 38,
    name: "لاب أنظمة تحكم",
    name2: "Control systems lab",
    subjectLink:
      "https://drive.google.com/drive/folders/1A06XuIXojrILz-HPUtePMi2i3RWoGwTP",
  },
  {
    id: 39,
    name: "عربي 101",
    name2: "Arabic 101",
    subjectLink:
      "https://drive.google.com/drive/folders/1jlWPUb_F3HuSzE8owjjwY2MAqJVse1Ww",
  },
  {
    id: 40,
    name: "Communication electronics",
    name2: "Communication electronics",
    subjectLink:
      "https://drive.google.com/drive/folders/1jCGozwbNwk0sbHCfS9DLYlqIRiqK47IV",
  },
  {
    id: 41,
    name: "امديد",
    name2: "Embedded",
    subjectLink:
      "https://drive.google.com/drive/folders/13PFH3pX5ga5tFU3mJCF0cD68-eqXgBXg",
  },
  {
    id: 42,
    name: "Communication systems",
    name2: "Communication systems",
    subjectLink:
      "https://drive.google.com/drive/folders/1VVMJsV_R2CkKT6Pzlq02CxH-LYTfTscm",
  },
  {
    id: 43,
    name: "DSP",
    name2: "DSP",
    subjectLink:
      "https://drive.google.com/drive/folders/1klJoA-v8cyKrP6TwkGGJd4Wd4NIZ69jX",
  },
  {
    id: 44,
    name: "Digital control",
    name2: "DC",
    subjectLink:
      "https://drive.google.com/drive/folders/1jSXZkQDxmw5_V4r68aMi9zjjgNB_fpPj",
  },
  {
    id: 45,
    name: "Comm lab",
    name2: "Communication systems lab",
    subjectLink:
      "https://drive.google.com/drive/folders/1tRL5kuol59LqbsNhntqUD6TviqhNtYgV",
  },
  {
    id: 46,
    name: "Digital comm lab",
    name2: "Digital communications lab",
    subjectLink:
      "https://drive.google.com/drive/folders/1yPM9iYl_qLpHwUGz5leCDR-QJyMlwQ3o",
  },
  {
    id: 47,
    name: "Digital comm",
    name2: "Digital communications",
    subjectLink:
      "https://drive.google.com/drive/folders/1URYgtWO6_fkP2vYAGTYYNeyHmLwKL7EG",
  },
  {
    id: 48,
    name: "هاتف",
    name2: "Mobile",
    subjectLink:
      "https://drive.google.com/drive/folders/1Ig_4sGGRf4zhOVs2T0A2o8NNXcMqdx4s",
  },
  {
    id: 49,
    name: "درايف",
    name2: "Drive",
    subjectLink:
      "https://drive.google.com/drive/folders/1IjoVUKwKktpslukYUV1wz6mva7dqsIFX",
  },
  {
    id: 50,
    name: "لاب بور الكترو",
    name2: "Power electro lab",
    subjectLink:
      "https://drive.google.com/drive/folders/1fsqsnUFijbdBOrs_IsUlVAwBTpSe6_sX",
  },
  {
    id: 51,
    name: "بور الكترو",
    name2: "Power electro",
    subjectLink:
      "https://drive.google.com/drive/folders/1Knz1fv4QsYzOoPStudmpRHI6ExpEltZl",
  },
  {
    id: 52,
    name: "الات كهربائية مشين",
    name2: "Machines",
    subjectLink:
      "https://drive.google.com/drive/folders/1pEkSackOerA6j-yL7bKruWvVwBhanePc",
  },
  {
    id: 53,
    name: "بور 1",
    name2: "Power 1",
    subjectLink:
      "https://drive.google.com/drive/folders/179X3HTNfiVwnLTDs7oh_KSKPkXEuAsoY",
  },
  {
    id: 54,
    name: "بور 2",
    name2: "Power 2",
    subjectLink:
      "https://drive.google.com/drive/folders/1I_lilgLATFHrFymFaBQCIGI0VPqyGKag",
  },
  {
    id: 55,
    name: "لاب مشين",
    name2: "Machines lab",
    subjectLink:
      "https://drive.google.com/drive/folders/1C5262KMNrMQfNgdK9zyABTfFuKMMygES",
  },
  {
    id: 56,
    name: "دستربيوشن Power System",
    name2: "Distribution",
    subjectLink:
      "https://drive.google.com/drive/folders/1vFwanOqlvHXjiqGpcRVMYdEAmzis7bwi",
  },
  {
    id: 57,
    name: "بروداكشن حماية",
    name2: "Protection",
    subjectLink:
      "https://drive.google.com/drive/folders/1qlQeRwKw-ViJZOWYvzWq3-JP6zm2fhj0",
  },
  {
    id: 58,
    name: "لاب بور الكترو",
    name2: "Power electro lab",
    subjectLink:
      "https://drive.google.com/drive/folders/1fsqsnUFijbdBOrs_IsUlVAwBTpSe6_sX",
  },
  {
    id: 59,
    name: "لاب بور انتجريشن",
    name2: "Power integration",
    subjectLink:
      "https://drive.google.com/drive/folders/1QABjkq7ItIh8-dUdWSvGwr8emuwBMo1b",
  },
  {
    id: 60,
    name: "لاب امديد",
    name2: "Embedded lab",
    subjectLink:
      "https://drive.google.com/drive/folders/14ntYYqixsxPMMervAvcSfs1a1Ej6c1E6",
  },
];