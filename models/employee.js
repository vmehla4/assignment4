var mongoose = require('mongoose');
var Schema = mongoose.Schema;
EmpSchema = new Schema({
    name : String,
    salary : Number,
	age : Number
});
module.exports = mongoose.model('Employee', EmpSchema);
