const averageReadingSpeed = 200; // words per minute

const getReadTime = (content: string): string => {
  try {
    if (typeof content !== "string") {
      return "0 min read";
    }
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / averageReadingSpeed);
    return `${minutes} min read`;
  } catch (error) {
    console.error("Error calculating read time:", error);
    return "0 min read";
  }
};

export default getReadTime;
