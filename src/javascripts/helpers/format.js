export const formatNumber = (number) => {
    return number.toLocaleString("en-US", {
        minimumFractionDigits: 2,
    });
};

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        year: 'numeric',
    });
}
