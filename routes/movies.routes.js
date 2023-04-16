// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
//GET all movies
router.get("/", (req,res) =>{

});
//GET a specific movie
router.get("/:id",(req,res)=>{

});
//POST a new movie
router.post("/", (req,res)=>{

});
//PUT an updated movie
router.put ("/:id",(req,res)=>{

});
//DELETE a movie 
router.delete("/:id",(req,res)=>{

});

module.exports = router;