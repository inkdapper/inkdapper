import React from 'react';

const OrderProgress = ({ item }) => {
  const orderLoadingOne = 20; // Example values, set according to your needs
  const orderLoadingTwo = 40;
  const orderLoadingThree = 60;
  const orderLoadingFour = 80;
  const orderLoadingFive = 100;

  const width = item.status === 'Order placed' ? orderLoadingOne :
                item.status === 'Packing' ? orderLoadingTwo :
                item.status === 'Shipped' ? orderLoadingThree :
                item.status === 'Out for delivery' ? orderLoadingFour :
                item.status === 'Delivered' ? orderLoadingFive : orderLoadingOne;

                const backgroundColor = item.status === 'Order placed' ? '#FFB26F' :
                              item.status === 'Packing' ? '#FAB12F' :
                              item.status === 'Shipped' ? '#FC8F54' :
                              item.status === 'Out for delivery' ? '#FA812F' :
                              item.status === 'Delivered' ? '#FA4032' : '#FFB26F';

  return (
    <div className="progress-container">
      <div className="h-1 rounded-full" style={{
          width: `${width}%`,
          transition: 'width 0.5s ease-in-out', // Add transition for smooth animation
          backgroundColor: `${backgroundColor}` // Set your desired background color
        }}>
      </div>
    </div>
  );
};

export default OrderProgress;