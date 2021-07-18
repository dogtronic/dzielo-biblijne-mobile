import {Config} from '../../config';

export const remoteAsset = (link?: string) => {
  if (!link) {
    return undefined;
  }

  let baseLink = Config.baseUrl;

  if (Config.baseUrl) {
    baseLink = baseLink.substring(0, baseLink.length - 1);
  }

  return baseLink + link;
};
