/** Shared object between files */
export default {
  ID: '{{ID}}',
  VARIATION: '{{VARIATION}}',
  cutoffHours: 13,
  cutoffDate: (new Date()).setHours(13,0,0,0),
  validDeliveryDays: [1,2,3,4,5],
};
