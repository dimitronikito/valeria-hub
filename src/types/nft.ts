export interface NFT {
  id: string;
  balance: number;
  metadata?: {
    name?: string;
    image?: string;
    attributes?: {
      trait_type: string;
      value: string;
    }[];
  };
}

export interface NFTAttribute {
  trait_type: string;
  value: string;
}

export interface NFTMetadata {
  name?: string;
  image?: string;
  attributes?: NFTAttribute[];
}