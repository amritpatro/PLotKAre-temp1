export type AmenityCost =
  | { kind: 'monthly'; amount: number }
  | { kind: 'one-time'; amount: number }

export type AmenityCatalogItem = {
  id: string
  name: string
  category: string
  image: string
  isLocalImage?: boolean
} & AmenityCost

export const AMENITY_CATALOG: AmenityCatalogItem[] = [
  { id: 'container-farming', name: 'Container Farming Lease', category: 'Income Generation', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600', kind: 'monthly', amount: 800 },
  {
    id: 'mushroom-kit',
    name: 'Mushroom Kit Cultivation',
    category: 'Income Generation',
    image: 'https://images.unsplash.com/photo-1575535468632-345892508d6b?w=600&auto=format&fit=crop&q=80',
    kind: 'monthly',
    amount: 1200,
  },
  { id: 'solar-panel', name: 'Solar Panel Hosting', category: 'Income Generation', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600', kind: 'monthly', amount: 1500 },
  { id: 'flower-bed', name: 'Flower Bed Maintenance', category: 'Aesthetic', image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc17?w=600', kind: 'monthly', amount: 300 },
  { id: 'swing-set', name: 'Swing Set Installation', category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=600', kind: 'monthly', amount: 400 },
  { id: 'boundary-fencing', name: 'Boundary Fencing', category: 'Protection', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', kind: 'one-time', amount: 15000 },
  { id: 'security-light', name: 'Security Light Installation', category: 'Security', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600', kind: 'one-time', amount: 3500 },
  { id: 'cctv', name: 'CCTV Camera Setup', category: 'Security', image: 'https://images.unsplash.com/photo-1557597774-9d475d030a94?w=600', kind: 'one-time', amount: 8000 },
  { id: 'rainwater', name: 'Rainwater Harvesting Pit', category: 'Utility', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600', kind: 'one-time', amount: 12000 },
  { id: 'compost', name: 'Compost Unit', category: 'Farming', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600', kind: 'monthly', amount: 200 },
  { id: 'herbal-garden', name: 'Herbal Garden', category: 'Farming', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600', kind: 'monthly', amount: 500 },
  { id: 'butterfly-garden', name: 'Butterfly Garden', category: 'Aesthetic', image: 'https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=600', kind: 'monthly', amount: 150 },
  { id: 'outdoor-gym', name: 'Outdoor Gym Equipment', category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600', kind: 'one-time', amount: 25000 },
  { id: 'drip-irrigation', name: 'Drip Irrigation Setup', category: 'Utility', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600', kind: 'one-time', amount: 8000 },
  { id: 'portable-storage', name: 'Portable Storage Unit', category: 'Utility', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', kind: 'monthly', amount: 600 },
  { id: 'bamboo-grove', name: 'Bamboo Grove', category: 'Aesthetic', image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600', kind: 'monthly', amount: 400 },
  { id: 'vermi', name: 'Vermi Composting Bed', category: 'Farming', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600', kind: 'monthly', amount: 350 },
  { id: 'aquaponics', name: 'Aquaponics Tank', category: 'Income Generation', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600', kind: 'monthly', amount: 2000 },
  { id: 'event-space', name: 'Event Space Rental Setup', category: 'Income Generation', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600', kind: 'monthly', amount: 3000 },
  { id: 'legal-signboard', name: 'Legal Signboard Installation', category: 'Protection', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600', kind: 'one-time', amount: 2000 },
]

export function getAmenityById(id: string) {
  return AMENITY_CATALOG.find((a) => a.id === id)
}

export function getAmenityByName(name: string) {
  return AMENITY_CATALOG.find((a) => a.name === name)
}
