export function removeImagesFromContent(htmlContent: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    const images = tempDiv.getElementsByTagName('img');
    while (images.length > 0) {
        images[0].parentNode?.removeChild(images[0]);
    }

    return tempDiv.innerHTML;
}
