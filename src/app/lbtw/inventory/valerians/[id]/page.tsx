import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import LbtwValerianDetailPage from './LbtwValerianDetailPage';
import LbtwValerianDetailSkeleton from './LbtwValerianDetailSkeleton';
import { NFT } from '@/types/nft';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    balance?: string;
  }>;
}

async function fetchNFTData(id: string, balance: number): Promise<NFT> {
  const metadataUrl = `https://bafybeiak2htv3skjlzhd3hirumor7hbg7ajoyfs3yjhxfg5fuxzkqhpkeq.ipfs.dweb.link/${id}.json`;
  
  try {
    const response = await fetch(metadataUrl, {
      next: {
        revalidate: 3600
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch NFT metadata');
    }

    const metadata = await response.json();
    return {
      id,
      balance,
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
    // Await both params and searchParams
    const [resolvedParams, resolvedSearchParams] = await Promise.all([
      params,
      searchParams
    ]);

    const balance = resolvedSearchParams.balance ? parseInt(resolvedSearchParams.balance) : 0;
    const nft = await fetchNFTData(resolvedParams.id, balance);
    
    return <LbtwValerianDetailPage nft={nft} />;
  } catch (error) {
    console.error('Error in AssetDetail:', error);
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