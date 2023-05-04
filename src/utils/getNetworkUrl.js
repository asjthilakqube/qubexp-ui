const getNetworkUrl = (url = "", windowInfo = window) => {
  const [dot, ...rest] = [...url];
  const dotCheck = dot === ".";
  if (url.length !== 0 && !dotCheck) return url;
  const {
    location: { origin },
  } = windowInfo;
  return `${origin}${rest.join("")}`;
};

export default getNetworkUrl;
