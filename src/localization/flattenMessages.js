import messages from "./components";

const flattenMessages = (lang = "en-US") => {
  const collections = {};
  Object.keys(messages).forEach((objectKey) => {
    const keyMessage = messages[objectKey];
    Object.entries(keyMessage[lang]).map((keyValue) => {
      const [key, value] = keyValue;
      collections[`${objectKey}.${key}`] = value;
      return true;
    });
  });
  return collections;
};

export default flattenMessages;
