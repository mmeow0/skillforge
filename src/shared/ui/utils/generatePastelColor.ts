export const generatePastelColor = (): string => {
  const pastelColors = [
    "#FFB3BA", // Pastel Red
    "#FFDFBA", // Pastel Orange
    "#FFFFBA", // Pastel Yellow
    "#BAFFC9", // Pastel Green
    "#BAE1FF", // Pastel indigo
    "#D3BAFF", // Pastel Purple
    "#FFCBA4", // Pastel Peach
    "#E6E6FA", // Lavender
    "#F5DEB3", // Wheat
    "#FFDAC1", // Pastel Pink
  ];
  const randomIndex = Math.floor(Math.random() * pastelColors.length);
  return pastelColors[randomIndex];
};
