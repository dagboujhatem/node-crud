const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const options = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false
};
mongoose.connect('mongodb://localhost:27017/userapp', options)
.then((success) => {
    console.log("=> Successfull connection to database.")
}).catch((error) => {
    console.log("=> Connect with error.")
});
