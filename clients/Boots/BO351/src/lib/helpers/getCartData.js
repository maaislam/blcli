const getCartData = async () => {
    try {
        const response = await fetch("https://www.boots.com/api/checkout/basket?calculatePromotions=true&optInventory=true", {
            headers: {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "adrum": "isAjax:true",
                "channel": "Ecommerce",
                "context": "BASKET",
                "siteid": "UK"
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch cart data:", error);
        return null;
    }
};

export default getCartData;
