import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
) {
  // Get the ID from the URL pathname
  const id = request.nextUrl.pathname.split('/').pop();

  if (!id) {
    return Response.json(
      { error: 'ID is required' },
      { status: 400 }
    );
  }

  const metadataUrl = `https://bafybeiak2htv3skjlzhd3hirumor7hbg7ajoyfs3yjhxfg5fuxzkqhpkeq.ipfs.dweb.link/${id}.json`;

  try {
    const response = await fetch(metadataUrl, {
      next: {
        revalidate: 3600 // Cache for 1 hour
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch NFT metadata');
    }

    const metadata = await response.json();
    const nft = {
      id,
      balance: 1,
      metadata: {
        name: metadata.name,
        image: metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
        attributes: metadata.attributes
      }
    };

    return Response.json(nft);
  } catch (error) {
    console.error('Error fetching NFT data:', error);
    return Response.json(
      { error: 'Failed to fetch NFT data' },
      { status: 500 }
    );
  }
}