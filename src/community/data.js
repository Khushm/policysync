export const RESOURCES = [
    {
        id: 1,
        type: 'shelter',
        title: 'Faith Mission',
        description: 'Provision of emergency shelter, hot meals, and medical clinic access for single men and women. Managed by LSS.',
        lat: 39.9676,
        lng: -82.9978,
        zip: '43215',
        disaster: ['all'],
        address: '245 N Grant Ave, Columbus, OH 43215',
        hours: '24/7 Hotline',
        maxCapacity: 252,
        isAtCapacity: false,
        contact: '614-274-7000',
        pets: false,
        website: 'https://lssnetworkofhope.org/faithmission/'
    },
    {
        id: 2,
        type: 'shelter',
        title: 'Van Buren Center',
        description: 'A low-barrier emergency shelter for families and individuals. Offers housing-first case management and on-site health services.',
        lat: 39.9405,
        lng: -83.0235,
        zip: '43223',
        disaster: ['all'],
        address: '595 Van Buren Dr, Columbus, OH 43223',
        hours: '24/7 Intake',
        maxCapacity: 800,
        isAtCapacity: true,
        contact: '614-715-2030',
        pets: false,
        website: 'https://ymcacolumbus.org/vanburen'
    },
    {
        id: 3,
        type: 'shelter',
        title: 'YWCA Family Center',
        description: 'Intake and emergency shelter exclusively for families with children. Prioritizes stabilization and rapid re-housing.',
        lat: 39.9990,
        lng: -82.9450,
        zip: '43219',
        disaster: ['all'],
        address: '900 Harvey Ct, Columbus, OH 43219',
        hours: '24/7 Hotline',
        maxCapacity: 120,
        isAtCapacity: false,
        contact: '614-253-3910',
        pets: false,
        website: 'https://www.ywcacolumbus.org/familycenter/'
    },
    {
        id: 5,
        type: 'pantry',
        title: 'Mid-Ohio Market at Norton Road',
        description: 'Choice-based pantry providing fresh produce, dairy, and shelf-stable items to local residents.',
        lat: 39.9576,
        lng: -83.1205,
        zip: '43228',
        disaster: ['all'],
        address: '620 Norton Rd, Columbus, OH 43228',
        hours: 'T-Th 12-7p, Sat 10a-2p',
        maxCapacity: null,
        isAtCapacity: false,
        contact: '614-782-5514',
        pets: false,
        website: 'https://www.mofc.org/'
    },
    {
        id: 6,
        type: 'pantry',
        title: 'St. Stephens Community House',
        description: 'Comprehensive neighborhood center offering a large mid-ohio food market and family support services.',
        lat: 39.9980,
        lng: -82.9750,
        zip: '43219',
        disaster: ['all'],
        address: '1500 E 17th Ave, Columbus, OH 43219',
        hours: 'M/W/F 10a-3p, Tue 3-6p',
        maxCapacity: null,
        isAtCapacity: false,
        contact: '614-294-6347',
        pets: false,
        website: 'https://www.saintstephensch.org/'
    },
    {
        id: 7,
        type: 'pantry',
        title: 'All Peoples Fresh Food Market',
        description: 'Offers free fresh produce and healthy breads to lower-income community members.',
        lat: 39.9450,
        lng: -83.0100,
        zip: '43206',
        disaster: ['all'],
        address: '946 Parsons Ave, Columbus, OH 43206',
        hours: 'Tue-Fri 11a-5p, Sat 9a-1p',
        maxCapacity: null,
        isAtCapacity: false,
        contact: '614-445-7342',
        pets: false,
        website: 'https://www.4allpeople.org/'
    },
    {
        id: 8,
        type: 'shelter',
        title: 'Friends of the Homeless',
        description: 'Serving homeless men through emergency shelter and transitional housing programs. Part of Southeast Healthcare.',
        lat: 39.9600,
        lng: -82.9950,
        zip: '43215',
        disaster: ['all'],
        address: '924 E Main St, Columbus, OH 43205',
        hours: '24/7 Hotline',
        maxCapacity: 150,
        isAtCapacity: false,
        contact: '614-360-0251',
        pets: false,
        website: 'https://southeasthc.org/services/homeless-services/'
    }
];

export const POLICIES = [
    {
        title: 'FEMA Individual Assistance',
        icon: 'file-text',
        category: 'financial',
        desc: 'Direct grants for temporary housing and essential home repairs for owners and renters in declared disaster areas.',
        type: 'Financial Relief',
        url: 'https://www.disasterassistance.gov/'
    },
    {
        title: 'PRC Emergency Assistance (FCDJFS)',
        icon: 'home',
        category: 'financial',
        desc: 'One-time emergency financial aid for Franklin County families facing crises (fires, floods, or natural disasters).',
        type: 'Emergency Grant',
        url: 'https://jfs.franklincountyohio.gov/emergency-assistance'
    },
    {
        title: 'NAP Replacement Benefits',
        icon: 'heart',
        category: 'financial',
        desc: 'Replacement for food lost due to power outages or disaster. Must report loss within 10 days of event.',
        type: 'Food Assistance',
        url: 'https://jfs.franklincountyohio.gov/food-assistance'
    },
    {
        title: 'Legal Aid Disaster Help',
        icon: 'scale',
        category: 'legal',
        desc: 'Legal support for insurance disputes, housing evictions, and public benefit denials post-disaster.',
        type: 'Legal Support',
        url: 'https://www.lasco.org/'
    },
    {
        title: 'Emergency Repair Program (Columbus)',
        icon: 'wrench',
        category: 'housing',
        desc: 'City-funded emergency repairs for immediate threats to health and safety (furnace, water heater, electrical).',
        type: 'Housing Program',
        url: 'https://www.columbus.gov/housing/'
    },
    {
        title: 'Gifts of Kindness fund',
        icon: 'gift',
        category: 'financial',
        desc: 'One-time grants through The Columbus Foundation to help individuals handle local personal emergencies.',
        type: 'Charitable Grant',
        url: 'https://www.columbusfoundation.org/community-impact/gifts-of-kindness-fund'
    }
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

