import { allColours } from "./constants";
import { shuffle } from "./shuffle";

const getShuffledColours = (remove?: string[]): string[] => {
  const colours = [...allColours];
  if (remove && remove.length > 0) {
    remove.forEach((colour) => {
      const index = colours.indexOf(colour);
      if (index > -1) {
        colours.splice(index, 1);
      }
    });
  }
  shuffle(colours);

  return colours;
};

export default getShuffledColours;
