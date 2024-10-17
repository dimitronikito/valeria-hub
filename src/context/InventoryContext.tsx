"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ethers } from 'ethers';
import { NFT } from '@/types/nft';

const ABI = [
  "function balanceOfBatch(address[] accounts, uint256[] ids) view returns (uint256[])",
];

const CONTRACT_ADDRESS = "0x2187093a2736442d0b5c5d5464b98fc703e3b88d";
const METADATA_BASE_URL = "https://bafybeiak2htv3skjlzhd3hirumor7hbg7ajoyfs3yjhxfg5fuxzkqhpkeq.ipfs.dweb.link/";
const BATCH_SIZE = 50;

interface InventoryContextType {
  nfts: NFT[];
  setNfts: React.Dispatch<React.SetStateAction<NFT[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchNFTs: (provider: ethers.BrowserProvider, address: string) => Promise<void>;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

interface InventoryProviderProps {
  children: ReactNode;
}

export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNFTs = async (provider: ethers.BrowserProvider, address: string) => {
    setIsLoading(true);
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const nftsData: NFT[] = [];

      // Prepare batch requests
      const batchRequests = [];
      for (let i = 1; i <= 601; i += BATCH_SIZE) {
        const ids = Array.from({ length: Math.min(BATCH_SIZE, 602 - i) }, (_, index) => i + index);
        const accounts = Array(ids.length).fill(address);
        batchRequests.push({ ids, accounts });
      }

      // Process batch requests
      for (const batch of batchRequests) {
        const balances = await contract.balanceOfBatch(batch.accounts, batch.ids);
        
        // Process results
        const promises = balances.map(async (balance: bigint, index: number) => {
          if (balance > 0) {
            const tokenId = batch.ids[index];
            const metadataUrl = `${METADATA_BASE_URL}${tokenId}.json`;
            try {
              const response = await fetch(metadataUrl);
              if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
              const metadata = await response.json();
              return {
                id: tokenId.toString(),
                balance: Number(balance),
                metadata: {
                  name: metadata.name || `NFT #${tokenId}`,
                  image: metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
                  attributes: metadata.attributes
                }
              };
            } catch (error) {
              console.error(`Failed to fetch metadata for token ${tokenId}:`, error);
              return null;
            }
          }
          return null;
        });

        const results = await Promise.all(promises);
        nftsData.push(...results.filter((nft): nft is NFT => nft !== null));
      }

      setNfts(nftsData);
    } catch (err) {
      console.error('Error fetching NFTs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InventoryContext.Provider value={{ nfts, setNfts, isLoading, setIsLoading, fetchNFTs }}>
      {children}
    </InventoryContext.Provider>
  );
};