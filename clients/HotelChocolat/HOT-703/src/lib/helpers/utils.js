export const editShadowRootCSS = (selector, newCSS) => {
    // Get the element and its shadow root
    const element = document.querySelector(selector);
    const shadowRoot = element.shadowRoot;

    if (!shadowRoot) {
        console.error('Shadow root not found');
        return;
    }

    // Look for an existing <style> element
    let styleTag = shadowRoot.querySelector('style');

    // If there's no <style> element, create one
    if (!styleTag) {
        styleTag = document.createElement('style');
        shadowRoot.appendChild(styleTag);
    }

    // Append or replace the CSS
    styleTag.textContent += newCSS;
}

// Function to manually clone shadow DOM contents
export const cloneShadowRoot = (originalElement, clonedElement) => {
    const shadowRoot = clonedElement.attachShadow({ mode: 'open' });
    const shadowRootContent = originalElement.shadowRoot;

    // Clone each child node manually from the shadow DOM
    shadowRootContent.childNodes.forEach((node) => {
        shadowRoot.appendChild(node.cloneNode(true));  // Deep clone the node
    });
}

export const cloneElementWithShadowDOM = (selector) => {
    // Get the original element using the selector
    const originalElement = document.querySelector(selector);

    // Check if the element exists
    if (!originalElement) {
        console.error('Element not found');
        return null;
    }

    // Clone the parent element
    const clonedElement = originalElement.cloneNode(true);

    // Check if the original element has a shadow root
    if (originalElement.shadowRoot) {
        // Manually clone the shadow DOM contents
        cloneShadowRoot(originalElement, clonedElement);
    }

    // Return the fully cloned element
    return clonedElement;
}
