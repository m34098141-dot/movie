export type Movie = {
  id: string;
  title: string;
  genre: string;
  lang: string;
  rating: number;
  votes: string;
  duration: string;
  cert: string;
  hue: number;
  about: string;
};

export const movies: Movie[] = [
  { id: "pushpa-3", title: "Pushpa 3: The Rampage", genre: "Action/Drama", lang: "Telugu, Hindi", rating: 9.1, votes: "312K", duration: "2h 58m", cert: "UA", hue: 25, about: "Pushpa Raj returns for the final battle over the red sandalwood empire." },
  { id: "jawan-2", title: "Jawan Returns", genre: "Action/Thriller", lang: "Hindi, Tamil", rating: 8.7, votes: "201K", duration: "2h 41m", cert: "UA", hue: 200, about: "A vigilante soldier takes on a corrupt system one hostage at a time." },
  { id: "kantara-2", title: "Kantara: Chapter 2", genre: "Mythology/Drama", lang: "Kannada, Hindi", rating: 9.3, votes: "188K", duration: "2h 35m", cert: "UA", hue: 140, about: "The legend of the forest deity rises again in coastal Karnataka." },
  { id: "dil-se-dilli", title: "Dil Se Dilli", genre: "Romance/Comedy", lang: "Hindi", rating: 7.9, votes: "54K", duration: "2h 12m", cert: "U", hue: 340, about: "Two strangers, one Delhi metro ride, and a love story that refuses to stop." },
  { id: "vikram-3", title: "Vikram: Agent Zero", genre: "Action/Spy", lang: "Tamil, Telugu", rating: 8.9, votes: "143K", duration: "2h 49m", cert: "A", hue: 280, about: "A retired black-ops agent is pulled back into a deadly drug war." },
  { id: "manjummel", title: "Manjummel Tales", genre: "Survival/Thriller", lang: "Malayalam", rating: 9.0, votes: "97K", duration: "2h 15m", cert: "UA", hue: 60, about: "A group of friends faces nature's fury on a trip to Kodaikanal." },
];

export const cities = ["Mumbai", "Delhi-NCR", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Kochi"];

export const theatres = [
  { name: "PVR: Phoenix Mall", times: ["10:15 AM", "01:30 PM", "04:45 PM", "08:00 PM", "11:15 PM"] },
  { name: "INOX: R City", times: ["09:30 AM", "12:50 PM", "06:20 PM", "09:40 PM"] },
  { name: "Cinepolis: Viviana", times: ["11:00 AM", "02:15 PM", "05:30 PM", "10:00 PM"] },
  { name: "Miraj Cinemas: IMAX", times: ["10:45 AM", "03:00 PM", "07:15 PM"] },
];
