import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaDiscord, FaYoutube, FaGlobe, FaExternalLinkAlt, FaTiktok, FaStore, FaApple, FaAndroid } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface SocialLink {
  name: string;
  icon: IconType;
  url: string;
}

const socialLinks: SocialLink[] = [
  { name: 'Official Website', icon: FaGlobe, url: 'https://www.valeriagames.com/' },
  { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com/ValeriaStudios' },
  { name: 'Discord', icon: FaDiscord, url: 'https://discord.gg/valeriagames' },
  { name: 'YouTube', icon: FaYoutube, url: 'https://www.youtube.com/channel/UCusrkhDypLaThlwfrYVRfqA/videos' },
  { name: 'TikTok', icon: FaTiktok, url: 'https://www.tiktok.com/@valeriagamesofficial' },
  { name: 'Marketplace', icon: FaStore, url: 'https://market.valeriagames.com/' },
  { name: 'App Store', icon: FaApple, url: 'https://apps.apple.com/us/app/land-before-the-war/id6446962942' }, // Update this URL
  { name: 'Google Play', icon: FaAndroid, url: 'https://play.google.com/store/apps/details?id=com.valeriagames.landbeforethewar' }, // Update this URL
  { name: 'All Links', icon: FaExternalLinkAlt, url: 'https://hub.xyz/valeria-games' },
];

const SocialCard: React.FC<SocialLink> = ({ name, icon: Icon, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-indigo-800 p-6 rounded-lg shadow-md cursor-pointer hover:bg-indigo-700 transition-all duration-300 border-2 border-indigo-600 flex flex-col items-center"
  >
    <Icon className="text-4xl mb-2 text-yellow-400" />
    <span className="text-sm uppercase tracking-wide">{name}</span>
  </a>
);

const SocialsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-indigo-950 text-white px-2 sm:px-4 py-4 sm:py-8">
      <div className="container mx-auto max-w-6xl">           
        <header className="bg-indigo-900 py-4">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center uppercase tracking-widest text-yellow-400 shadow-yellow-400 shadow-sm">Links</h1>
        </div>
      </header>
      <Link href="/" className="inline-block mb-4 px-4 py-2 my-4 bg-indigo-700 text-yellow-400 rounded hover:bg-indigo-600 transition-colors">
        ← Home
      </Link>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {socialLinks.map((social) => (
            <SocialCard key={social.name} {...social} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialsPage;