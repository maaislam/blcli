const hairLightboxHtml = `
    <div class="cb88-sidetab">
        <div class="cb88-sidetab__title">
            <span class="cb88-sidetab__title1">Hair Removal</span> 
            <span class="cb88-sidetab__title2">Product Finder</span>
            <div class="cb88-sidetab__remove">×</div>
        </div>
        <img class="cb88-sidetab__open-icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAFTElEQVR4Xu2dPasdVRSGn8SAYhXyAX6kCihWdkJMCj8K/0CEpIj+BSsbSaGIYCP+CJUgsRPFSkEUsUwTUiRNSAiKH6WN0bDMPXC5zjln7Vl7zv56p7rFWnvv9b7PrLNnztw5h9AxtAKHhq5exSMABodAAAiAwRUYvHx1AAEwuAKDl68OIAAGV2Dw8tUBBMDgCgxevjqAABhcgcHLVwcQAIMrMHj56gB+AEyrR/zhO4v8OzLTkgA8B7wBvAzY30eBw5HFLpTr1eAicGWhNUSG9a5/co5Q8ppVnwI+Bs5DE183ezUQAA5MXwWuAsccsbWECIBMTpj5XwOPZhpvV8MIgAxKW9u/1tiZvypbAGQAwNr+6xnGKTGEAAiqbjv8641s+KZKFQBBAD4A3gmOUTJdAATV/xE4GxyjZLoACKr/e6ObP20CM31u33fe4bsN/BSEbYl0u8HjOV4E3vIEOmJOAy844jwh3g42OVYoeW/Efz2rBD4HvGI7h2wyzDbN3wFPZFp9yMNQsgBItjC3+baAkIehZAGQBMAS5guAJAvKBS9lvgAo56l75iXNFwBuG8oELm2+ACjjq2vWXZgvAFxW7D4oYv4d4F7CfYLQRj6UrKuASbKi5r8CfLj3RJUH3ZCHoWQB8D9/cph/E/hCAHjYrysml/lWlQCoy9utq8lpvgDYKnddAbnNFwB1+btxNUuYLwAaAWAp8wVAAwAsab4AqByApc0XABUDsAvzBUClAOzKfAFQIQC7NF8AVAbArs0XABUBUMJ8AVAJAKXMFwAVAFDSfAFQGIDS5guAggDUYL4AKARALeZb+WcAe+mG57BnB2YfeiLooXQ1mT/bzDmJAmBg8w2Y0QEY9sxfdYuRARje/JE7gMzfawEjdgCZv2+3OBoAMv/ApcJIAMj8ievEUQCQ+WtuEowAgMzfcIeodwBaNV//GjbntuaBnFbN15dBg5svAIIAtHzmr0rXR8BMCHowXx1gcPMFwAwAejnz9REg8/9TQHsAJwi9nfnqAE7je3+MSx1gCwi9nvnqAI4O0Lv52gNsgGAE8wXAGgBGMV8ATAAwkvkCYAIA+wn6r4DHHXuE/SH24mV79669frWlQ1cBE27Zj1N/mQBBq+arA2w4Vb0QtGy+ANjSq7dB0Lr5AsDxYb0Ogh7MFwAOACzkIAS9mC8AnADsh+CPRnf760rVVUACBC8Bdxu81NtUogBIAKDHUAHQo6sJNQmABLF6DBUAPbqaUJMASBCrx1AB0KOrCTUJgASxegwVAD26mlCTAEgQq8dQAdCjqwk1CYAEsXoMFQA9uppQkwBIEKvHUAHQo6sJNTUFwH3gsKM4e2DjZ0ecQh7+XsDTDiFM+yOOuLUhOd4S9htwPLII5c5WwLQ/OTs70+vifwDORRah3NkKfA/YAzGzjxwd4H3g8uwVKDGiwLvAe5EBcgDwLHAjUzeJ1DJa7j+AaX8rUngOAGz+K8DFyEKUm6zAJ8CbyVkHEnIB8BRwDTgRXZDyXQr8CjwP/OKK3hCUCwCbwjYj3wCPRRel/I0K/AW8BtjmO3zkBGAFgd3EUCcIWzM5gJ3553OZbzPkBsDGfBL4CLjgvEG0jFR9jWobvs+At3O0/f3SLAHAavxngEt7/8JlL3g4JiDcVNodvj+B68C3wKfR3f66mZcEwF2tAsspIADKaV/FzAKgChvKLUIAlNO+ipkFQBU2lFuEACinfRUzC4AqbCi3CAFQTvsqZhYAVdhQbhECoJz2VcwsAKqwodwiBEA57auYWQBUYUO5RQiActpXMbMAqMKGcosQAOW0r2LmB34+q5DaPCn1AAAAAElFTkSuQmCC" />
    </div> 
    <div class="cb88-lightbox cb88-hide pop-up_modal">
        <div>
            <a href="#" class="close_btn">X</a>
            <div class="overflow_fix">
                <div class="col-sm-6 cb88-pa0 cb88-lightbox__imgcontainer">
                    <img src="http://www.currentbody.com/media/catalog/product/cache/1/thumbnail/358x/9df78eab33525d08d6e5fb8d27136e95/h/r/hrl4x_modellegimage_lowresolution_400x600pxl.jpg" />
                </div>
                <div class="col-sm-6 text-center cb88-pa20 cb88-relative cb88-lightbox__desc">
                    <h2>Try our product finder</h2>
                    <p class="cb88-subtitle">Find the perfect hair removal product</p>
                    <p class="text-center">
                        <a class="cb88-init-product-finder cb88-button">Launch Product Finder</a>
                    </p>

                    <a class="cb88-underline cb88-absolute cb88-w100pc cb88-bottom-20 cb88-mt20 cb88-close-lightbox cb88-left50pc cb88-close-lightbox__link cb88-tr-xm50"
                        >No thank you, I will keep browsing</a>
                </div>
            </div>
        </div>
    </div>
`;
export default hairLightboxHtml;
