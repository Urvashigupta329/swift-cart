import productModel from '../models/productModel.js';

const initialProducts = [
    {
        name: "Women Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 100,
        images: ["http://localhost:4000/images/p_img1.png"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestseller: true
    },
    {
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A premium pure cotton t-shirt tailored for all-day comfort and breathability with a classic relaxed fit.",
        price: 200,
        images: [
            "http://localhost:4000/images/p_img2_1.png",
            "http://localhost:4000/images/p_img2_2.png",
            "http://localhost:4000/images/p_img2_3.png",
            "http://localhost:4000/images/p_img2_4.png"
        ],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: true
    },
    {
        name: "Girls Round Neck Cotton Top",
        description: "Comfortable and colorful cotton top designed for everyday fun, outdoor play, and school events.",
        price: 220,
        images: ["http://localhost:4000/images/p_img3.png"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "L", "XL"],
        date: 1716234545448,
        bestseller: true
    },
    {
        name: "Men Slim Fit Cotton T-shirt",
        description: "Modern athletic cut crewneck t-shirt made with stretch-infused cotton blend for unrestricted movement.",
        price: 110,
        images: ["http://localhost:4000/images/p_img4.png"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "XXL"],
        date: 1716621345448,
        bestseller: true
    },
    {
        name: "Women Casual Cotton Top",
        description: "Elegant casual top with subtle textured weave, ideal for pairing with denim or tailored trousers.",
        price: 130,
        images: ["http://localhost:4000/images/p_img5.png"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        date: 1716622345448,
        bestseller: true
    },
    {
        name: "Girls Floral Pattern Summer Top",
        description: "Light and airy floral cotton top with ruffled trim, perfect for sunny days and family outings.",
        price: 140,
        images: ["http://localhost:4000/images/p_img6.png"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "L", "XL"],
        date: 1716621545448,
        bestseller: false
    },
    {
        name: "Men Tapered Chino Trousers",
        description: "Classic flat-front chino trousers with a slight taper for a smart-casual weekday or weekend aesthetic.",
        price: 190,
        images: ["http://localhost:4000/images/p_img7.png"],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "L", "XL"],
        date: 1716622345448,
        bestseller: false
    },
    {
        name: "Men Crewneck Graphic T-shirt",
        description: "Minimalist urban graphic print t-shirt rendered on heavy-gauge organic cotton jersey.",
        price: 140,
        images: ["http://localhost:4000/images/p_img8.png"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716621245448,
        bestseller: false
    },
    {
        name: "Girls Embroidered Cotton Top",
        description: "Durable yet soft cotton daily top with delicate contrast stitching on neckline and hems.",
        price: 100,
        images: ["http://localhost:4000/images/p_img9.png"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        date: 1716622245448,
        bestseller: false
    },
    {
        name: "Men Flat Front Casual Trousers",
        description: "Versatile stretch-cotton trousers engineered for comfort at the office or on the road.",
        price: 110,
        images: ["http://localhost:4000/images/p_img10.png"],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "L", "XL"],
        date: 1716623345448,
        bestseller: false
    },
    {
        name: "Men Streetwear Relaxed Trousers",
        description: "Modern relaxed silhouette bottomwear featuring deep utility pockets and reinforced seams.",
        price: 120,
        images: ["http://localhost:4000/images/p_img11.png"],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L"],
        date: 1716624445448,
        bestseller: false
    },
    {
        name: "Men Zip-Front Hooded Sweatshirt",
        description: "Cozy fleece-lined zip hoodie offering warmth and easy layering through transitional seasons.",
        price: 150,
        images: ["http://localhost:4000/images/p_img12.png"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716625545448,
        bestseller: false
    },
    {
        name: "Women Relaxed Cotton T-shirt",
        description: "Super soft boyfriend fit t-shirt with rolled sleeves and a laid-back drape.",
        price: 130,
        images: ["http://localhost:4000/images/p_img13.png"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716626645448,
        bestseller: false
    },
    {
        name: "Boys Casual Graphic T-shirt",
        description: "Vibrant and durable boys t-shirt crafted to withstand outdoor games and repeat laundry.",
        price: 160,
        images: ["http://localhost:4000/images/p_img14.png"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        date: 1716627745448,
        bestseller: false
    },
    {
        name: "Men Straight Fit Denim Jeans",
        description: "Timeless straight-leg indigo washed jeans with classic 5-pocket styling and antique brass rivets.",
        price: 140,
        images: ["http://localhost:4000/images/p_img15.png"],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716628845448,
        bestseller: false
    },
    {
        name: "Girls Warm Winter Hoodie",
        description: "Plush Sherpa-lined winter jacket designed to keep kids warm during chilly morning strolls.",
        price: 170,
        images: ["http://localhost:4000/images/p_img16.png"],
        category: "Kids",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716629945448,
        bestseller: false
    },
    {
        name: "Men Heritage Cotton Tapered Pants",
        description: "Tailored casual pants crafted from durable twill with an adjustable inner waistband.",
        price: 150,
        images: ["http://localhost:4000/images/p_img17.png"],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716631045448,
        bestseller: false
    },
    {
        name: "Boys Cargo Jogger Pants",
        description: "Rugged and flexible cargo joggers with elasticated ankle cuffs and multi-functional storage pockets.",
        price: 180,
        images: ["http://localhost:4000/images/p_img18.png"],
        category: "Kids",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716632145448,
        bestseller: false
    },
    {
        name: "Boys Athletic Sports Joggers",
        description: "Performance stretch joggers with moisture-wicking technology for active young runners.",
        price: 160,
        images: ["http://localhost:4000/images/p_img19.png"],
        category: "Kids",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716633245448,
        bestseller: false
    },
    {
        name: "Women High-Rise Stretch Trousers",
        description: "Sculpting high-rise trousers made with premium 4-way stretch fabric for effortless elegance.",
        price: 190,
        images: ["http://localhost:4000/images/p_img20.png"],
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716634345448,
        bestseller: false
    },
    {
        name: "Women Quilted Winter Puffer Jacket",
        description: "Insulated water-resistant winter puffer jacket featuring high collar and secure zip pockets.",
        price: 210,
        images: ["http://localhost:4000/images/p_img21.png"],
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716635445448,
        bestseller: false
    },
    {
        name: "Women Tailored Ankle Trousers",
        description: "Crisp ankle-length trousers with pressed creases, perfect for corporate and polished casual settings.",
        price: 180,
        images: ["http://localhost:4000/images/p_img22.png"],
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716636545448,
        bestseller: false
    },
    {
        name: "Boys Lightweight Windbreaker Jacket",
        description: "Water-repellent hooded shell jacket engineered to pack small and guard against sudden showers.",
        price: 200,
        images: ["http://localhost:4000/images/p_img23.png"],
        category: "Kids",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716637645448,
        bestseller: false
    },
    {
        name: "Boys Thermal Knit Pullover",
        description: "Cozy waffle knit thermal sweater ensuring supreme insulation on cooler school mornings.",
        price: 180,
        images: ["http://localhost:4000/images/p_img24.png"],
        category: "Kids",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716638745448,
        bestseller: false
    },
    {
        name: "Girls Fleece Lined Winter Coat",
        description: "Warm and plush winter coat with charming toggle buttons and deep handwarmer pockets.",
        price: 210,
        images: ["http://localhost:4000/images/p_img25.png"],
        category: "Kids",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716639845448,
        bestseller: false
    },
    {
        name: "Women Classic Fit Wool-Blend Overcoat",
        description: "Luxurious mid-length winter overcoat with notched lapels and structured shoulder detailing.",
        price: 240,
        images: ["http://localhost:4000/images/p_img26.png"],
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716640945448,
        bestseller: false
    },
    {
        name: "Men Heavyweight Thermal Parka",
        description: "Heavy-duty cold weather parka featuring down-alternative insulation and a storm flap placket.",
        price: 260,
        images: ["http://localhost:4000/images/p_img27.png"],
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716642045448,
        bestseller: false
    },
    {
        name: "Men Commuter Technical Jacket",
        description: "Sleek matte finish commuter jacket with breathable membrane and internal media pouch.",
        price: 220,
        images: ["http://localhost:4000/images/p_img28.png"],
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716643145448,
        bestseller: false
    }
];

const seedDatabase = async () => {
    try {
        const count = await productModel.countDocuments();
        if (count === 0) {
            console.log('Seeding initial products into database...');
            await productModel.insertMany(initialProducts);
            console.log(`Successfully seeded ${initialProducts.length} products!`);
        } else {
            console.log(`Database already has ${count} products.`);
        }
    } catch (error) {
        console.error('Error seeding database:', error.message);
    }
};

export default seedDatabase;
