
import { ChecklistItem, VideoData } from './types';

export const DISCOVERY_CATEGORIES = [
  "All", "Cinematic", "Wildlife", "Cities", "Music", "Space", "Gaming"
];

export const HOME_VIDEOS: VideoData[] = [
  { id: 'LXb3EKWsInQ', title: 'Costa Rica 4K - Tropical Wildlife', channel: 'Nature Reliance', thumbnail: 'https://img.youtube.com/vi/LXb3EKWsInQ/maxresdefault.jpg', views: '15M', duration: '5:22' },
  { id: '1La4QzGeaaQ', title: 'Switzerland 4K - Alpine Wonders', channel: 'Dji Discover', thumbnail: 'https://img.youtube.com/vi/1La4QzGeaaQ/maxresdefault.jpg', views: '8M', duration: '4:15' },
  { id: 'vX2vsvdq8nw', title: 'NYC 4K Night Walk - Manhattan', channel: 'Urban Explorers', thumbnail: 'https://img.youtube.com/vi/vX2vsvdq8nw/maxresdefault.jpg', views: '3M', duration: '12:40' },
  { id: 'v64KOxKVLVg', title: 'Deep Space 4K - Nebula Tour', channel: 'Cosmos Hub', thumbnail: 'https://img.youtube.com/vi/v64KOxKVLVg/maxresdefault.jpg', views: '1.2M', duration: '8:05' },
  { id: 'aqz-KE-bpKQ', title: 'Big Sur 4K - California Coast', channel: 'Shoreline', thumbnail: 'https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg', views: '500K', duration: '3:30' },
  { id: '9ZfN87gSjvI', title: 'Tokyo 4K Neon Cityscape', channel: 'Future Pulse', thumbnail: 'https://img.youtube.com/vi/9ZfN87gSjvI/maxresdefault.jpg', views: '2.1M', duration: '10:15' },
];

export const DEPLOY_CHECKLIST: ChecklistItem[] = [
  { id: '1', title: 'Signed App Bundle', description: 'Generated Veloce4K.aab for release.', category: 'Technical', completed: false },
  { id: '2', title: 'Privacy Compliance', description: 'URL for data processing policy.', category: 'Legal', completed: false },
  { id: '3', title: '4K Iconography', description: 'Adaptive icons at 512x512.', category: 'Assets', completed: false },
  { id: '4', title: 'Store Listing', description: 'AI-enhanced copy for ASO.', category: 'Marketing', completed: false },
];
