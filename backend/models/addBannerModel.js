import mongoose from 'mongoose';

const addBannerSchema = new mongoose.Schema({
  imageBanner: {type: Array, required: true}
});

const AddBannerModel = mongoose.models.addBanner || mongoose.model('addBanner', addBannerSchema);

export default AddBannerModel;