var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static( __dirname + '/sample-app/dist/sample-app' ));
app.set("views", path.join(__dirname, "./views"));

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ProductManager");

var ProductSchema = new mongoose.Schema(
    {
    title:{
        type: String, 
        required: [true, 'Title is required.'], 
        minlength: [3, 'Title must be at least 3 characters.'],
        trim: true
        },
    price: { 
        type: Number, 
        required: [true, 'Price is required.'], 
    },
    url:{
        type: String,
        default: '',
        // validate: {
        //     validator: function (value) {
        //         return /(https?:\/\/.*\.(?:png|jpg))/i.test(value);
        //     },
        //     message: "Enter a valid image URL."
        // },

    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
    }, 
    {
    timestamps: true
    });

mongoose.model("Product", ProductSchema);
var Product = mongoose.model("Product");
mongoose.Promise = global.Promise;

app.get('/products', function(request,response){
    Product.find({}, function(error, data){
        if(error){
            console.log(error);
            response.json(error);
        } else {
            console.log(data);
            response.json(data)
        }
    });
});

app.get('/products/:id', function(request, response){
    console.log(request.params.id);
    Product.findOne({
        _id: request.params.id
    },
    function(error, product){
        if(error){
            console.log(error);
            response.json(error);
        } else {
            console.log(product);
            response.json({product:product})
        };
    });
});

app.post('/products', function(request, response){
    console.log("AT POST DATA OF products : " + request.body);
    var product = new Product({
        title: request.body.title,
        price: request.body.price,
        url: request.body.url
    });
    product.save(function (error, data){
        if(error){
            console.log(error);
            response.json(error);
        } else {
            console.log(data);
            response.json(data)
        };
    });
});

app.put('/products/:id', function(request, response){
    Product.findByIdAndUpdate({ _id: request.params.id }, {$set: {title: request.body.title, price: request.body.price, url: request.body.url}}, {new:true, runValidators: true} , function (error, product) {
        if (error) {
            response.json(error)
        } else {
            response.json({ message: "Success", data: product })
        }
    })
    });


app.delete('/products/:id', function(request, response){
    console.log(request.params.id);
    Product.remove({
        _id: request.params.id
    }, function(error){
        if(error){
            console.log(error);
            response.json({
                message: "Error at REMOVE by ID Route",
                error: error
            });
        } else {
            console.log("REMOVED prod by ID.");
            response.json({
                message: "REMOVED prod by ID.",
            });
        };
    });
});

app.listen(8000, function(){
    console.log("LISTENING on Port 8000!");
});



// this route will be triggered if any of the routes above did not match
app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./sample-app/dist/sample-app/index.html"))
});
