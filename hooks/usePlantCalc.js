import { useSelector } from 'react-redux';
import useWorkData from './useWorkData';
import { worksPerPlant } from '../assets/plants';
import {
  calcOilAndPaidPerPlant,
  calcSowing,
  calcSpraying,
  calcMidRowCultivation,
  calcFertilization,
} from '../calcFunctions';

const usePlantCalc = field => {
  const plant = useSelector(state => state[field].plant);

  if (plant !== '') {
    const rentedPerHa = useSelector(state => (state[field].rented ? state[field].rentedPrice : 0));

    const {
      area,
      sowingData,
      fertilization1Data,
      fertilization2Data,
      midRowCultivation1Data,
      midRowCultivation2Data,
      spraying1Data,
      spraying2Data,
      sowingDone,
      sowingPlaning,
      fertilization1Done,
      fertilization2Done,
      fertilization1Planing,
      fertilization2Planing,
      midRowCultivation1Done,
      midRowCultivation2Done,
      midRowCultivation1Planing,
      midRowCultivation2Planing,
      spraying1Done,
      spraying2Done,
      spraying1Planing,
      spraying2Planing,
    } = useWorkData(field);

    const allWorks = useSelector(state =>
      Object.values(state[field].groundWorksState).filter(work =>
        worksPerPlant[plant].includes(work.workName)
      )
    );
    const doneWorks = allWorks.filter(work => work.done);
    const planingWorks = allWorks.filter(work => work.planing);

    const oilConsumptionDone = calcOilAndPaidPerPlant(doneWorks, 'oilConsumption', area);
    const oilPriceDone = oilConsumptionDone * 150;
    const paidDone = calcOilAndPaidPerPlant(doneWorks, 'paidPrice', area);
    const seedDone = sowingDone ? calcSowing(area, sowingData) : 0;
    const fertilizer1Done = fertilization1Done ? calcFertilization(area, fertilization1Data) : 0;
    const fertilizer2Done = fertilization2Done ? calcFertilization(area, fertilization2Data) : 0;
    const fertilizer1MidDone = midRowCultivation1Done
      ? calcMidRowCultivation(area, midRowCultivation1Data)
      : 0;
    const fertilizer2MidDone = midRowCultivation2Done
      ? calcMidRowCultivation(area, midRowCultivation2Data)
      : 0;
    const sprayer1Done = spraying1Done ? calcSpraying(area, spraying1Data) : 0;
    const sprayer2Done = spraying2Done ? calcSpraying(area, spraying2Data) : 0;

    const oilConsumptionPlaning = calcOilAndPaidPerPlant(planingWorks, 'oilConsumption', area);
    const oilPricePlaning = oilConsumptionPlaning * 150;
    const paidPlaning = calcOilAndPaidPerPlant(planingWorks, 'paidPrice', area);
    const seedPlaning = sowingPlaning ? calcSowing(area, sowingData) : 0;
    const fertilizer1Planing = fertilization1Planing
      ? calcFertilization(area, fertilization1Data)
      : 0;
    const fertilizer2Planing = fertilization2Planing
      ? calcFertilization(area, fertilization2Data)
      : 0;
    const fertilizer1MidPlaning = midRowCultivation1Planing
      ? calcMidRowCultivation(area, midRowCultivation1Data)
      : 0;
    const fertilizer2MidPlaning = midRowCultivation2Planing
      ? calcMidRowCultivation(area, midRowCultivation2Data)
      : 0;
    const sprayer1Planing = spraying1Planing ? calcSpraying(area, spraying2Data) : 0;
    const sprayer2Planing = spraying2Planing ? calcSpraying(area, spraying2Data) : 0;

    const fertilizerTotalDone =
      fertilizer1Done + fertilizer2Done + fertilizer1MidDone + fertilizer2MidDone;
    const fertilizerTotalPlaning =
      fertilizer1Planing + fertilizer2Planing + fertilizer1MidPlaning + fertilizer2MidPlaning;
    const sprayerTotalDone = sprayer1Done + sprayer2Done;
    const sprayerTotalPlaning = sprayer1Planing + sprayer2Planing;
    const doneTotal = oilPriceDone + paidDone + seedDone + fertilizerTotalDone + sprayerTotalDone;
    const planingTotal =
      oilPricePlaning + paidPlaning + seedPlaning + fertilizerTotalPlaning + sprayerTotalPlaning;

    const oilConsumptionTotal = oilConsumptionDone + oilConsumptionPlaning;
    const oilPriceTotal = oilPriceDone + oilPricePlaning;
    const paidTotal = paidDone + paidPlaning;
    const seedTotal = seedDone + seedPlaning;
    const fertilizerTotal = fertilizerTotalDone + fertilizerTotalPlaning;
    const sprayerTotal = sprayerTotalDone + sprayerTotalPlaning;
    const rented = Math.round((area / 100) * rentedPerHa);
    const total = doneTotal + planingTotal + rented;

    return {
      oilConsumptionDone,
      oilPriceDone,
      paidDone,
      seedDone,
      oilConsumptionPlaning,
      oilPricePlaning,
      paidPlaning,
      seedPlaning,
      fertilizerTotalDone,
      fertilizerTotalPlaning,
      sprayerTotalDone,
      sprayerTotalPlaning,
      oilConsumptionTotal,
      oilPriceTotal,
      paidTotal,
      seedTotal,
      fertilizerTotal,
      sprayerTotal,
      doneTotal,
      planingTotal,
      rented,
      total,
    };
  }

  return {
    oilConsumptionDone: 0,
    oilPriceDone: 0,
    paidDone: 0,
    seedDone: 0,
    oilConsumptionPlaning: 0,
    oilPricePlaning: 0,
    paidPlaning: 0,
    seedPlaning: 0,
    fertilizerTotalDone: 0,
    fertilizerTotalPlaning: 0,
    sprayerTotalDone: 0,
    sprayerTotalPlaning: 0,
    oilConsumptionTotal: 0,
    oilPriceTotal: 0,
    paidTotal: 0,
    seedTotal: 0,
    fertilizerTotal: 0,
    sprayerTotal: 0,
    doneTotal: 0,
    planingTotal: 0,
    rented: 0,
    total: 0,
  };
};

export default usePlantCalc;
