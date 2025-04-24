// Clarisonic 
const clarisonicHtml = `
    <div class="cb88-product-finder">
        <div class="cb88-product-finder__content">
            <a class="cb88-product-finder__close">
                <img width="24" height="24" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhEQUQxMDdBQzRBMTExRTdBNDlBRDA2QzA4NzhBRjhBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhEQUQxMDdCQzRBMTExRTdBNDlBRDA2QzA4NzhBRjhBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OERBRDEwNzhDNEExMTFFN0E0OUFEMDZDMDg3OEFGOEEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OERBRDEwNzlDNEExMTFFN0E0OUFEMDZDMDg3OEFGOEEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6RrEZ6AAACd0lEQVR42qSVy2sTURTG79wJWk2oD4hJJAuTIGSjbY3upLgURMQX1PwRNgpdKu5ciA+cggvjE4VgNE2zsyC40o1oteKy1bWbSkIIsTPjd8IZGS93JhN74ReSmzvfedxzzhipVOqwEOIx2AmOg69i86sCboN7ZiKRWMKX/WAcTIA34NcmxM+B6yAO8hIfu8AWYIKjYJH++E/xC+Ap2GMYhuj3+zvIwAnwzndoEjTAvhHFZ8BDsI3E2+22KBQKN8jAMiiDT77DE2wkP4LnJD5G4t1uV2SzWatWq12VfOAHOAtWfA9NgYUIkZDnD8hz+tHr9UQ6nZ5vNpuziGBD+g6ugVNKJAc5klyAeJkrcCDuuq6IxWJWo9GoFItFl/ak8gAZOQM+K5HoLp48r4Ktvj3LNM1KJpOxvQ2p8eo7G1n27R0AL33pIs+feJ7zugtmgYPqEWEGaK1qjFAkL1jkPpe2t+bBZcqSKiRDLm+NL95v5Ai4A7Yrnl8Etk5EDqkQiuQ0eK/57ze4FeR5VAPendQ1Ij85VXbYwzJiE10DhrK/Fzwf1owyYoeOK5576xB4FdInoQbK3KFjvr2b4Bj4qJld+VEM/NP+XhOBOfANnFfGSuCAlAFpeaR4binVsqoZK4MBiWGXi8fjgQZmNGmxuLk2AsbKF28D4lMYdov1ev3vndAbTR1cqnglpM7XAb0Rp0GGjaRardZ0MplcKpVK6wbeyYI9eabJOYk7EUqZct/kNAnbtkWn01mpVqsnyQCJXAG7lfYP81y38lyyk54RKeVbMqCKkOeXhnVoSCQLnhHHcQZ3kOJGcbnO5yKmJehOXnOqcriPD38EGABeYqRhE2guvAAAAABJRU5ErkJggg==" />
                <span>Close</span>
            </a>
            <div class="cb88-product-finder__header">
                <div class="cb88-product-finder__header-icon cb88-product-finder__header-icon--active" 
                        data-identifier="1"
                >
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAApCAYAAAArpDnNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNCMTYyRDUwQzNBMzExRTdCMERGOTU4MkJBNEE4NEI2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNCMTYyRDUxQzNBMzExRTdCMERGOTU4MkJBNEE4NEI2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0IxNjJENEVDM0EzMTFFN0IwREY5NTgyQkE0QTg0QjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0IxNjJENEZDM0EzMTFFN0IwREY5NTgyQkE0QTg0QjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5ndUt3AAADRklEQVR42rSXW0gUYRTHZ7dViTKDol6kiJAt7fKSRKm9VBgtKOoGbncWJYgeloyuIhQaPRT1UrlkdqHsRTKEwOwhtSRWWin2wSCwFaKnQowglVj7H/gPTMPsOLN+e+DHsjvfnP+cb87lW0996JBmYx6wA9SCcrABFPDaFPgM3oHn4P2zridz6Rx5bUSqwCgYBk0USYAekuBvTVwzGjp4uCrtE1tEJE/cAYJgFjwGnSAGUhYPuh2EwVGQC7pBA6KbsouokE8nIv3ADxplWyxExFJwKFvWyLX9vHcY0RWmE5JI+kAJaAP7QFJzaBBL8p42+uiDWIGVUAcXtIJmMKe5NEkG0EwfJfT5n1A1Q34FWix8bAZbXWi20FcQUVXrQh4+wQw4YYpErl0GH0GXm8joS3y2QszjZX1sYnZNmO65xqcbA0dcbuMEfYrvchGq47VO09pKcBZ8AmWsKbem+6zz0onk/IgpG2+Cv6Ce1zOxEd5b5mX+J0x1shtsBPfYZjIybF+Kvv0ilA9+mtbU8vORtnAT3/npet0HisQ0RSZCk2C16ff74LgiDfE96WXqSkH6NMWG+vHR95gIDYEloEJTbxX0PeRlW9fY6lWb7rNbhOJ86SFQrHDbiukzhjSP61l3HixiJecoEMmhL/F5zti9B0CU0/IOm2mmIh76EF9RRDOomTItwgbYwAc4ye7rRiSPImFO6ojV4JsGAfCWC2V8l7oQKeU9YfoIIJppu8NJLsdDhFv4EjwEry2aq4zqvSzuAGfZLXnnEJk1LrQqUllwGjzl/A8YnMiM+QUWM2nWGt6nTNRLkmFWEdt1gzgPG+tADQeknyXgo+gLHiB7IPDV9iQ6z0nVbMe4jWJfpL1AYMZpU3Vq8u6ugN/gLijSa0S1kKT7GnCd73AcXES2rVcptFReNPgBbrAUTgGpm9sqhc6AleA7j2ZRHl5kllUiquB8DpzOoG383ELMtsswBRYkdMAwhVeAXn7fw/P5N1UR/TEc+JPMvnapMaT3gOqs00268lV2kEGnN7k9JxTxP1Aet3M8W0JSP8vYknrdHrfc2Cp+vsnkXOfGdIEH7OBZE2rnXKrhmXxntoTk38V+cAEsZwY6sn8CDAB0oeOzW8NMLwAAAABJRU5ErkJggg==" />
                    <span>Age</span>
                </div>
                <div class="cb88-product-finder__header-icon" 
                        data-identifier="2"
                >
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAqCAYAAABP7FAaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQwODA0Q0RGQzNBMzExRTdCMEI2RDYwNUNEQThENDRBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQwODA0Q0UwQzNBMzExRTdCMEI2RDYwNUNEQThENDRBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDA4MDRDRERDM0EzMTFFN0IwQjZENjA1Q0RBOEQ0NEEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDA4MDRDREVDM0EzMTFFN0IwQjZENjA1Q0RBOEQ0NEEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5u+IuuAAAELklEQVR42syXCUgVURSGn6/XRmrSprRn0R7RQotZYQsRbVohalEUbUS2kS0WWUSUCYkVrbRRZBG00YaBRmVZtFgYLWhoFEbZbpKZ1X/kv3EZZp7zni/owMfM3Fn+e88999wzfjGxUxw1tCtghEn7O9Az/djRYuMNp6Pm1tGivSnoZHbDrmgdEGhxry+IAGPBUzsfc7ppnwDSwStQDj6DnyAPpIHe8iDcJ258ANaCzt6KDgGPwBkQA1po92qBbmAhuAdOx8ZNFaEM0I/PzPdUdAnI4ofF7oLVIIounASSQSHvR7KDfwUx8l3Vibq083iwlefPwQJGptFOsSMzwTZQj+0pmuAbEAJK3I20P0jleRaD44qbzlaCfWAoKGNbNFwdwPMB8k10Is9qpH5gJ+crny77ajOq71A4G7QBq0AixIpwLHI3p8NVJMIWgy+eLFIIyLyn8LKLnXdkpNE8fwgueJkg1oEccMvOw35Ig0+4vtbzZU9MPNWLWakJ+A4KxO3wQKm7kXbgeZ4HYrJ2l4LpoLHJ/QoElXhtM8Rvm/VULZsSm4KzwROKKsEyBo4KwNoMyByI7wH1jaIVPG9mQ1DW8V4QwLS4CfQA/hhRWxBIL8RrCWQOyIRwQ31O85iBNoI1bgQTwBZtO5smSQBCpg9DpC5jZKX2zmg8XykjvcbGKK5ZM+vOUTmYk8cw6yiBYPASZGtLqRzIul3EppHM2VXuPc7GrhQ2sxQmD3HZVG1KlCWCVvINCDsN61hS5QleJknWUiO9ycZUk2gMBaN4Lq76ZnDjYOZpsTSI/DLp9HJ2VOY1zqltRz9Aa3ARNNJeaE23v2ay160P3S3feabNuTFrvcThEi/HObVsNI/n/Xg9mWJXOYcRmlvrsPc32MEPsu3h42VuAjFDdVTf2g5SZDdoCU6y9+fAYwqFcweZyAzkYGURCcHH1Sy3FzyGuAw3DoBcsAMMZGGVYPGR3+CwjJglS3VWabaJK7sPwujOGI4ulJv1exZfmeCQ9N5qnZpYcx4/udw8lEV8ZRE85totQaOZUbp6o4ZlFYTDeBVQdkVnsIrf72WBLus7iNF/xO4H0rTaZ4OHo5T0t4yXuxADr+yKXmbgqJSXbBGERkEpWc8yhT5lFVm1y9jttETvedZUKqEkSQZD7ys0IT96JJG/Gg5ms6F4rsBTUZWJtnOPVPaVVYfUuZ+4NIINFWM0K0Sv/tokP8/laG+wLYCJpB3rJSVYyNQapgs67MyLhWUSqa+GMbrFpcXcqWRfzbHYcbwWVZaPD+djHptT9DmuU7z9VfynVpORSsXXAKN0aD9RLmafqvm32uq8Hak/S86PZAXbB2ltn9GBcF+Kuhi11T0T6Ev3ynpsr21X87iU5O98llq/Khn4ck7fCrKfwo2qHC3Fde5/Gb2+Es1mtrpu5+E/AgwAYJk4VXmUV5AAAAAASUVORK5CYII=" />
                    <span>Gender</span>
                </div>
                <div class="cb88-product-finder__header-icon" 
                        data-identifier="3"
                >
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ2NkZGODdBQzNBMzExRTdCNTg0RUVBRTM4NUQwQTM1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ2NkZGODdCQzNBMzExRTdCNTg0RUVBRTM4NUQwQTM1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDY2RkY4NzhDM0EzMTFFN0I1ODRFRUFFMzg1RDBBMzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDY2RkY4NzlDM0EzMTFFN0I1ODRFRUFFMzg1RDBBMzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6x/EZCAAACdUlEQVR42sSYz0sbQRTHJ4MlBUHwVgotvQl6EsFj4jHF4k1Q48VTghdRD7F/QWuhDXoI8daDP+7SQo5JjoInMUcRheBNEIRIoPb7wnfCdEyy2TS7++BD2M3OvO/Ovvf2zcaWltPKh70HCyABJsEHMMr/HsE1qIEqOAU3XhOeHB+2fkf6FJACOZAEsS7XiKApsgj2QQXsgpKXAy8hMmmBK+DaH3AL7nk8Dt4BzWMRPEdkhdbBZTdHuoeIDDh3RNTBN67MKB/NNDGPKclr6ta4BOfK+BEid/IDFEGc5+7AGp3leIeNDmMb/C/Ha9c4VnGuIueO9SPkO9i0jo/ABPgJmj4Cu8kxE5zD2CZ99BSScUTsgFXwoAa3B86x44jJdBMigbnniNhVw7Nx53iPPl8IKVgxcTRkEV8ZN7bF6fMfISkrO+6YakGKaGfT8spqyhZiX/j5P2OiXxHK9h1DiZc0u2JK1Zl2zZBEiD2LT1mRT1ZeH4YswtStBe1Uzt8hi2jHiuZb1Lw7ziIQITapGROKL7BGBCKUiRHTT9xHJKLVQuiIYqLj2/exSwkOTYRo0GzvFJua1xGIELvW7DHN6sxGIEKsptnIGJuPQIRYVYT8YplV7BtehSxCfJ+aGKnw5FuQDlGEWAVbihuTvnbv8QWMhSSi7dsIKVmx8sZuWAIWUcVqlNx9zTpb/jgfzwVrS1AinuwGzBYim58NtvxmJYK0DXvD5Zb4A5BXwVuevnrua7YDFpOnD88NluT1FsjyOQ4zJrKc+9nP3leWbsapvANnB+c6GGQTbgJYNtUfQbnTnXhUzDLHJnt9CfDzfaREhv6hxthfAQYAq6WWFPQMvRUAAAAASUVORK5CYII=" />
                    <span>Skin type</span>
                </div>
                <div class="cb88-product-finder__header-icon" 
                        data-identifier="4"
                >
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgCAYAAABgrToAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRFOEJBNzQ4QzNBMzExRTdBMTUyRTYwNEEzQkU1OTVDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRFOEJBNzQ5QzNBMzExRTdBMTUyRTYwNEEzQkU1OTVDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEU4QkE3NDZDM0EzMTFFN0ExNTJFNjA0QTNCRTU5NUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEU4QkE3NDdDM0EzMTFFN0ExNTJFNjA0QTNCRTU5NUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4YjYt6AAAD4klEQVR42sSYeUhUURTGZ8YhbKGFrKYk20BFy7CySFMpyZY/IgpLTVuoqKwooo2gIoyKSoIUEsMkFIWiKCoxLKHVhdIWkTCnwGjXirBdx74T34XHMGMzOm/mwI/xOW/57r3nnu+8MSanLDPoHEFgMYgGk8Aw0JfftYLnoAZcAxUlxUXt2ouNOgoUMfvAAnmOi9e8BSdBDoS26SWwP8gCqzXCXoGroBZYwRdgAoFgPEgAccCsEboJIi+KwAM4GAr2gpYeipMHFYCRPH7A+14HnY4ugIh/nympaRZ8ZIBtmhQ4IaPYDdaDx2BON4X5y83ADYr7BjaAaaDMmTg7oe+ApEQwZ1tiowhM5pSP4M0kWaPcEDcfPAVbeXwHTAC5wObuSCHyDfN2CZinclB2Wp7dDMrynAPloB5od9cYkMg8U4P5xeXMckeYWmJnoZKyGcwlkpNTwRRioLj3/AzQ5IiKS2A7N4BHw2x3XEYiwQowG4TxvEC7c0XwZXAKPNKrVpmd/L+OSAwBIZw5EzeAFNcXBi+E2YVzPhKfhNELVmdghRCrmwiGg0HMZxl4E6gWu8OG6fCmQD+QJLUMxLhgd+LLxWJ1ENqkt8BZIJsbTMVn8JC5K3/3AhbWzHDNAGQWz4iBQOgnETgZBwOkk/CAsH50lDWahxWxaFc7chSpg7A5sdqltLpQTZVIlV15G9wEZ/mA7kYM7VKJuwUiwEpQ1ZXdQeQHkM2ZXEdnk7bsigi8wPOWg2cgneXE1ZCifYwDHQt+gM1gJmhw0+ZsII/LLsW/QOXgWi6NcggrC/B5uoyjCOCgdjCXDGw8ZYCNnra606AUHKSDjAPHSSP7OOnRfrNwh9MG/Xi9NJf72Wy261WoX4NVIJPtVzpnJpg4Cukf8zmQFj3KgSMnkTKwE+xiLsRxZwWwNLTynEpwD/zxldXJrntCfBYmLz7LzBWRDmkRWAhi2er7zIsHMpeT2Nj6OzmvmZu0ELv6vjcE9mEOb6FLaeMrrc7ExsE+zcRx9kBohRKoltnmIXEJ9NIgTRNQIq5AL261ayhC6N1idTM030mBzDDzIgvfL0p7IKw3OCrvszwWRzlMA2hzck0HZqqBjpODfIxkyRLBaWKVJvZmFr7N5bIQuxtRLOZK3F0W88wuxDlylTqQQD//LjksAqfzfdZAo5Ze7BAY5eLvLnnMm1C+2Yn1xYOX3V0KiMznO1CY2iRGilO/MqicrKL4WjqNequLYLlI1JSqGqZJvZtiXCrUnVzeYvZkInY02/To/zzDyqUs9OBGc+okUgKOMNljOUPxXL7BPOcnG4hKtkTlbEx1ib8CDAD6QR3LHWpnbgAAAABJRU5ErkJggg==" />
                    <span>Skin Concern</span>
                </div>
                <div class="cb88-product-finder__header-icon" 
                        data-identifier="5"
                >
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAgCAYAAAB3j6rJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU1RjFCNUMzQzNBMzExRTc4QzMwQ0NCRDU0OUI3RkQ1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU1RjFCNUM0QzNBMzExRTc4QzMwQ0NCRDU0OUI3RkQ1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTVGMUI1QzFDM0EzMTFFNzhDMzBDQ0JENTQ5QjdGRDUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTVGMUI1QzJDM0EzMTFFNzhDMzBDQ0JENTQ5QjdGRDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Al5mjAAAC8ElEQVR42ryYTUhUURTHny8zahFR0EKm2lSUOEItKs1qsLQoCAqKhuhLInDXLptNy1oEBUkUEboYqoWLhOg7yhZ9QEXllH2MfWokVqRoBUX2P/F/cHjMG+e++/TCj3fmfrz7v+fde+5hirYktzoWZTs4RnsvaDZ9wdkz6f9P10LETHAKTCYnWBeq2AhJgRLwFQzRTo21EFl5Pe3DoIl2fVivuBbeGE9vNFHMEOtSYyXE741B8IV2aK+4EXjDK0dBf1ivuBF4wyvfKSaUV9yIvGHtleI8bRPBbMVcsCPAG36vHKBXxoFXIKv4mWuyIkRW8UoNWMDJvIljAQLfg/IAIVKmgJdgekB7txIlIp+Aa+KRk2B3Hs/8UgOfs/9gnv7ilUqwB8xXCythe4wk1JjmYrX5esFdpdSbXFYwbLiX3oBG316cQUFziNhLwTSwTYQ8A3HuiSPgthN9+ctPKtxg3SpQS/uFKE0yIMnFdRmsdEa/rAcXufgesNmlRxKskIZL7DhaRRbeyiMuHkogFej04ogn5gM7tHJA1GUnSHOOLlANEVl/QMty83SxY1rFjShKAxMnmTPDubqDIqs0VLOjtLXwBbZlHzhO+wHjVu9IIf4zOz7kb3nBGgsRG8Eh2vd4WvoKvWv6eHo819mcpBo+X/M9/aaXngyYRPudhZCPfEpk/RHm9i0FU2lnLIR4Y2cxVhkLiSu7w0JIR8A7CxZSzucn8M1CiMSmARsh8QI+i0TgC6BthJOV8S3OSEhFns9Sy6MoAtZRkFwN7b7r3f95jD0imVVZDo8sA7fAVbCYde1MH6QsBzfBFbAkh5AKUyGSL0yg/RQs4s0sKcIK1t+nZ8QDVWAteMy2OoprY+aXUdlbzETIPGUf5KSrlbANXPF11U8+zUKwCXSqPfQI7Ff9ykyE6OhXpyJjkis8HzBumDe3bMpdzNQctQgnKM0MEiLf/TT4A94ynZSVnGO2VUhG1sKctYGR+Tf/wriTa8A/AQYA+hO4IMaPbAsAAAAASUVORK5CYII=" />
                    <span>Your Results</span>
                </div>
            </div>
            <div class="cb88-product-finder__slides">
                <div class="cb88-product-finder__slide cb88-product-finder__slide--1 cb88-product-finder__slide--active"
                    data-identifier="1"
                >
                    <div class="cb88-product-finder__slide-inner">
                        <h2 class="cb88-product-finder__question">
                            Please select your age group
                        </h2>
                        <div class="cb88-answers cb88-max-width-2">
                            <div class="cb88-circle cb88-answer cb88-answer--unused" data-cb88-question="1" data-cb88-answer="1">
                                <span class="cb88-circle__text">16-29</span>
                            </div>
                            <div class="cb88-circle cb88-answer cb88-answer--unused" data-cb88-question="1" data-cb88-answer="2">
                                <span class="cb88-circle__text">30-39</span>
                            </div>
                            <div class="cb88-circle cb88-answer cb88-answer--unused" data-cb88-question="1" data-cb88-answer="3">
                                <span class="cb88-circle__text">40-54</span>
                            </div>
                            <div class="cb88-circle cb88-answer cb88-answer--unused" data-cb88-question="1" data-cb88-answer="4">
                                <span class="cb88-circle__text">55+</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cb88-product-finder__slide cb88-product-finder__slide--2"
                        data-identifier="2"
                >
                    <div class="cb88-product-finder__slide-inner">
                        <h2 class="cb88-product-finder__question">
                            Are you?
                        </h2>
                        <div class="cb88-answers cb88-max-width-2">
                            <div class="cb88-answer" data-cb88-question="2" data-cb88-answer="1">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/3320600494/a5b1b85735b442f3b29d62ebf8c1f59c.png" />
                                <span class="cb88-answer__text">Male</span>
                            </div>
                            <div class="cb88-answer" data-cb88-question="2" data-cb88-answer="2">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/3320600494/d141aea8e4064f86bbde348c965d2785.png" />
                                <span class="cb88-answer__text">Female</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cb88-product-finder__slide cb88-product-finder__slide--3"
                    data-identifier="3"
                >
                    <div class="cb88-product-finder__slide-inner">
                        <h2 class="cb88-product-finder__question">
                            What's your skin type?
                        </h2>
                        <div class="cb88-answers cb88-max-width-3">
                            <div class="cb88-answer" data-cb88-question="3" data-cb88-answer="1">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/3320600494/45dd5e7c8c214a86bdcac467ada0dce8.png" />
                                <span class="cb88-answer__text">Normal</span>
                            </div>
                            <div class="cb88-answer" data-cb88-question="3" data-cb88-answer="2">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/3320600494/a35a70acceab4aa48b8ad8d78aca641d.png" />
                                <span class="cb88-answer__text">Combination</span>
                            </div>
                            <div class="cb88-answer" data-cb88-question="3" data-cb88-answer="3">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/3320600494/95e833840bd544e4993b29a63a1d8a8d.png" />
                                <span class="cb88-answer__text">Oily</span>
                            </div>
                            <div class="cb88-answer" data-cb88-question="3" data-cb88-answer="4">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/3320600494/e69701e9f9c644048b3fb377698fac51.png" />
                                <span class="cb88-answer__text">Sensitive</span>
                            </div>
                            <div class="cb88-answer" data-cb88-question="3" data-cb88-answer="5">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/3320600494/822549436b8641d998c78e854b31140d.png" />
                                <span class="cb88-answer__text">Mature</span>
                            </div>
                        </div>
                    </div>
                 </div>
                <div class="cb88-product-finder__slide cb88-product-finder__slide--4"
                    data-identifier="4"
                >
                    <div class="cb88-product-finder__slide-inner">
                        <h2 class="cb88-product-finder__question">
                            What's your skin concern?
                        </h2>
                        <div class="cb88-answers cb88-max-width-3">
                            <div class="cb88-answer" data-cb88-question="4" data-cb88-answer="1">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/3320600494/835658d9d26f4704ada5f6b60db5b4da.png" />
                                <span class="cb88-answer__text">Blocked Pores</span>
                            </div>
                            <div class="cb88-answer" data-cb88-question="4" data-cb88-answer="2">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/3320600494/3ea1b12ed19a469c9b166534f5b374a8.png" />
                                <span class="cb88-answer__text">Wrinkles</span>
                            </div>
                            <div class="cb88-answer" data-cb88-question="4" data-cb88-answer="3">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/3320600494/e69701e9f9c644048b3fb377698fac51.png" />
                                <span class="cb88-answer__text">Sensitivity</span>
                            </div>
                            <div class="cb88-answer" data-cb88-question="4" data-cb88-answer="4">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/3320600494/21eb051a10924cc98b2ac77d18e147fd.png" />
                                <span class="cb88-answer__text">Acne</span>
                            </div>
                            <div class="cb88-answer" data-cb88-question="4" data-cb88-answer="5">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/3320600494/54dc3a5a6fe34646984c67a0d1a2262d.png" />
                                <span class="cb88-answer__text">Dull Skin</span>
                            </div>
                            <div class="cb88-answer" data-cb88-question="4" data-cb88-answer="6">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/3320600494/95e833840bd544e4993b29a63a1d8a8d.png" />
                                <span class="cb88-answer__text">Oily skin</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cb88-product-finder__slide cb88-product-finder__slide--5 cb88-product-finder__summary"
                    data-identifier="5"
                >
                    <div class="cb88-product-finder__slide-inner">
                        <h2 class="cb88-product-finder__question">
                            Your Results
                        </h2>
                        <div class="cb88-product-finder__summary-products cb88-max-width-2-5 cb88-mcenter">
                        </div>

                        <a class="cb88-product-finder__restart">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAbCAYAAACX6BTbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQyMTkzMzIwQzQ2RTExRTc4NDBFRjI1N0U5OEI2NzQ0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQyMTkzMzIxQzQ2RTExRTc4NDBFRjI1N0U5OEI2NzQ0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDIxOTMzMUVDNDZFMTFFNzg0MEVGMjU3RTk4QjY3NDQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDIxOTMzMUZDNDZFMTFFNzg0MEVGMjU3RTk4QjY3NDQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz475y3TAAACCElEQVR42qyWzSuEURTGZ8b4LJkmmVHsJ/EXaGIhycLCR5ksWVAWNFmRqJGVlRpZTLIyNSwsFFYSjWxsFAuxkDFFoUjjazxH59bpNe/MfWfm1C/3Pe59zp17zz332j0ej03T6oEbXIN35Uwmk6YDHJrCYyABzsGm7mwcmsJh8f1SLPERg/ApBytYfAisGnyPYB4Mg4Zc4naTDR0A0RzB02CPgmFTT6zM/Azc55oY6AJxr9e7DMp0xa9AO7gz+NfADDgEP8I/DnYQoEp3zTMFGAQHoA00g13xvw6wjgB23WwxBqgEs9y+AN1gTvTv583WznMV4Ja/43JTsZmUPSvCt6iWR/eEUoAm0GKYqbIpqgTcruU01hYne+Xj/88w+zf8WRKuXiluJYiZbYl2qxLdBh9gshBlzP5GVMtqJd4DSqzUjCz2oBqUknI5GosgXid+SZrEn/i7AvjyVcVMfaxB9qyW5dhQsPI1OfZIiceEcwK48pi1i8cqiynxKF9hNr4jw1zxdIXtPMbNrgRr/olTGgZF/wB3dmpoO7lvQPiC2MwPeXgoUkR0GOUa4s8i7Oc+o8IXgXA0001UCjZAn0HkEuyLwkUp25khs+iEBiD+aXbN0WGa5guhVHPZSSwEFiD8rXOH+jgA1edyE9EUv2FCEL20ckHLDaMSWiOCpPjtQi+Br2wvrl8BBgA1v4PNIiMkrgAAAABJRU5ErkJggg==">
                            <span>Start Again</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

export default clarisonicHtml;
