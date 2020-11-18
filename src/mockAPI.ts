export interface Depot {
  bays: string;
  isDepot: boolean;
  isElectricFast: boolean;
  isElectricPublic: boolean;
  isElectricRapidDC: boolean;
  isElectricResidential: boolean;
  isFuelDiesel: boolean;
  isFuelPetrol: boolean;
  latitude: string;
  longitude: string;
  stationName: string;
}

const data = [
  {
    isElectricPublic: false,
    isElectricFast: false,
    isDepot: true,
    isElectricRapidDC: false,
    isFuelPetrol: true,
    latitude: "52.04309",
    bays: "6",
    isFuelDiesel: false,
    stationName: "D0",
    isElectricResidential: false,
    longitude: "-0.71796",
  },
  {
    isElectricPublic: false,
    isElectricFast: false,
    isDepot: true,
    isElectricRapidDC: false,
    isFuelPetrol: false,
    latitude: "52.00912",
    bays: "6",
    isFuelDiesel: true,
    stationName: "D1",
    isElectricResidential: false,
    longitude: "-0.7426",
  },
  {
    isElectricPublic: false,
    isElectricFast: true,
    isDepot: true,
    isElectricRapidDC: false,
    isFuelPetrol: false,
    latitude: "52.03252",
    bays: "6",
    isFuelDiesel: false,
    stationName: "D2",
    isElectricResidential: false,
    longitude: "-0.76528",
  },
];

export const getDepotData = () => new Promise<Depot[]>((res, rej) => res(data));
