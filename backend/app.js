const express = require('express');
const cors = require('cors');
const app = express();
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRouter');
const memberRoutes = require('./routes/memberRouter');
const path = require('path')

app.use(express.json());
app.use(cors());
app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/member', memberRoutes);


// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,"../frontend","views","login.html"))
// })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
