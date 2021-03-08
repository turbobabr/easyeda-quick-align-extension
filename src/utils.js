export const preventEvent = (e) => {
  e.preventDefault();
  e.stopPropagation();
};