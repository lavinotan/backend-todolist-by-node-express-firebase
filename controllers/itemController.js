'user strict';

const { db, firebase } = require("../db");

const CollectionName = "toDoItems";
const SubcollectionName = "lists";

const updateListName = async (req, res, next) => {
    const uid = req.uid;
    const list = req.body;
    console.log("updateListName: " + list.listName + ", listId: " + list.listId);
    try {
        const oriList = await db.collection(CollectionName).doc(uid).collection(SubcollectionName).doc(list.listId).get();

        if (oriList.listName !== list.listName) {
            await db.collection(CollectionName).doc(uid).collection(SubcollectionName).doc(list.listId).update({
                listName: list.listName
            });

            console.log("listName updated: " + oriList);
        }

        res.redirect("/api");
    } catch (error) {
        res.send(error.message);
    }
}

const getAllItems = async (req, res, next) => {
    const uid = req.uid;
    //console.log("uid (getAllItems): " + uid);
    try {
        const items = await db.collection(CollectionName).doc(uid);
        const data = await items.collection(SubcollectionName).get();
        const toDoLists = [];
        if (data.empty) {
            res.send(toDoLists);
            console.log("The collection is empty");
        } else {
            //console.log(data);
            data.forEach(doc => {
                toDoLists.push({
                    "id": doc.id,
                    "listName": doc.data().listName,
                    "items": doc.data().items
                });
            })
            res.send(toDoLists);
        }
    } catch (error) {
        res.send(error.message);
    }
}

const addItem = async (req, res, next) => {
    var data = req.body;
    const uid = req.uid;
    console.log("itemToAdd: " + data.listId + ", itemName: " + data.itemName);
    try {
        var listRef = await db.collection(CollectionName).doc(uid).collection(SubcollectionName).doc(data.listId);
        listRef.update({ items: firebase.firestore.FieldValue.arrayUnion(data.itemName) });
        res.redirect("/api");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteItem = async (req, res, next) => {
    var checkedItem = req.body;
    const uid = req.uid;
    console.log("deleteItem: " + checkedItem.listId);
    try {
        const listRef = await db.collection(CollectionName).doc(uid).collection(SubcollectionName).doc(checkedItem.listId);
        listRef.update({ items: firebase.firestore.FieldValue.arrayRemove(checkedItem.itemName) });
        //await firestore.collection(CollectionName).doc(checkedIem.id).delete();
        res.redirect("/api");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addList = async (req, res, next) => {
    var data = req.body;
    const uid = req.uid;
    console.log("listToAdd: " + data + " uid: " + uid);
    try {
        await db.collection(CollectionName).doc(uid).collection(SubcollectionName).doc().set(data);
        res.redirect("/api");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const removeList = async (req, res, next) => {
    var listToBeRemoved = req.body;
    const uid = req.uid
    console.log("listToBeRemoved: " + listToBeRemoved);

    try {
        await db.collection(CollectionName).doc(uid).collection(SubcollectionName).doc(listToBeRemoved.id).delete();
        res.redirect("/api");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllItems,
    addItem,
    deleteItem,
    updateListName,
    addList,
    removeList
}