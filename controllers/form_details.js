/**
 * Created by kholod on 21/02/2017.
 */


module.exports = function (FormDetails) {
    var controller = {

        getAllForms: function (req, res) {
            var query = {};

            FormDetails.find(query).sort({'create_date': 'descending'}).exec(query, function (err, docs) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                } else {
                    res.status(200).json(docs);
                }
            });
        },
        getFormByID: function (req, res) {

            var query={}
            FormDetails.findById( req.query._id).sort({'create_date': 'descending'}).exec(query, function (err, docs) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                } else {
                    res.status(200).json(docs);
                }
            });
        },
        create : function (req, res) {

            var form = new FormDetails(req.body);
            form.save(function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(400).json(err);
                } else {
                    console.log('no error');
                    res.status(201).json(form);
                }
            });



        },
        edit: function (req, res) {

            var doc = new FormDetails(req.body);
            var editDoc;
            if(doc._id) {
                editDoc=FormDetails.findById(doc._id);
                editDoc.update(doc,function (e) {
                    if (e) {
                        console.log('error: ' + e);
                        res.status(500).json(err);
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
        getFormByQuery: function (req, res) {
            var query={};
            if(req.query.name){
                query.name={ "$regex": req.query.gosh, "$options": "i" };
            }
            if(req.query.gosh){
                query.gosh={ "$regex": req.query.gosh, "$options": "i" };
            }

            if(req.query.helka){
                query.helka={ "$regex":  req.query.helka, "$options": "i" };

            }

            if(req.query.megrash){
                query.megrash= { "$regex": req.query.megrash, "$options": "i" };
            }
            if(req.query.type){
                query.type= req.query.type;
            }

            FormDetails.find(query).sort({'create_date': 'descending'}).exec(query, function (err, docs) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                } else {
                    res.status(200).json(docs);
                }
            });
        },
        getLast10Forms: function (req, res) {
            var query={};
            FormDetails.find(query).sort({'create_date': 'descending'}).limit(10).exec(query, function (err, docs) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                } else {
                    res.status(200).json(docs);
                }
            });
        },

        deleteFormById: function (req, res) {
            FormDetails.remove({_id:req.query._id},function (e) {
                if (e) {
                    console.log('error: ' + e);
                    res.status(500).json(e);
                } else {
                    res.status(201).json("deleted");
                }
            })
        }



    }

    return controller;
}