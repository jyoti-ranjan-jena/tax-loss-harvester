export const calculateHarvesting = (initialGains, holdings, selectedCoinIds) => {
  if (!initialGains || !holdings) return null;

  // 1. Start with the baseline pre-harvesting data
  let postHarvest = {
    stcg: { ...initialGains.stcg },
    ltcg: { ...initialGains.ltcg }
  };

  // 2. Loop through selected holdings and apply the harvesting logic
  selectedCoinIds.forEach(coinId => {
  // Find items using our newly synthesized unique id property
  const holding = holdings.find(h => h.id === coinId);
  if (!holding) return;

  if (holding.stcg.gain > 0) postHarvest.stcg.profits += holding.stcg.gain;
  if (holding.stcg.gain < 0) postHarvest.stcg.losses += Math.abs(holding.stcg.gain);

  if (holding.ltcg.gain > 0) postHarvest.ltcg.profits += holding.ltcg.gain;
  if (holding.ltcg.gain < 0) postHarvest.ltcg.losses += Math.abs(holding.ltcg.gain);
});

  // 3. Calculate Net & Realized Gains for both Pre and Post
  const preNetST = initialGains.stcg.profits - initialGains.stcg.losses;
  const preNetLT = initialGains.ltcg.profits - initialGains.ltcg.losses;
  const preRealized = preNetST + preNetLT;

  const postNetST = postHarvest.stcg.profits - postHarvest.stcg.losses;
  const postNetLT = postHarvest.ltcg.profits - postHarvest.ltcg.losses;
  const postRealized = postNetST + postNetLT;

  // 4. Calculate Tax Savings (Only if post-realized is lower than pre-realized)
  const taxSavings = preRealized > postRealized ? preRealized - postRealized : 0;

  return {
    pre: {
      ...initialGains,
      netST: preNetST,
      netLT: preNetLT,
      realized: preRealized
    },
    post: {
      ...postHarvest,
      netST: postNetST,
      netLT: postNetLT,
      realized: postRealized
    },
    taxSavings
  };
};