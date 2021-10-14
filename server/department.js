var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//MODELO DO MONGOOSE.
var departmentSchema = new Schema({
  name: String,
  product: String
})

module.exports = mongoose.model("Department", departmentSchema);
