const strategyTester = (strategyId) => {
  const styles = {
    fail: ['color: white', 'background: red'],
    pass: ['color: white', 'background: green'],
    data: ['color: white', 'font-size: 16px', 'font-weight:700'],
    error: ['color: red', 'font-size: 16px', 'font-weight:700'],
  };
  const payload = {
    data: [
      {
        wId: strategyId,
        fId: '',
        maxProducts: 3,
        rules: [],
        filtering: [],
      },
    ],
    ctx: {
      type: 'HOMEPAGE',
    },
  };
  fetch(`https://rcom-eu.dynamicyield.com/v3/recommend/${window.DY.section}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      const errMsg = data.response[0].errorMessage;
      if (errMsg) {
        console.log('%c FAILED ', styles.fail.join(';'));
        console.log('%cError Message: ', styles.error.join(';'), errMsg);
        return;
      }
      console.log('%c PASSED ', styles.pass.join(';'));
      console.log('%cRecommendation Data: ', styles.data.join(';'), data.response[0]);
    })
    .catch((err) => {
      console.log(err);
      console.log('%c%s', styles.fail.join(';'), err);
    });
};
