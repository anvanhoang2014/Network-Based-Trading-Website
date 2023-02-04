const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
        title: {type: String, required: [true, 'title is required']},
        category: {type: String, required: [true, 'category is required']},
        condition: {type: String, required: [true, 'condition is required']},
        seller: {type: Schema.Types.ObjectId, ref:'User'},
        description: {type: String, required: [true, 'description is required'],
            minlength: [20, 'the content should have at least 20 characters']},
        imageURL: {type: String, required: [true, 'image url is required']},
        status: {type: String, required: [true, 'status is required']}
    },
    {timestamps: true}
);

//collection name is offers in the database
module.exports = mongoose.model('Trade', tradeSchema);

/*
const { DateTime } = require("luxon");
const {v4: uuidv4} = require('uuid');
const items = [
    {
        id: '1',
        title: 'KEF Q350',
        category: 'Speaker',
        condition: 'Used',
        content: 'The remarkable Q Series bookshelf speakers excel when space is limited. Featuring the signature KEF Uni-Q driver array with Computational Fluid Dynamics (CFD) port design, the Q350s deliver detailed natural sound with high clarity and tight bass. A powerful 6.5 in. Driver delivers deep powerful bass perfect for movies, television, and music.',
        image: 'KEF_Q350.jpg',
        seller: 'An Hoang',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '2',
        title: 'Klipsch RP-600M',
        category: 'Speaker',
        condition: 'Used',
        content: 'Leveraging a 1" titanium tweeter matted to our proprietary hybrid Tractrix horn - the RP-600M bookshelf speakers deliver incredible acoustics to fill your home with loud, crystal-clear sound and robust bass.',
        image: 'KEF_Q350.jpg',
        seller: 'An Hoang',
        createdAt: DateTime.local(2021, 2, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '3',
        title: 'Polk Signature Elite ES60',
        category: 'Speaker',
        condition: 'Used',
        content: 'Polk Signature Elite ES60 features Dynamically Balanced Acoustic Array with its 2.5-Way Cascading Crossovers, a 1" Terylene Tweeter and (3) 6.5" Woofers that deliver room-filling, cinematic sound in a life-like soundstage',
        image: 'KEF_Q350.jpg',
        seller: 'An Hoang',
        createdAt: DateTime.local(2021, 2, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '4',
        title: 'Yamaha RX-V685',
        category: 'Receiver',
        condition: 'Used',
        content: 'Unrivaled Experiences. This 7.2-channel AV receiver boldly explores entertainment possibilities for an advanced home theater with the latest in video and audio including Dolby Atmos, DTS:X, wireless streaming, dual HDMI outputs and more.',
        image: 'KEF_Q350.jpg',
        seller: 'An Hoang',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '5',
        title: 'Denon AVR-S540BT',
        category: 'Receiver',
        condition: 'Used',
        content: 'The 5.2 channel AVR-S540BT features Dolby Vision, HDR, HLG and 4K Ultra HD video pass-thru with 5 HDMI inputs / 1 output. Stream your favorite music tracks wirelessly via Bluetooth. With our award-winning Denon Setup Assistant, the Denon AVR-S540BT is just as easy to setup as it is to enjoy.',
        image: 'KEF_Q350.jpg',
        seller: 'An Hoang',
        createdAt: DateTime.local(2021, 2, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '6',
        title: 'Sony STR-DH790',
        category: 'Receiver',
        condition: 'Used',
        content: 'Give your home entertainment system a cinematic upgrade with the STR-DH790 7.2ch AV receiver. Experience the same all-encompassing surround sound you get in movie theaters at home with Dolby Atmos and DTS:X support. eARC lets you enjoy these latest audio formats with one-cable HDMI connection from your compatible TV. Plus, superior picture quality to match with 4K HDR pass-through.',
        image: 'KEF_Q350.jpg',
        seller: 'An Hoang',
        createdAt: DateTime.local(2021, 2, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
    },
];


exports.find = function(){
    return items;
}

exports.findById = function(id) {
    return items.find(item=>item.id === id);
};

exports.save = function (item) {
    item.id = uuidv4();
    item.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    items.push(item);
}

exports.updateById = function(id, newItem) {
    let item = items.find(item=>item.id === id);
    if (item) {
        item.title = newItem.title;
        item.content = newItem.content;
        item.category = newItem.category;
        item.condition = newItem.condition;
        item.seller = newItem.seller;
        return true;
    } else {
        return false;
    }
}

exports.deleteById = function(id) {
    let index = items.findIndex(item =>item.id === id);
    if(index !== -1) {
        items.splice(index, 1);
        return true;
    } else {
        return false;
    }
}
 */
