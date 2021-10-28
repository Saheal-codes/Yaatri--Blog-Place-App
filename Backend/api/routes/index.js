const router = require("express").Router()
const BlogController = require("../controllers/blogcontroller")

router.post("/blogs/create/",BlogController.create_blog)
router.get("/blogs/read/:blog_id",BlogController.read_blog)
router.post("/blogs/readall/",BlogController.read_all_blogs)
router.put("/blogs/update/:blog_id",BlogController.update_blog)
router.delete("/blogs/delete/:blog_id",BlogController.delete_blog)

module.exports=router

