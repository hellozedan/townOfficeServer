var form_details = new mongoose.Schema({
    create_date: { type: Date, default: Date.now },
    date:{ type: Date},
    name: { //it will be the same as number and you can change it
        type:String
    },

    order: Number,
    type: { type: String},
    type_he: { type: String},
    active: {type:Boolean, default:true},
    gosh:{type:String},
    helka:{type:String},
    megrash:{type:String},
    table_details: [{
        col1: {type: String},
        col2: {type: String},
        col3: {type: String},
        col4: {type: String},
        col5: {type: String},
        col6: {type: String},
        col7: {type: String}
    }]
});

//Compound indexes



//Set increment index for order
form_details.plugin(
    autoIncrement.plugin,
    {
        model: 'form_details',
        field: 'order',
        startAt: 87
    }
);

module.exports = mongoose.model('form_details', form_details);