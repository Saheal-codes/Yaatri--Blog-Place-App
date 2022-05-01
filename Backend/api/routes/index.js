const usercontroller = require("../controllers/usercontroller");
const router = require("express").Router();
const placecontroller = require("../controllers/placecontroller");
const authmiddleware = require("../middleware/authmiddleware");
const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: __dirname + "../../uploads",
  filename: (req, file, cb) => {
    var filename =
      file.fieldname + "_" + Date.now() + path.extname(file.originalname);
    req.body.imagelink = filename;
    cb(null, filename);
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});

router.post("/login/", usercontroller.login);
router.post("/register/", imageUpload.any(), usercontroller.register);
router.post(
  "/verify/",
  authmiddleware.verifysess,
  usercontroller.verifysession
);

router.post(
  "/addnewplace/",
  imageUpload.any(),
  authmiddleware.verifysess,
  placecontroller.newplace
);
router.delete("/deleteplace/", placecontroller.deleteplace);
router.delete("/deleteplace/:placeid", placecontroller.deleteplace);
router.put("/updateplace/", placecontroller.Updateplace);
router.post(
  "/userplaces/",
  authmiddleware.verifysess,
  placecontroller.getplaces
);

router.post("/users/", usercontroller.fetchuser);
router.post("/users/:data", usercontroller.fetchuserdata);

module.exports = router;
