import React, { useContext, useState } from 'react';
import { currency } from '../App';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const Orders = () => {
  const { orders, statusHandler } = useContext(ShopContext);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterOrderId, setFilterOrderId] = useState('');

  const onPrintClick = (orderId) => {
    const order = orders.find((order) => order._id === orderId);
    setSelectedOrder(order);
    setOpen(true);
  }

  function printSection(sectionId) {
    const section = document.getElementById(sectionId);
    const printWindow = window.open('', 'Order', 'height=500,width=800');
    printWindow.document.write('</head><body>');
    printWindow.document.write(section.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }
  const handleClose = () => {
    setOpen(false);
  };

  const filteredOrders = orders.filter(order => order._id.includes(filterOrderId));

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div>
          <h3 className='font-semibold mt-3 text-2xl mb-3'>Order Page</h3>
          <div className='mb-4'>
            <input
              type='text'
              placeholder='Filter by Order ID'
              value={filterOrderId}
              onChange={(e) => setFilterOrderId(e.target.value)}
              className='border p-2 rounded'
            />
          </div>
        </div>
        <div>
          <Link to='/complete-delivery'>
            <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>Order Delivered</button>
          </Link>
        </div>
      </div>
      <div>
        {
          filteredOrders.map((order, index) => (
            console.log(order),
            order.status !== "Delivered" && order.returnOrderStatus === "Order Placed" && (
              <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
                <img className='w-12' src={assets.parcel_icon} alt="" />
                <div>
                  <div>
                    {
                      <b className='mb-4'>Order Id : <span className='font-normal'>{order._id}</span></b>
                    }
                    {
                      order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                          return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.size} </span></p>
                        } else {
                          return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.size} </span>,</p>
                        }
                      })
                    }
                  </div>
                  <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                  <div>
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
                  </div>
                  <p>{order.address.phone}</p>
                </div>
                <div>
                  <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                  <p className='mt-3'>Method : {order.paymentMethod}</p>
                  <p className='mt-2'>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                  <p className='mt-2'>Order Placed Date : <span>{new Date(order.date).toLocaleDateString()}</span></p>
                  {order.status === "Delivered" && (
                    <p>Delivered Date: {new Date(order.deliveryDate).toLocaleDateString()}</p>
                  )}
                </div>
                <div>
                  <p className='text-sm sm:text-[15px]'>Total Amount :</p>
                  <p className='text-2xl pt-1 font-medium'>{currency} {order.amount}</p>
                </div>
                <div>
                  {order.returnOrderStatus === "Order Placed" ?
                    <FormControl sx={{ m: 0, minWidth: 200 }} size="small">
                      <Select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                        <MenuItem value="Order Placed">Order Placed</MenuItem>
                        <MenuItem value="Packing">Packing</MenuItem>
                        <MenuItem value="Shipped">Shipped</MenuItem>
                        <MenuItem value="Out for delivery">Out for delivery</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                      </Select>
                    </FormControl> :
                    (order.returnOrderStatus === "Order Returned" ? <p className='text-red-500'>Return Order Initiated</p> :
                      order.returnOrderStatus === "Return Confirmed" ? <p className='font-medium text-lg text-red-500'>Return Order Completed</p> :
                        order.returnOrderStatus === "Order Cancelled" ? <p className='font-medium text-lg text-red-500'>Order Cancelled</p> :
                        order.returnOrderStatus === "Cancel Confirmed" ? <p className='font-medium text-lg text-red-500'>Cancel Completed</p> :
                          <p className='font-medium text-lg text-red-500'>Return Order Initiated</p>)
                  }
                  {order.returnOrderStatus === "Order Placed" ?
                    <div onClick={() => onPrintClick(order._id)} className='bg-gray-600 mt-4 text-white px-5 py-2 sm:px-7 text-center sm:py-2 rounded-sm text-xs sm:text-base cursor-pointer'>Print</div> : null}
                </div>
              </div>
            )
          ))
        }
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {selectedOrder && (
              <div id="printable-section">
                <div className='font-bold mb-4'><strong style={{ fontSize: "25px" }}>Order Summary :</strong></div>
                <div><strong>Order ID:</strong> {selectedOrder._id}</div>
                <div><strong>Order Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</div>

                <div className=''><strong>Items:</strong></div>
                <ul>
                  {selectedOrder.items.map((item, index) => (
                    <li key={index} className='list-none'>
                      {item.name} x {item.quantity} ({item.size})
                    </li>
                  ))}
                </ul>

                <div><strong>Total Amount:</strong> {currency} {selectedOrder.amount} (Inclusive of All Tax)</div>
                <div><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</div>
                <div><strong>Payment Status:</strong> {selectedOrder.payment ? 'Done' : 'Pending'}</div>

                <div className=''><strong>Shipping Address :</strong></div>
                <div>{selectedOrder.address.firstName} {selectedOrder.address.lastName}</div>
                <div>{selectedOrder.address.street},<br /> {selectedOrder.address.city}, {selectedOrder.address.state}, {selectedOrder.address.zipcode},<br />{selectedOrder.address.country}. </div>
                <div><strong>Phone:</strong> {selectedOrder.address.phone}</div>

                <div className=''><strong>Billing Address :</strong><br />
                  <span>Ink Dapper</span><br />
                  <span>1/1, Bazaar Street, Vettuvanam</span><br />
                  <span>Vellore, Tamil Nadu, 635809</span><br />
                  <span>India.</span><br />
                  <span><strong>Email:</strong>support@inkdapper.com</span><br />
                </div>
              </div>
            )}
            <button onClick={() => printSection("printable-section")} className='bg-gray-600 mt-4 text-white px-5 py-2 sm:px-7 text-center sm:py-2 rounded-sm text-xs sm:text-base cursor-pointer'>Print Order Summary</button>
          </DialogContentText>
        </DialogContent>
        <DialogActions className='bg-gray-600 mt-4 text-white px-2 py-2 sm:px-2 text-center sm:py-0 rounded-sm text-xs sm:text-base cursor-pointer w-20'>
          <Button onClick={handleClose} color="white">
            X
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Orders