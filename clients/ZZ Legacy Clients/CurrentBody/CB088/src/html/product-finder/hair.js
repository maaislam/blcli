// Clarisonic 
const hairHtml = `
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
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNFN0QzMUQ4QzQ5OTExRTdCMUM3QzFERTRERUJDODFDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNFN0QzMUQ5QzQ5OTExRTdCMUM3QzFERTRERUJDODFDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0U3RDMxRDZDNDk5MTFFN0IxQzdDMURFNERFQkM4MUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0U3RDMxRDdDNDk5MTFFN0IxQzdDMURFNERFQkM4MUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7miD6MAAADJElEQVR42ryYT0hUURTGnzUm1oAjJpatWmmYwqxCZMiwwiGQqJXVolVU24IWGQjSJnIXtcxCauWilf3DiqJQKCEXRYK1sMlEYZRSmhqn79r37Mzhvum9N5MHfpxx5rxzvnf/X8tyuZwTxLqPneiFuwgiHiG/wGXQ6yff3TuDq74siBCIqIf7DJbAc1ChQn6ABNgMdoCUXyERJ5hF6W8hwVmK0zHXwRkR68s2BBSySF9RIKZCxf4XIYfpxwvEjKtYXxbxMS7K4BpBEvSDZXC7wCPmtyvgBsfKMHgPcoGEoHAMrhPsBXtAXPycBvsxPhb/0X1mwD6m8H7RUqPgGbjPXHYhEHEO7qpKPAlegUdgCCKWfbT0a2Bm2FFwALTyhQynGXNeiPwrBCL64Ho4NS+Bp+Cdz8I2M88NEmOVYBdoB3184Rhr/VlHIKIZn9+Cj6AZxb8HWFvCiNwCJsBO0IJ6E+6sueDmDSLCXVNIEDM1umVtt2sSXOVGQ7zdoZBdNyprR5ziLVWCHGsLWor9HXXWz6KytivkC331OgqplrVdITP0MTEbpsFQCQubXNPi75is7Y6Rr1oIt/EjJRSic8VkbbdF5ulrROBNtkxDCUQ0yJyq1rwUMke/VQSO0LeVQEibyilrzdmE1IrAl/QdJRDSoXLKWnO2rqkVR7gpuJUiFiy96JlcUxYheV2zQF+nEjwBVRgnNUWIMM9WMZe0OllbC9mmgofpW4sQ0qpyOapWnpC0R4u8kPtBSEuoXLpF0mtCMB6ycBlLi7jnz64CheqJl3V5nHNNrQxr5x2eU2odMQIzPKE1YpyUexR6QGxWzvPuJF9Uj52U7RQ/wwWsUj1wjz7uUew4sVlc5XDEaU1uLXlCZj02vof0yRDjI6ly6A1vNoiQD/RNIYQ0qRy+hMxYNj5ju+nHQggZUzmsO69Xi2gh7ZZ9wq+NqBxaiLVFFjzutQdBFjPoTQgh5pksc9juxwu2C9Yn+muYOac49cx1s4WzyayMmwLcl1c4ZTcyxwivnT/dnKJmnhDz/44BcBJsF98vMWlnyJX1G8XvU98PsOaq/RZgAEj+2Ko5aGzgAAAAAElFTkSuQmCC" />
                    <span>Body Area</span>
                </div>
                <div class="cb88-product-finder__header-icon" 
                        data-identifier="3"
                >
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ2NkZGODdBQzNBMzExRTdCNTg0RUVBRTM4NUQwQTM1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ2NkZGODdCQzNBMzExRTdCNTg0RUVBRTM4NUQwQTM1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDY2RkY4NzhDM0EzMTFFN0I1ODRFRUFFMzg1RDBBMzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDY2RkY4NzlDM0EzMTFFN0I1ODRFRUFFMzg1RDBBMzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6x/EZCAAACdUlEQVR42sSYz0sbQRTHJ4MlBUHwVgotvQl6EsFj4jHF4k1Q48VTghdRD7F/QWuhDXoI8daDP+7SQo5JjoInMUcRheBNEIRIoPb7wnfCdEyy2TS7++BD2M3OvO/Ovvf2zcaWltPKh70HCyABJsEHMMr/HsE1qIEqOAU3XhOeHB+2fkf6FJACOZAEsS7XiKApsgj2QQXsgpKXAy8hMmmBK+DaH3AL7nk8Dt4BzWMRPEdkhdbBZTdHuoeIDDh3RNTBN67MKB/NNDGPKclr6ta4BOfK+BEid/IDFEGc5+7AGp3leIeNDmMb/C/Ha9c4VnGuIueO9SPkO9i0jo/ABPgJmj4Cu8kxE5zD2CZ99BSScUTsgFXwoAa3B86x44jJdBMigbnniNhVw7Nx53iPPl8IKVgxcTRkEV8ZN7bF6fMfISkrO+6YakGKaGfT8spqyhZiX/j5P2OiXxHK9h1DiZc0u2JK1Zl2zZBEiD2LT1mRT1ZeH4YswtStBe1Uzt8hi2jHiuZb1Lw7ziIQITapGROKL7BGBCKUiRHTT9xHJKLVQuiIYqLj2/exSwkOTYRo0GzvFJua1xGIELvW7DHN6sxGIEKsptnIGJuPQIRYVYT8YplV7BtehSxCfJ+aGKnw5FuQDlGEWAVbihuTvnbv8QWMhSSi7dsIKVmx8sZuWAIWUcVqlNx9zTpb/jgfzwVrS1AinuwGzBYim58NtvxmJYK0DXvD5Zb4A5BXwVuevnrua7YDFpOnD88NluT1FsjyOQ4zJrKc+9nP3leWbsapvANnB+c6GGQTbgJYNtUfQbnTnXhUzDLHJnt9CfDzfaREhv6hxthfAQYAq6WWFPQMvRUAAAAASUVORK5CYII=" />
                    <span>Skin Colour</span>
                </div>
                <div class="cb88-product-finder__header-icon" 
                        data-identifier="4"
                >
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVGRjAwMTMxQzQ5OTExRTc5MkJCOENBRDkzRDk0MDkyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVGRjAwMTMyQzQ5OTExRTc5MkJCOENBRDkzRDk0MDkyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUZGMDAxMkZDNDk5MTFFNzkyQkI4Q0FEOTNEOTQwOTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUZGMDAxMzBDNDk5MTFFNzkyQkI4Q0FEOTNEOTQwOTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5z/pV2AAADRUlEQVR42qxYbWjOURT/my2JifLyxevWkslDI6/RpjbZUD55GXm+KI2SxMLKB8nS80WUpshYD9sUKY0Uw/ggHi95GTM17zN5r2Hx+B2dD9fffTn3n1O/zv8+99x7f//7v+fcc55e6XQ6kMiy5StmQS0CpgD5QD/u6gYeALeAk8CVwEOOJev+6EwBgQqodcA4g0k2MBQoBDYAKaAaaPQhlGkhUMoTTgj8pABoAE4Da4DXkkEZBhIJqDMRSKhCn/E+UBSJCEgcgdoY/B8ZBFwA8ryIgEQV1ErBAvvYrl1IqFFMBCRyoXYIJ07jtNNxHwvsFthPBGLSHdnjseV57Ho/oSrpPQRj5jqJYDdGQpV5EMkKtY8D5Y4xMyQ7ssqDxA8NEZIkcNQybryESJGQRB1HzxxDPwW+tIXIUhcRabxYC/S29H/mQGaM6ByJjUSyBSSqcDhpoYVAm8XunGOepI3IL8fgJpDYiUNNV0IfPpwm6XTMtQCYbiLSYxnYChKlyndOoH3AFmMEu3vQROSRYcDbkNu1g8QmxyIDBEQojZivI3JTY3ybIiIW/qjkDl8Fi0wSHvwtOiINGsMUFn4T4aKbJ7SbDeSGiVwCLgJ3FMM4DucYTxL5lgRKJ/G/iODNyWuuAWcV96K+vZ5E1nvaF+suPfKEDJCiO+M6/1bmsSt0ET7n3FUqOf8QAYFnUHex8Ew8T1Nc7LBw0k9ALTBcaE8Jd7MpQ6MQ/C1EYA7IlQgmJlcfAQwREmkFarREKL8AUtzcrnSdApmYYPKBHp/lPfDElTxnhQJZX/Io/F4NFDhSBJcklAD6ylVOTFYKKFUoG6sEmRt8uTUB9/h8BCH31wkFR4rMJZxU91h3BDLYMSFVe9uAFuAF38gkXVxgmWQ168vACWdd47gEw9IfqFDapmS6TVl8c3gNE5GHnoFJnbSewoDGZqvy3C2q9DimUMj/Ii0vQu1C9SBC3oU/hbj25TjSzN+dXHlYqP8x2xRzRafKB2Aq0MGpZW2k2ldJlGuwO/uhRwGj+Wbt4v5D6NvF9UpcM/6lsgv1kf8N4Iuwk5+/89t1wHUXs7dcVcyfWjKxJbx7kXfERJAIxKBbBObnOQFy/g/zW4ABADtd4SZmoLd5AAAAAElFTkSuQmCC" />
                    <span>Hair Colour</span>
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
                                <span class="cb88-circle__text">18-29</span>
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
                            Which body area will your device be used on?
                        </h2>
                        <div class="cb88-answers cb88-max-width-2">
                            <div class="cb88-answer" data-cb88-question="2" data-cb88-answer="1">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/3320600494/3e1fbe1275fa40288684fce09186bbd9.png" />
                                <span class="cb88-answer__text">Body</span>
                            </div>
                            <div class="cb88-answer" data-cb88-question="2" data-cb88-answer="2">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/3320600494/80ea4027d4544c03a8d61dd25c9c5aec.png" />
                                <span class="cb88-answer__text">Face</span>
                            </div>
                            <div class="cb88-answer" data-cb88-question="2" data-cb88-answer="3">
                                <img class="cb88-answer__image" 
                                    src="//www.sitegainer.com/fu/up/n77igzvlvn0101x.png" />
                                <span class="cb88-answer__text">Body & Face</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cb88-product-finder__slide cb88-product-finder__slide--3"
                    data-identifier="3"
                >
                    <div class="cb88-product-finder__slide-inner">
                        <h2 class="cb88-product-finder__question">
                            What's your skin colour?
                        </h2>
                        <div class="cb88-answers cb88-max-width-3">
                            <div class="cb88-answer" data-cb88-question="3" data-cb88-answer="1">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/6087172626/b15dc1dcf1a345bda88764b2827f85d7.png" />
                                <span class="cb88-answer__text">Fair</span>
                            </div>
                            <div class="cb88-answer" data-cb88-question="3" data-cb88-answer="2">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/6087172626/26b99457e92f4eb5b0bee3d2e9ebc3c9.png" />
                                <span class="cb88-answer__text">Medium</span>
                            </div>
                            <div class="cb88-answer" data-cb88-question="3" data-cb88-answer="3">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/6087172626/e2356c97492c4ebaaf37b9da22b23858.png" />
                                <span class="cb88-answer__text">Dark</span>
                            </div>
                        </div>
                    </div>
                 </div>
                <div class="cb88-product-finder__slide cb88-product-finder__slide--4"
                    data-identifier="4"
                >
                    <div class="cb88-product-finder__slide-inner">
                        <h2 class="cb88-product-finder__question">
                            What is your hair colour?
                        </h2>
                        <div class="cb88-answers cb88-max-width-3">
                            <div class="cb88-answer" data-cb88-question="4" data-cb88-answer="1">
                                <img class="cb88-answer__image cb88-op20" 
                                    src="//cdn.optimizely.com/img/6087172626/0d46623ab6a2414a87f6b82be0100bec.png" />
                                <span class="cb88-answer__text">Light</span>
                            </div>
                            <div class="cb88-answer" data-cb88-question="4" data-cb88-answer="2">
                                <img class="cb88-answer__image cb88-op50" 
                                    src="//cdn.optimizely.com/img/6087172626/0d46623ab6a2414a87f6b82be0100bec.png" />
                                <span class="cb88-answer__text">Medium</span>
                            </div>
                            <div class="cb88-answer" data-cb88-question="4" data-cb88-answer="3">
                                <img class="cb88-answer__image" 
                                    src="//cdn.optimizely.com/img/6087172626/0d46623ab6a2414a87f6b82be0100bec.png" />
                                <span class="cb88-answer__text">Dark</span>
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

export default hairHtml;
