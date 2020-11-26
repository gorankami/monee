const purposeClass = require("./purposeClassifier/purposeClass");

const defaultStats = {
  other: 0,
  sum: 0,
};

module.exports = function statsReducer(stats, d) {
  if (!stats) stats = defaultStats;
  if (!d.amount) return stats;
  let tag = purposeClass[d.purpose];
  if (tag) {
    if (stats[tag]) {
      stats[tag] += d.amount;
    } else {
      stats[tag] = d.amount;
    }
  } else {
    stats.other += d.amount;
  }
  stats.sum += d.amount;
  return stats;
};
