import { NextApiRequest, NextApiResponse } from 'next';

export interface Destination {
  id: number;
  country: string;
  description: string;
  price_per_person: number;
  duration: string;
  image:string;
  hotel: {
    name: string;
    stars: number;
  };
}

const destinationsData : { destinations: Destination[] }= {
    destinations: [
      {
        id: 1,
        country: "Italy",
        description: "Experience the rich culture and history of Italy, from the ancient ruins of Rome to the picturesque canals of Venice.",
        price_per_person: 1500,
        duration: "7 days / 6 nights",
        image:"https://cdn.kimkim.com/files/a/images/55d7ea8718fda7b5b1c4c3a68f239c128e5b29a6/original-3e27ca9d22872719551bce400ed6a7db.jpg",
        hotel: {
          name: "Grand Hotel Excelsior",
          stars: 5
        }
      },
     {
        id: 2,
        country: "France",
        description: "Explore the romantic streets of Paris, visit the stunning French Riviera, and indulge in gourmet cuisine.",
        price_per_person: 1800,
        duration: "8 days / 7 nights",
        image:"https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
        hotel: {
          name: "Hotel Plaza Athenee",
          stars: 5
        }
      },
      {
        id: 3,
        country: "Japan",
        description: "Discover the unique blend of tradition and modernity in Japan, from bustling Tokyo to serene Kyoto.",
        price_per_person: 2200,
        duration: "10 days / 9 nights",
        image:"https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
        hotel: {
          name: "Park Hyatt Tokyo",
          stars: 5
        }
      },
      {
        id: 4,
        country: "Thailand",
        description: "Relax on the pristine beaches of Phuket, explore ancient temples, and indulge in Thai cuisine.",
        price_per_person: 1200,
        duration: "5 days / 4 nights",
        image:"https://media.timeout.com/images/105240236/image.jpg",
        hotel: {
          name: "Banyan Tree Phuket",
          stars: 5
        }
      },
      {
        id: 5,
        country: "Greece",
        description: "Experience the beauty of Greece with its ancient ruins, stunning beaches, and delicious Mediterranean cuisine.",
        price_per_person: 1600,
        duration: "7 days / 6 nights",
        image: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2021/06/02/20/istock-833264986.jpg",
        hotel: {
          name: "Grand Resort Lagonissi",
          stars: 5
        }
      },
      {
        id: 6,
        country: "Australia",
        description: "Explore the diverse landscapes of Australia, from the iconic Sydney Opera House to the breathtaking Great Barrier Reef.",
        price_per_person: 2500,
        duration: "12 days / 11 nights",
        image: "https://www.planetware.com/photos-large/AUS/australia-beautiful-places-sydney-harbour.jpg",
        hotel: {
          name: "Sydney Harbour Marriott Hotel",
          stars: 5
        }
      },
      {
        id: 7,
        country: "Peru",
        description: "Discover the ancient ruins of Machu Picchu, explore the vibrant city of Lima, and taste traditional Peruvian cuisine.",
        price_per_person: 2000,
        duration: "9 days / 8 nights",
        image: "https://www.peru.travel/Contenido/AcercaDePeru/Imagen/en/6/0.0/Principal/Machu%20Picchu.jpg",
        hotel: {
          name: "Belmond Sanctuary Lodge",
          stars: 5
        }
      },
      {
        id: 8,
        country: "New Zealand",
        description: "Experience the natural beauty of New Zealand, from the stunning fjords of Milford Sound to the geothermal wonders of Rotorua.",
        price_per_person: 2300,
        duration: "10 days / 9 nights",
        image: "https://www.planetware.com/wpimages/2020/02/new-zealand-in-pictures-beautiful-places-to-photograph-milford-sound.jpg",
        hotel: {
          name: "Hilton Lake Taupo",
          stars: 4
        }
      }
    ]
  };

  export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(destinationsData);
  }