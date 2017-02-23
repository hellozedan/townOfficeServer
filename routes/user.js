/**
 * Created by kholod on 21/02/2017.
 */

var router = express.Router();

module.exports = function(Users) {
    var controller = require('../controllers/user')(Users);

    router.post('/create', controller.create);
    router.post('/edit', controller.edit);
    router.get('/getAllUsers', controller.getAllUsers);
    router.get('/getUserByID', controller.getUserByID);
    router.get('/getUserByUsername', controller.getUserByUsername);
    return router;
}
