'use client';

import { useMemo, useState } from 'react';
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Marker,
} from 'react-simple-maps';

import { geoAlbersUsa } from 'd3-geo';

const geoUrl = '/us-states.json';

const FIPS_TO_STATE = {
    '01': 'AL',
    '02': 'AK',
    '04': 'AZ',
    '05': 'AR',
    '06': 'CA',
    '08': 'CO',
    '09': 'CT',
    '10': 'DE',
    '11': 'DC',
    '12': 'FL',
    '13': 'GA',
    '15': 'HI',
    '16': 'ID',
    '17': 'IL',
    '18': 'IN',
    '19': 'IA',
    '20': 'KS',
    '21': 'KY',
    '22': 'LA',
    '23': 'ME',
    '24': 'MD',
    '25': 'MA',
    '26': 'MI',
    '27': 'MN',
    '28': 'MS',
    '29': 'MO',
    '30': 'MT',
    '31': 'NE',
    '32': 'NV',
    '33': 'NH',
    '34': 'NJ',
    '35': 'NM',
    '36': 'NY',
    '37': 'NC',
    '38': 'ND',
    '39': 'OH',
    '40': 'OK',
    '41': 'OR',
    '42': 'PA',
    '44': 'RI',
    '45': 'SC',
    '46': 'SD',
    '47': 'TN',
    '48': 'TX',
    '49': 'UT',
    '50': 'VT',
    '51': 'VA',
    '53': 'WA',
    '54': 'WV',
    '55': 'WI',
    '56': 'WY',
};

const STATE_NAMES = {
    AL: 'Alabama',
    AK: 'Alaska',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    DC: 'District of Columbia',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming',
};

const STATE_DATA = {
    AL: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    AK: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    AZ: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    AR: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },
    
    CA: {
        description:
            'CA has everything, and if you\'ve been, you know that\'s not an exaggeration. Top tier spot to visit \'cause God knows I\'ll never afford to live there!',

        defaultPhoto: 'resources/USA_Map/USA_26/CA/CA1.jpeg',

        photos: [
            {
                id: 'trinidad-beach-eureka-ca',
                src: "resources/USA_Map/USA_26/CA/CA1.jpeg",
                title: 'Trinidad Beach, Eureka, CA',
                lat: 41.0630847,
                lon: -124.1422942,
            },
            {
                id: 'death-valley-ca',
                src: "resources/USA_Map/USA_26/CA/CA2.jpeg",
                title: 'Death Valley, CA',
                lat: 36.4822968,
                lon: -117.7089587,
            },
            {
                id: 'griffith-park-los-angeles-ca',
                src: "resources/USA_Map/USA_26/CA/CA3.jpeg",
                title: 'Griffith Park, Los Angeles, CA',
                lat: 34.1183845,
                lon: -118.3019297,
            },
            {
                id: 'joshua-tree-ca',
                src: "resources/USA_Map/USA_26/CA/CA4.jpeg",
                title: 'Joshua Tree, CA',
                lat: 33.9001129,
                lon: -116.1903072,
            },
            {
                id: 'malibu-pier-malibu-ca',
                src: "resources/USA_Map/USA_26/CA/CA5.jpeg",
                title: 'Malibu Pier, Malibu, CA',
                lat: 34.0386407,
                lon: -118.6684005,
            },
        ],
    },

    CO: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    CT: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    DE: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    DC: {
        description:
            'It\'s the capital, yeah, but did you know the public transport is actually pretty good? Great place to walk around when it\'s not a summer heat extravaganza.',

        defaultPhoto: 'resources/USA_Map/Pre_26/DC/DC1.jpeg',

        photos: [
            {
                id: 'white-house-washington-dc',
                src: "resources/USA_Map/Pre_26/DC/DC1.jpg",
                title: 'The White House, Washington, DC',
                lat: 38.8976804,
                lon: -77.0391047,
            },
            {
                id: 'united-states-capitol-washington-dc',
                src: "resources/USA_Map/Pre_26/DC/DC2.jpg",
                title: 'United States Capitol, Washington, DC',
                lat: 38.889943,
                lon: -77.0116254,
            },
            {
                id: 'united-states-capitol-2-washington-dc',
                src: "resources/USA_Map/USA_26/DC/DC1.jpeg",
                title: 'United States Capitol, Washington, DC',
                lat: 38.889943,
                lon: -77.0116254,
            },
        ],
    },

    FL: {
        description:
            'I hate FL, honestly. It\'s the armpit of the US in every possible way. Doesn\'t mean you can\'t have fun there! I sure have.',

        defaultPhoto: 'resources/USA_Map/Pre_26/FL/FL1.jpg',

        photos: [
            {
                id: 'south-pointe-beach-miami-fl',
                src: "resources/USA_Map/Pre_26/FL/FL1.jpg",
                title: 'South Pointe Beach, Miami, FL',
                lat: 25.7713188,
                lon: -80.1295506,
            },
            {
                id: 'daytona-beach-fl',
                src: "resources/USA_Map/Pre_26/FL/FL2.jpeg",
                title: 'Daytona Beach, FL',
                lat: 29.2238849,
                lon: -81.1035916,
            },
        ],
    },

    GA: {
        description:
            'Hey, it\'s my birth state. Land de la peach.',

        defaultPhoto: 'resources/USA_Map/Pre_26/GA/GA1.jpeg',

        photos: [
            {
                id: 'north-beach-tybee-island-ga',
                src: "resources/USA_Map/Pre_26/GA/GA1.jpeg",
                title: 'North Beach, Tybee Island, GA',
                lat: 32.0232218,
                lon: -80.8436708,
            },
            {
                id: 'the-masquerade-atlanta-ga',
                src: "resources/USA_Map/Pre_26/GA/GA2.jpg",
                title: 'The Masquerade, Atlanta, GA',
                lat: 33.7517376,
                lon: -84.3905352,
            },
            {
                id: 'jekyll-island-ga',
                src: "resources/USA_Map/Pre_26/GA/GA3.jpg",
                title: 'Jekyll Island, GA',
                lat: 31.0620632,
                lon: -81.4087646,
            },
            {
                id: 'avalon-alpharetta-ga',
                src: "resources/USA_Map/Pre_26/GA/GA4.jpeg",
                title: 'Avalon, Alpharetta, GA',
                lat: 34.0707537,
                lon: -84.2792878,
            },
            {
                id: 'stone-mountain-ga',
                src: "resources/USA_Map/Pre_26/GA/GA5.jpeg",
                title: 'Stone Mountain, GA',
                lat: 33.810524,
                lon: -84.143915,
            },
            {
                id: 'gibbs-gardens-ga',
                src: "resources/USA_Map/Pre_26/GA/GA6.jpg",
                title: 'Gibbs Gardens, Ball Ground, GA',
                lat: 34.3786626,
                lon: -84.2828559,
            },
            {
                id: 'nowhere-bar-athens-ga',
                src: "resources/USA_Map/Pre_26/GA/GA7.jpeg",
                title: 'Nowhere Bar, Athens, GA',
                lat: 33.9586944,
                lon: -83.3796469,
            },
            {
                id: 'nc-civil-human-rights-ga',
                src: "resources/USA_Map/Pre_26/GA/GA8.jpeg",
                title: 'NC Civil and Human Rights, Atlanta, GA',
                lat: 33.7616813,
                lon: -84.3902282,
            },
            {
                id: 'dress-up-dahlonega-ga',
                src: "resources/USA_Map/Pre_26/GA/GA9.jpeg",
                title: 'Dress Up Dahlonega, Dahlonega, GA',
                lat: 34.5324482,
                lon: -83.9853965,
            },
            {
                id: 'furnace-41-jonesboro-ga',
                src: "resources/USA_Map/Pre_26/GA/GA10.jpg",
                title: 'Furnace 41, Jonesboro, GA',
                lat: 33.5442524,
                lon: -84.3658512,
            },
        ],
    },

    HI: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    ID: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    IL: {
        description:
            'My first visit to IL was to Chicago, and I fell in love with the architecture. Took an unforgettable boat tour of it, and I\'ll do it again. \
            My second visit to IL was driving the entire length of it from SOIL to WI and, yup, there really is nothing there. Except the giant Superman statue which rocks.',

        defaultPhoto: 'resources/USA_Map/Pre_26/IL/IL1.jpeg',

        photos: [
            {
                id: 'navy-pier-chicago-il',
                src: "resources/USA_Map/Pre_26/IL/IL1.jpeg",
                title: 'Navy Pier, Chicago, IL',
                lat: 41.891011,
                lon: -87.6112751,
            },
        ],
    },

    IN: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    IA: {
        description:
            'Really enjoyed my time in Des Moines. Some nice parks to visit, a really interesting capitol building, and a nice botanical garden. \
            And I can say I\'ve been to Cumming, IA now.',

        defaultPhoto: 'resources/USA_Map/USA_26/IA/IA1.jpeg',

        photos: [
            {
                id: 'iowa-state-capitol-des-moines-ia',
                src: "resources/USA_Map/USA_26/IA/IA1.jpeg",
                title: 'Iowa State Capitol, Des Moines, IA',
                lat: 41.59209050,
                lon: -93.6006206,
            },
        ],
    },

    KS: {
        description:
            'Found the Yellow Brick Road in Wamego. The parts of KS I\'ve seen have been pretty flat and boring, really, but I\'m sure there\'s more to see. \
            Saw a bit of the KS side of KC, and there\'s a decent little park there that\'s nice.',

        defaultPhoto: 'resources/USA_Map/USA_26/KS/KS1.jpeg',

        photos: [
            {
                id: 'yellow-brick-road-wamego-ks',
                src: "resources/USA_Map/USA_26/KS/KS1.jpeg",
                title: 'Yellow Brick Road, Wamego, KS',
                lat: 39.2027459,
                lon: -96.3038692,
            },
        ],
    },

    KY: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    LA: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    ME: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    MD: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    MA: {
        description:
            'Boston is the safest I\'ve felt in a big city and it\'s clean, beautiful, and full of history. Visited Cape Cod in the Spring not realizing it was totally dead then, \
            but what a beautiful place! Salem is one of my favorite spots in the country. Absolutely love Essex Street and Blackcraft Coffee!',

        defaultPhoto: 'resources/USA_Map/USA_26/MA/MA1.jpeg',

        photos: [
            {
                id: 'downtown-crossing-boston-ma',
                src: "resources/USA_Map/USA_26/MA/MA1.jpeg",
                title: 'Downtown Crossing, Boston, MA',
                lat: 42.3555906,
                lon: -71.0615917,
            },
            {
                id: 'provincetown-ma',
                src: "resources/USA_Map/USA_26/MA/MA2.jpeg",
                title: 'Provincetown, MA',
                lat: 42.0613724,
                lon: -70.1497416,
            },
            {
                id: 'provincetown-ma-2',
                src: "resources/USA_Map/USA_26/MA/MA3.jpeg",
                title: 'Provincetown, MA',
                lat: 42.0613724,
                lon: -70.1497416,
            },
            {
                id: 'provincetown-ma-3',
                src: "resources/USA_Map/USA_26/MA/MA4.jpeg",
                title: 'Provincetown, MA',
                lat: 42.0613724,
                lon: -70.1497416,
            },
            {
                id: 'essex-street-salem-ma',
                src: "resources/USA_Map/USA_26/MA/MA5.jpeg",
                title: 'Essex Street, Salem, MA',
                lat: 42.5217024,
                lon: -70.8938795,
            },
            {
                id: 'blackcraft-coffee-salem-ma',
                src: "resources/USA_Map/USA_26/MA/MA6.jpeg",
                title: 'Blackcraft Coffee, Salem, MA',
                lat: 42.5212647,
                lon: -70.8990682,
            },
        ],
    },

    MI: {
        description:
            'Grand Rapids was pretty quiet when I visited. Nice presential museum there for GRF, and Vertico Music has a solid collection.',

        defaultPhoto: 'resources/USA_Map/Pre_26/MI/MI1.jpeg',

        photos: [
            {
                id: 'grand-rapids-mi',
                src: "resources/USA_Map/Pre_26/MI/MI1.jpeg",
                title: 'Traffic Cone, Grand Rapids, Michigan',
                lat: 42.9601564,
                lon: -85.6706446,
            },
        ],
    },

    MN: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    MS: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    MO: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    MT: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    NE: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    NV: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    NH: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    NJ: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    NM: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    NY: {
        description:
            'Other than having the best city in the country, NY is a beautiful state I love to visit. Cornell is my favorite university campus, and I nearly got frostbite in the Lake Placid area.',

        defaultPhoto: 'resources/USA_Map/Pre_26/NY/NY1.jpeg',

        photos: [
            {
                id: 'one-world-trade-center-new-york-ny',
                src: "resources/USA_Map/Pre_26/NY/NY1.jpeg",
                title: 'One World Trade Center, New York, NY',
                lat: 40.7129987,
                lon: -74.0157359,
            },
            {
                id: 'cornell-university-ithaca-ny',
                src: "resources/USA_Map/Pre_26/NY/NY2.jpg",
                title: 'Cornell University, Ithaca, NY',
                lat: 42.4445404,
                lon: -76.4816239,
            },
            {
                id: 'staten-island-ferry-staten-island-ny',
                src: "resources/USA_Map/Pre_26/NY/NY3.jpeg",
                title: 'Staten Island Ferry, Staten Island, NY',
                lat: 40.6788452,
                lon: -74.0482075,
            },
        ],
    },

    NC: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    ND: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    OH: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    OK: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    OR: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    PA: {
        description:
            'It\s PA baby! My family owned a bakery in PGH for a while but my grandma moved away looking for work in GA in the 70\'s. Wish she stayed, but I totally get it! Love it in PGH. Wanna hate Philly but it\'s a nice city, honestly.',

        defaultPhoto: 'resources/USA_Map/Pre_26/PA/PA1.jpeg',

        photos: [
            {
                id: 'pnc-park-north-shore-pittsburgh-pa',
                src: "resources/USA_Map/Pre_26/PA/PA1.jpeg",
                title: 'PNC Park, North Shore, Pittsburgh, PA',
                lat: 40.4474733,
                lon: -80.0097352,
            },
            {
                id: 'gaucho-parrilla-argentina-downtown-pittsburgh-pa',
                src: "resources/USA_Map/Pre_26/PA/PA2.jpeg",
                title: 'Gaucho Parrilla Argentina, Downtown, Pittsburgh, PA',
                lat: 40.4427844,
                lon: -80.0037937,
            },
        ],
    },

    RI: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    SC: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    SD: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    TN: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    TX: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    UT: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    VT: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    VA: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    WA: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    WV: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

    WI: {
        description:
            'Badger state holds a very special place. Lived in Madison for a bit and loved it.',

        defaultPhoto: 'resources/USA_Map/Pre_26/WI/WI1.jpeg',

        photos: [
            {
                id: 'downtown-madison-wi',
                src: "resources/USA_Map/Pre_26/WI/WI1.jpeg",
                title: 'Downtown, Madison, WI',
                lat: 43.0747735,
                lon: -89.38836,
            },
        ],
    },

    WY: {
        description:
            '',

        defaultPhoto: '',

        photos: [
            // {
            //     id: '',
            //     src: "",
            //     title: '',
            //     lat: 0,
            //     lon: -0,
            // },
        ],
    },

};

function clusterPhotos(photos, zoom) {
    if (!photos || photos.length === 0) {
        return [];
    }

    const threshold =
        zoom < 2
            ? 2
            : zoom < 3
              ? 1
              : zoom < 4
                ? 0.5
                : zoom < 5
                  ? 0.2
                  : 0.05;

    const clusters = [];

    photos.forEach((photo) => {
        let existingCluster = null;

        for (const cluster of clusters) {
            const distance = Math.sqrt(Math.pow(photo.lon - cluster.lon, 2) + Math.pow(photo.lat - cluster.lat, 2));

            if (distance < threshold) {
                existingCluster = cluster;
                break;
            }
        }

        if (existingCluster) {
            existingCluster.photos.push(photo);

            existingCluster.lon = existingCluster.photos.reduce((sum, p) => sum + p.lon, 0) / existingCluster.photos.length;

            existingCluster.lat = existingCluster.photos.reduce((sum, p) => sum + p.lat, 0) / existingCluster.photos.length;
        } else {
            clusters.push({
                id: `cluster-${photo.id}`,
                lon: photo.lon,
                lat: photo.lat,
                photos: [photo],
            });
        }
    });

    return clusters;
}

export default function USMap({
    groupOne = [],
    groupTwo = [],
    groupThree = [],
    onStateClick,
}) {
    const [hoveredState, setHoveredState] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedGeo, setSelectedGeo] = useState(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [center, setCenter] = useState([0, 0]);
    const [photoCluster, setPhotoCluster] = useState(null);

    const getStateColor = (state) => {
        if (groupOne.includes(state)) {
            return 'group-one';
        }

        if (groupTwo.includes(state)) {
            return 'group-two';
        }

        if (groupThree.includes(state)) {
            return 'group-three';
        }

        return 'default';
    };

    const getStateStatus = (state) => {
        if (groupOne.includes(state)) {
            return "Haven't been (meh)";
        }
        if (groupTwo.includes(state)) {
            return "Lived there!";
        }
        if (groupThree.includes(state)) {
            return "Haven't been (want to)";
        }
        return "I've been";
    };

    const handleStateClick = (state, geo) => {
        setSelectedState(state);
        setSelectedGeo(geo);

        const stateData = STATE_DATA[state];

        setSelectedPhoto(
            stateData?.photos?.[0] || null
        );

        if (onStateClick) {
            onStateClick({
                abbreviation: state,
                name: STATE_NAMES[state],
            });
        }
    };

    const closeState = () => {
        setSelectedState(null);
        setSelectedGeo(null);
        setSelectedPhoto(null);
        setZoom(1);
        setCenter([0, 0]);
    };

    const selectedProjection = useMemo(() => {
        if (!selectedGeo) return null;

        return geoAlbersUsa().fitExtent( [ [25, 25], [575, 475], ], selectedGeo );
    }, [selectedGeo]);

    if (selectedState) {
        const stateData = STATE_DATA[selectedState] || {
            description: '',
            defaultPhoto: '',
            photos: [],
        };

        const clusters = clusterPhotos(
            stateData.photos,
            zoom
        );

        return (
            <div
                className="us-map-wrapper state-view"
                onClick={closeState}
            >

                <div
                    className="state-content"
                    onClick={(e) => e.stopPropagation()}
                >

                    <button
                        className="state-back-button"
                        onClick={closeState}
                    >
                        ← Back to map
                    </button>


                    <div className="state-header">
                        <h1>
                            {STATE_NAMES[selectedState]}
                        </h1>

                        <p className="state-status">
                            {getStateStatus(selectedState)}
                        </p>
                    </div>


                    <div className="state-layout">

                        <div className="selected-state-map">

                            {selectedProjection && (

                                <ComposableMap
                                    projection={selectedProjection}
                                    width={600}
                                    height={500}
                                >
                                    <defs>
                                        <pattern
                                            id="selected-state-pattern"
                                            width="10"
                                            height="10"
                                            patternUnits="userSpaceOnUse"
                                        >
                                            <path
                                                d="M-2,2 L2,-2 M0,10 L10,0 M8,12 L12,8"
                                                stroke="#000000"
                                                strokeWidth="1"
                                                opacity="0.3"
                                            />

                                            <path
                                                d="M8,-2 L12,2 M0,0 L10,10 M-2,8 L2,12"
                                                stroke="#000000"
                                                strokeWidth="1"
                                                opacity="0.3"
                                            />
                                        </pattern>
                                    </defs>
                                    
                                    <ZoomableGroup
                                        disablePanning
                                        center={center}
                                        zoom={zoom}
                                        minZoom={1}
                                        maxZoom={5}
                                        translateExtent={[[0, 0],[600, 500],]}
                                        onMoveEnd={({ coordinates, zoom }) => {
                                            setCenter(coordinates);
                                            setZoom(zoom);
                                        }}
                                    >
                                        <Geographies geography={geoUrl}>
                                            {({ geographies }) =>
                                                geographies
                                                    .filter((geo) => {
                                                        const state =
                                                            FIPS_TO_STATE[
                                                                String(geo.id).padStart(2, '0')
                                                            ];

                                                        return (state === selectedState);
                                                    })
                                                    .map((geo) => (
                                                        <g key={geo.rsmKey}>
                                                            <Geography
                                                                key={geo.rsmKey}
                                                                geography={geo}
                                                                className={`selected-state ${getStateColor(selectedState)}`}
                                                            />
                                                            <Geography
                                                                geography={geo}
                                                                fill="url(#selected-state-pattern)"
                                                                stroke="none"
                                                                pointerEvents="none"
                                                            />
                                                        </g>
                                                    ))
                                            }
                                        </Geographies>


                                        {clusters.map((cluster) => {
                                            if (cluster.photos.length === 1) {
                                                const photo = cluster.photos[0];
                                                const isSelected = selectedPhoto?.id === photo.id;

                                                return (
                                                    <Marker
                                                        key={cluster.id}
                                                        coordinates={[photo.lon, photo.lat]}
                                                        onClick={() => setSelectedPhoto(photo)}
                                                    >
                                                        {isSelected && (
                                                            <circle
                                                                className="marker-pulse"
                                                                r={7}
                                                            />
                                                        )}
                                                        <circle
                                                            r={7}
                                                            strokeWidth={1}
                                                            fill={isSelected ? "#eeff00" : "#eaeaea"}
                                                            stroke="#000000"
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </Marker>
                                                );
                                            }

                                            const clusterHasSelectedPhoto = cluster.photos.some(
                                                (photo) => photo.id === selectedPhoto?.id
                                            );

                                            return (
                                                <Marker
                                                    key={cluster.id}
                                                    coordinates={[cluster.lon, cluster.lat, ]}
                                                    // onClick={() => {
                                                    //     setCenter([cluster.lon, cluster.lat, ]);

                                                    //     setZoom(Math.min(zoom * 2, 8));
                                                    // }}
                                                    onClick={() => setPhotoCluster(cluster)}
                                                >
                                                    {clusterHasSelectedPhoto && (
                                                        <circle
                                                            className="marker-pulse"
                                                            r={14}
                                                        />
                                                    )}

                                                    <circle
                                                        r={15}
                                                        fill="#000000"
                                                        stroke="#ffffff"
                                                        strokeWidth={1}
                                                        style={{ cursor: 'pointer', }}
                                                    />

                                                    <text
                                                        textAnchor="middle"
                                                        y="4"
                                                        style={{
                                                            fill: '#ffffff',
                                                            fontSize: '1em',
                                                            fontWeight: 'bold',
                                                            pointerEvents: 'none',
                                                        }}
                                                    >
                                                        {cluster.photos.length}
                                                    </text>
                                                </Marker>
                                            );
                                        })}
                                    </ZoomableGroup>
                                </ComposableMap>
                            )}

                            {photoCluster && (
                                <div className="photo-cluster-overlay">
                                    <div className="photo-cluster-panel">
                                        <button
                                            className="photo-cluster-close"
                                            onClick={() => setPhotoCluster(null)}
                                        >
                                            ×
                                        </button>

                                        <h2>
                                            Photos near{' '}
                                            {photoCluster.photos[0]?.title ||
                                                STATE_NAMES[selectedState]}
                                        </h2>

                                        <div className="photo-cluster-list">
                                            {photoCluster.photos.map((photo) => (
                                                <button
                                                    key={photo.id}
                                                    className="photo-cluster-item"
                                                    onClick={() => {
                                                        setSelectedPhoto(photo);
                                                        setPhotoCluster(null);
                                                    }}
                                                >
                                                    <img
                                                        src={photo.src}
                                                        alt=""
                                                    />

                                                    <span>
                                                        {photo.title}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="state-information">

                            <h2>
                                Hello, {STATE_NAMES[selectedState]}
                            </h2>

                            <p>
                                {stateData.description ||
                                    `Information about ${STATE_NAMES[selectedState]} will go here.`}
                            </p>

                            <div className="state-photos">

                                {stateData.photos.length > 0 ? (
                                    <div>
                                        <img
                                            src={selectedPhoto?.src || stateData.defaultPhoto}
                                            alt={
                                                selectedPhoto?.title ||
                                                `${STATE_NAMES[selectedState]}`
                                            }
                                        />

                                        <h2>
                                            {selectedPhoto?.title ||
                                                STATE_NAMES[selectedState]}
                                        </h2>
                                    </div>
                                ) : (
                                    <div className="photo-placeholder">
                                        Photos of{' '}{STATE_NAMES[selectedState]} will
                                        go here.
                                    </div>
                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="us-map-wrapper">

            <ComposableMap
                className="us-map"
                projection="geoAlbersUsa"
                projectionConfig={{
                    scale: 1000,
                }}
            >
                <ZoomableGroup disablePanning minZoom={1} maxZoom={5} translateExtent={[[0, 0],[800, 600],]}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {

                                const stateAbbreviation = FIPS_TO_STATE[String(geo.id).padStart(2, '0')];

                                const stateName =
                                    STATE_NAMES[stateAbbreviation] ||
                                    geo.properties?.name ||
                                    'Unknown State';

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        className={`state ${getStateColor(stateAbbreviation)}`}
                                        onMouseEnter={() =>
                                            setHoveredState({
                                                abbreviation: stateAbbreviation,
                                                name: stateName,
                                            })
                                        }
                                        onMouseLeave={() =>
                                            setHoveredState(null)
                                        }
                                        onClick={() =>
                                            handleStateClick(
                                                stateAbbreviation,
                                                geo
                                            )
                                        }
                                        role="button"
                                        aria-label={stateName}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>

            {hoveredState && (
                <div className="us-map-tooltip">
                    {hoveredState.name}:{' '}{getStateStatus(hoveredState.abbreviation)}
                </div>
            )}

        </div>
    );
}