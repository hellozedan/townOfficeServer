var user = new mongoose.Schema({
    create_date: { type: Date, default: Date.now },
    username: {type:String},
    password: {type:String},
    active: {type:Boolean, default:true},
    isAdmin: {type:Boolean, default:false},
    Organization:{type:String, default:'organization1'}
});

module.exports = mongoose.model('user', user);