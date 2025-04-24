export default () => {
  const specifications = {
    'Length (mm | in)': '1760 | 69.3',
    'Running Surface (Length mm | in)': '1430 | 56.3',
    'Max Speed (km/h | mph)': '20 | 12.4',
    'Width (mm | in)': '785 | 30.9',
    'Running Surface (Width) (mm | in)': '500 | 19.7',
    'Incline (Min)': '0%',
    'Height (mm | in)': '1260 | 49.6',
    'Motor power continuous duty': '220 V-2.5 HP / 110V - 3.0 HP',
    'Incline (Max)': 'Inline 12%',
    'Weight (kg | Ibs)': '92 | 202.8',
    'Min Speed (km/h | mph)': '0.8 | 0.5',
    'Running surface height above ground (mm | in)': '170mm | 6.7in',
  };

  const specTab = document.querySelector('.TG065-specifications_content');

  Object.keys(specifications).forEach((i) => {
    const data = specifications[i];
    const spec = document.createElement('div');
    spec.classList.add('TG065-specification_item');
    spec.innerHTML = `<span>${[i][0]}</span><p>${data}</p>`;

    specTab.appendChild(spec);
  });
};
