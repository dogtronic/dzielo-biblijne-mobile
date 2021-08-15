import {API_URL} from 'react-native-dotenv';

export const remoteAsset = (link?: string) => {
  if (!link) {
    return undefined;
  }

  let baseLink = API_URL;

  if (API_URL) {
    baseLink = baseLink.substring(0, baseLink.length - 1);
  }

  return baseLink + link;
};
