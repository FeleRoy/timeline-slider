import { timelineDate, yearsDateInfo } from "@/utils/types";
const FirstDates: yearsDateInfo[] = [
  {
    year: 1976,
    text:
      "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
  },
  {
    year: 2016,
    text:
      "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
  },
  {
    year: 1990,
    text:
      "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
  },
  {
    year: 2025,
    text:
      "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
  },
];

const SecDates = [
  {
    year: 2015,
    text:
      "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
  },
  {
    year: 2016,
    text:
      "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
  },
  {
    year: 2017,
    text:
      "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
  },
  {
    year: 2015,
    text:
      "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
  },
];

export const HistoryPageMock: timelineDate[] = [
  {
    title: 'Наука',
    firstYear: 2015,
    lastYear: 2022,
    yearsDate: FirstDates,
  },
  {
    title: 'Литература',
    firstYear: 1992,
    lastYear: 1997,
    yearsDate: SecDates,
  },
  {
    title: 'Кино',
    firstYear: 1924,
    lastYear: 2025,
    yearsDate: FirstDates,
  },
  {
    title: 'Музыка',
    firstYear: 1500,
    lastYear: 2001,
    yearsDate: SecDates,
  },
  {
    title: 'Мультфильмы',
    firstYear: 1976,
    lastYear: 1991,
    yearsDate: FirstDates,
  },
  {
    title: 'Игры',
    firstYear: 1962,
    lastYear: 2025,
    yearsDate: FirstDates,
  },
];
