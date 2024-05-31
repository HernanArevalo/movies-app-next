export const scoreToRgb = (score) => {
  if (score < 0 || score > 10) {
      throw new Error("Score must be between 0 and 10");
  }

  let r, g, b;
  if (score <= 5) {
      // Interpolar entre rojo (255, 0, 0) y amarillo (255, 255, 0)
      r = 255;
      g = Math.round(255 * (score / 5));
      b = 0;
  } else {
      // Interpolar entre amarillo (255, 255, 0) y verde (0, 255, 0)
      r = Math.round(255 * ((10 - score) / 5));
      g = 255;
      b = 0;
  }

  return `rgba(${r}, ${g}, ${b}, 0.4)`;
}