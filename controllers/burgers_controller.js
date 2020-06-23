var express = require("express");
var router = express.Router();

var burger = require("../models/burger");

router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var burgerObject = { burgers: data };

        console.log("select all: ")
        console.log(burgerObject);

        res.render("index", burgerObject);
    });
});

router.post("/api/burgers", function (req, res) {
    burger.insertOne(["burger_name", "devoured"] , [req.body.burger_name, req.body.devoured],
    function (result) {
        console.log("post router is working")
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = `id = ${req.params.id}`;

    console.log("condition: ");
    console.log(condition);

    burger.updateOne({ devoured: req.body.devoured }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        };
    });
});

module.exports = router;