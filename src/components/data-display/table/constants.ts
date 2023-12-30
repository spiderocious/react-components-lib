// Mock data for table stories
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  status: "active" | "inactive" | "pending";
  avatar?: string;
  joinDate: string;
  lastLogin: string;
  department: string;
  salary: number;
  age: number;
  country: string;
  phone: string;
  isVerified: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  type: "credit" | "debit";
  status: "completed" | "pending" | "failed";
  description: string;
  date: string;
  category: string;
  merchant: string;
  reference: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
  rating: number;
  reviews: number;
  image: string;
  description: string;
  brand: string;
  sku: string;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  items: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "paid" | "unpaid" | "refunded";
  orderDate: string;
  shippingAddress: string;
  trackingNumber?: string;
}

// Generate mock users
export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    joinDate: "2023-01-15",
    lastLogin: "2024-01-20T10:30:00Z",
    department: "Engineering",
    salary: 95000,
    age: 32,
    country: "United States",
    phone: "+1 (555) 123-4567",
    isVerified: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    status: "active",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    joinDate: "2023-03-22",
    lastLogin: "2024-01-19T14:20:00Z",
    department: "Marketing",
    salary: 72000,
    age: 28,
    country: "Canada",
    phone: "+1 (555) 987-6543",
    isVerified: true,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "moderator",
    status: "inactive",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    joinDate: "2022-11-08",
    lastLogin: "2024-01-10T09:15:00Z",
    department: "Support",
    salary: 58000,
    age: 35,
    country: "United Kingdom",
    phone: "+44 20 7946 0958",
    isVerified: false,
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "user",
    status: "pending",
    joinDate: "2024-01-18",
    lastLogin: "2024-01-18T16:45:00Z",
    department: "Design",
    salary: 68000,
    age: 26,
    country: "Australia",
    phone: "+61 2 9374 4000",
    isVerified: false,
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@example.com",
    role: "admin",
    status: "active",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
    joinDate: "2022-07-12",
    lastLogin: "2024-01-20T11:00:00Z",
    department: "Engineering",
    salary: 110000,
    age: 41,
    country: "Germany",
    phone: "+49 30 901820",
    isVerified: true,
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "user",
    status: "active",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    joinDate: "2023-05-30",
    lastLogin: "2024-01-19T13:30:00Z",
    department: "Sales",
    salary: 63000,
    age: 29,
    country: "France",
    phone: "+33 1 42 86 83 26",
    isVerified: true,
  },
  {
    id: "7",
    name: "Robert Garcia",
    email: "robert.garcia@example.com",
    role: "moderator",
    status: "active",
    joinDate: "2023-09-14",
    lastLogin: "2024-01-17T08:45:00Z",
    department: "Support",
    salary: 55000,
    age: 33,
    country: "Spain",
    phone: "+34 91 123 4567",
    isVerified: true,
  },
  {
    id: "8",
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    role: "user",
    status: "inactive",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
    joinDate: "2022-12-03",
    lastLogin: "2024-01-05T17:20:00Z",
    department: "HR",
    salary: 71000,
    age: 37,
    country: "Netherlands",
    phone: "+31 20 123 4567",
    isVerified: false,
  },
];

// Generate mock transactions
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx_1",
    amount: 1250.0,
    currency: "USD",
    type: "credit",
    status: "completed",
    description: "Salary deposit",
    date: "2024-01-20T10:30:00Z",
    category: "Income",
    merchant: "Company Inc.",
    reference: "SAL-2024-001",
  },
  {
    id: "tx_2",
    amount: 45.99,
    currency: "USD",
    type: "debit",
    status: "completed",
    description: "Grocery shopping",
    date: "2024-01-19T14:15:00Z",
    category: "Food & Dining",
    merchant: "SuperMart",
    reference: "POS-789456",
  },
  {
    id: "tx_3",
    amount: 500.0,
    currency: "USD",
    type: "debit",
    status: "pending",
    description: "Rent payment",
    date: "2024-01-18T09:00:00Z",
    category: "Housing",
    merchant: "Property Management LLC",
    reference: "RENT-JAN-2024",
  },
  {
    id: "tx_4",
    amount: 89.99,
    currency: "USD",
    type: "debit",
    status: "failed",
    description: "Online subscription",
    date: "2024-01-17T16:45:00Z",
    category: "Entertainment",
    merchant: "StreamingService",
    reference: "SUB-MONTHLY",
  },
  {
    id: "tx_5",
    amount: 2500.0,
    currency: "USD",
    type: "credit",
    status: "completed",
    description: "Freelance project",
    date: "2024-01-16T11:20:00Z",
    category: "Income",
    merchant: "Client Corp",
    reference: "INV-2024-015",
  },
];

// Generate mock products
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_1",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 199.99,
    stock: 45,
    status: "in_stock",
    rating: 4.5,
    reviews: 1234,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    description: "Premium wireless headphones with noise cancellation",
    brand: "TechBrand",
    sku: "TB-WH-001",
    createdAt: "2023-12-15T10:00:00Z",
  },
  {
    id: "prod_2",
    name: "Smartphone Case",
    category: "Accessories",
    price: 24.99,
    stock: 8,
    status: "low_stock",
    rating: 4.2,
    reviews: 567,
    image:
      "https://images.unsplash.com/photo-1601593346740-925612772716?w=200&h=200&fit=crop",
    description: "Protective case for latest smartphone models",
    brand: "ProtectPro",
    sku: "PP-SC-002",
    createdAt: "2024-01-10T14:30:00Z",
  },
  {
    id: "prod_3",
    name: "Laptop Stand",
    category: "Office",
    price: 79.99,
    stock: 0,
    status: "out_of_stock",
    rating: 4.7,
    reviews: 890,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
    description: "Adjustable aluminum laptop stand",
    brand: "OfficeMax",
    sku: "OM-LS-003",
    createdAt: "2023-11-22T09:15:00Z",
  },
  {
    id: "prod_4",
    name: "USB-C Hub",
    category: "Electronics",
    price: 49.99,
    stock: 156,
    status: "in_stock",
    rating: 4.3,
    reviews: 445,
    image:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=200&h=200&fit=crop",
    description: "7-in-1 USB-C hub with multiple ports",
    brand: "ConnectTech",
    sku: "CT-HUB-004",
    createdAt: "2024-01-05T16:20:00Z",
  },
];

// Generate mock orders
export const MOCK_ORDERS: Order[] = [
  {
    id: "ord_1",
    orderNumber: "ORD-2024-001",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    },
    items: 3,
    total: 324.97,
    status: "delivered",
    paymentStatus: "paid",
    orderDate: "2024-01-15T10:30:00Z",
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "TRK123456789",
  },
  {
    id: "ord_2",
    orderNumber: "ORD-2024-002",
    customer: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    },
    items: 1,
    total: 199.99,
    status: "shipped",
    paymentStatus: "paid",
    orderDate: "2024-01-18T14:20:00Z",
    shippingAddress: "456 Oak Ave, Toronto, ON M5H 2N2",
    trackingNumber: "TRK987654321",
  },
  {
    id: "ord_3",
    orderNumber: "ORD-2024-003",
    customer: {
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
    },
    items: 2,
    total: 129.98,
    status: "processing",
    paymentStatus: "paid",
    orderDate: "2024-01-19T09:15:00Z",
    shippingAddress: "789 Pine St, London, UK SW1A 1AA",
  },
  {
    id: "ord_4",
    orderNumber: "ORD-2024-004",
    customer: {
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
    },
    items: 5,
    total: 599.95,
    status: "pending",
    paymentStatus: "unpaid",
    orderDate: "2024-01-20T16:45:00Z",
    shippingAddress: "321 Beach Rd, Sydney, NSW 2000",
  },
];

// Helper functions for generating more data
export const generateMoreUsers = (count: number): User[] => {
  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "Support",
    "Design",
    "HR",
    "Finance",
  ];
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Australia",
    "Spain",
  ];
  const roles: User["role"][] = ["admin", "user", "moderator"];
  const statuses: User["status"][] = ["active", "inactive", "pending"];

  return Array.from({ length: count }, (_, i) => ({
    id: `user_${i + MOCK_USERS.length + 1}`,
    name: `User ${i + MOCK_USERS.length + 1}`,
    email: `user${i + MOCK_USERS.length + 1}@example.com`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    lastLogin: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
    department: departments[i % departments.length],
    salary: Math.floor(Math.random() * 100000) + 40000,
    age: Math.floor(Math.random() * 40) + 22,
    country: countries[i % countries.length],
    phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(
      Math.floor(Math.random() * 9000) + 1000
    )}`,
    isVerified: Math.random() > 0.3,
  }));
};

export const generateMoreTransactions = (count: number): Transaction[] => {
  const types: Transaction["type"][] = ["credit", "debit"];
  const statuses: Transaction["status"][] = ["completed", "pending", "failed"];
  const categories = [
    "Income",
    "Food & Dining",
    "Shopping",
    "Entertainment",
    "Transportation",
    "Utilities",
    "Healthcare",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `tx_${i + MOCK_TRANSACTIONS.length + 1}`,
    amount: Math.floor(Math.random() * 1000) + 10,
    currency: "USD",
    type: types[i % types.length],
    status: statuses[i % statuses.length],
    description: `Transaction ${i + MOCK_TRANSACTIONS.length + 1}`,
    date: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
    category: categories[i % categories.length],
    merchant: `Merchant ${i + 1}`,
    reference: `REF-${String(i + 1).padStart(6, "0")}`,
  }));
};

// Large dataset for performance testing
export const LARGE_USER_DATASET = [...MOCK_USERS, ...generateMoreUsers(10000)];
export const LARGE_TRANSACTION_DATASET = [
  ...MOCK_TRANSACTIONS,
  ...generateMoreTransactions(10000),
];
