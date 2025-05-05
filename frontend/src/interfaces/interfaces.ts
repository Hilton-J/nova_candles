export interface UserInfo {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface AuthState {
  userInfo: IUser | null;
}

export interface ApiResponce<T> {
  page: number;
  results: T[];
  totalPages: number;
  totalResults: number;
}

export interface IReview {
  userId: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface IProduct {
  _id: string;
  productName: string;
  description: string;
  price: {
    small: number;
    medium: number;
    large: number;
  };
  fragrance: string;
  stock: number;
  type: string;
  images: string[];
  reviews: IReview[];
  createdAt?: string;
  updatedAt?: string;
}

//TODO: This interface is bound to change, specifically the diliveryAddress field
export interface IOrder {
  _id: string;
  orderNumber: string;
  orderDate: string;
  items: [
    {
      productId: string;
      productName: string;
      quantity: number;
      price: number;
      _id: string;
    }
  ];
  status: string;
  totalPrice: number;
  userId: string;
  diliveryAddress: IAddress;
  billingAddress: IAddress;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPayment {
  _id: string;
  orderId: string;
  userId: string;
  paymentMethod: string;
  cardBrand: string;
  last4Digits: string;
  status: string;
  amount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAddress {
  _id?: string;
  recipientName: string;
  recipientLastName: string;
  recipientPhoneNumber: string;
  streetAddress: string;
  apartment: string;
  city: string;
  province: string;
  postalCode: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface IUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  // password?: string;
  role?: string;
  shipToAddress?: IAddress[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  fragrance: string;
  productName: string;
  size: string;
  image: string;
}

export interface ICart {
  _id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IMutationResponse<T = void> {
  success: boolean;
  message: string;
  results?: T;
}

export interface OutletContext {
  setOpenLoginModal: (isOpen: boolean) => void;
}

export interface CartProps {
  openCart?: boolean;
  toggleDrawer: () => void;
  cart?: ICart;
}
