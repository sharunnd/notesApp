const express = require("express")
const { auth } = require("../middleware/auth.middleware")
const { NoteModel } = require("../models/notes.model")

const notesRouter = express.Router()

notesRouter.post("/create",auth, async(req,res)=>{
     
    try {
        const note = new NoteModel(req.body)
        await note.save()
        res.json({msg:"New note has been added"})
    } catch (error) {
        res.json({error:error.message})
    }
})

notesRouter.get("/",auth, async(req,res)=>{
     
    try {
        const notes = await NoteModel.find({userID:req.body.userID})
        res.json(notes)
    } catch (error) {
        res.json({error:error.message})
    }
})

notesRouter.patch("/update/:id",auth, async(req,res)=>{
     const {id} = req.params;
     const useridindoc = req.body.userID
    try {
        const note = await NoteModel.findOne({_id:id})
        const noteidindoc = note.userID
        if(useridindoc === noteidindoc){
            await NoteModel.findByIdAndUpdate({_id:id},req.body)
            res.json({msg:"note has been updated",note})
        }else{
            res.json({msg:"not authorized"}) 
        }
    } catch (error) {
        res.json({error:error.message})
    }
})

notesRouter.delete("/delete/:id",auth, async(req,res)=>{
    const {id} = req.params;
    const useridindoc = req.body.userID
    try {
        const note = await NoteModel.findOne({_id:id})
        const noteidindoc = note.userID
        if(useridindoc === noteidindoc){
            await NoteModel.findByIdAndDelete({_id:id})
            res.json({msg:"note has been deleted"})
        }else{
            res.json({msg:"not authorized"}) 
        }
    } catch (error) {
        res.json({error:error.message})
    }
})

module.exports = {
    notesRouter
}