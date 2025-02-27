import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const BannerList = ({ token }) => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/banner-list", { headers: { token } });
      if (response.data.success) {
        setBanners(response.data.banners);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const deleteBanner = async (id) => {
    try {
      const response = await axios.delete(backendUrl + `/api/product/delete-banner/${id}`, { headers: { token } });
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchBanners(); // Refresh the banner list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const editBanner = (id) => {
    // Implement edit functionality here
    // You can navigate to an edit page or open a modal with the banner details
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Banner List</h2>
      <div className="grid grid-cols-1 gap-4">
        {banners.map((banner, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded">
            <img src={banner.imageBanner[0]} alt={`Banner ${index + 1}`} className="w-20 h-20 object-cover" />
            <div className="flex gap-2">
              <button onClick={() => editBanner(banner._id)} className="px-4 py-2 bg-blue-500 text-white rounded">Edit</button>
              <button onClick={() => deleteBanner(banner._id)} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerList;