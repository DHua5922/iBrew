function animateCounter(
  element,
  target,
  elemTextContentCallback,
  duration = 1000,
) {
  const start = 0;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);

    // Calculate the current value and update the text
    const currentValue = Math.floor(progress * (target - start) + start);
    element.textContent = elemTextContentCallback(
      currentValue.toLocaleString(),
    );

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}
