const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
        buyer: {type: Schema.Types.ObjectId, ref:'User'},
        buyerItem: {type: Schema.Types.ObjectId, ref:'User'},
        sellerItem: {type: Schema.Types.ObjectId, ref:'User'},
        status: {type: String, required: [true, 'Status of item is required']},
    },

);

//collection name is offers in the database
module.exports = mongoose.model('Offer', offerSchema);