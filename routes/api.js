const express = require("express");
const router = express.Router();
const { getAllItems, addItem, deleteItem, updateListName, addList, removeList } = require("../controllers/itemController");

router.get("/", getAllItems);

router.post("/add", addItem);
router.post("/delete", deleteItem);
router.post("/addList", addList);
router.post("/removeList", removeList);
router.post("/updateList", updateListName)


module.exports = router;