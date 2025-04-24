import convertToLowerCaseString from './convertToLowerCaseString';

const sideStrings = [
    'chooseasideorchicken',
    'chooseaside',
    'taptoselectside',
    'taptoselectsideorchicken',
];

export default (box) => {
    const text = convertToLowerCaseString(box.innerText);
    return sideStrings.includes(text);
};