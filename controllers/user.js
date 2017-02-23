/**
 * Created by kholod on 21/02/2017.
 */


module.exports = function (Users) {
    var controller = {

        getAllUsers: function (req, res) {
            var query = {};

            Users.find(query).sort({'create_date': 'descending'}).exec(query, function (err, docs) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                } else {
                    res.status(200).json(docs);
                }
            });
        },
        getUserByID: function (req, res) {

            var query={}
            Users.findById( req.query._id).sort({'create_date': 'descending'}).exec(query, function (err, docs) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                } else {
                    res.status(200).json(docs);
                }
            });
        },
        create : function (req, res) {

            var user = new Users(req.body);
            user.save(function (e) {
                    if (e) {
                        console.log('error: ' + e);
                        res.status(400).json(e);
                    } else {
                        console.log('no error');
                        res.status(201).json(user);
                    }
                });



        },
        edit: function (req, res) {

            var doc = new Users(req.body);
            var editDoc;
            if(doc._id) {
                editDoc= Users.findById(doc._id);
                editDoc.update(doc,function (e) {
                    if (e) {
                        console.log('error: ' + e);
                        res.status(500).json(e);
                    } else {
                        console.log('no error');
                        res.status(201).json(doc);
                    }
                });
            }

            else{
                res.status(500).send(err);

            }


        },
        getUserByUsername: function (req, res) {

            var query={};
            if(req.query.username) {
                query.username =req.query.username;
                Users.findOne(query).exec(query, function (err, personFound) {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                    } else {

                        if(personFound==null){
                            res.status(500).send("Invalid Username");

                        }
                        else if(!personFound.password){
                            res.status(500).send("Invalid PassWord");
                        }
                        else if(personFound.password==req.query.password) {

                            res.status(200).send(personFound);
                        }
                        else{
                            res.status(500).send("Invalid Password");
                        }
                    }
                });
            }else{
                res.status(500).json("no username");
            }

        }



    }

    return controller;
}