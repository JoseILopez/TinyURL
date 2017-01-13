/*
**  EXPRESS Configuration
*/

const cors = require('cors');
const bodyParser = require('body-parser');


const shortURLroutesGET = require('../app/routes/shortURLsGET');
const shortURLroutesPOST = require('../app/routes/shortURLsPOST');
const shortURLroutesPUT = require('../app/routes/shortURLsPUT');
const shortURLroutesDELETE = require('../app/routes/shortURLsDELETE');
const shortURLroutesPURGE = require('../app/routes/shortURLsPURGE');

const indexRoute = require('../app/routes/index');
const redirectRoute = require('../app/routes/redirect');

function configExpress(app) {

  // Request body parsing

  app.use(bodyParser.json());

  // CORS

  app.use(cors());

  // Routing

  app.use('/', shortURLroutesGET);
  app.use('/', shortURLroutesPOST);
  app.use('/', shortURLroutesPUT);
  app.use('/', shortURLroutesDELETE);
  app.use('/', shortURLroutesPURGE);
  app.use('/', indexRoute);
  app.use('/', redirectRoute);
}


module.exports = configExpress;
