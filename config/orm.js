var connection = require("../config/connection");

function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = " ' " + value + " ' ";
            }
            arr.push(key + "=" + value);
        }
    }

    return arr.toString();
};

var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    insertOne: function (table, column, values, cb) {
        var queryString = `INSERT INTO ${table} ( ${column.toString()} ) VALUES (?, ?)`;

        console.log("Insert one : ");
        console.log(queryString);

        connection.query(queryString, function (err, results) {
            if (err) throw err;
            cb(result);
        });
    },

    updateOne: function (table, columnValues, condition, cb) {
        var queryString = `UPDATE ${table} SET ${objToSql(columnValues)} WHERE ${condition}`;

        console.log("UPDATE ONE");
        console.log(queryString);

        connection.query(queryString, function (err, result) {
            if (err) throw err;
            cb(result);
        })
    }
};


module.exports = orm;