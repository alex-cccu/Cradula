export function shuffle(array: any[]) {
    let currentIndex = array.length;
  
    while (currentIndex != 0) {
  
      // Pick an element
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }