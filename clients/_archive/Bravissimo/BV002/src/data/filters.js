export const filters = [
    {
        name: 'back-size',
        values: ['28', '30', '32', '34', '36', '38', '40'],
    },
    {
        name: 'cup-size',
        values: ['D', 'DD', 'E', 'F', 'FF', 'G', 'GG', 'H', 'HH', 'J', 'JJ', 'K', 'KK', 'L'],
    },
    {
        name: 'clothing-size',
        values: ['08', '10', '12', '14', '16', '18'],
    },
    {
        name: 'curvy-size',
        values: ['Curvy', 'Really Curvy', 'Super Curvy'],
    },
];

export const filterChildren = [
    {
        name: 'lingerie',
        values: ['back-size', 'cup-size'],
    },
    {
        name: 'clothing',
        values: ['clothing-size', 'curvy-size'],
    },
    {
        name: 'swimwear',
        values: ['back-size', 'cup-size', 'clothing-size', 'curvy-size'],
    },
    {
        name: 'nightwear',
        values: ['back-size', 'cup-size', 'clothing-size', 'curvy-size'],
    },
    {
        name: 'sportswear',
        values: ['back-size', 'cup-size', 'clothing-size', 'curvy-size'],
    },
];