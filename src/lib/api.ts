import { ethers } from 'ethers';

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

const ABI = [
  "function balanceOf(address account, uint256 id) view returns (uint256)",
  "function uri(uint256 id) view returns (string)"
];

const CONTRACT_ADDRESS = "0x2187093a2736442d0b5c5d5464b98fc703e3b88d";
const METADATA_BASE_URL = "https://bafybeiak2htv3skjlzhd3hirumor7hbg7ajoyfs3yjhxfg5fuxzkqhpkeq.ipfs.dweb.link/";

export async function fetchNFTData(id: string): Promise<NFT | null> {
  console.log('Fetching NFT data for id:', id);
  try {
    const provider = new ethers.JsonRpcProvider("https://xai-chain.net/rpc");
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

    // Fetch balance
    const balance = await contract.balanceOf(ethers.ZeroAddress, id);
    console.log('Fetched balance:', balance);
    
    // Fetch metadata
    const metadataUrl = `${METADATA_BASE_URL}${id}.json`;
    console.log('Fetching metadata from:', metadataUrl);
    const response = await fetch(metadataUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const metadata = await response.json();
    console.log('Fetched metadata:', metadata);

    const nft: NFT = {
      id,
      balance: Number(balance),
      metadata: {
        name: metadata.name,
        image: metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
        attributes: metadata.attributes
      }
    };
    console.log('Returning NFT:', nft);
    return nft;
  } catch (error) {
    console.error('Error fetching NFT data:', error);
    return null;
  }
}