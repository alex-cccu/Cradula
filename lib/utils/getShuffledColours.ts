import { allColours } from "./constants";
import { shuffle } from "./shuffle";

const getShuffledColours = (remove?: string[]): string[] => {
  const colours = [...allColours];
  if (remove?.length && remove.length > 0) {
    remove.forEach((colour) => {
      const index = colours.indexOf(colour);
      colours.splice(index, 1);
    });
  }
  shuffle(colours);

  return colours;
};

export default getShuffledColours;
