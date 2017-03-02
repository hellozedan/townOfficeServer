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
           /* if(req.query.name){
                query.name={ "$regex": req.query.gosh, "$options": "i" };
            }*/
            if(req.query.gosh){
                query.gosh=req.query.gosh ;
            }

            if(req.query.helka){
                query.helka=req.query.helka;

            }

            if(req.query.megrash){
                query.megrash= req.query.megrash;
            }
            if(req.query.type && req.query.type!="none"  ){
                query.type= req.query.type;
            }
            if(req.query.isOld && req.query.isOld!="none"  ){
                query.isOld= req.query.isOld;
            }
            var result=[];
            var found=false;
            var find_id=false;
            var find_name=false;
            if(req.query.name && req.query.name!=""){
                find_name=true;
            }
            if(req.query.id && req.query.id!=""){
                find_id=true;
            }

            FormDetails.find(query).sort({'create_date': 'descending'}).exec(query, function (err, docs) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                } else {
                    if(find_name || find_id){
                        for(var i=0;i<docs.length;i++){
                            found=false;
                                for(var j=0;j<docs[i].table_details.length && found==false;j++){

                                    if(find_name && find_id){
                                        if(docs[i].table_details[j].col1.includes(req.query.name) && docs[i].table_details[j].col2==req.query.id){
                                            result.push(docs[i]);
                                            found=true;
                                        }

                                    }else if(find_name){
                                        if(docs[i].table_details[j].col1.includes(req.query.name)){
                                            result.push(docs[i]);
                                            found=true;
                                        }
                                    }
                                    else if(find_id){
                                        if(docs[i].table_details[j].col2==req.query.id){
                                            result.push(docs[i]);
                                            found=true;
                                        }
                                    }


                                }

                        }
                        res.status(200).json(result);

                    }
                    else{
                        res.status(200).json(docs);
                    }



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