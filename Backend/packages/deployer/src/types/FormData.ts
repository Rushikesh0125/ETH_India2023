import { FeatureType } from "./featureType";

export type FormData = {
  type: string;
  tokenName: string;
  tokenSymbol: string;
  tokenSupply: string;
  tokenDecimals: string;
  tokenFeatures: FeatureType;
  tokenChains: string[]; // Assuming tokenChains is an array of strings, you can adjust this based on the actual type.
  supportedChain: string;
  uri?: string;
  minter?: string;
};
