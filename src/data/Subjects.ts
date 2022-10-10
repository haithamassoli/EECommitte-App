import Colors from "@GlobalStyle/Colors";
import { Subject } from "@Types/index";

const Subjects: Subject[] = [
  {
    id: 1,
    name: "كالكولاس 101 تفاضل وتكامل",
    name2: "Calculus 101",
  },
  {
    id: 2,
    name: "كالكولاس 102 تفاضل وتكامل",
    name2: "Calculus 102",
  },
  {
    id: 3,
    name: "ديف Differential Equations",
    name2: "Diff",
  },
  {
    id: 4,
    name: "Intermediate Analysis",
    name2: "تحليل وسيط",
  },
  {
    id: 5,
    name: "Economy",
    name2: "اقتصاد",
  },
  {
    id: 6,
    name: "فيزياء 101",
    name2: "Physics 101",
  },
  {
    id: 7,
    name: "فيزياء 102",
    name2: "Physics 102",
  },
  {
    id: 8,
    name: "لاب فيزياء",
    name2: "Physics Lab",
  },
  {
    id: 9,
    name: "مقدمة في البرمجة",
    name2: "C++",
  },
  {
    id: 10,
    name: "لاب مقدمة في البرمجة",
    name2: "C++ lab",
  },
  {
    id: 11,
    name: "نيوماريكال",
    name2: "Numerical",
  },
  {
    id: 12,
    name: "حاسوب استدراكي",
    name2: "Computer Skills",
  },
  {
    id: 13,
    name: "مايكرو كنترول",
    name2: "Micro Controllers",
  },
  {
    id: 14,
    name: "مايكرو بروسيسر",
    name2: "Micro Processor",
  },
  {
    id: 15,
    name: "لاب مايكرو كنترول",
    name2: "Micro Controllers Lab",
  },
  {
    id: 16,
    name: "Engineering Mechanics Statics",
    name2: "ميكانيكا هندسية",
  },
  {
    id: 17,
    name: "Entrepreneurship and Entrepreneurs",
    name2: "ريادة وابداع",
  },
  {
    id: 18,
    name: "اللغة الانجليزية 112",
    name2: "English 112",
  },
  {
    id: 19,
    name: "مهارات عامة",
    name2: "General Skills",
  },
  {
    id: 20,
    name: "سيركت 1",
    name2: "Circuits 1",
  },
  {
    id: 21,
    name: "سيركت 2",
    name2: "Circuits 2",
  },
  {
    id: 22,
    name: "لاب سيركت",
    name2: "Circuits lab",
  },
  {
    id: 23,
    name: "لينير",
    name2: "Linear",
  },
  {
    id: 24,
    name: "سيجنال",
    name2: "Signal",
  },
  {
    id: 25,
    name: "الكترونيات 1",
    name2: "Electronics 1",
  },
  {
    id: 26,
    name: "الكترونيات 2",
    name2: "Electronics 2",
  },
  {
    id: 27,
    name: "الكهرومغناطيسية 1 Electromagnetic",
    name2: "EM 1",
  },
  {
    id: 28,
    name: "الكهرومغناطيسية 2 Electromagnetic",
    name2: "EM 2",
  },
  {
    id: 29,
    name: "كيمياء 101",
    name2: "Chemistry 101",
  },
  {
    id: 30,
    name: "كيمياء 102",
    name2: "Chemistry 102",
  },
  {
    id: 31,
    name: "لاب كيمياء",
    name2: "Chemistry Lab",
  },
  {
    id: 32,
    name: "لاب الكترونيات",
    name2: "Electronics lab",
  },
  {
    id: 33,
    name2: "DE",
    name: "Digital electronics",
  },
  {
    id: 34,
    name2: "DE Lab",
    name: "Digital electronics Lab",
  },
  {
    id: 35,
    name: "انسترو Instrumentation",
    name2: "Instru",
  },
  {
    id: 36,
    name: "بروب احتمالات Probabilities",
    name2: "Prob",
  },
  {
    id: 37,
    name: "أنظمة تحكم كنترول",
    name2: "Control systems",
  },
  {
    id: 38,
    name: "لاب كنترول أنظمة تحكم",
    name2: "Control systems lab",
  },
  {
    id: 39,
    name2: "عربي",
    name: "Arabic",
  },
  {
    id: 40,
    name2: "Comm Electro",
    name: "Communication electronics",
  },
  {
    id: 42,
    name: "Communication systems",
    name2: "Comm Systems",
  },
  {
    id: 43,
    name: "DSP",
    name2: "DSP",
  },
  {
    id: 44,
    name: "Digital control",
    name2: "DC",
  },
  {
    id: 45,
    name2: "Comm lab",
    name: "Communication systems lab",
  },
  {
    id: 46,
    name2: "Digital comm lab",
    name: "Digital communications lab",
  },
  {
    id: 47,
    name2: "Digital comm",
    name: "Digital communications",
  },
  {
    id: 48,
    name: "هاتف",
    name2: "Mobile",
  },
  {
    id: 49,
    name: "درايف",
    name2: "Drive",
  },
  {
    id: 50,
    name: "امديد",
    name2: "Embedded",
  },
  {
    id: 51,
    name: "بور الكترو",
    name2: "Power electro",
  },
  {
    id: 52,
    name: "الات كهربائية مشين",
    name2: "Machines",
  },
  {
    id: 53,
    name: "بور 1",
    name2: "Power 1",
  },
  {
    id: 54,
    name: "بور 2",
    name2: "Power 2",
  },
  {
    id: 55,
    name: "لاب مشين",
    name2: "Machines lab",
  },
  {
    id: 56,
    name: "دستربيوشن Power System",
    name2: "Distribution",
  },
  {
    id: 57,
    name: "بروداكشن حماية",
    name2: "Protection",
  },
  {
    id: 58,
    name: "لاب بور الكترو",
    name2: "Power electro lab",
  },
  {
    id: 59,
    name: "لاب بور انتجريشن",
    name2: "Integration lab",
  },
  {
    id: 60,
    name: "لاب امديد",
    name2: "Embedded lab",
  },
  {
    id: 61,
    name: "لاب باور",
    name2: "Power lab",
  },
];

export default Subjects;
