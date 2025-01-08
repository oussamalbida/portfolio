export const smoothScrollTo = (targetId) => {
  const element = document.getElementById(targetId);
  if (!element) return;

  const offset = 100; // Adjust this value based on your navbar height
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
};
