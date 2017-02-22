/**
 * Created by kholod on 21/02/2017.
 */

var router = express.Router();

module.exports = function(FormDetails) {
    var controller = require('../controllers/form_details')(FormDetails);

    router.post('/create', controller.create);
    router.post('/edit', controller.edit);
    router.get('/getAllForms', controller.getAllForms);
    router.get('/getFormByID', controller.getFormByID);
    router.get('/getFormByQuery', controller.getFormByQuery);

    return router;
}
