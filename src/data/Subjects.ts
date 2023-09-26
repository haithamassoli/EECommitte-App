import { Subject } from "@Types/index";

const Subjects: Subject[] = [
  {
    id: 1,
    name2: "كالكولاس 101 تفاضل وتكامل",
    name: "Calculus 101",
  },
  {
    id: 2,
    name2: "كالكولاس 102 تفاضل وتكامل",
    name: "Calculus 102",
  },
  {
    id: 3,
    name2: "ديف Differential Equations",
    name: "Diff",
  },
  {
    id: 4,
    name2: "Intermediate Analysis",
    name: "تحليل وسيط",
  },
  {
    id: 5,
    name2: "Economy",
    name: "اقتصاد",
  },
  {
    id: 6,
    name2: "فيزياء 101",
    name: "Physics 101",
  },
  {
    id: 7,
    name2: "فيزياء 102",
    name: "Physics 102",
  },
  {
    id: 8,
    name2: "لاب فيزياء",
    name: "Physics Lab",
  },
  {
    id: 9,
    name2: "مقدمة في البرمجة",
    name: "C++",
  },
  {
    id: 10,
    name2: "لاب مقدمة في البرمجة",
    name: "C++ lab",
  },
  {
    id: 11,
    name2: "نيوماريكال",
    name: "Numerical",
  },
  {
    id: 12,
    name2: "حاسوب استدراكي",
    name: "Computer Skills",
  },
  {
    id: 13,
    name2: "مايكرو كنترول",
    name: "Micro Controllers",
  },
  {
    id: 14,
    name2: "مايكرو بروسيسر",
    name: "Micro Processor",
  },
  {
    id: 15,
    name2: "لاب مايكرو كنترول",
    name: "Micro Controllers Lab",
  },
  {
    id: 16,
    name2: "Engineering Mechanics Statics",
    name: "ميكانيكا هندسية",
  },
  {
    id: 17,
    name2: "Entrepreneurship and Entrepreneurs",
    name: "ريادة وابداع",
  },
  {
    id: 18,
    name2: "اللغة الانجليزية 112",
    name: "English 112",
  },
  {
    id: 19,
    name2: "مهارات عامة",
    name: "General Skills",
  },
  {
    id: 20,
    name2: "سيركت 1",
    name: "Circuits 1",
  },
  {
    id: 21,
    name2: "سيركت 2",
    name: "Circuits 2",
  },
  {
    id: 22,
    name2: "لاب سيركت",
    name: "Circuits lab",
  },
  {
    id: 23,
    name2: "لينير",
    name: "Linear",
  },
  {
    id: 24,
    name2: "سيجنال",
    name: "Signal",
  },
  {
    id: 25,
    name2: "الكترونيات 1",
    name: "Electronics 1",
  },
  {
    id: 26,
    name2: "الكترونيات 2",
    name: "Electronics 2",
  },
  {
    id: 27,
    name2: "الكهرومغناطيسية 1 Electromagnetic",
    name: "EM 1",
  },
  {
    id: 28,
    name2: "الكهرومغناطيسية 2 Electromagnetic",
    name: "EM 2",
  },
  {
    id: 29,
    name2: "كيمياء 101",
    name: "Chemistry 101",
  },
  {
    id: 30,
    name2: "كيمياء 102",
    name: "Chemistry 102",
  },
  {
    id: 31,
    name2: "لاب كيمياء",
    name: "Chemistry Lab",
  },
  {
    id: 32,
    name2: "لاب الكترونيات",
    name: "Electronics lab",
  },
  {
    id: 33,
    name: "DE",
    name2: "Digital electronics",
  },
  {
    id: 34,
    name: "DE Lab",
    name2: "Digital electronics Lab",
  },
  {
    id: 35,
    name2: "انسترو Instrumentation",
    name: "Instru",
  },
  {
    id: 36,
    name2: "بروب احتمالات Probabilities",
    name: "Prob",
  },
  {
    id: 37,
    name2: "أنظمة تحكم كنترول",
    name: "Control systems",
  },
  {
    id: 38,
    name2: "لاب كنترول أنظمة تحكم",
    name: "Control systems lab",
  },
  {
    id: 39,
    name: "عربي",
    name2: "Arabic",
  },
  {
    id: 40,
    name: "Comm Electro",
    name2: "Communication electronics",
  },
  {
    id: 42,
    name2: "Communication systems",
    name: "Comm Systems",
  },
  {
    id: 43,
    name2: "DSP",
    name: "DSP",
  },
  {
    id: 44,
    name2: "Digital control",
    name: "DC",
  },
  {
    id: 45,
    name: "Comm lab",
    name2: "Communication systems lab",
  },
  {
    id: 46,
    name: "Digital comm lab",
    name2: "Digital communications lab",
  },
  {
    id: 47,
    name: "Digital comm",
    name2: "Digital communications",
  },
  {
    id: 48,
    name2: "هاتف",
    name: "Mobile",
  },
  {
    id: 49,
    name2: "درايف",
    name: "Drive",
  },
  {
    id: 50,
    name2: "امديد",
    name: "Embedded",
  },
  {
    id: 51,
    name2: "بور الكترو",
    name: "Power electro",
  },
  {
    id: 52,
    name2: "الات كهربائية مشين",
    name: "Machines",
  },
  {
    id: 53,
    name2: "بور 1",
    name: "Power 1",
  },
  {
    id: 54,
    name2: "بور 2",
    name: "Power 2",
  },
  {
    id: 55,
    name2: "لاب مشين",
    name: "Machines lab",
  },
  {
    id: 56,
    name2: "دستربيوشن Power System",
    name: "Distribution",
  },
  {
    id: 57,
    name2: "بروداكشن حماية",
    name: "Protection",
  },
  {
    id: 58,
    name2: "لاب بور الكترو",
    name: "Power electro lab",
  },
  {
    id: 59,
    name2: "لاب بور انتجريشن",
    name: "Integration lab",
  },
  {
    id: 60,
    name2: "لاب امديد",
    name: "Embedded lab",
  },
  {
    id: 61,
    name2: "لاب باور",
    name: "Power lab",
  },
  {
    id: 62,
    name2: "راديو ويف",
    name: "Radio Wave",
  },
  {
    id: 63,
    name2: "لاب مايكروويف",
    name: "Lab Microwave",
  },
  {
    id: 64,
    name2: "نيتورك",
    name: "Network",
  },
  {
    id: 65,
    name2: "اوبتيكال فايبر",
    name: "Optical Fiber",
  },
  {
    id: 66,
    name2: "ساتالايت",
    name: "Satellite",
  },
  {
    id: 67,
    name2: "تصميم الدوائر الإلكترونية الكتف",
    name: "Electives",
  },
];

export default Subjects;
