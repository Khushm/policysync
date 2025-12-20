export const RESOURCES = [
    {
        id: 1,
        type: 'shelter',
        title: 'Faith Mission',
        description: 'Emergency shelter and resource center.',
        lat: 39.9676,
        lng: -82.9978,
        zip: '43215',
        disaster: ['all'],
        address: '245 N Grant Ave, Columbus, OH',
        hours: '24/7',
        capacity: 200,
        isAtCapacity: false,
        contact: '614-224-6617',
        pets: false
    },
    {
        id: 2,
        type: 'shelter',
        title: 'Van Buren Center',
        description: 'Emergency shelter for families and individuals.',
        lat: 39.9405,
        lng: -83.0235,
        zip: '43223',
        disaster: ['all'],
        address: '595 Van Buren Dr, Columbus, OH',
        hours: '24/7',
        capacity: 300,
        isAtCapacity: true,
        contact: '614-715-2030',
        pets: false
    },
    {
        id: 3,
        type: 'shelter',
        title: 'YWCA Family Center',
        description: 'Emergency shelter for families with children.',
        lat: 39.9990,
        lng: -82.9450,
        zip: '43219',
        disaster: ['all'],
        address: '900 Harvey Ct, Columbus, OH',
        hours: '24/7',
        capacity: 50,
        isAtCapacity: false,
        contact: '614-253-3910',
        pets: false
    },
    {
        id: 4,
        type: 'pantry',
        title: 'Mid-Ohio Market at Norton Road',
        description: 'Fresh produce and grocery items.',
        lat: 39.9576,
        lng: -83.1205,
        zip: '43228',
        disaster: ['all'],
        address: '620 Norton Rd, Columbus, OH',
        hours: 'M-F 12PM-7PM',
        capacity: null,
        isAtCapacity: false,
        contact: '614-782-5514',
        pets: false
    },
    {
        id: 5,
        type: 'pantry',
        title: 'NNEMAP Food Pantry',
        description: 'Food assistance for Linden and surrounding areas.',
        lat: 39.9863,
        lng: -82.9840,
        zip: '43211',
        disaster: ['all'],
        address: '677 E 11th Ave, Columbus, OH',
        hours: 'M-W, F 9AM-12PM',
        capacity: null,
        isAtCapacity: false,
        contact: '614-297-0533',
        pets: false
    }
];

export const POLICIES = [
    { title: 'Home Loss Guide', icon: 'home', category: 'housing', desc: 'Steps to take after losing your home.', type: 'Housing' },
    { title: 'FEMA Claims', icon: 'file-text', category: 'financial', desc: 'How to file for federal assistance.', type: 'Financial' },
    { title: 'Flood Insurance', icon: 'umbrella', category: 'financial', desc: 'Understanding your coverage.', type: 'Financial' },
    { title: 'Legal Aid', icon: 'scale', category: 'legal', desc: 'Free legal support for victims.', type: 'Legal' },
    { title: 'Tenant Rights', icon: 'key', category: 'housing', desc: 'Rights for renters in disaster zones.', type: 'Housing' },
    { title: 'Small Business Loans', icon: 'briefcase', category: 'financial', desc: 'SBA loans for recovery.', type: 'Financial' }
];

export const FRANKLIN_COUNTY_ZIPS = [
    '43002', '43004', '43016', '43017', '43026', '43054', '43068', '43081', '43085', '43086',
    '43109', '43110', '43119', '43123', '43125', '43126', '43137', '43146', '43194', '43195',
    '43196', '43198', '43199', '43201', '43202', '43203', '43204', '43205', '43206', '43207',
    '43209', '43210', '43211', '43212', '43213', '43214', '43215', '43216', '43217', '43218',
    '43219', '43220', '43221', '43222', '43223', '43224', '43226', '43227', '43228', '43229',
    '43230', '43231', '43232', '43234', '43235', '43236', '43260', '43265', '43266', '43268',
    '43270', '43271', '43272', '43279', '43287', '43291', '43299'
];
