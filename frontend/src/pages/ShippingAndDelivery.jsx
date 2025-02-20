import React from 'react'

const ShippingAndDelivery = () => {
  return (
    <div className='privacy_head pr-2 md:pr-40 border-t-2 pt-4'>
      <h1 className='text-2xl font-medium mb-2'>Shipping and Delivery Policy – Ink Dapper</h1>
      <p className='text-gray-600'></p>

      <div className='sub_privacy mt-6'>
        <h2 className='text-lg font-medium mb-2'>1. Order Processing</h2>
        <div className='text-gray-600'>

          <p className='mt-2'>All orders are processed within 2 to 3 business days (excluding weekends and holidays) after payment confirmation.</p>
          <p className='mt-2'>Custom and personalized orders may require additional processing time. Customers will be notified of any delays.</p>
        </div>
      </div>

      <div className='sub_privacy mt-6'>
        <h2 className='text-lg font-medium mb-2'>2. Shipping Methods and Delivery Time</h2>
        <div className='text-gray-600'>
          <p className='mt-2'>We offer multiple shipping options, including standard and express delivery.</p>
          <p className='mt-2'>Estimated delivery times vary based on location and the shipping method chosen at checkout:
          </p>
            <ul className='mt-2 flex flex-col gap-1 ml-8 list-disc'>
              <li><span className='font-medium'>Standard Shipping:</span> 5 to 7 business days.</li>
              <li><span className='font-medium'>Express Shipping:</span> 3 to 5 business days.</li>
            </ul>
          <p className='mt-2'>International orders may take longer due to customs clearance and local postal service delays.</p>
        </div>
      </div>

      <div className='sub_privacy mt-6'>
        <h2 className='text-lg font-medium mb-2'>3. Shipping Costs</h2>
        <div className='text-gray-600'>

          <p className='mt-2'>Shipping charges are calculated at checkout based on the shipping destination and chosen delivery method.</p>
          <p className='mt-2'>Free shipping may be available for orders over Rs.999 amount.</p>
        </div>
      </div>

      <div className='sub_privacy mt-6'>
        <h2 className='text-lg font-medium mb-2'>4. Order Tracking</h2>
        <div className='text-gray-600'>

          <p className='mt-2'>Once an order is shipped, customers will receive a tracking number via email.</p>
          <p className='mt-2'>Customers can track their order through the provided tracking link.</p>
        </div>
      </div>

      <div className='sub_privacy mt-6'>
        <h2 className='text-lg font-medium mb-2'>5. Shipping Restrictions</h2>
        <div className='text-gray-600'>

          <p className='mt-2'> We currently ship to India only. If your location is not listed, please contact us before placing an order.</p>
          <p className='mt-2'> We do not ship to <span className='font-medium'>P.O. Boxes, APO/FPO addresses</span>, or restricted areas.</p>
        </div>
      </div>

      <div className='sub_privacy mt-6'>
        <h2 className='text-lg font-medium mb-2'>6. Customs, Duties, and Taxes</h2>
        <div className='text-gray-600'>

          <p className='mt-2'> International customers are responsible for any customs duties, import taxes, or other fees imposed by their country’s customs regulations.</p>
          <p className='mt-2'> Ink Dapper is not responsible for delays due to customs clearance procedures.</p>
        </div>
      </div>

      <div className='sub_privacy mt-6'>
        <h2 className='text-lg font-medium mb-2'>7. Lost or Delayed Shipments</h2>
        <div className='text-gray-600'>

          <p className='mt-2'> If your order is delayed beyond the estimated delivery timeframe, please contact the shipping carrier first. If the issue persists, contact us for assistance.</p>
          <p className='mt-2'> Ink Dapper is not responsible for lost packages due to incorrect shipping addresses provided by the customer.</p>
        </div>
      </div>

      <div className='sub_privacy mt-6'>
        <h2 className='text-lg font-medium mb-2'>8. Undeliverable or Returned Packages</h2>
        <div className='text-gray-600'>

          <p className='mt-2'> If a package is returned due to an incorrect address, unclaimed delivery, or refusal, customers may be responsible for additional shipping fees to resend the package.</p>
        </div>
      </div>

      <div className='sub_privacy mt-8'>
        <h2 className='text-2xl font-medium mb-2'>Contact Us</h2>
        <p className='mt-2 text-gray-600'>If you have any questions or concerns about our Cancellation and Refund Policy, please contact us at:</p>
        <p className='mt-2 text-gray-600'>📧 Email: <a className='text-gray-900' href="mailto:support@inkdapper.com">support@inkdapper.com</a></p>
        <p className='mt-2 text-gray-600'>🌐 Website: <a className='text-gray-900' href="https://www.inkdapper.com">www.inkdapper.com</a></p>

        <p className='text-lg font-medium mt-2'>Ink Dapper – Your Style, Your Privacy.</p>
      </div>
    </div>
  )
}

export default ShippingAndDelivery