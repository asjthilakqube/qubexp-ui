const getSupportedLanguage = () => {
  const languageMap = { en: "en-US", ta: "ta", zh: "zh-CN" };
  const languageWithoutRegion =
    navigator.language?.split("-")?.[0] || navigator.userLanguage?.split("-")?.[0];
  return Object.keys(languageMap).includes(languageWithoutRegion)
    ? languageMap[languageWithoutRegion]
    : "en-US";
};

const languageSelector = (en, ta, ch, selectedLanguage) => {
  const languageMap = { "en-US": en, ta, "zh-CN": ch };
  return selectedLanguage === "Auto-Detect"
    ? languageMap[getSupportedLanguage()] || en
    : languageMap[selectedLanguage] || en;
};

export { getSupportedLanguage };
export default languageSelector;
