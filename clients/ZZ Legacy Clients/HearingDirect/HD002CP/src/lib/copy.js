const copy = {
    'tooltip':  {
        'gb':   {
            'first': 'At Hearing Direct we are always looking to price competitively. Remember all our products have:',
            'listOne': 'FREE delivery on all orders over £20',
            'listTwo': '30 day FREE returns and money back guarantee',
            'last': 'Chat to us now on our 24hr live chat support or call us on Call 0800 032 1301 (Monday to Friday 9 until 5)'
        },
        'us':   {
            'first': 'At Hearing Direct we are always looking to price competitively. Remember all our products have:',
            'listOne': 'FREE delivery on all orders',
            'listTwo': '30 day FREE returns and money back guarantee',
            'last': 'Chat to us now on our 24hr live chat support or call us on Call 1-800-216-2331 (Monday to Friday 9 until 5)'
        }
    }, 
    'popup': {
        'gb':   {
            'flag': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAADdAAAA3QFwU6IHAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAGBQTFRF////ibHYnbHY9PT065ShXo/J55endqDT8PDwV4zL7tfbSYHGeaLT8PDw2hI22xM4EV25AFK0B1e2LG+/aZfOlbTZ2AAn2AYs3CxM5HiL5X+R5YKU6KGu7MbN7tnd8PDwpHSaMwAAABF0Uk5TAA0NGCY5QHOYvsbT4OP8/P4JBVK8AAABFklEQVQ4jZWT25aDIAxFsbYq4i2K91b+/y8HMAHaTstq3jjZi0BywpiLJC/KZp6bssgT9h430Q3qmHQcaujE7SV94T2ABwB6fgnzaQXwDABUV5/PaiVfAbm1GeWv7aoMEQJym9Y6xfqVPhgiAKSVqvMdHI/SAygAt//rAYmRgBHz0JvfCgAiCNgxDyB0/zrwBAIL5aFLWD6cMe7LnYC7LodyzgoVBAJBFKw8gngY4BEqJWumr9Gw+Tswx4Foiegjo990jVLKN2rZfaOo1Uqti7thnTbXahyWEXdfgghB47aSHzcRdtzGMKcQGAYJjpbDY2g5K6HlWFqfFz6ZVhOtM37Wbu+2V7WzvTb+f4uT/rJ68eX9vP5/SghJ0QlP9kEAAAAASUVORK5CYII=',
            'first': 'Hearing Direct is one of the UK’s leading hearing aid specialists, stocking a wide range of hearing aids, amplified phones, hearing aid accessories such as batteries, TV headphones, and more.',
            'listOne': 'Excellent range of high-quality digital hearing aids at 90% cheaper than buying from the high street',
            'listTwo': 'FREE delivery on all orders over £20',
            'listThree': '30 day FREE returns and money back guarantee',
            'last': 'Chat to us now on our 24hr live chat support or call us on 0800 032 1301 (Monday to Friday 9 until 5)'
        },
        'us':   {
            'flag': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAADdAAAA3QFwU6IHAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAblQTFRF/////////////8bGlarVnbHY4Wl49PT09fX17crKu9Xm98TMssnooL3bmrXd65Cj7u7u5HCF6bO8mrbb8fHx67fC5HuP5nuPW43L8PDwzdnm8PDw8PDw55Wl5pGh43iLaJbO43SJ8PDwaJbO42Z8Y5LM8PDwWo7K4FNsoLzc6Kez8PDw8PDw4Vhx4mJ5SIHG30Jf4EtlNnbBdJ/Q8PDw8PDw3jdV8PDwLXG/3CpK3TpXK26/3ChIEl64SoPG3B5BEFy4FWC6GGG62g802hA02hQ32x9BAFK0AVO0AlO0BVW1Bla1B1a2CFi2CVi2Clm3Dlu4El64FF+5FWC5FmC5GGK6HWW7Hma8H2a8IWi8K2+/LG+/L3HAMHLANHTBN3bCOnjDO3nDQX3EQ37FRH/FRX/FRoDFSILGW47LXI/LaJbOa5nPbZrPb5vQeKHSeqPTe6PTgKbUiKvWiq3Xja/Xj7DYkbHYlLPZmLbamrjbnbnbp8DeqMHescbgtsrht8rivM7jwNDkwtLkxtTlydfm2AAn2Qov3CxM3OPr3eTr4FJs43CF5Ojt5X+R6J2r6ezu68PK7e7v8PDwMEXrhQAAAEd0Uk5TAAcICQwNERgZHR4eISMmJy0wOT9JWHBwhISOl5iho662wMHFxcfIy8/S1trj5OXp6uvw8fLz9fX3+Pj6+vz8/f7+/v7+/v5JHSYnAAABgElEQVQYGX3Biz9TYQAG4HfHZUqMkkuGrFnYpDBKogvek6XGqES5tNwvlWtEunxCuX1/sTPpON9vdp4HZ5Lzb1bffRj0e9w5DsTLLHvMCZIypq4wDSrtWjPffdyZfUX5T0OBBouLvrWn5IqcIv/8dysbpiu1Y59IzkUnSWFquoxTGff1MA16WCfFmcYLOJFSQ84/o2GJpLC4oyHmut779eDXew7+OFp/zV2rIhgudZCj2yskP29PkNKqIQ3AjR5y+HmU5IfQCCkVhYDjEQ0DjBkgKRV1DuRMv9G7+jeG+vjy7ff+CA9VV+H+G2VoQf7sY++mXH1BoSpHxbdOcnz5C8nFxRlSqG7jQShMRthNspsRUqjuIUSVUD1BUNoKwi9t+eGRtjxwS1tu5P62lYukFmGjJQnwChteAK4tkdCWC4bi/YSKEaP5ZAI+DSecAXmugBOnsgLyHIEsmJyVe3EqnbDQStqFor1Egyrd2ypMrd50xEvNK62qb2urryrNS4XpGBv1eyh16JHwAAAAAElFTkSuQmCC',
            'first': 'Hearing Direct is one of the Americas\' leading hearing aid specialists, stocking a wide range of hearing aids, amplified phones, hearing aid accessories such as batteries, TV headphones, and more.',
            'listOne': 'Excellent range of high-quality digital hearing aids at 90% cheaper than buying from the high street',
            'listTwo': 'FREE delivery on all orders',
            'listThree': '30 day FREE returns and money back guarantee',
            'last': 'Chat to us now on our 24hr live chat support or call us on 1-800-216-2331(Monday to Friday 9 until 5)'
        }
    } 
}
export default copy;