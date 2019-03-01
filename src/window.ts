addEventListener('load', () => {
  const params = new URLSearchParams(document.location.search);
  const title = `Jumping Views ${params.get('n') || 0}`;
  document.title = title;
});