import settings from '../../lib/settings';

const {
  ID
} = settings;

export default class USP {
  /**
   * @param {object} options
   * @param {function} options.render Function to render component
   */
  constructor(options) {
    const opts = options || {};
    this.create();
    this.bindEvents();
    if (opts.render) opts.render(this.component);
  }

  create() {
    const countryCode = document.querySelector('html').getAttribute('lang').toUpperCase();
    let data = [];
    switch (countryCode) {
      case 'EN':
        data = [{
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAkBAMAAABoCkdnAAAAMFBMVEUAAADgFBjgFBfhFBjfGBjfFRfgFRjfFBjgFRfjHBzhFRfgFRjhFRfgFhnjFRzfFBctwiONAAAAD3RSTlMAwPV/QNKd4sUSbpKPUiULEarfAAAAfUlEQVQoz2NY9B8MPjLoMICAPoz7PwHE/Q/nfkPlAqVRuN9QuEBpVO43VO7/A6hcBRj3B8gWhFGfHqBw/2sIAoEAiIsAHwhzvwqCgCiMGwAxNB7KrQTzOOuJMkrXBQR89aHcBohR/VDub2MQsKamM2jL1UfmKkASAyzsFwAAK5+J2XoMjDgAAAAASUVORK5CYII=',
            text: 'Request a quote',
          },
          {
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAcCAMAAAA+9+1qAAAAV1BMVEUAAADkGxvfFRjhFRfgFRfgFBjiFRn/gIDfFRjmGRngFBfgFRfgFBfiHR3gFRjfFRfgFBfgFRjiFRjhFRjgFRffFRvhGBjpFhz/VVXgFBfgFRffFhjfFBdi3dpHAAAAHHRSTlMAHLhY6NU8AqAe5cayEffRlGxBd9swKhYDu4OAIVa01AAAAPxJREFUOMuFkluWgyAQRMsA8lKJxkzm0ftf50wI09LoiffP4nIKsFHjZ5f0NOnkZo9DrIpUEZXdO72hBtO3zo0OuAllHHjh0n1stcNYOSsxHbD8rZZd62YNJKRvcpwNzXm4bqUecPJc/Wutu7AYAATqX0m+ozWlpWPp+txpSmIsAEVCKpuv9POfKACR2roA2EBfviQR8MRUbUv97TFLgdsqZridEyw+dR04pNM2StA7aWnaSGNqHd220YRJ3j+okdtyniUtXjI88hg/wy3XSEJSyCghJThR90CmE3WuecyxTKEIZ/FbZB3jgUgnxLzrBMVDdwwPHe7mrXMHfgHmK0pz3N8huwAAAABJRU5ErkJggg==',
            text: 'Calibration services',
          },
          {
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAQlBMVEUAAADgFxjgFBjuGx3gFRfjFxziFh3gFBjfFBjgFRjgFBfgFBjfFhjhFhjgGBjjFhzlGhrhHh7gFBjgFRjgFhjfFBdrpbcJAAAAFXRSTlMAQMAJ9S0j7di2pIuBXkEuHRHVknPUur6ZAAAA6ElEQVQ4y52U2xKDIAxEgXhX8Jr//9U2yRQsWsP0PEVnxc0CMRlLi9gu5hmLb6wiCiQKT4pmchWJKjc1PyRzjyf6+UYCI2aMkGtWhxfcmmk2ZCrWkjNi+1KBrNN5kAjAd7LW+Y/iZ4CUEwzi69QXEgeVNVU1VQcSqcee15G6traWitfqY4bsBy6hsK9PqhM9eHPB0/vJCI56h5t8KQnHZ8MGrqOVponm+OtgF9NihFU74i5tRlqDCStNiFmLiSJR0e+KjOsRlIepb4u+weVHRT90+vEtvwj6ldIvp37N9YGhj54/h5g+Dl9LHSex+KXatQAAAABJRU5ErkJggg==',
            text: 'Track your order',
          },
          {
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAAABGdBTUEAALGPC/xhBQAAAdFJREFUWAntV71Kw1AUPieNFlFBsG2obWnFpeCkgt2cdHPxFfQJHH0AcXX2AVx9ACfRRVE7KjjYSmpF6w+IiDbN8dzWpEkoua3GuiTLPb/fOXznQu5B8HzlxMQSmeY2AOUJQPG4A1ERwATAC1SU9ez97b4TlH3tT0+l0sZn45KIhtvWv5MQ8U0djOTTlYpuVXExYBi00K9mRAOilqhpNSNO1algg0Z4TPaHCHtE8GAbAhAYM86YKxaUqGnJ4nQ15HQIGUnZzNWqZ177b/RyLDlHYNoNebFcI/M6/0MPG5KxHjIUMiRjQOYP71DIkIwBmT+8QzKGfP/2Jpin1zFNhtGTnzF948OR+dLDTtfI+DV3AQQ7sqQg/c2aQQIGjYWluLbGb9z5XoFVwN1M7e6gUx5jrjJmoZPPz8ZsnWApptX5Ye8anV+S5eMVphiJqosZXX+ybOIsadokNOCcMcec9m5k3skM0dDzT5K/C7xyY1d871rLCkKUd5tpVlz7XjfNiBhOemHm8YhBlrtN8sSN8m41a9tabdlqrwIBHuJNIjNlUv2Ygcd7BQgynpl+VHCg0KS2FMsmAT82uMAMkz8UZCEpFsI7xxSBolu5Wrkqje93wBcSmX9rJJ3jLAAAAABJRU5ErkJggg==',
            text: 'eProcurement',
          }
        ]
        break;
      case 'DE':
        data = [{
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAkBAMAAABoCkdnAAAAMFBMVEUAAADgFBjgFBfhFBjfGBjfFRfgFRjfFBjgFRfjHBzhFRfgFRjhFRfgFhnjFRzfFBctwiONAAAAD3RSTlMAwPV/QNKd4sUSbpKPUiULEarfAAAAfUlEQVQoz2NY9B8MPjLoMICAPoz7PwHE/Q/nfkPlAqVRuN9QuEBpVO43VO7/A6hcBRj3B8gWhFGfHqBw/2sIAoEAiIsAHwhzvwqCgCiMGwAxNB7KrQTzOOuJMkrXBQR89aHcBohR/VDub2MQsKamM2jL1UfmKkASAyzsFwAAK5+J2XoMjDgAAAAASUVORK5CYII=',
            text: 'Angebot anfordern',
          },
          {
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAcCAMAAAA+9+1qAAAAV1BMVEUAAADkGxvfFRjhFRfgFRfgFBjiFRn/gIDfFRjmGRngFBfgFRfgFBfiHR3gFRjfFRfgFBfgFRjiFRjhFRjgFRffFRvhGBjpFhz/VVXgFBfgFRffFhjfFBdi3dpHAAAAHHRSTlMAHLhY6NU8AqAe5cayEffRlGxBd9swKhYDu4OAIVa01AAAAPxJREFUOMuFkluWgyAQRMsA8lKJxkzm0ftf50wI09LoiffP4nIKsFHjZ5f0NOnkZo9DrIpUEZXdO72hBtO3zo0OuAllHHjh0n1stcNYOSsxHbD8rZZd62YNJKRvcpwNzXm4bqUecPJc/Wutu7AYAATqX0m+ozWlpWPp+txpSmIsAEVCKpuv9POfKACR2roA2EBfviQR8MRUbUv97TFLgdsqZridEyw+dR04pNM2StA7aWnaSGNqHd220YRJ3j+okdtyniUtXjI88hg/wy3XSEJSyCghJThR90CmE3WuecyxTKEIZ/FbZB3jgUgnxLzrBMVDdwwPHe7mrXMHfgHmK0pz3N8huwAAAABJRU5ErkJggg==',
            text: 'Kalibrierservice',
          },
          {
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAQlBMVEUAAADgFxjgFBjuGx3gFRfjFxziFh3gFBjfFBjgFRjgFBfgFBjfFhjhFhjgGBjjFhzlGhrhHh7gFBjgFRjgFhjfFBdrpbcJAAAAFXRSTlMAQMAJ9S0j7di2pIuBXkEuHRHVknPUur6ZAAAA6ElEQVQ4y52U2xKDIAxEgXhX8Jr//9U2yRQsWsP0PEVnxc0CMRlLi9gu5hmLb6wiCiQKT4pmchWJKjc1PyRzjyf6+UYCI2aMkGtWhxfcmmk2ZCrWkjNi+1KBrNN5kAjAd7LW+Y/iZ4CUEwzi69QXEgeVNVU1VQcSqcee15G6traWitfqY4bsBy6hsK9PqhM9eHPB0/vJCI56h5t8KQnHZ8MGrqOVponm+OtgF9NihFU74i5tRlqDCStNiFmLiSJR0e+KjOsRlIepb4u+weVHRT90+vEtvwj6ldIvp37N9YGhj54/h5g+Dl9LHSex+KXatQAAAABJRU5ErkJggg==',
            text: 'Sendungsverfolgung',
          },
          {
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAAABGdBTUEAALGPC/xhBQAAAdFJREFUWAntV71Kw1AUPieNFlFBsG2obWnFpeCkgt2cdHPxFfQJHH0AcXX2AVx9ACfRRVE7KjjYSmpF6w+IiDbN8dzWpEkoua3GuiTLPb/fOXznQu5B8HzlxMQSmeY2AOUJQPG4A1ERwATAC1SU9ez97b4TlH3tT0+l0sZn45KIhtvWv5MQ8U0djOTTlYpuVXExYBi00K9mRAOilqhpNSNO1algg0Z4TPaHCHtE8GAbAhAYM86YKxaUqGnJ4nQ15HQIGUnZzNWqZ177b/RyLDlHYNoNebFcI/M6/0MPG5KxHjIUMiRjQOYP71DIkIwBmT+8QzKGfP/2Jpin1zFNhtGTnzF948OR+dLDTtfI+DV3AQQ7sqQg/c2aQQIGjYWluLbGb9z5XoFVwN1M7e6gUx5jrjJmoZPPz8ZsnWApptX5Ye8anV+S5eMVphiJqosZXX+ybOIsadokNOCcMcec9m5k3skM0dDzT5K/C7xyY1d871rLCkKUd5tpVlz7XjfNiBhOemHm8YhBlrtN8sSN8m41a9tabdlqrwIBHuJNIjNlUv2Ygcd7BQgynpl+VHCg0KS2FMsmAT82uMAMkz8UZCEpFsI7xxSBolu5Wrkqje93wBcSmX9rJJ3jLAAAAABJRU5ErkJggg==',
            text: 'E-Procurement',
          }
        ]
        break;
      case 'CH':
        data = [{
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAkBAMAAABoCkdnAAAAMFBMVEUAAADgFBjgFBfhFBjfGBjfFRfgFRjfFBjgFRfjHBzhFRfgFRjhFRfgFhnjFRzfFBctwiONAAAAD3RSTlMAwPV/QNKd4sUSbpKPUiULEarfAAAAfUlEQVQoz2NY9B8MPjLoMICAPoz7PwHE/Q/nfkPlAqVRuN9QuEBpVO43VO7/A6hcBRj3B8gWhFGfHqBw/2sIAoEAiIsAHwhzvwqCgCiMGwAxNB7KrQTzOOuJMkrXBQR89aHcBohR/VDub2MQsKamM2jL1UfmKkASAyzsFwAAK5+J2XoMjDgAAAAASUVORK5CYII=',
            text: 'Angebot anfordern',
          },
          {
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAcCAMAAAA+9+1qAAAAV1BMVEUAAADkGxvfFRjhFRfgFRfgFBjiFRn/gIDfFRjmGRngFBfgFRfgFBfiHR3gFRjfFRfgFBfgFRjiFRjhFRjgFRffFRvhGBjpFhz/VVXgFBfgFRffFhjfFBdi3dpHAAAAHHRSTlMAHLhY6NU8AqAe5cayEffRlGxBd9swKhYDu4OAIVa01AAAAPxJREFUOMuFkluWgyAQRMsA8lKJxkzm0ftf50wI09LoiffP4nIKsFHjZ5f0NOnkZo9DrIpUEZXdO72hBtO3zo0OuAllHHjh0n1stcNYOSsxHbD8rZZd62YNJKRvcpwNzXm4bqUecPJc/Wutu7AYAATqX0m+ozWlpWPp+txpSmIsAEVCKpuv9POfKACR2roA2EBfviQR8MRUbUv97TFLgdsqZridEyw+dR04pNM2StA7aWnaSGNqHd220YRJ3j+okdtyniUtXjI88hg/wy3XSEJSyCghJThR90CmE3WuecyxTKEIZ/FbZB3jgUgnxLzrBMVDdwwPHe7mrXMHfgHmK0pz3N8huwAAAABJRU5ErkJggg==',
            text: 'Kalibrierservice',
          },
          {
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAQlBMVEUAAADgFxjgFBjuGx3gFRfjFxziFh3gFBjfFBjgFRjgFBfgFBjfFhjhFhjgGBjjFhzlGhrhHh7gFBjgFRjgFhjfFBdrpbcJAAAAFXRSTlMAQMAJ9S0j7di2pIuBXkEuHRHVknPUur6ZAAAA6ElEQVQ4y52U2xKDIAxEgXhX8Jr//9U2yRQsWsP0PEVnxc0CMRlLi9gu5hmLb6wiCiQKT4pmchWJKjc1PyRzjyf6+UYCI2aMkGtWhxfcmmk2ZCrWkjNi+1KBrNN5kAjAd7LW+Y/iZ4CUEwzi69QXEgeVNVU1VQcSqcee15G6traWitfqY4bsBy6hsK9PqhM9eHPB0/vJCI56h5t8KQnHZ8MGrqOVponm+OtgF9NihFU74i5tRlqDCStNiFmLiSJR0e+KjOsRlIepb4u+weVHRT90+vEtvwj6ldIvp37N9YGhj54/h5g+Dl9LHSex+KXatQAAAABJRU5ErkJggg==',
            text: 'Sendungsverfolgung',
          },
          {
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAAABGdBTUEAALGPC/xhBQAAAdFJREFUWAntV71Kw1AUPieNFlFBsG2obWnFpeCkgt2cdHPxFfQJHH0AcXX2AVx9ACfRRVE7KjjYSmpF6w+IiDbN8dzWpEkoua3GuiTLPb/fOXznQu5B8HzlxMQSmeY2AOUJQPG4A1ERwATAC1SU9ez97b4TlH3tT0+l0sZn45KIhtvWv5MQ8U0djOTTlYpuVXExYBi00K9mRAOilqhpNSNO1algg0Z4TPaHCHtE8GAbAhAYM86YKxaUqGnJ4nQ15HQIGUnZzNWqZ177b/RyLDlHYNoNebFcI/M6/0MPG5KxHjIUMiRjQOYP71DIkIwBmT+8QzKGfP/2Jpin1zFNhtGTnzF948OR+dLDTtfI+DV3AQQ7sqQg/c2aQQIGjYWluLbGb9z5XoFVwN1M7e6gUx5jrjJmoZPPz8ZsnWApptX5Ye8anV+S5eMVphiJqosZXX+ybOIsadokNOCcMcec9m5k3skM0dDzT5K/C7xyY1d871rLCkKUd5tpVlz7XjfNiBhOemHm8YhBlrtN8sSN8m41a9tabdlqrwIBHuJNIjNlUv2Ygcd7BQgynpl+VHCg0KS2FMsmAT82uMAMkz8UZCEpFsI7xxSBolu5Wrkqje93wBcSmX9rJJ3jLAAAAABJRU5ErkJggg==',
            text: 'E-Procurement',
          }
        ]
        break;
      case 'FR':
        data = [{
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAkBAMAAABoCkdnAAAAMFBMVEUAAADgFBjgFBfhFBjfGBjfFRfgFRjfFBjgFRfjHBzhFRfgFRjhFRfgFhnjFRzfFBctwiONAAAAD3RSTlMAwPV/QNKd4sUSbpKPUiULEarfAAAAfUlEQVQoz2NY9B8MPjLoMICAPoz7PwHE/Q/nfkPlAqVRuN9QuEBpVO43VO7/A6hcBRj3B8gWhFGfHqBw/2sIAoEAiIsAHwhzvwqCgCiMGwAxNB7KrQTzOOuJMkrXBQR89aHcBohR/VDub2MQsKamM2jL1UfmKkASAyzsFwAAK5+J2XoMjDgAAAAASUVORK5CYII=',
            text: 'Demander un devis',
          },
          {
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAcCAMAAAA+9+1qAAAAV1BMVEUAAADkGxvfFRjhFRfgFRfgFBjiFRn/gIDfFRjmGRngFBfgFRfgFBfiHR3gFRjfFRfgFBfgFRjiFRjhFRjgFRffFRvhGBjpFhz/VVXgFBfgFRffFhjfFBdi3dpHAAAAHHRSTlMAHLhY6NU8AqAe5cayEffRlGxBd9swKhYDu4OAIVa01AAAAPxJREFUOMuFkluWgyAQRMsA8lKJxkzm0ftf50wI09LoiffP4nIKsFHjZ5f0NOnkZo9DrIpUEZXdO72hBtO3zo0OuAllHHjh0n1stcNYOSsxHbD8rZZd62YNJKRvcpwNzXm4bqUecPJc/Wutu7AYAATqX0m+ozWlpWPp+txpSmIsAEVCKpuv9POfKACR2roA2EBfviQR8MRUbUv97TFLgdsqZridEyw+dR04pNM2StA7aWnaSGNqHd220YRJ3j+okdtyniUtXjI88hg/wy3XSEJSyCghJThR90CmE3WuecyxTKEIZ/FbZB3jgUgnxLzrBMVDdwwPHe7mrXMHfgHmK0pz3N8huwAAAABJRU5ErkJggg==',
            text: 'Services d\'étalonnage',
          },
          {
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAQlBMVEUAAADgFxjgFBjuGx3gFRfjFxziFh3gFBjfFBjgFRjgFBfgFBjfFhjhFhjgGBjjFhzlGhrhHh7gFBjgFRjgFhjfFBdrpbcJAAAAFXRSTlMAQMAJ9S0j7di2pIuBXkEuHRHVknPUur6ZAAAA6ElEQVQ4y52U2xKDIAxEgXhX8Jr//9U2yRQsWsP0PEVnxc0CMRlLi9gu5hmLb6wiCiQKT4pmchWJKjc1PyRzjyf6+UYCI2aMkGtWhxfcmmk2ZCrWkjNi+1KBrNN5kAjAd7LW+Y/iZ4CUEwzi69QXEgeVNVU1VQcSqcee15G6traWitfqY4bsBy6hsK9PqhM9eHPB0/vJCI56h5t8KQnHZ8MGrqOVponm+OtgF9NihFU74i5tRlqDCStNiFmLiSJR0e+KjOsRlIepb4u+weVHRT90+vEtvwj6ldIvp37N9YGhj54/h5g+Dl9LHSex+KXatQAAAABJRU5ErkJggg==',
            text: 'Suivre vos commandes',
          },
          {
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAAABGdBTUEAALGPC/xhBQAAAdFJREFUWAntV71Kw1AUPieNFlFBsG2obWnFpeCkgt2cdHPxFfQJHH0AcXX2AVx9ACfRRVE7KjjYSmpF6w+IiDbN8dzWpEkoua3GuiTLPb/fOXznQu5B8HzlxMQSmeY2AOUJQPG4A1ERwATAC1SU9ez97b4TlH3tT0+l0sZn45KIhtvWv5MQ8U0djOTTlYpuVXExYBi00K9mRAOilqhpNSNO1algg0Z4TPaHCHtE8GAbAhAYM86YKxaUqGnJ4nQ15HQIGUnZzNWqZ177b/RyLDlHYNoNebFcI/M6/0MPG5KxHjIUMiRjQOYP71DIkIwBmT+8QzKGfP/2Jpin1zFNhtGTnzF948OR+dLDTtfI+DV3AQQ7sqQg/c2aQQIGjYWluLbGb9z5XoFVwN1M7e6gUx5jrjJmoZPPz8ZsnWApptX5Ye8anV+S5eMVphiJqosZXX+ybOIsadokNOCcMcec9m5k3skM0dDzT5K/C7xyY1d871rLCkKUd5tpVlz7XjfNiBhOemHm8YhBlrtN8sSN8m41a9tabdlqrwIBHuJNIjNlUv2Ygcd7BQgynpl+VHCg0KS2FMsmAT82uMAMkz8UZCEpFsI7xxSBolu5Wrkqje93wBcSmX9rJJ3jLAAAAABJRU5ErkJggg==',
            text: 'eProcurement',
          }
        ]
        break;
      case 'SV':
        data = [{
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAkBAMAAABoCkdnAAAAMFBMVEUAAADgFBjgFBfhFBjfGBjfFRfgFRjfFBjgFRfjHBzhFRfgFRjhFRfgFhnjFRzfFBctwiONAAAAD3RSTlMAwPV/QNKd4sUSbpKPUiULEarfAAAAfUlEQVQoz2NY9B8MPjLoMICAPoz7PwHE/Q/nfkPlAqVRuN9QuEBpVO43VO7/A6hcBRj3B8gWhFGfHqBw/2sIAoEAiIsAHwhzvwqCgCiMGwAxNB7KrQTzOOuJMkrXBQR89aHcBohR/VDub2MQsKamM2jL1UfmKkASAyzsFwAAK5+J2XoMjDgAAAAASUVORK5CYII=',
            text: 'Begär en offert',
          },
          {
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAcCAMAAAA+9+1qAAAAV1BMVEUAAADkGxvfFRjhFRfgFRfgFBjiFRn/gIDfFRjmGRngFBfgFRfgFBfiHR3gFRjfFRfgFBfgFRjiFRjhFRjgFRffFRvhGBjpFhz/VVXgFBfgFRffFhjfFBdi3dpHAAAAHHRSTlMAHLhY6NU8AqAe5cayEffRlGxBd9swKhYDu4OAIVa01AAAAPxJREFUOMuFkluWgyAQRMsA8lKJxkzm0ftf50wI09LoiffP4nIKsFHjZ5f0NOnkZo9DrIpUEZXdO72hBtO3zo0OuAllHHjh0n1stcNYOSsxHbD8rZZd62YNJKRvcpwNzXm4bqUecPJc/Wutu7AYAATqX0m+ozWlpWPp+txpSmIsAEVCKpuv9POfKACR2roA2EBfviQR8MRUbUv97TFLgdsqZridEyw+dR04pNM2StA7aWnaSGNqHd220YRJ3j+okdtyniUtXjI88hg/wy3XSEJSyCghJThR90CmE3WuecyxTKEIZ/FbZB3jgUgnxLzrBMVDdwwPHe7mrXMHfgHmK0pz3N8huwAAAABJRU5ErkJggg==',
            text: 'Kalibreringsservice',
          },
          {
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAQlBMVEUAAADgFxjgFBjuGx3gFRfjFxziFh3gFBjfFBjgFRjgFBfgFBjfFhjhFhjgGBjjFhzlGhrhHh7gFBjgFRjgFhjfFBdrpbcJAAAAFXRSTlMAQMAJ9S0j7di2pIuBXkEuHRHVknPUur6ZAAAA6ElEQVQ4y52U2xKDIAxEgXhX8Jr//9U2yRQsWsP0PEVnxc0CMRlLi9gu5hmLb6wiCiQKT4pmchWJKjc1PyRzjyf6+UYCI2aMkGtWhxfcmmk2ZCrWkjNi+1KBrNN5kAjAd7LW+Y/iZ4CUEwzi69QXEgeVNVU1VQcSqcee15G6traWitfqY4bsBy6hsK9PqhM9eHPB0/vJCI56h5t8KQnHZ8MGrqOVponm+OtgF9NihFU74i5tRlqDCStNiFmLiSJR0e+KjOsRlIepb4u+weVHRT90+vEtvwj6ldIvp37N9YGhj54/h5g+Dl9LHSex+KXatQAAAABJRU5ErkJggg==',
            text: 'Spåra dina beställningar',
          },
          {
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAAABGdBTUEAALGPC/xhBQAAAdFJREFUWAntV71Kw1AUPieNFlFBsG2obWnFpeCkgt2cdHPxFfQJHH0AcXX2AVx9ACfRRVE7KjjYSmpF6w+IiDbN8dzWpEkoua3GuiTLPb/fOXznQu5B8HzlxMQSmeY2AOUJQPG4A1ERwATAC1SU9ez97b4TlH3tT0+l0sZn45KIhtvWv5MQ8U0djOTTlYpuVXExYBi00K9mRAOilqhpNSNO1algg0Z4TPaHCHtE8GAbAhAYM86YKxaUqGnJ4nQ15HQIGUnZzNWqZ177b/RyLDlHYNoNebFcI/M6/0MPG5KxHjIUMiRjQOYP71DIkIwBmT+8QzKGfP/2Jpin1zFNhtGTnzF948OR+dLDTtfI+DV3AQQ7sqQg/c2aQQIGjYWluLbGb9z5XoFVwN1M7e6gUx5jrjJmoZPPz8ZsnWApptX5Ye8anV+S5eMVphiJqosZXX+ybOIsadokNOCcMcec9m5k3skM0dDzT5K/C7xyY1d871rLCkKUd5tpVlz7XjfNiBhOemHm8YhBlrtN8sSN8m41a9tabdlqrwIBHuJNIjNlUv2Ygcd7BQgynpl+VHCg0KS2FMsmAT82uMAMkz8UZCEpFsI7xxSBolu5Wrkqje93wBcSmX9rJJ3jLAAAAABJRU5ErkJggg==',
            text: 'e-inköp',
          }
        ]
        break;
      default:
        break;
    }
    let uspContent = '';
    data.map(function(dataEl) {
      uspContent += `
        <div class="${ID}_USP__element">
          <img class="${ID}_USP__elementImg" alt="" src="${dataEl.img}">
          <span class="${ID}_USP__elementText">${dataEl.text}</span>
        </div>
      `;
    });
    const element = document.createElement('div');
    element.classList.add(`${ID}_USP`);
    element.innerHTML = `
      <div class="${ID}_USP__content">
        ${uspContent}
      </div>
    `;
    this.component = element;
  }

  bindEvents() {}
}
