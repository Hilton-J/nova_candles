import Order from '../models/orderModel.mjs';
import { deleteOneDoc, getAllDocs } from '../services/crudHandlerFactory.mjs';
import { getByCustomerHandler, orderCreateHandler } from '../services/orderService.mjs';

export const getAllOrders = getAllDocs(Order);
export const deleteOrder = deleteOneDoc(Order);
export const placeOrder = orderCreateHandler(Order);
export const getOrdersByCustomer = getByCustomerHandler(Order);