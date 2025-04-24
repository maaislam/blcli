import shared from '../../../../../../core-files/shared';

const { ID } = shared;
const removePlpChanges = () => {
  const existingElems = document.querySelectorAll(`.${ID}__recommendations`);
  if (existingElems.length > 0) {
    existingElems.forEach((el) => el.remove());
  }
};

export default removePlpChanges;
