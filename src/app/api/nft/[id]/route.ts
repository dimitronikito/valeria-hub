import { NextRequest, NextResponse } from 'next/server';
import { NFT } from '@/types/nft';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  const metadataUrl = `https://bafybeiak2htv3skjlzhd3hirumor7hbg7ajoyfs3yjhxfg5fuxzkqhpkeq.ipfs.dweb.link/${id}.json`;

  try {
    const response = await fetch(metadataUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch NFT metadata');
    }
    const metadata = await response.json();
    const nft: NFT = {
      id: id,
      balance: 1,
      metadata: {
        name: metadata.name,
        image: metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
        attributes: metadata.attributes
      }
    };
    return NextResponse.json(nft);
  } catch (error) {
    console.error('Error fetching NFT data:', error);
    return NextResponse.json({ error: 'Failed to fetch NFT data' }, { status: 500 });
  }
}