const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchSchema = new Schema({
        watcher: {type: Schema.Types.ObjectId, ref:'User'},
        item: {type: Schema.Types.ObjectId, ref:'User'},
    },
);


module.exports = mongoose.model('Watch', watchSchema);