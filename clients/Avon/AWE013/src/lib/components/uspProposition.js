const renderUspContent = (id, fireEvent) => {
  document.querySelector(`.${id}__last-point`)?.closest(`.${id}__proposition-container`).remove;

  const content = ` 
    <div class="${id}__proposition-container">
        <div class="${id}__headline">
            <div class="${id}__headline--content">Einkaufen bei</div>
            <div class="${id}__headline--image">
            <svg xmlns="http://www.w3.org/2000/svg" width="142" height="32" viewBox="0 0 142 32" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M78.2706 15.9878C78.2706 21.5236 82.8581 26.0275 88.4974 26.0275C94.1438 26.0275 98.7378 21.5236 98.7378 15.9878C98.7378 10.4446 94.1438 5.93544 88.4974 5.93544C82.8581 5.93544 78.2706 10.4446 78.2706 15.9878ZM88.4974 0C93.0876 0 97.1398 1.58118 100.218 4.57367C103.358 7.58361 105.092 11.6396 105.092 15.9877C105.092 20.3337 103.353 24.3633 100.192 27.3359C97.0787 30.3391 92.9208 32 88.4974 32C84.0049 32 79.9514 30.3828 76.7759 27.3232C73.6619 24.3052 71.9483 20.2798 71.9483 15.9877C71.9483 11.6342 73.6619 7.58025 76.7745 4.57098C79.8775 1.57984 83.9304 0 88.4974 0ZM18.1568 1.5961H14.8969L0 31.9999H3.60872C5.41008 31.9999 6.96381 31.1066 8.02891 29.3299L11.1597 23.2549C16.7202 23.9392 21.659 26.0036 26.1011 31.9999H33.0896L18.1568 1.5961ZM16.5391 12.0449L20.4913 20.3949C18.3178 19.3619 16.0152 18.6049 13.6413 18.1524L16.5391 12.0449ZM49.2998 31.9992L34.7851 1.5967H38.7293C40.53 1.5967 42.1689 2.63989 42.9338 4.27337L50.9115 21.3059L58.8272 4.28471C59.5894 2.64522 61.2317 1.5967 63.037 1.5967H67.0112L52.5005 31.9992H49.2998ZM139.044 1.5961C137.246 1.5961 135.788 3.03089 135.79 4.79919L135.808 20.8371L119.665 1.59677H114.877L114.876 1.5961V31.9999H117.833C119.631 31.9999 121.088 30.5658 121.086 28.7968L121.068 12.7916L134.302 28.6174C134.302 28.6174 136.892 31.9993 140.676 31.9993H141.999L142 31.9999V1.5961H139.044Z" fill="url(#paint0_linear_4_21)"/>
            <defs>
            <linearGradient id="paint0_linear_4_21" x1="-75.2649" y1="21.0736" x2="-58.6336" y2="85.5559" gradientUnits="userSpaceOnUse">
            <stop stop-color="#7F28C4"/>
            <stop offset="0.644215" stop-color="#E2197C"/>
            <stop offset="1" stop-color="#E5231B"/>
            </linearGradient>
            </defs>
            </svg>
            </div>
        </div>
        <div class="${id}__proposition-item1 ${id}__item">
            <div class="item1-headline">
                <span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
                <path d="M8.652 0.399999V20H4.116V4.04H0.196V0.399999H8.652ZM14.6328 20.224C13.8675 20.224 13.2235 19.9627 12.7008 19.44C12.1782 18.9173 11.9168 18.264 11.9168 17.48C11.9168 16.6773 12.1782 16.0333 12.7008 15.548C13.2235 15.044 13.8675 14.792 14.6328 14.792C15.3982 14.792 16.0422 15.044 16.5648 15.548C17.0875 16.0333 17.3488 16.6773 17.3488 17.48C17.3488 18.264 17.0875 18.9173 16.5648 19.44C16.0422 19.9627 15.3982 20.224 14.6328 20.224Z" fill="url(#paint0_linear_9_40)"/>
                <defs>
                <linearGradient id="paint0_linear_9_40" x1="-15.901" y1="12.8539" x2="2.151" y2="39.1415" gradientUnits="userSpaceOnUse">
                <stop stop-color="#7F28C4"/>
                <stop offset="0.644215" stop-color="#E2197C"/>
                <stop offset="1" stop-color="#E5231B"/>
                </linearGradient>
                </defs>
                </svg></span>
                <div class="item1-headline--content ${id}__title">Einzigartige Produkte zu unschlagbaren Preisen</div>
            </div>
            <div class="item1-paragraph ${id}__paragraph">Einzigartige Produkte zu unschlagbaren Preisen.
                Erhalte hochwertige Produkte zu einem absolut fairen Preis-/ Leistungsverhältnis</div>
        </div>
        <div class="${id}__proposition-item2 ${id}__item">
            <div class="item1-headline">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
            <path d="M15.736 16.304V20H0.924V17.06L8.484 9.92C9.28667 9.15467 9.828 8.50133 10.108 7.96C10.388 7.4 10.528 6.84933 10.528 6.308C10.528 5.524 10.2573 4.92667 9.716 4.516C9.19333 4.08667 8.41867 3.872 7.392 3.872C6.53333 3.872 5.75867 4.04 5.068 4.376C4.37733 4.69333 3.79867 5.17867 3.332 5.832L0.028 3.704C0.793333 2.56533 1.848 1.67867 3.192 1.044C4.536 0.390666 6.076 0.0639997 7.812 0.0639997C9.268 0.0639997 10.5373 0.306666 11.62 0.791999C12.7213 1.25867 13.5707 1.93067 14.168 2.808C14.784 3.66667 15.092 4.684 15.092 5.86C15.092 6.924 14.868 7.92267 14.42 8.856C13.972 9.78933 13.104 10.8533 11.816 12.048L7.308 16.304H15.736ZM20.4571 20.224C19.6917 20.224 19.0477 19.9627 18.5251 19.44C18.0024 18.9173 17.7411 18.264 17.7411 17.48C17.7411 16.6773 18.0024 16.0333 18.5251 15.548C19.0477 15.044 19.6917 14.792 20.4571 14.792C21.2224 14.792 21.8664 15.044 22.3891 15.548C22.9117 16.0333 23.1731 16.6773 23.1731 17.48C23.1731 18.264 22.9117 18.9173 22.3891 19.44C21.8664 19.9627 21.2224 20.224 20.4571 20.224Z" fill="url(#paint0_linear_9_41)"/>
            <defs>
            <linearGradient id="paint0_linear_9_41" x1="-19.0813" y1="12.8539" x2="-2.40498" y2="41.9949" gradientUnits="userSpaceOnUse">
            <stop stop-color="#7F28C4"/>
            <stop offset="0.644215" stop-color="#E2197C"/>
            <stop offset="1" stop-color="#E5231B"/>
            </linearGradient>
            </defs>
            </svg></span>
                <div class="item2-headline--content ${id}__title">Erweitertes Rückgaberecht von 28 Tagen im Direktversand</div>
            </div>
            <div class="item2-paragraph ${id}__paragraph">Wenn du mit deinen Produkten nicht zufrieden bist, sind wir es auch nicht. Daher
                geben wir dir eine erweiterte Widerrufsfrist von 28 Tagen im Direktversand. Die detaillierten Bedingungen
                findest du <a target="_blank" href="https://www.avon.de/returns">hier</a>.</div>
        </div>
        <div class="${id}__proposition-item3 ${id}__item">
            <div class="item3-headline">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
            <path d="M11.248 8.38C12.9653 8.66 14.2813 9.304 15.196 10.312C16.1107 11.3013 16.568 12.5333 16.568 14.008C16.568 15.1467 16.2693 16.2013 15.672 17.172C15.0747 18.124 14.16 18.8893 12.928 19.468C11.7147 20.0467 10.2213 20.336 8.448 20.336C7.06667 20.336 5.704 20.1587 4.36 19.804C3.03467 19.4307 1.90533 18.908 0.972 18.236L2.736 14.764C3.48267 15.324 4.34133 15.7627 5.312 16.08C6.30133 16.3787 7.30933 16.528 8.336 16.528C9.47467 16.528 10.3707 16.3133 11.024 15.884C11.6773 15.436 12.004 14.8107 12.004 14.008C12.004 12.4027 10.7813 11.6 8.336 11.6H6.264V8.604L10.296 4.04H1.952V0.399999H15.672V3.34L11.248 8.38ZM21.2383 20.224C20.473 20.224 19.829 19.9627 19.3063 19.44C18.7836 18.9173 18.5223 18.264 18.5223 17.48C18.5223 16.6773 18.7836 16.0333 19.3063 15.548C19.829 15.044 20.473 14.792 21.2383 14.792C22.0036 14.792 22.6476 15.044 23.1703 15.548C23.693 16.0333 23.9543 16.6773 23.9543 17.48C23.9543 18.264 23.693 18.9173 23.1703 19.44C22.6476 19.9627 22.0036 20.224 21.2383 20.224Z" fill="url(#paint0_linear_9_42)"/>
            <defs>
            <linearGradient id="paint0_linear_9_42" x1="-18.0813" y1="12.8539" x2="-1.40498" y2="41.9949" gradientUnits="userSpaceOnUse">
            <stop stop-color="#7F28C4"/>
            <stop offset="0.644215" stop-color="#E2197C"/>
            <stop offset="1" stop-color="#E5231B"/>
            </linearGradient>
            </defs>
            </svg></span>
            <div class="item3-headline--content ${id}__title">Bei einer Avon Berater*in in deiner Nähe oder direkt bei Avon bestellen</div>
            </div>
            <div class="item3-paragraph ${id}__paragraph"> <span class="${id}-bold">Lieferung durch eine Avon Berater*in:</span><br>
                Bestelle bei einer Avon Berater*in in deiner Nähe und profitiere vom persönlichen Kontakt und der
                Beauty-Expertise.
                Schicke deine Produktanfrage an die Beauty-Berater*in in deiner Wahl im Online-Shop. Sie wird dich zeitnah
                kontaktieren, um mit dir Details zu Preis, Lieferung und Bezahlung zu besprechen.<br />
                <span class="${id}__dash"></span><br />
                <span class="${id}__last-point ${id}-bold">Lieferung durch Avon:<br></span>
                    <span>Lieferung mit DHL nach Hause oder an eine Packstation/Paketshop, Lieferzeit: 3-5 Tage,
                    Versandkostenfreie Lieferung ab 25€</span>
            </div>
        </div>
    </div>`;
  document.querySelector('.ProductDescription')?.insertAdjacentHTML('afterend', content);
};

export default renderUspContent;
