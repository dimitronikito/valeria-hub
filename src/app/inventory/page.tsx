"use client"

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Web3Modal from 'web3modal';
import { useRouter } from 'next/navigation';
import { NFT, NFTAttribute } from '@/types/nft';
import { useInventory } from '@/context/InventoryContext';
import { XIcon } from 'lucide-react';

const XAI_CHAIN_ID = 660279;

const ELEMENTS = [
  'Fire', 'Electric', 'Water', 'Grass', 'Rock', 
  'Air', 'Metal', 'Pixie', 'Dark', 'Light'
];

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        660279: "https://xai-chain.net/rpc"
      }
    }
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Your App Name",
      rpc: "https://xai-chain.net/rpc",
      chainId: 660279,
      darkMode: false
    }
  }
};

let web3Modal: Web3Modal | null = null;

interface Filters {
  rarity: string;
  element: string;
}

const InventoryPage: React.FC = () => {
  const router = useRouter();
  const { nfts, setNfts, isLoading, setIsLoading, fetchNFTs } = useInventory();
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filters, setFilters] = useState<Filters>({ rarity: '', element: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNFTs, setFilteredNFTs] = useState<NFT[]>([]);
  const [manualAddress, setManualAddress] = useState('');
  const [isManualMode, setIsManualMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !web3Modal) {
      web3Modal = new Web3Modal({
        network: "xai",
        cacheProvider: false,
        providerOptions
      });
    }
  }, []);

  const switchNetwork = async () => {
    if (!provider) return;
    try {
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${XAI_CHAIN_ID.toString(16)}` }],
      });
      setIsWrongNetwork(false);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      fetchNFTs(provider, address);
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await (window as any).ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${XAI_CHAIN_ID.toString(16)}`,
              chainName: 'XAI Chain',
              nativeCurrency: { name: 'XAI', symbol: 'XAI', decimals: 18 },
              rpcUrls: ['https://xai-chain.net/rpc'],
              blockExplorerUrls: ['https://explorer.xai-chain.net/']
            }],
          });
          setIsWrongNetwork(false);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          fetchNFTs(provider, address);
        } catch (addError) {
          console.error('Failed to add XAI network:', addError);
          setError('Failed to add XAI network to your wallet.');
        }
      } else {
        console.error('Failed to switch to XAI network:', switchError);
        setError('Failed to switch to XAI network. Please try again.');
      }
    }
  };

  const connectWallet = useCallback(async () => {
    if (!web3Modal) return;
    try {
      const instance = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(instance);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();

      setProvider(provider);
      setAccount(address);

      if (network.chainId !== BigInt(XAI_CHAIN_ID)) {
        setIsWrongNetwork(true);
        setError('Please switch to the XAI network.');
        return;
      }

      setIsWrongNetwork(false);
      fetchNFTs(provider, address);
    } catch (err) {
      console.error('Failed to connect wallet:', err);
      setError('Failed to connect wallet. Please try again.');
    }
  }, [fetchNFTs]);

  const disconnectWallet = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      setProvider(null);
      setAccount(null);
      setNfts([]);
      setIsWrongNetwork(false);
      setError(null);
    }
  }, [setNfts]);

  // useEffect(() => {
  //   if (web3Modal && web3Modal.cachedProvider && nfts.length === 0) {
  //     connectWallet();
  //   }
  // }, [connectWallet, nfts.length]);

  useEffect(() => {
    if (provider) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          await fetchNFTs(provider, accounts[0]);
        } else {
          setAccount(null);
          setNfts([]);
        }
      };

      const handleChainChanged = (_chainId: string) => {
        window.location.reload();
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        console.log("disconnect", error);
        disconnectWallet();
      };

      if (window.ethereum) {
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
        window.ethereum.on('disconnect', handleDisconnect);
      }

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
          window.ethereum.removeListener('disconnect', handleDisconnect);
        }
      };
    }
  }, [provider, disconnectWallet, fetchNFTs, setNfts]);

  const handleManualAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ethers.isAddress(manualAddress)) {
      setIsLoading(true);
      setError(null);
      try {
        const provider = new ethers.JsonRpcProvider("https://xai-chain.net/rpc");
        await fetchNFTs(provider as any, manualAddress);
        setAccount(manualAddress);
        setIsManualMode(true);
      } catch (err) {
        console.error('Failed to fetch NFTs:', err);
        setError('Failed to fetch NFTs. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Invalid Ethereum address. Please enter a valid address.');
    }
  };

  const resetManualMode = () => {
    setIsManualMode(false);
    setManualAddress('');
    setAccount(null);
    setNfts([]);
  };

useEffect(() => {
  const applyFilters = () => {
    let filtered = nfts;
    if (filters.rarity || filters.element || searchTerm) {
      filtered = filtered.filter((nft: NFT) => {
        const attributes = nft.metadata?.attributes || [];
        const name = nft.metadata?.name || '';

        if (filters.rarity) {
          const hasRarity = attributes.some((attr: NFTAttribute) =>
            attr.trait_type === 'Rarity' && attr.value === filters.rarity
          );
          if (!hasRarity) return false;
        }

        if (filters.element) {
          const hasElement = attributes.some((attr: NFTAttribute) =>
            attr.trait_type === 'Element' && attr.value === filters.element
          );
          if (!hasElement) return false;
        }

        if (searchTerm) {
          const lowercasedTerm = searchTerm.toLowerCase();
          const nameMatch = name.toLowerCase().includes(lowercasedTerm);
          const attributeMatch = attributes.some((attr: NFTAttribute) =>
            (attr.trait_type === 'Rarity' || attr.trait_type === 'Element') &&
            attr.value.toLowerCase().includes(lowercasedTerm)
          );
          if (!nameMatch && !attributeMatch) return false;
        }

        return true;
      });
    }
    setFilteredNFTs(filtered);
  };

  applyFilters();
}, [nfts, filters, searchTerm]);

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleNFTClick = (nft: NFT) => {
    router.push(`/inventory/lbtw/${nft.id}?balance=${nft.balance}`);
  };

const NFTCard: React.FC<{ nft: NFT; index: number }> = React.memo(({ nft, index }) => {
  const parseName = (name: string = '') => {
    const match = name.match(/(.*?)\s*\(LVL \d+\)/);
    return match ? match[1] : name;
  };
  const displayName = parseName(nft.metadata?.name);

  const getCardStyle = () => {
    const attributes = nft.metadata?.attributes || [];
    const rarity = attributes.find(attr => attr.trait_type === 'Rarity')?.value;
    const isShiny = attributes.find(attr => attr.trait_type === 'Shiny')?.value === 'Yes';
    const isUnique = attributes.find(attr => attr.trait_type === 'Unique')?.value === 'Yes';
    if (isUnique) {
      return {
        gradientBorder: 'bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400',
        glowEffect: 'shadow-[0_0_16px_4px_rgba(236,72,153,0.7)]',
        animationClass: 'animate-pulse'
      };
    } else if (rarity === 'Legendary' && isShiny) {
      return {
        gradientBorder: 'bg-gradient-to-r from-purple-600 via-red-500 to-yellow-400',
        glowEffect: 'shadow-[0_0_4px_2px_rgba(236,72,153,0.7)]',
      };
    } else if (isShiny) {
      return {
        gradientBorder: 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500',
        glowEffect: 'shadow-[0_0_4px_2px_rgba(252,211,77,0.5)]'
      };
    } else if (rarity === 'Legendary') {
      return {
        gradientBorder: 'bg-gradient-to-r from-purple-700 via-purple-600 to-red-500',
        glowEffect: 'shadow-[0_0_8px_3px_rgba(126,34,206,0.4)]'
      };
    } else {
      return {
        gradientBorder: 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600',
        glowEffect: ''
      };
    }
  };

  const cardStyle = getCardStyle();

return (
    <div
      className={`rounded-lg overflow-hidden opacity-0 ${isLoaded ? 'animate-fade-in' : ''} cursor-pointer transition-all duration-300 hover:scale-105 ${cardStyle.glowEffect} ${cardStyle.animationClass || ''} group`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
          <div className="absolute -top-1.5 -right-1 bg-yellow-400 text-indigo-900 font-bold px-3 pt-2 pb-1 rounded-bl-xl z-10">
        x{nft.balance}
      </div>
      <div className={`p-1 ${cardStyle.gradientBorder} relative overflow-hidden shimmer-border`}>
        <div className="bg-indigo-900 rounded-lg p-3 relative">
          <Image
            src={nft.metadata?.image || '/placeholder-image.png'}
            alt={nft.metadata?.name || 'NFT'}
            width={500}
            height={500}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              maxHeight: '240px'
            }}
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
});


  useEffect(() => {
    if (filteredNFTs.length > 0) {
      setIsLoaded(true);
    }
  }, [filteredNFTs]);

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-indigo-950 text-white px-2 sm:px-4 py-4 sm:py-8">
      <div className="container mx-auto max-w-6xl">
        <style jsx global>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translate3d(0, 20px, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }
          .animate-fade-in {
            animation: fadeInUp 0.5s ease-out forwards;
          }
        `}</style>
        <header className="bg-indigo-900 py-4 mb-4">
          <div className="container mx-auto max-w-6xl px-4">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center uppercase tracking-widest text-yellow-400 shadow-yellow-400 shadow-sm">LBTW Assets</h1>
          </div>
        </header>
        <div className="flex flex-col mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <Link href="/" className="inline-block px-4 py-2 bg-indigo-700 text-yellow-400 rounded hover:bg-indigo-600 transition duration-300">
              ← Home
            </Link>
            
            {!account && (
                <button
                  onClick={connectWallet}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 text-center"
                >
                  Connect Wallet
                </button>
              )}
            
            {account && (
              <div className="w-full sm:w-auto flex justify-between items-center bg-indigo-800 rounded-lg p-2">
                <span className="text-sm font-medium">{shortenAddress(account)}</span>
                <button
                  onClick={isManualMode ? resetManualMode : disconnectWallet}
                  className="ml-2 p-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
                  aria-label={isManualMode ? "Reset" : "Disconnect wallet"}
                >
                  <XIcon size={20} />
                </button>
              </div>
            )}
          </div>
          
          {!account && (
            <>              
              <form onSubmit={handleManualAddressSubmit} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="text"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  placeholder="Or enter a wallet address..."
                  className="w-full sm:flex-grow px-4 py-2 bg-indigo-800 text-white rounded sm:rounded-l placeholder-indigo-300"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded sm:rounded-r hover:bg-green-600 transition duration-300 ease-in-out"
                >
                  View
                </button>
              </form>
            </>
          )}
          
          {!isManualMode && isWrongNetwork && (
            <button
              onClick={switchNetwork}
              className="w-full px-3 py-2 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Switch to XAI
            </button>
          )}
        </div>

        <div className="mb-4 space-y-2 sm:space-y-0 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
          <div className="w-full sm:w-1/2 lg:w-2/5 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-indigo-300 text-lg" aria-hidden="true">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search by name, rarity, or element"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 bg-indigo-800 text-white rounded placeholder-indigo-300 truncate"
            />
          </div>
          <div className="flex flex-wrap gap-2 sm:w-1/2 lg:w-3/5 sm:justify-end">
            <select
              value={filters.rarity}
              onChange={(e) => handleFilterChange('rarity', e.target.value)}
              className="w-full sm:w-auto px-4 py-2 bg-indigo-800 text-white rounded"
            >
              <option value="">All Rarities</option>
              <option value="Common">Common</option>
              <option value="Legendary">Legendary</option>
            </select>
            <select
              value={filters.element}
              onChange={(e) => handleFilterChange('element', e.target.value)}
              className="w-full sm:w-auto px-4 py-2 bg-indigo-800 text-white rounded"
            >
              <option value="">All Elements</option>
              {ELEMENTS.map((element) => (
                <option key={element} value={element}>{element}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="text-red-500 mt-2 mb-4">{error}</p>}
        
        {isLoading ? (
          <p className="text-center">Loading your assets...</p>
        ) : isWrongNetwork ? (
          <p className="text-center text-yellow-400">Please switch to the XAI network to view your NFTs.</p>
        ) : filteredNFTs.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
            {filteredNFTs.map((nft, index) => (
              <div key={nft.id} onClick={() => handleNFTClick(nft)}>
                <NFTCard nft={nft} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No NFTs found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default InventoryPage;