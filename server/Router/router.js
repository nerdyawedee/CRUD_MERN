const express = require('express');
const router = express.Router();
const users = require('../Modal/userschema');

router.get("/getdata", async (req, res) => {
    try {
        const userdata = await users.find();
        res.status(200).json(userdata);  // Return the fetched data
        console.log(userdata);
    } catch (error) {
        res.status(404).json({ error: 'Error fetching data' });
        console.log("Not able to fetch the data", error);
    }
});

router.post("/register", async (req, res) => {
    try {
        const { name, email, age, mobile, add, desc } = req.body;

        if (!name || !email || !age || !add || !desc) {
            return res.status(500).json("fill the required data");
        }

        const isalready = await users.findOne({ email: email });
        if (isalready) {
            return res.status(500).json("already exist");
        }

        const newUser = new users({
            name, email, age, mobile, add, desc
        });

        await newUser.save();
        res.status(201).json(newUser)
        console.log(newUser);

    } catch (error) {
        console.log("not able to create end point", error);
    }
})

router.delete("/deleteuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteuser = await users.findByIdAndDelete({ _id: id });
        res.status(201).json("user is deleted");
        console.log(deleteuser);
    } catch (error) {
        res.status(404).json({error:'not able to delete'});
        console.log("Error in deleteing data",error);
    }

})
router.get("/getuser/:id", async (req, res) => {
    try {
         // Log the value of the "id" parameter
         
        const { id } = req.params;
        console.log(id);
        const userindivisual = await users.findById({_id:id});
        console.log(userindivisual);
        res.status(201).json(userindivisual);
    } catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
});
router.patch("/update/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const updateuser = await users.findByIdAndUpdate(id,req.body,{
            new : true
        })
        console.log(updateuser);
        res.status(201).json(updateuser);
    }catch(error){
        console.log(error);
        res.status(422).json(error);
    }
})

module.exports = router;