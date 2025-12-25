import Jean1 from '../../assets/Jeans/jean (1).jpeg';
import Jean2 from '../../assets/Jeans/jean (4).jpeg';
import Jean3 from '../../assets/Jeans/jean (3).jpeg';
import Jean4 from '../../assets/Jeans/jean (2).jpeg';
import Jean5 from '../../assets/Jeans/jean (5).jpeg';

import Iphone7 from '../../assets/Iphones/iphone 7.jpg';
import Iphone7Plus from '../../assets/Iphones/iphone 7 plus.jpg';
import Iphone8 from '../../assets/Iphones/iphone 8.jpg';
import Iphone8Plus from '../../assets/Iphones/iphone 8 plus.jpg';
import IphoneX from '../../assets/Iphones/iphone x.jpg';
import IphoneXR from '../../assets/Iphones/iphone xr.jpg';
import Iphone11 from '../../assets/Iphones/iphone 11.jpg';
import Iphone11Pro from '../../assets/Iphones/iphone 11 pro.jpg';
import Iphone12 from '../../assets/Iphones/iphone 12.jpg';

import Blondie from '../../assets/Hair/blondie.jpg';
import Curly1 from '../../assets/Hair/curly1.jpg';
import Curly2 from '../../assets/Hair/curly2.jpg';
import Curly3 from '../../assets/Hair/curly3.jpg';
import Curly4 from '../../assets/Hair/curly4.jpg';
import Curly5 from '../../assets/Hair/curly5.jpg';
import Donor1 from '../../assets/Hair/donor1.jpg';
import Donor2 from '../../assets/Hair/donor2.jpg';
import Donor3 from '../../assets/Hair/donor3.jpg';
import DoubleDrawn1 from '../../assets/Hair/double drawn 1.jpg';
import DoubleDrawn2 from '../../assets/Hair/double drawn 2.jpg';
import DoubleDrawn3 from '../../assets/Hair/double drawn 3.jpg';
import DoubleDrawn4 from '../../assets/Hair/double drawn 4.jpg';
import DoubleDrawn5 from '../../assets/Hair/double drawn 5.jpg';
import Glueless1 from '../../assets/Hair/glueless 1.jpg';
import Glueless2 from '../../assets/Hair/glueless 2.jpg';
import Glueless3 from '../../assets/Hair/glueless 3.jpg';
import Glueless4 from '../../assets/Hair/glueless4.jpg';
import Pixie1 from '../../assets/Hair/pexie1.jpg';
import Pixie2 from '../../assets/Hair/pixie2.jpg';
import Pixie3 from '../../assets/Hair/pixie3.jpg';
import SddDonorChocBrown from '../../assets/Hair/sdd donor chocolate brown.jpg';
import SddJerryCurls1 from '../../assets/Hair/sdd jerry cirls1.jpg';
import SddJerryCurls from '../../assets/Hair/sdd jerry curls.jpg';
import SddLindyDonor from '../../assets/Hair/sdd lindy donor.jpg';
import SddPixelCurly from '../../assets/Hair/sdd pixel curly.jpg';
import SddWaterwave from '../../assets/Hair/sdd waterwave.jpg';
import Sdd from '../../assets/Hair/sdd.jpg';
import Straight1 from '../../assets/Hair/straight1.jpg';
import Straight2 from '../../assets/Hair/straight2.jpg';
import Straight3 from '../../assets/Hair/straight3.jpg';
import Straight4 from '../../assets/Hair/straight4.jpg';

// PRODUCTS DATABASE
export const allProducts = [
  // ========== NEW JEANS PRODUCTS ==========
  {
    id: 'jeans-1',
    name: "H&M Ashwood Jeans",
    price: 299.99,
    image: Jean1,
    category: "Jeans",
    subcategory: "Slim Fit",
    description: "Stonewashed slim-fit jeans with a modern ash grey finish, offering a clean, tailored silhouette for everyday sophistication.",
    url: "/jeans",
    page: "jeans",
    type: "clothing",
    tags: ["hm", "ashwood", "slim fit", "grey", "stonewashed", "modern", "tailored", "jeans", "casual"],
    featured: true,
    status: "In Stock",
    color: "Ash Grey"
  },
  {
    id: 'jeans-2',
    name: "Zara Misty Blue Skirt",
    price: 399.99,
    image: Jean2,
    category: "Jeans",
    subcategory: "A-Line",
    description: "A relaxed A-line denim skirt in a soft misty blue wash, featuring a midi length and side slits for effortless movement.",
    url: "/jeans",
    page: "jeans",
    type: "clothing",
    tags: ["zara", "denim skirt", "misty blue", "a-line", "midi", "side slits", "casual", "skirt", "denim"],
    featured: true,
    status: "In Stock",
    color: "Misty Blue"
  },
  {
    id: 'jeans-3',
    name: "Grey Threads Jean",
    price: 289.99,
    image: Jean3,
    category: "Jeans",
    subcategory: "Straight Fit",
    description: "Classic straight-leg jeans in a deep ocean blue, designed with a mid-rise waist and durable construction for timeless style.",
    url: "/jeans",
    page: "jeans",
    type: "clothing",
    tags: ["Grey Threads", "straight fit", "deep blue", "classic", "mid-rise", "durable", "timeless", "jeans"],
    featured: true,
    status: "In Stock",
    color: "Gray"
  },
  {
    id: 'jeans-4',
    name: "Trueblue Skinny Jean",
    price: 299.99,
    image: Jean4,
    category: "Jeans",
    subcategory: "Skinny Fit",
    description: "High-stretch skinny jeans in a rich true blue indigo, providing a second-skin fit with exceptional comfort and shape retention.",
    url: "/jeans",
    page: "jeans",
    type: "clothing",
    tags: ["trueblue", "skinny fit", "indigo", "high-stretch", "comfort", "second-skin", "jeans", "flexible"],
    featured: true,
    status: "In Stock",
    color: "True Blue"
  },
  {
    id: 'jeans-5',
    name: "Zara Denim Jacket",
    price: 449.99,
    image: Jean5,
    category: "Jeans",
    subcategory: "Oversized",
    description: "An oversized washed denim jacket with a relaxed fit, raw hem details, and a versatile medium wash for layered styling.",
    url: "/jeans",
    page: "jeans",
    type: "clothing",
    tags: ["zara", "denim jacket", "oversized", "relaxed fit", "raw hem", "medium wash", "jacket", "layering", "denim"],
    featured: true,
    status: "In Stock",
    color: "Medium Wash"
  },

  // ========== IPHONES ==========
  {
    id: 'iphone-1',
    name: "iPhone 12",
    price: 8999.99,
    image: Iphone12,
    category: "iPhones",
    subcategory: "iPhone 12 Series",
    description: "Latest iPhone 12 with advanced camera system, 5G capability, and edge-to-edge OLED display.",
    url: "/iphones",
    page: "iphones",
    type: "electronics",
    storage: "128GB/256GB",
    condition: "Refurbished",
    tags: ["apple", "iphone 12", "5g", "oled", "camera", "smartphone", "refurbished", "iphone"],
    featured: true,
    status: "Available",
    color: "Black"
  },
  {
    id: 'iphone-2',
    name: "iPhone 11 Pro",
    price: 7399.99,
    image: Iphone11Pro,
    category: "iPhones",
    subcategory: "iPhone 11 Series",
    description: "iPhone 11 Pro with triple camera system, Super Retina XDR display, and premium build.",
    url: "/iphones",
    page: "iphones",
    type: "electronics",
    storage: "64GB/256GB/512GB",
    condition: "Excellent",
    tags: ["iphone 11 pro", "triple camera", "premium", "oled", "pro", "excellent condition", "iphone"],
    featured: false,
    status: "Available",
    color: "Midnight Green"
  },
  {
    id: 'iphone-3',
    name: "iPhone 11",
    price: 6399.99,
    image: Iphone11,
    category: "iPhones",
    subcategory: "iPhone 11 Series",
    description: "Popular iPhone 11 with dual camera system, Liquid Retina display, and all-day battery.",
    url: "/iphones",
    page: "iphones",
    type: "electronics",
    storage: "64GB/128GB",
    condition: "Good",
    tags: ["iphone 11", "dual camera", "popular", "value", "good condition", "battery", "iphone"],
    featured: false,
    status: "Available",
    color: "Purple"
  },
  {
    id: 'iphone-4',
    name: "iPhone XR",
    price: 5299.99,
    image: IphoneXR,
    category: "iPhones",
    subcategory: "iPhone XR Series",
    description: "Colorful iPhone XR with great battery life, single camera, and Liquid Retina display.",
    url: "/iphones",
    page: "iphones",
    type: "electronics",
    storage: "64GB/128GB",
    condition: "Good",
    tags: ["iphone xr", "colorful", "battery", "affordable", "single camera", "good condition", "iphone"],
    featured: false,
    status: "Low Stock",
    color: "Coral"
  },
  {
    id: 'iphone-5',
    name: "iPhone X",
    price: 4899.99,
    image: IphoneX,
    category: "iPhones",
    subcategory: "iPhone X Series",
    description: "Original edge-to-edge iPhone X with Face ID, dual camera, and Super Retina display.",
    url: "/iphones",
    page: "iphones",
    type: "electronics",
    storage: "64GB/256GB",
    condition: "Fair",
    tags: ["iphone x", "original", "edge-to-edge", "faceid", "dual camera", "fair condition", "iphone"],
    featured: false,
    status: "Available",
    color: "Silver"
  },
  {
    id: 'iphone-6',
    name: "iPhone 8 Plus",
    price: 4199.99,
    image: Iphone8Plus,
    category: "iPhones",
    subcategory: "iPhone 8 Series",
    description: "Classic iPhone 8 Plus with home button, dual camera, and large Retina HD display.",
    url: "/iphones",
    page: "iphones",
    type: "electronics",
    storage: "64GB/256GB",
    condition: "Good",
    tags: ["iphone 8 plus", "classic", "home button", "dual camera", "large screen", "good condition", "iphone"],
    featured: false,
    status: "Available",
    color: "Gold"
  },
  {
    id: 'iphone-7',
    name: "iPhone 8",
    price: 3799.99,
    image: Iphone8,
    category: "iPhones",
    subcategory: "iPhone 8 Series",
    description: "Compact iPhone 8 with home button, single camera, and Retina HD display.",
    url: "/iphones",
    page: "iphones",
    type: "electronics",
    storage: "64GB/256GB",
    condition: "Fair",
    tags: ["iphone 8", "compact", "home button", "single camera", "affordable", "fair condition", "iphone"],
    featured: false,
    status: "Low Stock",
    color: "Space Gray"
  },
  {
    id: 'iphone-8',
    name: "iPhone 7 Plus",
    price: 3299.99,
    image: Iphone7Plus,
    category: "iPhones",
    subcategory: "iPhone 7 Series",
    description: "Large screen iPhone 7 Plus with dual camera and Retina HD display.",
    url: "/iphones",
    page: "iphones",
    type: "electronics",
    storage: "32GB/128GB",
    condition: "Fair",
    tags: ["iphone 7 plus", "large", "dual camera", "budget", "fair condition", "classic", "iphone"],
    featured: false,
    status: "Available",
    color: "Rose Gold"
  },
  {
    id: 'iphone-9',
    name: "iPhone 7",
    price: 2899.99,
    image: Iphone7,
    category: "iPhones",
    subcategory: "iPhone 7 Series",
    description: "Basic iPhone 7 with single camera and Retina HD display. Perfect entry-level iPhone.",
    url: "/iphones",
    page: "iphones",
    type: "electronics",
    storage: "32GB/128GB",
    condition: "Fair",
    tags: ["iphone 7", "basic", "entry-level", "budget", "single camera", "fair condition", "iphone"],
    featured: false,
    status: "Available",
    color: "Black"
  },

  // ========== HAIR ==========
  {
    id: 'hair-1',
    name: "Sun-Kissed Blondie",
    price: 1349.99,
    image: Blondie,
    category: "Hair",
    subcategory: "Straight",
    description: "Premium straight blonde human hair extensions. 100% virgin human hair, double drawn.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "24-26 inches",
    hairType: "human",
    tags: ["blonde", "straight", "human hair", "premium", "double drawn", "virgin hair", "hair"],
    featured: true,
    status: "In Stock",
    color: "Blonde"
  },
  {
    id: 'hair-2',
    name: "Boho Curly Bliss",
    price: 899.99,
    image: Curly1,
    category: "Hair",
    subcategory: "Curly/Wavey",
    description: "Beautiful curly human hair extensions. Natural boho curls, 100% human hair.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "human",
    tags: ["curly", "boho", "human hair", "natural", "waves", "hair extensions", "hair"],
    featured: false,
    status: "In Stock",
    color: "Brown"
  },
  {
    id: 'hair-3',
    name: "Cascade Curly Layers",
    price: 949.99,
    image: Curly2,
    category: "Hair",
    subcategory: "Curly/Wavey",
    description: "Layered curly human hair with volume. Perfect for adding body and texture.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "22-24 inches",
    hairType: "human",
    tags: ["curly", "layered", "volume", "human hair", "texture", "body", "hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-4',
    name: "Springy Ringlets",
    price: 819.99,
    image: Curly3,
    category: "Hair",
    subcategory: "Curly/Wavey",
    description: "Tight springy ringlets human hair. Defined curls for a bold look.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "18-20 inches",
    hairType: "human",
    tags: ["ringlets", "springy", "tight curls", "human hair", "defined", "bold", "hair"],
    featured: false,
    status: "In Stock",
    color: "Dark Brown"
  },
  {
    id: 'hair-5',
    name: "Loose Beach Curls",
    price: 879.99,
    image: Curly4,
    category: "Hair",
    subcategory: "Curly/Wavey",
    description: "Loose beach wave human hair extensions. Natural looking waves for everyday wear.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "human",
    tags: ["beach waves", "loose curls", "natural", "human hair", "everyday", "wavy", "hair"],
    featured: false,
    status: "In Stock",
    color: "Brown"
  },
  {
    id: 'hair-6',
    name: "Defined Curly Coils",
    price: 929.99,
    image: Curly5,
    category: "Hair",
    subcategory: "Curly/Wavey",
    description: "Well-defined curly coils human hair. Perfect for coil styles and twist outs.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "22-24 inches",
    hairType: "human",
    tags: ["coils", "defined", "curly", "human hair", "twist out", "natural hair", "hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-7',
    name: "Matladi Premium Donor",
    price: 1489.99,
    image: Donor1,
    category: "Hair",
    subcategory: "Donor",
    description: "Premium donor human hair. 100% virgin human hair, highest quality available.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "26-28 inches",
    hairType: "human",
    tags: ["donor", "premium", "virgin hair", "human hair", "highest quality", "luxury", "hair"],
    featured: true,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-8',
    name: "Virgin Donor Hair",
    price: 1399.99,
    image: Donor2,
    category: "Hair",
    subcategory: "Donor",
    description: "Virgin donor human hair. Unprocessed and chemical-free human hair.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "24-26 inches",
    hairType: "human",
    tags: ["donor", "virgin", "unprocessed", "human hair", "chemical-free", "natural", "hair"],
    featured: false,
    status: "In Stock",
    color: "Dark Brown"
  },
  {
    id: 'hair-9',
    name: "Luxury Donor Weave",
    price: 1599.99,
    image: Donor3,
    category: "Hair",
    subcategory: "Donor",
    description: "Luxury donor weave human hair. Extra long length for versatile styling.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "28-30 inches",
    hairType: "human",
    tags: ["donor", "luxury", "weave", "human hair", "extra long", "versatile", "hair"],
    featured: true,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-10',
    name: "Double Drawn Silk",
    price: 1249.99,
    image: DoubleDrawn1,
    category: "Hair",
    subcategory: "Double Drawn",
    description: "Double drawn silk human hair. All strands same length for maximum fullness.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "22-24 inches",
    hairType: "human",
    tags: ["double drawn", "silk", "human hair", "fullness", "same length", "premium", "hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-11',
    name: "Premium Double Drawn",
    price: 1349.99,
    image: DoubleDrawn2,
    category: "Hair",
    subcategory: "Double Drawn",
    description: "Premium double drawn human hair for maximum volume and fullness.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "24-26 inches",
    hairType: "human",
    tags: ["double drawn", "premium", "volume", "human hair", "fullness", "hair"],
    featured: false,
    status: "In Stock",
    color: "Brown"
  },
  {
    id: 'hair-12',
    name: "Double Drawn Volume",
    price: 1199.99,
    image: DoubleDrawn3,
    category: "Hair",
    subcategory: "Double Drawn",
    description: "Double drawn hair for added volume and thickness.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "human",
    tags: ["double drawn", "volume", "thick", "human hair", "full", "hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-13',
    name: "Luxury Double Drawn",
    price: 1449.99,
    image: DoubleDrawn4,
    category: "Hair",
    subcategory: "Double Drawn",
    description: "Luxury double drawn human hair with exceptional quality and texture.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "26-28 inches",
    hairType: "human",
    tags: ["double drawn", "luxury", "quality", "human hair", "texture", "hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-14',
    name: "Double Drawn Supreme",
    price: 1299.99,
    image: DoubleDrawn5,
    category: "Hair",
    subcategory: "Double Drawn",
    description: "Double drawn supreme human hair for professional styling needs.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "22-24 inches",
    hairType: "human",
    tags: ["double drawn", "supreme", "professional", "human hair", "styling", "hair"],
    featured: false,
    status: "In Stock",
    color: "Brown"
  },
  {
    id: 'hair-15',
    name: "Glueless Lace Front",
    price: 1649.99,
    image: Glueless1,
    category: "Hair",
    subcategory: "Glueless",
    description: "Glueless lace front human hair wig. Easy to wear, no adhesive needed.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "human",
    tags: ["glueless", "lace front", "wig", "human hair", "easy", "no adhesive", "hair"],
    featured: true,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-16',
    name: "Easy Wear Glueless",
    price: 1549.99,
    image: Glueless2,
    category: "Hair",
    subcategory: "Glueless",
    description: "Easy wear glueless human hair wig with adjustable straps.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "18-20 inches",
    hairType: "human",
    tags: ["glueless", "easy wear", "wig", "adjustable", "human hair", "hair"],
    featured: false,
    status: "In Stock",
    color: "Brown"
  },
  {
    id: 'hair-17',
    name: "Glueless HD Lace",
    price: 1749.99,
    image: Glueless3,
    category: "Hair",
    subcategory: "Glueless",
    description: "Glueless HD lace human hair wig with invisible hairline.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "22-24 inches",
    hairType: "human",
    tags: ["glueless", "hd lace", "wig", "invisible", "human hair", "hairline", "hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-18',
    name: "Breathable Glueless",
    price: 1599.99,
    image: Glueless4,
    category: "Hair",
    subcategory: "Glueless",
    description: "Breathable glueless human hair wig with comfortable cap construction.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "human",
    tags: ["glueless", "breathable", "wig", "comfortable", "human hair", "hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-19',
    name: "Chic Pixie Bob",
    price: 689.99,
    image: Pixie1,
    category: "Hair",
    subcategory: "Pixie",
    description: "Chic pixie bob human hair wig. Short and stylish cut.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "12-14 inches",
    hairType: "human",
    tags: ["pixie", "bob", "short", "human hair", "wig", "chic", "hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-20',
    name: "Modern Pixie Cut",
    price: 749.99,
    image: Pixie2,
    category: "Hair",
    subcategory: "Pixie",
    description: "Modern pixie cut human hair wig with textured layers.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "14-16 inches",
    hairType: "human",
    tags: ["pixie", "modern", "textured", "human hair", "wig", "layers", "hair"],
    featured: false,
    status: "In Stock",
    color: "Brown"
  },
  {
    id: 'hair-21',
    name: "Textured Pixie",
    price: 719.99,
    image: Pixie3,
    category: "Hair",
    subcategory: "Pixie",
    description: "Textured pixie human hair wig for a natural look.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "12-14 inches",
    hairType: "human",
    tags: ["pixie", "textured", "natural", "human hair", "wig", "hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-22',
    name: "SDD Chocolate Brown",
    price: 1099.99,
    image: SddDonorChocBrown,
    category: "Hair",
    subcategory: "SDD",
    description: "SDD chocolate brown human hair. Super double drawn for maximum fullness.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "human",
    tags: ["sdd", "chocolate brown", "double drawn", "human hair", "full", "hair"],
    featured: false,
    status: "In Stock",
    color: "Chocolate Brown"
  },
  {
    id: 'hair-23',
    name: "SDD Jerry Curls Pro",
    price: 1149.99,
    image: SddJerryCurls1,
    category: "Hair",
    subcategory: "SDD",
    description: "SDD jerry curls pro human hair. Defined curls with super volume.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "22-24 inches",
    hairType: "human",
    tags: ["sdd", "jerry curls", "pro", "curly", "human hair", "volume", "hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-24',
    name: "SDD Classic Jerry Curls",
    price: 1049.99,
    image: SddJerryCurls,
    category: "Hair",
    subcategory: "SDD",
    description: "SDD classic jerry curls human hair. Timeless curly style.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "human",
    tags: ["sdd", "jerry curls", "classic", "curly", "human hair", "timeless", "hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-25',
    name: "SDD Lindy Donor",
    price: 1249.99,
    image: SddLindyDonor,
    category: "Hair",
    subcategory: "SDD",
    description: "SDD lindy donor human hair. Premium quality for weaving.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "24-26 inches",
    hairType: "human",
    tags: ["sdd", "lindy", "donor", "human hair", "weaving", "premium", "hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-26',
    name: "SDD Pixel Curly",
    price: 999.99,
    image: SddPixelCurly,
    category: "Hair",
    subcategory: "SDD",
    description: "SDD pixel curly human hair. Small tight curls for unique style.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "18-20 inches",
    hairType: "human",
    tags: ["sdd", "pixel", "curly", "human hair", "tight curls", "unique", "hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-27',
    name: "SDD Water Wave",
    price: 1079.99,
    image: SddWaterwave,
    category: "Hair",
    subcategory: "SDD",
    description: "SDD water wave human hair. Natural looking beach waves.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "human",
    tags: ["sdd", "water wave", "beach waves", "human hair", "natural", "hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-28',
    name: "SDD Premium Collection",
    price: 1199.99,
    image: Sdd,
    category: "Hair",
    subcategory: "SDD",
    description: "SDD premium collection human hair. Highest quality super double drawn.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "22-24 inches",
    hairType: "human",
    tags: ["sdd", "premium", "collection", "human hair", "double drawn", "quality", "hair"],
    featured: true,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-29',
    name: "Silky Straight",
    price: 929.99,
    image: Straight1,
    category: "Hair",
    subcategory: "Straight",
    description: "Silky straight human hair extensions. Smooth and shiny finish.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "human",
    tags: ["straight", "silky", "human hair", "smooth", "shiny", "hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-30',
    name: "Brazilian Straight",
    price: 989.99,
    image: Straight2,
    category: "Hair",
    subcategory: "Straight",
    description: "Brazilian straight human hair. Premium quality with natural texture.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "22-24 inches",
    hairType: "human",
    tags: ["straight", "brazilian", "human hair", "premium", "natural", "hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-31',
    name: "Mirror Straight",
    price: 1049.99,
    image: Straight3,
    category: "Hair",
    subcategory: "Straight",
    description: "Mirror straight human hair. Ultra straight with glass-like shine.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "24-26 inches",
    hairType: "human",
    tags: ["straight", "mirror", "human hair", "ultra", "shine", "hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-32',
    name: "Ultra Straight",
    price: 959.99,
    image: Straight4,
    category: "Hair",
    subcategory: "Straight",
    description: "Ultra straight human hair extensions. Perfectly straight for sleek styles.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "human",
    tags: ["straight", "ultra", "human hair", "sleek", "perfect", "hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-33',
    name: "Synth-Glow Straight",
    price: 299.99,
    image: Straight1,
    category: "Hair",
    subcategory: "Synthetic",
    description: "Synthetic straight hair with natural glow. Affordable alternative to human hair.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "synthetic",
    tags: ["synthetic", "straight", "glow", "affordable", "hair", "budget"],
    featured: false,
    status: "Coming Soon",
    color: "Black",
    comingSoon: true
  },
  {
    id: 'hair-34',
    name: "Synth-Curl Fantasy",
    price: 349.99,
    image: Curly1,
    category: "Hair",
    subcategory: "Synthetic",
    description: "Synthetic curly hair with fantasy colors. Fun and vibrant styles.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "18-20 inches",
    hairType: "synthetic",
    tags: ["synthetic", "curly", "fantasy", "colorful", "hair", "fun"],
    featured: false,
    status: "Coming Soon",
    color: "Multi",
    comingSoon: true
  },
  {
    id: 'hair-35',
    name: "Synth-Wave Pro",
    price: 279.99,
    image: SddWaterwave,
    category: "Hair",
    subcategory: "Synthetic",
    description: "Synthetic water wave hair. Professional quality synthetic fibers.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "22-24 inches",
    hairType: "synthetic",
    tags: ["synthetic", "water wave", "pro", "professional", "hair", "waves"],
    featured: false,
    status: "Coming Soon",
    color: "Brown",
    comingSoon: true
  },
  {
    id: 'hair-36',
    name: "Synth-Pixie Lite",
    price: 199.99,
    image: Pixie1,
    category: "Hair",
    subcategory: "Synthetic",
    description: "Synthetic pixie cut wig. Lightweight and easy to style.",
    url: "/hair",
    page: "hair",
    type: "beauty",
    length: "12-14 inches",
    hairType: "synthetic",
    tags: ["synthetic", "pixie", "lite", "lightweight", "wig", "hair"],
    featured: false,
    status: "Coming Soon",
    color: "Black",
    comingSoon: true
  }
];

// Search 
export const searchAllProducts = (query) => {
  if (!query || query.trim() === '') return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  // Score
  const scoredProducts = allProducts.map(product => {
    let score = 0;
    
    // Name match
    if (product.name.toLowerCase().includes(searchTerm)) {
      score += 100;
      if (product.name.toLowerCase() === searchTerm) score += 50;
    }
    
    // Category
    if (product.category.toLowerCase().includes(searchTerm)) {
      score += 80;
    }
    
    // Subcategory
    if (product.subcategory?.toLowerCase().includes(searchTerm)) {
      score += 70;
    }
    
    // Description
    if (product.description?.toLowerCase().includes(searchTerm)) {
      score += 40;
    }
    
    // Tag 
    product.tags?.forEach(tag => {
      if (tag.toLowerCase().includes(searchTerm)) {
        score += 30;
      }
    });
    
    // Type
    if (product.type?.toLowerCase().includes(searchTerm)) {
      score += 20;
    }
    
    // Page
    if (product.page?.toLowerCase().includes(searchTerm)) {
      score += 10;
    }
    
    // Featured
    if (product.featured) {
      score += 5;
    }
    
    return { ...product, score };
  });
  
  // Filter
  return scoredProducts
    .filter(product => product.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 50); // Limit to 50 results
};

export const getAllCategories = () => {
  return [...new Set(allProducts.map(p => p.category))];
};

export const getPopularSearches = () => {
  return [
    "iPhone 12",
    "Jeans",
    "Human Hair",
    "Curly Hair",
    "Zara Denim Jacket",
    "H&M Ashwood Jeans",
    "Blonde Hair",
    "Donor Hair",
    "Trueblue Skinny Jean",
    "Oceanline Jean",
    "iPhone 11",
    "SDD Hair",
    "Glueless Wig",
    "Zara Misty Blue Skirt",
    "Virgin Hair"
  ];
};

export const getFeaturedProducts = () => {
  return allProducts.filter(product => product.featured);
};

// Get products by category
export const getProductsByCategory = (category) => {
  return allProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

// Get products by page
export const getProductsByPage = (page) => {
  return allProducts.filter(product => 
    product.page.toLowerCase() === page.toLowerCase()
  );
};

// Get product by ID
export const getProductById = (id) => {
  return allProducts.find(product => product.id === id);
};

// Get all products count
export const getTotalProductsCount = () => {
  return allProducts.length;
};

// Get statistics
export const getProductStats = () => {
  return {
    total: allProducts.length,
    jeans: allProducts.filter(p => p.category === 'Jeans').length,
    iphones: allProducts.filter(p => p.category === 'iPhones').length,
    hair: allProducts.filter(p => p.category === 'Hair').length,
    featured: allProducts.filter(p => p.featured).length,
    inStock: allProducts.filter(p => p.status === 'In Stock' || p.status === 'Available').length
  };
};