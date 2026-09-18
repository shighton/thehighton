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
            'Northern AL is a wonderful mountainous region with some nice lake views. AL also has the best sweet tea on average in my option.',

        defaultPhoto: 'resources/USA_Map/Pre_26/AL/AL1.jpeg',

        photos: [
            {
                id: 'birmingham-botanical-gardens-birmingham-al',
                src: "resources/USA_Map/Pre_26/AL/AL1.jpeg",
                title: 'Birmingham Botanical Gardens, Birmingham, AL',
                lat: 33.4871048,
                lon: -86.775242,
            },
            {
                id: 'bridge-street-town-centre-hunstsville-al',
                src: "resources/USA_Map/USA_26/AL/AL1.jpeg",
                title: 'Bridge Street Town Centre, Huntsville, AL',
                lat: 34.7183726,
                lon: -86.6765005,
            },
        ],
    },

    AK: {
        description:
            'Not sure when I\'d get out here, but I will. Trust, people.',

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
            'Snow at the Grand Canyon! A lot was blocked off when I rolled through, but it\'s a sight to behold. Nice little Inn by the Valle Airport, too!',

        defaultPhoto: 'resources/USA_Map/USA_26/AZ/AZ1.jpeg',

        photos: [
            {
                id: 'mather-point-grand-canyon-village-az',
                src: "resources/USA_Map/USA_26/AZ/AZ1.jpeg",
                title: 'Mather Point, Grand Canyon Village, AZ',
                lat: 36.0997712,
                lon: -112.1176345,
            },
        ],
    },

    AR: {
        description:
            'Ah, yes, the Bill Clinton state. Other than that, it\'s a pretty spot with some beautiful mountains in the West and a great lookout tower in Hot Springs.',

        defaultPhoto: 'resources/USA_Map/USA_26/AR/AR1.jpeg',

        photos: [
            {
                id: 'hot-springs-mountain-tower-hot-springs-ar',
                src: "resources/USA_Map/USA_26/AR/AR1.jpeg",
                title: 'Hot Springs Mountain Tower, Hot Springs, AR',
                lat: 34.5172697,
                lon: -93.0486626,
            },
            {
                id: 'fort-smith-ar',
                src: "resources/USA_Map/USA_26/AR/AR2.jpeg",
                title: 'Fort Smith, AR',
                lat: 35.3851249,
                lon: -94.4249537,
            },
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
            'Great Snow Dunes! Winter at Great Sand Dunes is wild fun with sledding. CO is one of the best nature states for a reason, it just has so much to offer. I loved my time there!',

        defaultPhoto: 'resources/USA_Map/USA_26/CO/CO1.jpeg',

        photos: [
            {
                id: 'great-sand-dunes-mosca-co',
                src: "resources/USA_Map/USA_26/CO/CO1.jpeg",
                title: 'Great Sand Dunes, Mosca, CO',
                lat: 37.7402497,
                lon: -105.5181412,
            },
            {
                id: 'black-canyon-of-the-gunnison-montrose-co',
                src: "resources/USA_Map/USA_26/CO/CO2.jpeg",
                title: 'Black Canyon of the Gunnison, Montrose, CO',
                lat: 38.5558648,
                lon: -107.6865995,
            },
            {
                id: 'great-sand-dunes-mosca-co-2',
                src: "resources/USA_Map/USA_26/CO/CO3.jpeg",
                title: 'Great Sand Dunes, Mosca, CO',
                lat: 37.7402497,
                lon: -105.5181412,
            },
            {
                id: 'blue-mesa-reservoir-gunnison-co',
                src: "resources/USA_Map/USA_26/CO/CO4.jpeg",
                title: 'Blue Mesa Reservoir, Gunnison, CO',
                lat: 38.4516211,
                lon: -107.3131561,
            },
        ],
    },

    CT: {
        description:
            'Welcome to another year at Hogwarts! I also got to see a motorbike gang come through in Hartford doing all sorts of extremely heterosexual tricks. CT seems like a great place to live, honestly. \
            Shoutout Metro North for making a boring night in New Haven fun in Manhattan.',

        defaultPhoto: 'resources/USA_Map/Pre_26/CT/CT1.jpeg',

        photos: [
            {
                id: 'yale-university-new-haven-ct',
                src: "resources/USA_Map/Pre_26/CT/CT1.jpeg",
                title: 'Yale University, New Haven, CT',
                lat: 41.3163284,
                lon: -72.924918,
            },
            {
                id: 'yale-university-new-haven-ct-2',
                src: "resources/USA_Map/Pre_26/CT/CT2.jpeg",
                title: 'Yale University, New Haven, CT',
                lat: 41.3163284,
                lon: -72.924918,
            },
            {
                id: 'yale-university-new-haven-ct-3',
                src: "resources/USA_Map/Pre_26/CT/CT3.jpeg",
                title: 'Yale University, New Haven, CT',
                lat: 41.3163284,
                lon: -72.924918,
            },
        ],
    },

    DE: {
        description:
            'Okay, but does this state REALLY exist? The Wilmington area that I saw was sketch. No pics.',

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
                id: 'howard-university-washington-dc',
                src: "resources/USA_Map/Pre_26/DC/DC3.jpeg",
                title: 'Howard University, Washington, DC',
                lat: 38.9226884,
                lon: -77.0220126,
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
            'I hate FL, honestly. It\'s the armpit of the US in every possible way. Doesn\'t mean you can\'t have fun there- I sure have. Love my family members in the state!',

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
            {
                id: 'key-west-fl',
                src: "resources/USA_Map/Pre_26/FL/FL3.jpeg",
                title: 'Key West, FL',
                lat: 24.5443577,
                lon: -81.8049875,
            },
            {
                id: 'captain-leonard-park-destin-fl',
                src: "resources/USA_Map/USA_26/FL/FL1.jpeg",
                title: 'Captain Leonard Park, Destin, FL',
                lat: 30.398213,
                lon: -86.5135273,
            },
            {
                id: 'captain-leonard-park-destin-fl-2',
                src: "resources/USA_Map/USA_26/FL/FL2.jpeg",
                title: 'Captain Leonard Park, Destin, FL',
                lat: 30.398213,
                lon: -86.5135273,
            },
            {
                id: 'clearwater-beach-clearwater-fl',
                src: "resources/USA_Map/USA_26/FL/FL3.jpeg",
                title: 'Clearwater Beach, Clearwater, FL',
                lat: 27.9775463,
                lon: -82.8292737,
            },
        ],
    },

    GA: {
        description:
            'Hey, it\'s my birth state. Land de la peach. Best state in the Southeast, so on a country-wide scale it\'s okay. Hot, humid, and lots of traffic. Expand MARTA!',

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
                src: "resources/USA_Map/Pre_26/GA/GA2.JPG",
                title: 'The Masquerade, Atlanta, GA',
                lat: 33.7517376,
                lon: -84.3905352,
            },
            {
                id: 'jekyll-island-ga',
                src: "resources/USA_Map/Pre_26/GA/GA3.JPG",
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
                src: "resources/USA_Map/Pre_26/GA/GA6.JPG",
                title: 'Gibbs Gardens, Ball Ground, GA',
                lat: 34.3786626,
                lon: -84.2828559,
            },
            {
                id: 'nowhere-bar-athens-ga',
                src: "resources/USA_Map/Pre_26/GA/GA7.JPEG",
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
            'Honestly, I\'m not huge on sleeping on islands with volcanoes on them, but I still want to visit. What\'s life without a little lava in your socks?',

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
            'I\'ve only been to Coeur d\'Alene. I was going to spend some time on Tubbs Hill but it was closed, so no pictures! Also heard some shady stuff about that city. Hope it\'s not true!',

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
            {
                id: 'michigan-ave-chicago-il',
                src: "resources/USA_Map/Pre_26/IL/IL2.jpeg",
                title: 'Michigan Ave, Chicago, IL',
                lat: 41.8880075,
                lon: -87.6244058,
            },
            {
                id: 'kennedy-rooftop-wicker-park-chicago-il',
                src: "resources/USA_Map/Pre_26/IL/IL3.jpeg",
                title: 'Kennedy Rooftop, Wicker Park, Chicago, IL',
                lat: 41.9103928,
                lon: -87.669859,
            },
            {
                id: 'kennedy-rooftop-wicker-park-chicago-il-2',
                src: "resources/USA_Map/Pre_26/IL/IL4.jpeg",
                title: 'Kennedy Rooftop, Wicker Park, Chicago, IL',
                lat: 41.9103928,
                lon: -87.669859,
            },
            {
                id: 'the-chicago-theater-chicago-il',
                src: "resources/USA_Map/Pre_26/IL/IL5.jpeg",
                title: 'The Chicago Theater, Chicago, IL',
                lat: 41.885301,
                lon: -87.6303279,
            },
            {
                id: 'superman-statue-metropolis-il',
                src: "resources/USA_Map/Pre_26/IL/IL6.jpeg",
                title: 'Superman Statue, Metropolis, IL',
                lat: 37.1522479,
                lon: -88.7352751,
            },
        ],
    },

    IN: {
        description:
            'Indiana\'s an alright state. I like Notre Dame\'s campus and the Sweetwater HQ. Windmills, fields, and whatever Gary is. Indianapolis is not that great.',

        defaultPhoto: 'resources/USA_Map/Pre_26/IN/IN1.jpeg',

        photos: [
            {
                id: 'canal-bridge-indianapolis-in',
                src: "resources/USA_Map/Pre_26/IN/IN1.jpeg",
                title: 'Canal Bridge, Indianapolis, IN',
                lat: 39.7730308,
                lon: -86.1651882,
            },
            {
                id: 'sweetwater-fort-wayne-in',
                src: "resources/USA_Map/USA_26/IN/IN1.jpeg",
                title: 'Sweetwater, Fort Wayne, IN',
                lat: 41.1243,
                lon: -85.2157484,
            },
            {
                id: 'university-of-notre-dame-notre-dame-in',
                src: "resources/USA_Map/USA_26/IN/IN2.jpeg",
                title: 'University of Notre Dame, Notre Dame, IN',
                lat: 41.1243,
                lon: -85.2157484,
            },
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
            {
                id: 'kaw-point-park-kansas-city-ks',
                src: "resources/USA_Map/USA_26/KS/KS2.jpeg",
                title: 'Kaw Point Park, Kansas City, KS',
                lat: 39.1165978,
                lon: -94.6131178,
            },
        ],
    },

    KY: {
        description:
            'I think the cities in KY are pretty lame, but I really enjoyed getting out into the homesteads with wide sweeping hills and beautiful sunsets!',

        defaultPhoto: 'resources/USA_Map/Pre_26/KY/KY1.jpeg',

        photos: [
            {
                id: 'georgetown-ky',
                src: "resources/USA_Map/Pre_26/KY/KY1.jpeg",
                title: 'Georgetown, KY',
                lat: 38.2463448,
                lon: -84.6274207,
            },
            {
                id: 'horse-shively-louisville-ky',
                src: "resources/USA_Map/Pre_26/KY/KY2.jpeg",
                title: 'Horse, Shively, Louisville, KY',
                lat: 38.1891209,
                lon: -85.8111291,
            },
            {
                id: 'columbia-ky',
                src: "resources/USA_Map/Pre_26/KY/KY3.jpeg",
                title: 'Columbia, KY',
                lat: 37.1027653,
                lon: -85.3060186,
            },
        ],
    },

    LA: {
        description:
            'This one may shock people, but I haven\'t seen anything about this state that makes me want to go on purpose. Yes, even NOLA.',

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
            'Beautiful country-side state with the best lobster rolls in the game. Saw the Eastern-most point in the US at Lubec, Bar Harbor, Bangor, and Portland. Bangor has the single worst \
            mall I\'ve ever seen. It\'s an actual horror movie set.',

        defaultPhoto: 'resources/USA_Map/USA_26/ME/ME1.jpeg',

        photos: [
            {
                id: 'portland-head-light-portland-me',
                src: "resources/USA_Map/USA_26/ME/ME1.jpeg",
                title: 'Portland Head Light, Portland, ME',
                lat: 43.6230765,
                lon: -70.2104573,
            },
            {
                id: 'quoddy-head-park-lubec-me',
                src: "resources/USA_Map/USA_26/ME/ME2.jpeg",
                title: 'Quoddy Head Park, Lubec, ME',
                lat: 44.8159979,
                lon: -66.9554052,
            },
        ],
    },

    MD: {
        description:
            'I\'ve only been through Baltimore, and it seems like a dump to be honest. Didn\'t take pics. I\'ve heard the area around DC is incredible though, so I look forward to checking that out!',

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
            'Grand Rapids was pretty quiet when I visited. Nice presential museum there for GRF, and Vertico Music has a solid collection. Traffic Cone lives on in my heart!',

        defaultPhoto: 'resources/USA_Map/Pre_26/MI/MI1.jpeg',

        photos: [
            {
                id: 'u-mich-ann-arbor-mi',
                src: "resources/USA_Map/Pre_26/MI/MI1.jpeg",
                title: 'U-Mich, Ann Arbor, Michigan',
                lat: 42.2771489,
                lon: -83.740782,
            },
            {
                id: 'traffic-cone-grand-rapids-mi',
                src: "resources/USA_Map/Pre_26/MI/MI2.jpeg",
                title: 'Traffic Cone, Grand Rapids, Michigan',
                lat: 42.9601564,
                lon: -85.6706446,
            },
            {
                id: 'gerald-ford-museum-grand-rapids-mi',
                src: "resources/USA_Map/Pre_26/MI/MI3.jpeg",
                title: 'Gerald Ford Museum, Grand Rapids, Michigan',
                lat: 42.9684184,
                lon: -85.6799446,
            },
            {
                id: 'ah-nab-awen-park-grand-rapids-mi',
                src: "resources/USA_Map/Pre_26/MI/MI4.jpeg",
                title: 'Ah-Nab-Awen Park, Grand Rapids, Michigan',
                lat: 42.9687208,
                lon: -85.6763693,
            },
        ],
    },

    MN: {
        description:
            'The twin cities are a nice hangout! Saw the beautiful Minnehaha Falls and the interesting skywalks in downtown Minneapolis. Friendly people all around.',

        defaultPhoto: 'resources/USA_Map/Pre_26/MN/MN1.jpeg',

        photos: [
            {
                id: 'city-hall-minneapolis-mn',
                src: "resources/USA_Map/Pre_26/MN/MN1.jpeg",
                title: 'City Hall, Minneapolis, MN',
                lat: 44.9772845,
                lon: -93.2680025,
            },
            {
                id: 'minnehaha-falls-minneapolis-mn',
                src: "resources/USA_Map/Pre_26/MN/MN2.jpeg",
                title: 'Minnehaha Falls, Minneapolis, MN',
                lat: 44.9153283,
                lon: -93.2316002,
            },
        ],
    },

    MS: {
        description:
            'Drove through Northern MS. Not our finest state, really. There is the titular river here, though!',

        defaultPhoto: 'resources/USA_Map/USA_26/MS/MS1.jpeg',

        photos: [
            {
                id: 'mississippi-river-lula-ms',
                src: "resources/USA_Map/USA_26/MS/MS1.jpeg",
                title: 'Mississippi River, Lula, MS',
                lat: 34.496774,
                lon: -90.5864579,
            },
        ],
    },

    MO: {
        description:
            'Really only drove through from Kansas City to the IA/MO border towards Des Moines. Didn\'t take any pics!',

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
            'Big sky! I tried to climb the College M Trail in Bozeman and quickly found out that was not going to happen!',

        defaultPhoto: 'resources/USA_Map/USA_26/MT/MT1.jpeg',

        photos: [
            {
                id: 'college-m-trailhead-bozeman-mt',
                src: "resources/USA_Map/USA_26/MT/MT1.jpeg",
                title: 'College M Trailhead, Bozeman, MT',
                lat: 45.709713,
                lon: -110.9773835,
            },
        ],
    },

    NE: {
        description:
            'Turns out the cornhusker state really does exist! I need to head out to Omaha and Lincoln some time.',

        defaultPhoto: 'resources/USA_Map/USA_26/NE/NE1.jpeg',

        photos: [
            {
                id: 'gibbon-ne',
                src: "resources/USA_Map/USA_26/NE/NE1.jpeg",
                title: 'Gibbon, NE',
                lat: 40.7055988,
                lon: -98.8463772,
            },
        ],
    },

    NV: {
        description:
            'Only been to LV, and I want to explore more of this state. One thing I found interesting is that hotels in LV can be so cheap! I found the strip to be entertaining without the gambling \
            just by walking around the best hotels I\'ve ever seen. Also had to try a Gordon Ramsay burger and c\'est magnifique!',

        defaultPhoto: 'resources/USA_Map/USA_26/NV/NV1.jpeg',

        photos: [
            {
                id: 'paris-las-vegas-las-vegas-nv',
                src: "resources/USA_Map/USA_26/NV/NV1.jpeg",
                title: 'Paris Las Vegas, Las Vegas, NV',
                lat: 36.1120597,
                lon: -115.1716518,
            },
            {
                id: 'the-venetian-las-vegas-nv',
                src: "resources/USA_Map/USA_26/NV/NV2.jpeg",
                title: 'The Ventian, Las Vegas, NV',
                lat: 36.1208902,
                lon: -115.1722118,
            },
        ],
    },

    NH: {
        description:
            'The granite state is the New England state I feel the least about. Not good or bad, it\'s just kind of there. I really want to visit the NH coastline, and I think that\'ll sort it out. \
            I drove through the north part of the state from VT to ME, then from ME to Nashua. No pics.',

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
            'The great suburb state! You either want to be in Philly or NYC and can\'t or you\'re out in the sticks living that life. Beautiful nature in central NJ!',

        defaultPhoto: 'resources/USA_Map/USA_26/NJ/NJ1.jpeg',

        photos: [
            {
                id: 'frank-sinatra-statue-hoboken-nj',
                src: "resources/USA_Map/USA_26/NJ/NJ1.jpeg",
                title: 'Frank Sinatra Statue, Hoboken, NJ',
                lat: 40.7415334,
                lon: -74.0262154,
            },
            {
                id: 'princeton-university-princeton-nj',
                src: "resources/USA_Map/USA_26/NJ/NJ2.jpeg",
                title: 'Princeton University, Princeton, NJ',
                lat: 40.3430983,
                lon: -74.6576488,
            },
            {
                id: 'empty-sky-jersey-city-nj',
                src: "resources/USA_Map/USA_26/NJ/NJ3.jpeg",
                title: 'Empty Sky, Jersey City, NJ',
                lat: 40.7082253,
                lon: -74.0375002,
            },
        ],
    },

    NM: {
        description:
            'NM has one of my favorite national parks in White Sands. Intensely quiet place with nothing but endless white powdery sand around you juxtaposed with mountains. \
            Also saw the wonderful Blue Hole in Santa Rosa. How can water that blue be in a place like this? So cool!',

        defaultPhoto: 'resources/USA_Map/USA_26/NM/NM1.jpeg',

        photos: [
            {
                id: 'white-sands-alamogordo-nm',
                src: "resources/USA_Map/USA_26/NM/NM1.jpeg",
                title: 'White Sands, Alamogordo, NM',
                lat: 32.7672333,
                lon: -106.3922367,
            },
            {
                id: 'blue-hole-santa-rosa-nm',
                src: "resources/USA_Map/USA_26/NM/NM2.jpeg",
                title: 'Blue Hole, Santa Rosa, NM',
                lat: 34.9404552,
                lon: -104.6783889,
            },
            {
                id: 'white-sands-alamogordo-nm-2',
                src: "resources/USA_Map/USA_26/NM/NM3.jpeg",
                title: 'White Sands, Alamogordo, NM',
                lat: 32.7672333,
                lon: -106.3922367,
            },
            {
                id: 'white-sands-alamogordo-nm-3',
                src: "resources/USA_Map/USA_26/NM/NM4.jpeg",
                title: 'White Sands, Alamogordo, NM',
                lat: 32.7672333,
                lon: -106.3922367,
            },
        ],
    },

    NY: {
        description:
            'Other than having the best city in the country, NY is a beautiful state I love to visit. Cornell is my favorite university campus, and I got my butt kicked \
            by the cold in the Lake Placid area, Niagara Falls, AND Albany. Meet me in Montauk!',

        defaultPhoto: 'resources/USA_Map/USA_26/NY/NY1.jpeg',

        photos: [
            {
                id: 'prospect-point-niagara-falls-ny',
                src: "resources/USA_Map/USA_26/NY/NY1.jpeg",
                title: 'Prospect Point, Niagara Falls, NY',
                lat: 43.0861739,
                lon: -79.0666261,
            },
            {
                id: 'city-hall-manhattan-ny',
                src: "resources/USA_Map/USA_26/NY/NY2.jpeg",
                title: 'City Hall, Manhattan, NY',
                lat: 40.7127543,
                lon: -74.0085514,
            },
            {
                id: 'ny-state-capitol-albany-ny',
                src: "resources/USA_Map/USA_26/NY/NY3.jpeg",
                title: 'NY State Capitol, Albany, NY',
                lat: 42.6527759,
                lon: -73.7598137,
            },
            {
                id: 'montauk-long-island-ny',
                src: "resources/USA_Map/USA_26/NY/NY4.jpeg",
                title: 'Montauk, Long Island, NY',
                lat: 41.0331404,
                lon: -71.941355,
            },
            {
                id: 'one-world-trade-center-new-york-ny',
                src: "resources/USA_Map/Pre_26/NY/NY1.jpeg",
                title: 'One World Trade Center, Manhattan, NY',
                lat: 40.7129987,
                lon: -74.0157359,
            },
            {
                id: 'cornell-university-ithaca-ny',
                src: "resources/USA_Map/Pre_26/NY/NY2.JPG",
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
            'From the scenic drive up to the Smokies to the beaches by Wilmington, it\'s NC, and it\'s pretty. I once volunteered with a wounded veterans group in this state when I was a wee lad. \
            One of these days I\'ll make it out to the Outer Banks area!',

        defaultPhoto: 'resources/USA_Map/Pre_26/NC/NC1.jpeg',

        photos: [
            {
                id: 'newfound-gap-nc',
                src: "resources/USA_Map/Pre_26/NC/NC1.JPEG",
                title: 'Newfound Gap, NC',
                lat: 35.6110072,
                lon: -83.4273824,
            },
            {
                id: 'wrightsville-beach-nc',
                src: "resources/USA_Map/Pre_26/NC/NC2.jpeg",
                title: 'Wrightsville Beach, NC',
                lat: 34.20663,
                lon: -77.796299,
            },
        ],
    },

    ND: {
        description:
            'Do I really need to explain why I\'m not in a hurry to check this state off the list?',

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
            'Cincinatti suprised me with how happening it seems to be. Great water access there looking awesome at night. Columbus was pretty meh. \
            I stayed with someone who had something like 15 siblings in greater columbus and they all lived in a massive trailer! How do you keep up with them all?',

        defaultPhoto: 'resources/USA_Map/Pre_26/OH/OH1.jpeg',

        photos: [
            {
                id: 'smale-riverfront-park-cincinatti-oh',
                src: "resources/USA_Map/Pre_26/OH/OH1.jpeg",
                title: 'Smale Riverfront Park, Cincinnati, OH',
                lat: 39.0952531,
                lon: -84.5121271,
            },
            {
                id: 'worlds-largest-gavel-columbus-oh',
                src: "resources/USA_Map/Pre_26/OH/OH2.jpeg",
                title: 'World\'s Largest Gavel, Columbus, OH',
                lat: 39.9596088,
                lon: -83.0026422,
            },
        ],
    },

    OK: {
        description:
            'OKC has a lovely botanical garden downtown and place to walk around it and take in some views of the architecture in a pretty quiet spot. Happy I stopped in!',

        defaultPhoto: 'resources/USA_Map/USA_26/OK/OK1.jpeg',

        photos: [
            {
                id: 'myriad-botanical-gardens-oklahoma-city-ok',
                src: "resources/USA_Map/USA_26/OK/OK1.jpeg",
                title: 'Myriad Botanical Gardens, Oklahoma City, OK',
                lat: 35.4653354,
                lon: -97.5204822,
            },
        ],
    },

    OR: {
        description:
            'Just look at Crater Lake in the Winter. Just wow, right?! Portland is also one of my favorite cities in the West. Shoutout Mt Tabor and NW 21st!',

        defaultPhoto: 'resources/USA_Map/USA_26/OR/OR1.jpeg',

        photos: [
            {
                id: 'crater-lake-or',
                src: "resources/USA_Map/USA_26/OR/OR1.jpeg",
                title: 'Crater Lake, OR',
                lat: 42.9359811,
                lon: -122.3003609,
            },
            {
                id: 'multnomah-falls-portland-or',
                src: "resources/USA_Map/USA_26/OR/OR2.jpeg",
                title: 'Multnomah Falls, Portland, OR',
                lat: 45.5761989,
                lon: -122.1183112,
            },
            {
                id: 'haystack-rock-cannon-beach-or',
                src: "resources/USA_Map/USA_26/OR/OR3.jpeg",
                title: 'Haystack Rock, Cannon Beach, OR',
                lat: 45.885024,
                lon: -123.980326,
            },
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
            {
                id: 'fairmount-trail-by-schulkill-philadelphia-pa',
                src: "resources/USA_Map/USA_26/PA/PA1.jpeg",
                title: 'Fairmount Trail by Schuylkill, Philadelpia, PA',
                lat: 39.9675765,
                lon: -75.1833219,
            },
            {
                id: 'grandview-overlook-mount-washington-pittsburgh-pa',
                src: "resources/USA_Map/USA_26/PA/PA2.jpeg",
                title: 'Grandview Overlook, Mount Washington, Pittsburgh, PA',
                lat: 40.4319277,
                lon: -80.0082603,
            },
            {
                id: 'st-mary-of-the-mount-mount-washington-pittsburgh-pa',
                src: "resources/USA_Map/USA_26/PA/PA3.jpeg",
                title: 'St. Mary of the Mount, Mount Washington, Pittsburgh, PA',
                lat: 40.4346223,
                lon: -80.0123836,
            },
        ],
    },

    RI: {
        description:
            'To be honest, I didn\'t think Providence was that great when I visited, but Newport is Newport. Beautiful town, beach area, and the rich people to go with it. You can feel the money there.',

        defaultPhoto: 'resources/USA_Map/USA_26/RI/RI1.jpeg',

        photos: [
            {
                id: 'brenton-point-newport-ri',
                src: "resources/USA_Map/USA_26/RI/RI1.jpeg",
                title: 'Brenton Point, Newport, RI',
                lat: 41.4491537,
                lon: -71.3555098,
            },
        ],
    },

    SC: {
        description:
            'SC beaches are pretty good, and Greenville and Charleston are decent Southern cities. Most of the interior is boring and hot. Nothing really wowed me.',

        defaultPhoto: 'resources/USA_Map/USA_26/SC/SC1.jpeg',

        photos: [
            {
                id: 'myrtle-beach-sc',
                src: "resources/USA_Map/USA_26/SC/SC1.jpeg",
                title: 'Myrtle Beach, SC',
                lat: 33.6928772,
                lon: -78.8779777,
            },
            {
                id: 'charleston-sc',
                src: "resources/USA_Map/USA_26/SC/SC2.jpeg",
                title: 'Charleston, SC',
                lat: 32.7781372,
                lon: -79.9252766,
            },
            {
                id: 'falls-park-greenville-sc',
                src: "resources/USA_Map/USA_26/SC/SC3.jpeg",
                title: 'Falls Park, Greenville, SC',
                lat: 34.8449794,
                lon: -82.4013437,
            },
            {
                id: 'coligny-beach-park-hilton-head-sc',
                src: "resources/USA_Map/Pre_26/SC/SC1.jpeg",
                title: 'Coligny Beach Park, Hilton Head, SC',
                lat: 32.1415862,
                lon: -80.7513721,
            },
        ],
    },

    SD: {
        description:
            'Badlands is here and it\'s one of my favorite parks. It\'s like being on another planet! Mount Rushmore is definitely a sight to see that felt so much more massive than I thought in person. \
            Then there\'s the million signs for Wall Drug in between. Maybe I\'ll check it out next time!',

        defaultPhoto: 'resources/USA_Map/USA_26/SD/SD1.jpeg',

        photos: [
            {
                id: 'mount-rushmore-keystone-sd',
                src: "resources/USA_Map/USA_26/SD/SD1.jpeg",
                title: 'Mount Rushmore, Keystone, SD',
                lat: 43.8802725,
                lon: -103.4639519,
            },
            {
                id: 'badlands-wall-sd',
                src: "resources/USA_Map/USA_26/SD/SD2.jpeg",
                title: 'Badlands, Wall, SD',
                lat: 43.856924,
                lon: -102.3669123,
            },
            {
                id: 'badlands-wall-sd-2',
                src: "resources/USA_Map/USA_26/SD/SD3.jpeg",
                title: 'Badlands, Wall, SD',
                lat: 43.856924,
                lon: -102.3669123,
            },
        ],
    },

    TN: {
        description:
            'When I was first driving, I used to drive to the TN/GA state line around 3AM to get away. TN is a beautiful place and I have a lot of special memories from there. \
            The world will never forget Jeffrey the bear in Gatlinburg!',

        defaultPhoto: 'resources/USA_Map/USA_26/TN/TN1.png',

        photos: [
            {
                id: 'smoky-mountain-cabin-sevierville-tn',
                src: "resources/USA_Map/USA_26/TN/TN1.PNG",
                title: 'Smoky Mountain Cabin, Sevierville, TN',
                lat: 35.7843388,
                lon: -83.4828269,
            },
            {
                id: 'newfound-gap-tn',
                src: "resources/USA_Map/Pre_26/TN/TN1.jpg",
                title: 'Newfound Gap, TN',
                lat: 35.6121614,
                lon: -83.4242242,
            },
            {
                id: 'morton-overlook-tn',
                src: "resources/USA_Map/Pre_26/TN/TN2.jpeg",
                title: 'Morton Overlook, TN',
                lat: 35.6170557,
                lon: -83.4221645,
            },
            {
                id: 'riverfront-chattanooga-tn',
                src: "resources/USA_Map/Pre_26/TN/TN3.jpeg",
                title: 'Riverfront, Chattanooga, TN',
                lat: 35.0568621,
                lon: -85.3103083,
            },
            {
                id: 'broadway-nashville-tn',
                src: "resources/USA_Map/Pre_26/TN/TN4.jpg",
                title: 'Broadway, Nashville, TN',
                lat: 36.1600412,
                lon: -86.7792871,
            },
        ],
    },

    TX: {
        description:
            'I\'ve only been to the West TX panhandle, so my experience with the lone star has been flat and meh. Best Texas Roadhouse I\'ve ever had though, almost like they\'re from here!',

        defaultPhoto: 'resources/USA_Map/USA_26/TX/TX1.jpeg',

        photos: [
            {
                id: 'amarillo-tx',
                src: "resources/USA_Map/USA_26/TX/TX1.jpeg",
                title: 'Amarillo, TX',
                lat: 35.1911394,
                lon: -101.9391097,
            },
        ],
    },

    UT: {
        description:
            'Southern UT is a portal to another planet and no one can convince me otherwise. Strange beauty everywhere!',

        defaultPhoto: 'resources/USA_Map/USA_26/UT/UT1.jpeg',

        photos: [
            {
                id: 'arches-moab-ut',
                src: "resources/USA_Map/USA_26/UT/UT1.jpeg",
                title: 'Arches, Moab, UT',
                lat: 38.7319874,
                lon: -109.750445,
            },
            {
                id: 'checkerboard-mesa-orderville-ut',
                src: "resources/USA_Map/USA_26/UT/UT2.jpeg",
                title: 'Checkerboard Mesa, Oderville, UT',
                lat: 37.2327923,
                lon: -112.8801181,
            },
            {
                id: 'north-window-arch-arches-moab-ut',
                src: "resources/USA_Map/USA_26/UT/UT3.jpeg",
                title: 'North Window Arch, Arches, Moab, UT',
                lat: 38.6857158,
                lon: -109.5377,
            },
            {
                id: 'grand-view-point-canyonlands-moab-ut',
                src: "resources/USA_Map/USA_26/UT/UT4.jpeg",
                title: 'Grand View Point, Canyonlands, Moab, UT',
                lat: 38.3103279,
                lon: -109.8571299,
            },
            {
                id: 'upheaval-dome-canyonlands-moab-ut',
                src: "resources/USA_Map/USA_26/UT/UT5.jpeg",
                title: 'Upheaval Dome, Canyonlands, Moab, UT',
                lat: 38.4288592,
                lon: -109.9293068,
            },
        ],
    },

    VT: {
        description:
            'I enjoyed driving through the country-side of VT through Burlington, Montpelier, and into NH. I had a fun experience at the South Burlington Inn I stayed at where \
            some guy had a fight with his lady who threatened to call the cops on him if he didn\'t leave. Also forgot my cheese there. Yay, VT!',

        defaultPhoto: 'resources/USA_Map/USA_26/VT/VT1.jpeg',

        photos: [
            {
                id: 'lake-champlain-oakledge-park-burlington-vt',
                src: "resources/USA_Map/USA_26/VT/VT1.jpeg",
                title: 'Lake Champlain, Oakledge Park, Burlington, VT',
                lat: 44.4554247,
                lon: -73.2274618,
            },
        ],
    },

    VA: {
        description:
            'Saw the changing of guard at the Tomb of the Unknown Soldier as well as the beautiful Arlington National Cemetery here in VA. Also went to VA Beach, and it\'s nothing special in my opinion. \
            Western VA through the mountains is gorgeous though!',

        defaultPhoto: 'resources/USA_Map/Pre_26/VA/VA1.jpeg',

        photos: [
            {
                id: 'arlington-national-cemetery-arlington-va',
                src: "resources/USA_Map/Pre_26/VA/VA1.jpeg",
                title: 'Arlington National Cemetery, Arlington, VA',
                lat: 38.8770149,
                lon: -77.070815,
            },
            {
                id: 'the-pentagon-washington-va',
                src: "resources/USA_Map/Pre_26/VA/VA2.jpeg",
                title: 'The Pentagon, Washington, VA',
                lat: 38.8709914,
                lon: -77.0585266,
            },
            {
                id: 'marine-corps-war-memorial-arlington-va',
                src: "resources/USA_Map/Pre_26/VA/VA3.jpeg",
                title: 'Marine Corps War Memorial, Arlington, VA',
                lat: 38.8903754,
                lon: -77.0697937,
            },
            {
                id: 'virginia-beach-va',
                src: "resources/USA_Map/USA_26/VA/VA1.jpeg",
                title: 'Virgina Beach, VA',
                lat: 36.8532106,
                lon: -75.9750931,
            },
        ],
    },

    WA: {
        description:
            'I found the Chris Cornell statue and the Cobain bench here in Seattle. It\'s one of my favorite cities in the country. Walkable, weather I like, Pike Place, and the Needle. Love, love, love! \
            Olympic is incredible, too, as are the beaches in WA. Great nature hub!',

        defaultPhoto: 'resources/USA_Map/USA_26/WA/WA1.jpeg',

        photos: [
            {
                id: 'space-needle-seattle-wa',
                src: "resources/USA_Map/USA_26/WA/WA1.jpeg",
                title: 'Space Needle, Seattle, WA',
                lat: 47.6205099,
                lon: -122.3518523,
            },
            {
                id: 'volunteer-park-seattle-wa',
                src: "resources/USA_Map/USA_26/WA/WA2.jpeg",
                title: 'Volunteer Park, Seattle, WA',
                lat: 47.6310872,
                lon: -122.3189543,
            },
            {
                id: 'ruby-beach-forks-wa',
                src: "resources/USA_Map/USA_26/WA/WA3.jpeg",
                title: 'Ruby Beach, Forks, WA',
                lat: 47.7108799,
                lon: -124.4205522,
            },
            {
                id: 'ruby-beach-forks-wa-2',
                src: "resources/USA_Map/USA_26/WA/WA4.jpeg",
                title: 'Ruby Beach, Forks, WA',
                lat: 47.7108799,
                lon: -124.4205522,
            },
        ],
    },

    WV: {
        description:
            'I\'ve driven through this state a handful of times, and it\'s always a highlight. Mountain Mama, indeed! No pics yet, though.',

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
            {
                id: 'milwaukee-art-museum-milwaukee-wi',
                src: "resources/USA_Map/Pre_26/WI/WI2.jpeg",
                title: 'Milwaukee Art Museum, Milwaukee, WI',
                lat: 43.0400765,
                lon: -87.8996329,
            },
            {
                id: 'wisconsin-state-capitol-madison-wi',
                src: "resources/USA_Map/Pre_26/WI/WI3.jpeg",
                title: 'Wisconsin State Capitol, Madison, WI',
                lat: 43.0747047,
                lon: -89.386724,
            },
            {
                id: 'wisconsin-dells-wi',
                src: "resources/USA_Map/Pre_26/WI/WI4.jpeg",
                title: 'Wisconsin Dells, WI',
                lat: 43.6287182,
                lon: -89.7766763,
            },
            {
                id: 'lake-michigan-milwaukee-wi',
                src: "resources/USA_Map/Pre_26/WI/WI5.jpeg",
                title: 'Lake Michigan, Milwaukee, WI',
                lat: 43.0584679,
                lon: -87.8756789,
            },
            {
                id: 'uw-madison-arboretum-madison-wi',
                src: "resources/USA_Map/Pre_26/WI/WI6.jpeg",
                title: 'UW-Madison Arboretum, Madison, WI',
                lat: 43.0428748,
                lon: -89.4268954,
            },
            {
                id: 'spring-harbor-park-madison-wi',
                src: "resources/USA_Map/Pre_26/WI/WI7.jpeg",
                title: 'Spring Harbor Park, Madison, WI',
                lat: 43.0827732,
                lon: -89.4697603,
            },
            {
                id: 'spring-harbor-apartments-madison-wi',
                src: "resources/USA_Map/Pre_26/WI/WI8.jpeg",
                title: 'Spring Harbor Apartments, Madison, WI',
                lat: 43.0831198,
                lon: -89.4748928,
            },
        ],
    },

    WY: {
        description:
            'I\'ll make it out to Yellowstone soon, it was closed when I drove through last. WY is one of those places that moves like molasses around the towns, sparsely populated, and has wind \
            that can give you wings. I had to pry my car door open at Buffalo Bill State Park in Cody. Beautiful nature state!',

        defaultPhoto: 'resources/USA_Map/USA_26/WY/WY1.jpeg',

        photos: [
            {
                id: 'buffalo-bill-park-cody-wy',
                src: "resources/USA_Map/USA_26/WY/WY1.jpeg",
                title: 'Buffalo Bill Park, Cody, WY',
                lat: 44.5029669,
                lon: -109.2443245,
            },
            {
                id: 'vista-point-ten-sleep-wy',
                src: "resources/USA_Map/USA_26/WY/WY2.jpeg",
                title: 'Vista Point, Ten Sleep, WY',
                lat: 44.1088828,
                lon: -107.2719057,
            },
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
                                Hello, {STATE_NAMES[selectedState]}!
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