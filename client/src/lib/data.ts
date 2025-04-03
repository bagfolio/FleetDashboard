export const vehicleImages = [
  'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b',
  'https://images.unsplash.com/photo-1590847638075-83a135a9e712',
  'https://images.unsplash.com/photo-1591065550889-a42597daa498',
  'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8',
  'https://images.unsplash.com/photo-1508012340316-cdc7d2014bd5',
  'https://images.unsplash.com/photo-1616455266888-b2438731a6b8'
];

export const mapImages = [
  'https://images.unsplash.com/photo-1596649299486-4cdea56fd59d',
  'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83',
  'https://images.unsplash.com/photo-1522661067900-ab829854a57f',
  'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9'
];

export const dashboardUIImages = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998',
  'https://images.unsplash.com/photo-1616531770192-6eaea74c2456',
  'https://images.unsplash.com/photo-1511818966892-d7d671e672a2',
  'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74'
];

export const sustainabilityImages = [
  'https://images.unsplash.com/photo-1544427920-c49ccfb85579',
  'https://images.unsplash.com/photo-1623038759158-0428e4f19602',
  'https://images.unsplash.com/photo-1599732600593-5b06b39d9ac7',
  'https://images.unsplash.com/photo-1498925008800-019c6bae933d'
];

export const timeFilterOptions = [
  { label: 'Today', value: 'today' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Quarter', value: 'quarter' },
  { label: 'Custom', value: 'custom' }
];

export const vehicleTypes = [
  { label: 'All Vehicles', value: 'all' },
  { label: 'Active Only', value: 'active' },
  { label: 'Delayed Only', value: 'delayed' },
  { label: 'Maintenance', value: 'maintenance' }
];

export const routeTypes = [
  { label: 'All Routes', value: 'all' },
  { label: 'Residential', value: 'residential' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Recycling', value: 'recycling' }
];

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num);
};

export const formatDistance = (miles: number) => {
  return `${miles.toFixed(1)} miles`;
};

export const formatPercentage = (value: number, total: number) => {
  return `${Math.round((value / total) * 100)}%`;
};
