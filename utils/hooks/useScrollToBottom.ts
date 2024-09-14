export const useScrollToBottom = (element: HTMLElement | null) => {
    if (element) {
        element.scrollTop = element.scrollHeight;
    }
};
