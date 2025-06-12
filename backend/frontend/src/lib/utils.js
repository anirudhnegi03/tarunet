import { LANGUAGE_TO_FLAG } from "../constants";

export function getLanguageFlag(language) {
  if (!language) return null;

  const langKey = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langKey];

  return countryCode ? `https://flagcdn.com/24x18/${countryCode}.png` : null;
}

export const capitialize = (str) => {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
