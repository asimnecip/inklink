export function generateUsername(): string {
    const adjectives = ["Cool", "Super", "Mighty", "Happy", "Silly", "Bright"];
    const nouns = ["Panda", "Unicorn", "Raccoon", "Dolphin", "Eagle", "Tiger"];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000); // Ensure a wider range of uniqueness
    return `${randomAdjective}${randomNoun}${randomNumber}`;
  }
