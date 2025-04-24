const postConsent = async (payload) => {
    try {
        const response = await fetch("/api/checkout/consent", {
            headers: {
                "accept": "application/json",
                "channel": "Ecommerce",
                "content-type": "application/json",
                "siteid": "UK"
            },
            body: JSON.stringify(payload),
            method: "POST",
            mode: "cors"
        });
        console.log(await response.json());
    } catch (err) {
        console.error("Error:", err);
    }
};

export default postConsent;
