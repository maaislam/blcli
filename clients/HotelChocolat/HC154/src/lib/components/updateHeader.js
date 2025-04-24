import { Arrow } from './icons';

export const Update_Header = (id, header, secondLevel, thirdLevel) => {
  const second_Level = secondLevel ? `${id}__second-level` : '';
  const third_Level = thirdLevel ? `${id}__third-level` : '';
  return `
        <div class="${id}__arrow_svg ${second_Level} ${third_Level}">${Arrow()}</div><div> ${header}</div> 
    `;
};
