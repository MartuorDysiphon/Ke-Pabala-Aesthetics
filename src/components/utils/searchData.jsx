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

// PRODUCTS DATABASE - WITH DIRECT PRODUCT URLS
export const allProducts = [
  // ========== JEANS PRODUCTS ==========
  {
    id: 'jeans-1',
    name: "H&M Ashwood Jeans",
    price: 299.99,
    image: Jean1,
    category: "Jeans",
    subcategory: "Slim Fit",
    description: "Stonewashed slim-fit jeans with a modern ash grey finish.",
    url: "/jeans?product=jeans-1", // Direct product URL
    page: "jeans",
    type: "clothing",
    tags: ["hm", "ashwood", "slim fit", "grey", "jeans"],
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
    description: "A-line denim skirt in a soft misty blue wash.",
    url: "/jeans?product=jeans-2", // Direct product URL
    page: "jeans",
    type: "clothing",
    tags: ["zara", "denim skirt", "misty blue", "skirt"],
    featured: false,
    status: "In Stock",
    color: "Misty Blue"
  },
  {
    id: 'jeans-3',
    name: "Oceanline Jean",
    price: 289.99,
    image: Jean3,
    category: "Jeans",
    subcategory: "Straight Fit",
    description: "Classic straight-leg jeans in deep ocean blue.",
    url: "/jeans?product=jeans-3", // Direct product URL
    page: "jeans",
    type: "clothing",
    tags: ["oceanline", "straight fit", "blue", "jeans"],
    featured: false,
    status: "In Stock",
    color: "Deep Blue"
  },
  {
    id: 'jeans-4',
    name: "Trueblue Skinny Jean",
    price: 299.99,
    image: Jean4,
    category: "Jeans",
    subcategory: "Skinny Fit",
    description: "High-stretch skinny jeans in true blue indigo.",
    url: "/jeans?product=jeans-4", // Direct product URL
    page: "jeans",
    type: "clothing",
    tags: ["trueblue", "skinny", "indigo", "jeans"],
    featured: false,
    status: "In Stock",
    color: "True Blue"
  },
  {
    id: 'jeans-5',
    name: "Zara Denim Jacket",
    price: 449.99,
    image: Jean5,
    category: "Jeans",
    subcategory: "Jacket",
    description: "Oversized denim jacket with raw hem details.",
    url: "/jeans?product=jeans-5", // Direct product URL
    page: "jeans",
    type: "clothing",
    tags: ["zara", "denim jacket", "jacket"],
    featured: true,
    status: "In Stock",
    color: "Medium Wash"
  },

  // ========== IPHONES ==========
  {
    id: 'iphone-1',
    name: "iPhone 7",
    price: 2500.00,
    image: Iphone7,
    category: "iPhones",
    subcategory: "iPhone 7 Series",
    description: "iPhone 7 - Pre-Owned model",
    url: "/iphones?product=iphone-1", // Direct product URL
    page: "iphones",
    type: "electronics",
    storage: "32GB",
    condition: "Pre-Owned",
    tags: ["iphone 7", "pre-owned", "32gb"],
    featured: false,
    status: "Available",
    color: "Black",
    modelYear: "2016",
    series: "7"
  },
  {
    id: 'iphone-2',
    name: "iPhone 7 Plus",
    price: 3050.00,
    image: Iphone7Plus,
    category: "iPhones",
    subcategory: "iPhone 7 Series",
    description: "iPhone 7 Plus - Pre-Owned model",
    url: "/iphones?product=iphone-2", // Direct product URL
    page: "iphones",
    type: "electronics",
    storage: "32GB",
    condition: "Pre-Owned",
    tags: ["iphone 7 plus", "pre-owned", "32gb"],
    featured: false,
    status: "Available",
    color: "Rose Gold",
    modelYear: "2016",
    series: "7"
  },
  {
    id: 'iphone-3',
    name: "iPhone 8",
    price: 2950.00,
    image: Iphone8,
    category: "iPhones",
    subcategory: "iPhone 8 Series",
    description: "iPhone 8 - Pre-Owned model",
    url: "/iphones?product=iphone-3", // Direct product URL
    page: "iphones",
    type: "electronics",
    storage: "64GB",
    condition: "Pre-Owned",
    tags: ["iphone 8", "pre-owned", "64gb"],
    featured: false,
    status: "Available",
    color: "Space Gray",
    modelYear: "2017",
    series: "8"
  },
  {
    id: 'iphone-4',
    name: "iPhone 8 Plus",
    price: 3600.00,
    image: Iphone8Plus,
    category: "iPhones",
    subcategory: "iPhone 8 Series",
    description: "iPhone 8 Plus - Pre-Owned model",
    url: "/iphones?product=iphone-4", // Direct product URL
    page: "iphones",
    type: "electronics",
    storage: "64GB",
    condition: "Pre-Owned",
    tags: ["iphone 8 plus", "pre-owned", "64gb"],
    featured: false,
    status: "Available",
    color: "Gold",
    modelYear: "2017",
    series: "8"
  },
  {
    id: 'iphone-5',
    name: "iPhone X",
    price: 3900.00,
    image: IphoneX,
    category: "iPhones",
    subcategory: "iPhone X Series",
    description: "iPhone X - Pre-Owned model",
    url: "/iphones?product=iphone-5", // Direct product URL
    page: "iphones",
    type: "electronics",
    storage: "64GB",
    condition: "Pre-Owned",
    tags: ["iphone x", "pre-owned", "64gb"],
    featured: false,
    status: "Available",
    color: "Silver",
    modelYear: "2017",
    series: "X"
  },
  {
    id: 'iphone-6',
    name: "iPhone XR",
    price: 4100.00,
    image: IphoneXR,
    category: "iPhones",
    subcategory: "iPhone XR Series",
    description: "iPhone XR - Pre-Owned model",
    url: "/iphones?product=iphone-6", // Direct product URL
    page: "iphones",
    type: "electronics",
    storage: "64GB",
    condition: "Pre-Owned",
    tags: ["iphone xr", "pre-owned", "64gb"],
    featured: false,
    status: "Available",
    color: "Coral",
    modelYear: "2018",
    series: "XR"
  },
  {
    id: 'iphone-7',
    name: "iPhone 11",
    price: 5100.00,
    image: Iphone11,
    category: "iPhones",
    subcategory: "iPhone 11 Series",
    description: "iPhone 11 - Pre-Owned model",
    url: "/iphones?product=iphone-7", // Direct product URL
    page: "iphones",
    type: "electronics",
    storage: "64GB",
    condition: "Pre-Owned",
    tags: ["iphone 11", "pre-owned", "64gb"],
    featured: true,
    status: "Available",
    color: "Purple",
    modelYear: "2019",
    series: "11"
  },
  {
    id: 'iphone-8',
    name: "iPhone 11 Pro",
    price: 6400.00,
    image: Iphone11Pro,
    category: "iPhones",
    subcategory: "iPhone 11 Series",
    description: "iPhone 11 Pro - Pre-Owned model",
    url: "/iphones?product=iphone-8", // Direct product URL
    page: "iphones",
    type: "electronics",
    storage: "64GB",
    condition: "Pre-Owned",
    tags: ["iphone 11 pro", "pre-owned", "64gb"],
    featured: true,
    status: "Low Stock",
    color: "Midnight Green",
    modelYear: "2019",
    series: "11"
  },
  {
    id: 'iphone-9',
    name: "iPhone 12",
    price: 6800.00,
    image: Iphone12,
    category: "iPhones",
    subcategory: "iPhone 12 Series",
    description: "iPhone 12 - Pre-Owned model",
    url: "/iphones?product=iphone-9", // Direct product URL
    page: "iphones",
    type: "electronics",
    storage: "64GB",
    condition: "Pre-Owned",
    tags: ["iphone 12", "pre-owned", "64gb"],
    featured: true,
    status: "Available",
    color: "Black",
    modelYear: "2020",
    series: "12"
  },

  // ========== HAIR ==========
  {
    id: 'hair-1',
    name: "Sun-Kissed Blondie",
    price: 1349.99,
    image: Blondie,
    category: "Hair",
    subcategory: "Straight",
    description: "Premium straight blonde human hair extensions.",
    url: "/hair?product=hair-1", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "24-26 inches",
    hairType: "human",
    tags: ["blonde", "straight", "human hair"],
    featured: true,
    status: "In Stock",
    color: "Blonde"
  },
  {
    id: 'hair-2',
    name: "Boho Curly Waterwave",
    price: 1199.99,
    image: Curly1,
    category: "Hair",
    subcategory: "Curly/Wavey",
    description: "Beautiful curly human hair extensions.",
    url: "/hair?product=hair-2", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "14 inches",
    hairType: "human",
    tags: ["curly", "boho", "waterwave", "human hair"],
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
    description: "Layered curly human hair with volume.",
    url: "/hair?product=hair-3", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "22-24 inches",
    hairType: "human",
    tags: ["curly", "layered", "volume", "human hair"],
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
    description: "Tight springy ringlets human hair.",
    url: "/hair?product=hair-4", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "18-20 inches",
    hairType: "human",
    tags: ["ringlets", "springy", "human hair"],
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
    description: "Loose beach wave human hair extensions.",
    url: "/hair?product=hair-5", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "human",
    tags: ["beach waves", "loose curls", "human hair"],
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
    description: "Well-defined curly coils human hair.",
    url: "/hair?product=hair-6", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "22-24 inches",
    hairType: "human",
    tags: ["coils", "defined", "curly", "human hair"],
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
    description: "Premium donor human hair.",
    url: "/hair?product=hair-7", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "26-28 inches",
    hairType: "human",
    tags: ["donor", "premium", "human hair"],
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
    description: "Virgin donor human hair.",
    url: "/hair?product=hair-8", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "24-26 inches",
    hairType: "human",
    tags: ["donor", "virgin", "human hair"],
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
    description: "Luxury donor weave human hair.",
    url: "/hair?product=hair-9", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "28-30 inches",
    hairType: "human",
    tags: ["donor", "luxury", "weave", "human hair"],
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
    description: "Double drawn silk human hair.",
    url: "/hair?product=hair-10", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "22-24 inches",
    hairType: "human",
    tags: ["double drawn", "silk", "human hair"],
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
    description: "Premium double drawn human hair.",
    url: "/hair?product=hair-11", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "24-26 inches",
    hairType: "human",
    tags: ["double drawn", "premium", "human hair"],
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
    description: "Double drawn hair for added volume.",
    url: "/hair?product=hair-12", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "human",
    tags: ["double drawn", "volume", "human hair"],
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
    description: "Luxury double drawn human hair.",
    url: "/hair?product=hair-13", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "26-28 inches",
    hairType: "human",
    tags: ["double drawn", "luxury", "human hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-14',
    name: "SDD Magic Bounce",
    price: 1999.99,
    image: DoubleDrawn5,
    category: "Hair",
    subcategory: "Double Drawn",
    description: "SDD Magic Bounce human hair.",
    url: "/hair?product=hair-14", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "20 inches",
    hairType: "human",
    tags: ["sdd", "magic bounce", "human hair"],
    featured: true,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-15',
    name: "Glueless Lace Front",
    price: 1649.99,
    image: Glueless1,
    category: "Hair",
    subcategory: "Glueless",
    description: "Glueless lace front human hair wig.",
    url: "/hair?product=hair-15", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "human",
    tags: ["glueless", "lace front", "wig", "human hair"],
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
    description: "Easy wear glueless human hair wig.",
    url: "/hair?product=hair-16", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "18-20 inches",
    hairType: "human",
    tags: ["glueless", "easy wear", "wig", "human hair"],
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
    description: "Glueless HD lace human hair wig.",
    url: "/hair?product=hair-17", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "22-24 inches",
    hairType: "human",
    tags: ["glueless", "hd lace", "wig", "human hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-18',
    name: "Breathable Glueless",
    price: 1049.99,
    image: Glueless4,
    category: "Hair",
    subcategory: "Glueless",
    description: "Breathable glueless human hair wig.",
    url: "/hair?product=hair-18", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "16 inches",
    hairType: "human",
    tags: ["glueless", "breathable", "wig", "human hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-19',
    name: "Chic Pixie Cut",
    price: 499.99,
    image: Pixie1,
    category: "Hair",
    subcategory: "Pixie",
    description: "Chic pixie cut human hair wig.",
    url: "/hair?product=hair-19", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "12-14 inches",
    hairType: "human",
    tags: ["pixie", "chic", "wig", "human hair"],
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
    description: "Modern pixie cut human hair wig.",
    url: "/hair?product=hair-20", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "14-16 inches",
    hairType: "human",
    tags: ["pixie", "modern", "wig", "human hair"],
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
    description: "Textured pixie human hair wig.",
    url: "/hair?product=hair-21", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "12-14 inches",
    hairType: "human",
    tags: ["pixie", "textured", "wig", "human hair"],
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
    description: "SDD chocolate brown human hair.",
    url: "/hair?product=hair-22", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "human",
    tags: ["sdd", "chocolate brown", "human hair"],
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
    description: "SDD jerry curls pro human hair.",
    url: "/hair?product=hair-23", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "22-24 inches",
    hairType: "human",
    tags: ["sdd", "jerry curls", "pro", "human hair"],
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
    description: "SDD classic jerry curls human hair.",
    url: "/hair?product=hair-24", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "human",
    tags: ["sdd", "jerry curls", "classic", "human hair"],
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
    description: "SDD lindy donor human hair.",
    url: "/hair?product=hair-25", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "24-26 inches",
    hairType: "human",
    tags: ["sdd", "lindy", "donor", "human hair"],
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
    description: "SDD pixel curly human hair.",
    url: "/hair?product=hair-26", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "18-20 inches",
    hairType: "human",
    tags: ["sdd", "pixel", "curly", "human hair"],
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
    description: "SDD water wave human hair.",
    url: "/hair?product=hair-27", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "human",
    tags: ["sdd", "water wave", "human hair"],
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
    description: "SDD premium collection human hair.",
    url: "/hair?product=hair-28", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "22-24 inches",
    hairType: "human",
    tags: ["sdd", "premium", "collection", "human hair"],
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
    description: "Silky straight human hair extensions.",
    url: "/hair?product=hair-29", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "human",
    tags: ["straight", "silky", "human hair"],
    featured: false,
    status: "In Stock",
    color: "Black"
  },
  {
    id: 'hair-30',
    name: "Brazilian Straight",
    price: 1299.99,
    image: Straight2,
    category: "Hair",
    subcategory: "Straight",
    description: "Brazilian straight human hair.",
    url: "/hair?product=hair-30", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "18 inches",
    hairType: "human",
    tags: ["straight", "brazilian", "human hair"],
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
    description: "Mirror straight human hair.",
    url: "/hair?product=hair-31", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "24-26 inches",
    hairType: "human",
    tags: ["straight", "mirror", "human hair"],
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
    description: "Ultra straight human hair extensions.",
    url: "/hair?product=hair-32", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "human",
    tags: ["straight", "ultra", "human hair"],
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
    description: "Synthetic straight hair with natural glow.",
    url: "/hair?product=hair-33", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "20-22 inches",
    hairType: "synthetic",
    tags: ["synthetic", "straight", "glow"],
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
    description: "Synthetic curly hair with fantasy colors.",
    url: "/hair?product=hair-34", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "18-20 inches",
    hairType: "synthetic",
    tags: ["synthetic", "curly", "fantasy"],
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
    description: "Synthetic water wave hair.",
    url: "/hair?product=hair-35", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "22-24 inches",
    hairType: "synthetic",
    tags: ["synthetic", "water wave", "pro"],
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
    description: "Synthetic pixie cut wig.",
    url: "/hair?product=hair-36", // Direct product URL
    page: "hair",
    type: "beauty",
    length: "12-14 inches",
    hairType: "synthetic",
    tags: ["synthetic", "pixie", "lite", "wig"],
    featured: false,
    status: "Coming Soon",
    color: "Black",
    comingSoon: true
  }
];

// Search function remains unchanged
export const searchAllProducts = (query) => {
  if (!query || query.trim() === '') return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  const scoredProducts = allProducts.map(product => {
    let score = 0;
    
    if (product.name.toLowerCase().includes(searchTerm)) {
      score += 100;
      if (product.name.toLowerCase() === searchTerm) score += 50;
    }
    
    if (product.category.toLowerCase().includes(searchTerm)) {
      score += 80;
    }
    
    if (product.subcategory?.toLowerCase().includes(searchTerm)) {
      score += 70;
    }
    
    if (product.description?.toLowerCase().includes(searchTerm)) {
      score += 40;
    }
    
    product.tags?.forEach(tag => {
      if (tag.toLowerCase().includes(searchTerm)) {
        score += 30;
      }
    });
    
    if (product.type?.toLowerCase().includes(searchTerm)) {
      score += 20;
    }
    
    if (product.page?.toLowerCase().includes(searchTerm)) {
      score += 10;
    }
    
    if (product.featured) {
      score += 5;
    }
    
    return { ...product, score };
  });
  
  return scoredProducts
    .filter(product => product.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 50);
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

export const getProductsByCategory = (category) => {
  return allProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getProductsByPage = (page) => {
  return allProducts.filter(product => 
    product.page.toLowerCase() === page.toLowerCase()
  );
};

export const getProductById = (id) => {
  return allProducts.find(product => product.id === id);
};

export const getTotalProductsCount = () => {
  return allProducts.length;
};

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