const profiles = [
  {
    id: 1,
    name: 'John Doe',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    description: 'Software Engineer with 5 years of experience in web development.',
    address: {
      street: '123 Tech Street',
      city: 'San Francisco',
      state: 'CA',
      zipcode: '94105',
      coordinates: {
        longitude: -122.4194,
        latitude: 37.7749
      }
    },
    contact: {
      email: 'john.doe@example.com',
      phone: '(555) 123-4567'
    },
    interests: ['Coding', 'Hiking', 'Photography']
  },
  {
    id: 2,
    name: 'Jane Smith',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    description: 'Product Manager specializing in SaaS products.',
    address: {
      street: '456 Market Ave',
      city: 'New York',
      state: 'NY',
      zipcode: '10001',
      coordinates: {
        longitude: -73.9857,
        latitude: 40.7484
      }
    },
    contact: {
      email: 'jane.smith@example.com',
      phone: '(555) 987-6543'
    },
    interests: ['Product Strategy', 'UX Design', 'Reading']
  },
  {
    id: 3,
    name: 'Michael Johnson',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    description: 'Data Scientist with expertise in machine learning algorithms.',
    address: {
      street: '789 Data Drive',
      city: 'Seattle',
      state: 'WA',
      zipcode: '98101',
      coordinates: {
        longitude: -122.3321,
        latitude: 47.6062
      }
    },
    contact: {
      email: 'michael.johnson@example.com',
      phone: '(555) 456-7890'
    },
    interests: ['Machine Learning', 'Big Data', 'Chess']
  },
  {
    id: 4,
    name: 'Emily Brown',
    photo: 'https://randomuser.me/api/portraits/women/4.jpg',
    description: 'UI/UX Designer with a passion for creating beautiful user experiences.',
    address: {
      street: '321 Design Blvd',
      city: 'Austin',
      state: 'TX',
      zipcode: '78701',
      coordinates: {
        longitude: -97.7431,
        latitude: 30.2672
      }
    },
    contact: {
      email: 'emily.brown@example.com',
      phone: '(555) 234-5678'
    },
    interests: ['UI Design', 'Sketching', 'Travel']
  },
  {
    id: 5,
    name: 'David Wilson',
    photo: 'https://randomuser.me/api/portraits/men/5.jpg',
    description: 'Full Stack Developer specializing in React and Node.js.',
    address: {
      street: '654 Code Court',
      city: 'Chicago',
      state: 'IL',
      zipcode: '60601',
      coordinates: {
        longitude: -87.6298,
        latitude: 41.8781
      }
    },
    contact: {
      email: 'david.wilson@example.com',
      phone: '(555) 876-5432'
    },
    interests: ['JavaScript', 'Open Source', 'Basketball']
  }
];

export default profiles;
