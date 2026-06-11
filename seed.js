const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

const products = [
  {
    name: 'T-Shirts with multiple colors, for men and lady',
    price: 10.30,
    originalPrice: 15.00,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=600',
    ],
    description: 'High quality cotton t-shirts available in multiple colors. Perfect for casual wear, suitable for men and women. Breathable fabric for all-day comfort.',
    category: 'Clothes and wear',
    brand: 'Artel Market',
    stock: 150,
    sold: 320,
    rating: 7.5,
    numReviews: 3,
    featured: true,
    tags: ['t-shirt', 'clothing', 'fashion', 'casual'],
    reviews: [
      { name: 'John D.', rating: 4, comment: 'Great quality for the price!' },
      { name: 'Sarah M.', rating: 4, comment: 'Colors are vibrant and material is soft.' },
      { name: 'Ali K.', rating: 4, comment: 'Good fit and fast shipping.' },
    ],
  },
  {
    name: 'Samsung Galaxy S23 Ultra 256GB',
    price: 899.99,
    originalPrice: 1099.99,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1612810806563-4cb8a3b06e5b?auto=format&fit=crop&q=80&w=600',
    ],
    description: 'The Samsung Galaxy S23 Ultra features a 200MP camera, built-in S Pen, Snapdragon 8 Gen 2, and a 5000mAh battery. The ultimate Android flagship experience.',
    category: 'Computer and tech',
    brand: 'Samsung',
    stock: 45,
    sold: 89,
    rating: 4.8,
    numReviews: 2,
    featured: true,
    tags: ['smartphone', 'samsung', 'android', 'tech'],
  },
  {
    name: 'Apple iPhone 15 Pro Max 512GB Natural Titanium',
    price: 1199.00,
    originalPrice: 1299.00,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600',
    ],
    description: 'iPhone 15 Pro Max with titanium design, A17 Pro chip, 48MP camera system, USB 3.0 speeds and Action Button. The most powerful iPhone ever.',
    category: 'Computer and tech',
    brand: 'Apple',
    stock: 30,
    sold: 120,
    rating: 4.9,
    numReviews: 1,
    featured: true,
    tags: ['iphone', 'apple', 'smartphone', 'ios'],
  },
  {
    name: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
    price: 279.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
    ],
    description: 'Industry-leading noise cancellation with 30 hours battery life, Multipoint connection and clear hands-free calling. The best over-ear headphones.',
    category: 'Computer and tech',
    brand: 'Sony',
    stock: 80,
    sold: 200,
    rating: 4.7,
    numReviews: 2,
    featured: true,
    tags: ['headphones', 'sony', 'audio', 'wireless'],
  },
  {
    name: 'Apple MacBook Pro 14" M3 Pro Chip 512GB SSD',
    price: 1999.00,
    originalPrice: 2199.00,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600',
    ],
    description: 'MacBook Pro features the M3 Pro chip, Liquid Retina XDR display, 18-hour battery life, and superfast unified memory. Built for professionals.',
    category: 'Computer and tech',
    brand: 'Apple',
    stock: 25,
    sold: 55,
    rating: 4.9,
    numReviews: 1,
    featured: false,
    tags: ['macbook', 'laptop', 'apple', 'macos'],
  },
  {
    name: 'Men\'s Running Shoes - Lightweight Athletic',
    price: 65.50,
    originalPrice: 90.00,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=600',
    ],
    description: 'Lightweight breathable mesh upper with cushioned midsole. Ideal for running, gym, and everyday casual wear. Available in multiple sizes and colors.',
    category: 'Sports and outdoor',
    brand: 'Nike',
    stock: 200,
    sold: 450,
    rating: 4.6,
    numReviews: 2,
    featured: false,
    tags: ['shoes', 'running', 'sports', 'athletic'],
  },
  {
    name: 'Luxury Leather Sofa Set - 3+2+1 Seater',
    price: 1450.00,
    originalPrice: 1800.00,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600',
    ],
    description: 'Premium genuine leather sofa set with solid wood frame. Extra comfort foam cushions, easy to clean, and built to last for years. Available in black and brown.',
    category: 'Home interiors',
    brand: 'HomeComfort',
    stock: 10,
    sold: 25,
    rating: 4.5,
    numReviews: 1,
    featured: true,
    tags: ['sofa', 'furniture', 'home', 'living room'],
  },
  {
    name: 'GoPro HERO12 Black Action Camera',
    price: 349.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&q=80&w=600',
    ],
    description: 'HERO12 Black features 5.3K video, HyperSmooth 6.0 stabilization, waterproof to 33ft, and 2.7x longer battery. Perfect for action adventures.',
    category: 'Computer and tech',
    brand: 'GoPro',
    stock: 60,
    sold: 110,
    rating: 4.7,
    numReviews: 2,
    featured: false,
    tags: ['camera', 'action camera', 'gopro', 'adventure'],
  },
  {
    name: 'Men\'s Business Formal Suit - Slim Fit',
    price: 180.00,
    originalPrice: 250.00,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600',
    ],
    description: 'Classic slim-fit two-piece business suit in premium wool blend. Perfect for office, meetings, events and formal occasions. Available sizes 36-52.',
    category: 'Clothes and wear',
    brand: 'FormalWear Co.',
    stock: 60,
    sold: 180,
    rating: 4.4,
    numReviews: 1,
    featured: false,
    tags: ['suit', 'formal', 'men', 'business'],
  },
  {
    name: 'Smart Watch Fitness Tracker - GPS & Heart Rate',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1546868891-fb45942470c6?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1546868891-fb45942470c6?auto=format&fit=crop&q=80&w=600',
    ],
    description: 'Smartwatch with GPS, continuous heart rate monitor, SpO2, 7-day battery, 5ATM water resistance, and 100+ workout modes. iOS & Android compatible.',
    category: 'Computer and tech',
    brand: 'FitPro',
    stock: 120,
    sold: 350,
    rating: 4.3,
    numReviews: 2,
    featured: true,
    tags: ['smartwatch', 'fitness', 'wearable', 'health'],
  },
  {
    name: 'Professional DSLR Camera - Canon EOS 4000D',
    price: 449.00,
    originalPrice: 550.00,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600',
    ],
    description: '24.1MP APS-C sensor, Full HD video, built-in wifi, lightweight body with EF-S 18-55mm IS II kit lens. Great for beginners and enthusiasts.',
    category: 'Computer and tech',
    brand: 'Canon',
    stock: 35,
    sold: 70,
    rating: 4.6,
    numReviews: 1,
    featured: false,
    tags: ['camera', 'dslr', 'photography', 'canon'],
  },
  {
    name: 'Women\'s Elegant Floral Summer Dress',
    price: 34.99,
    originalPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600',
    ],
    description: 'Lightweight floral chiffon sundress with V-neck and adjustable straps. Perfect for summer outings, casual days, and beach events. Sizes XS-3XL.',
    category: 'Clothes and wear',
    brand: 'FashionHub',
    stock: 180,
    sold: 500,
    rating: 4.5,
    numReviews: 2,
    featured: false,
    tags: ['dress', 'women', 'summer', 'fashion'],
  },
  {
    name: 'Outdoor Camping Tent - 4 Person Waterproof',
    price: 129.99,
    originalPrice: 180.00,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=600',
    ],
    description: '4-person tent with dual-layer waterproof design, quick setup poles, mesh ventilation and carry bag. Rated for 3-season use. UV protection included.',
    category: 'Sports and outdoor',
    brand: 'OutdoorPro',
    stock: 45,
    sold: 95,
    rating: 4.4,
    numReviews: 1,
    featured: false,
    tags: ['tent', 'camping', 'outdoor', 'hiking'],
  },
  {
    name: 'Kitchen Stand Mixer - 5.5 Qt Professional',
    price: 299.00,
    originalPrice: 380.00,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    ],
    description: '5.5-quart tilt-head mixer with 10-speed settings, dough hook, flat beater, and wire whip. Handles everything from cookies to bread with ease.',
    category: 'Home interiors',
    brand: 'KitchenAid',
    stock: 20,
    sold: 60,
    rating: 4.8,
    numReviews: 1,
    featured: false,
    tags: ['mixer', 'kitchen', 'cooking', 'appliance'],
  },
  {
    name: 'Wireless Gaming Mouse - RGB Backlit 7200 DPI',
    price: 45.00,
    originalPrice: 65.00,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=600',
    ],
    description: 'Ergonomic wireless gaming mouse with 7200 DPI sensor, 7 programmable buttons, RGB lighting, 50-hour battery life. Compatible with PC and Mac.',
    category: 'Computer and tech',
    brand: 'Logitech',
    stock: 100,
    sold: 300,
    rating: 4.5,
    numReviews: 2,
    featured: false,
    tags: ['mouse', 'gaming', 'wireless', 'rgb'],
  },
  {
    name: 'Yoga Mat Non-Slip 6mm Extra Thick',
    price: 29.99,
    originalPrice: 45.00,
    image: 'https://images.unsplash.com/photo-1601925228809-85c1562de4e4?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1601925228809-85c1562de4e4?auto=format&fit=crop&q=80&w=600',
    ],
    description: 'Premium 6mm thick non-slip yoga mat with alignment lines, moisture-wicking surface, and carry strap. For yoga, pilates, and floor exercises.',
    category: 'Sports and outdoor',
    brand: 'FitLife',
    stock: 200,
    sold: 400,
    rating: 4.5,
    numReviews: 2,
    featured: false,
    tags: ['yoga', 'mat', 'fitness', 'exercise'],
  },
  {
    name: 'Stylish Office Desk with Drawer - Wood & Steel',
    price: 220.00,
    originalPrice: 280.00,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=600',
    ],
    description: 'Modern home office desk with 2 drawers, cable management holes, and adjustable feet. Made from scratch-resistant MDF board with steel legs.',
    category: 'Home interiors',
    brand: 'ModernHome',
    stock: 30,
    sold: 50,
    rating: 4.3,
    numReviews: 1,
    featured: false,
    tags: ['desk', 'office', 'furniture', 'home'],
  },
  {
    name: 'Men\'s Waterproof Winter Jacket - Fleece Lined',
    price: 95.00,
    originalPrice: 140.00,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600',
    ],
    description: 'Waterproof and windproof winter jacket with fleece-lined interior, adjustable hood, and multiple pockets. Keeps you warm down to -15°C.',
    category: 'Clothes and wear',
    brand: 'NorthPeak',
    stock: 75,
    sold: 190,
    rating: 4.6,
    numReviews: 2,
    featured: false,
    tags: ['jacket', 'winter', 'men', 'outdoor'],
  },
  {
    name: 'AirPods Pro 2nd Generation with MagSafe',
    price: 229.00,
    originalPrice: 249.00,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=600',
    ],
    description: 'AirPods Pro with Active Noise Cancellation, Transparency mode, Adaptive Audio, and Personalized Spatial Audio. H2 chip enables even more powerful performance.',
    category: 'Computer and tech',
    brand: 'Apple',
    stock: 60,
    sold: 250,
    rating: 4.8,
    numReviews: 2,
    featured: true,
    tags: ['airpods', 'earbuds', 'apple', 'wireless'],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@ecommerce.com',
      password: 'Admin@1234',
      isAdmin: true,
    });
    console.log('Created admin:', admin.email);

    // Create regular user
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'John@1234',
      isAdmin: false,
    });
    console.log('Created user:', user.email);

    // Seed products with user reference for reviews
    const productsWithUser = products.map(p => ({
      ...p,
      reviews: (p.reviews || []).map(r => ({ ...r, user: user._id })),
    }));
    await Product.insertMany(productsWithUser);
    console.log(`Seeded ${productsWithUser.length} products`);

    console.log('\n✅ Database seeded successfully!');
    console.log('Admin: admin@ecommerce.com / Admin@1234');
    console.log('User:  john@example.com / John@1234');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seed();
