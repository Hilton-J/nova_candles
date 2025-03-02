export interface UserInfo {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface AuthState {
  userInfo: UserInfo | null;
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
  price: number;
  size: string;
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
  quantity: number;
  items: string[];
  totalAmount: number;
  userId: string;
  diliveryAddress: IAddress;
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
  _id: string;
  recipientName: string;
  recipientCellNumber: string;
  streetAddress: string;
  complex: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  cellPhoneNo: string;
  password: string;
  role: string;
  shipToAddress: IAddress[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  productId: Partial<IProduct>;
  quantity: number;
  price: number;
}

export interface ICart {
  _id: string;
  user: string;
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
  openCart: boolean;
  toggleDrawer: () => void;
  cart?: ICart;
}
