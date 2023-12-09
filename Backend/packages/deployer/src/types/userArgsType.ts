import { FeatureType } from "./featureType";

export type UserArgsType = {
  minter?: string;
  name: string;
  symbol: string;
  uri?: string;
  supply?: string;
  chainId?: string;
  seed?: string;
  tokenFetures: FeatureType;
};
