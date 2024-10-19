import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import LbtwValerianDetailPage from '@/components/LbtwValerianDetailPage';
import LbtwValerianDetailSkeleton from '@/components/LbtwValerianDetailSkeleton';
import { NFT } from '@/types/nft';
import { useRouter } from 'next/router';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: {
    balance?: string;
  };
}

async function fetchNFTData(id: string, balance: number): Promise<NFT> {
  const metadataUrl = `https://bafybeiak2htv3skjlzhd3hirumor7hbg7ajoyfs3yjhxfg5fuxzkqhpkeq.ipfs.dweb.link/${id}.json`;
  
  try {
    const response = await fetch(metadataUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch NFT metadata');
    }
    const metadata = await response.json();

    return {
      id: id,
      balance: balance,
      metadata: {
        name: metadata.name,
        image: metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
        attributes: metadata.attributes
      }
    };
  } catch (error) {
    console.error('Error fetching NFT data:', error);
    throw error;
  }
}

async function AssetDetail({ params, searchParams }: PageProps) {
  try {
    const balance = parseInt(searchParams.balance || '1');
    const nft = await fetchNFTData(params.id, balance);
    return <LbtwValerianDetailPage nft={nft} />;
  } catch (error) {
    console.error('Error fetching NFT data:', error);
    notFound();
  }
}

export default function Page(props: PageProps) {
  return (
    <Suspense fallback={<LbtwValerianDetailSkeleton />}>
      <AssetDetail {...props} />
    </Suspense>
  );
}