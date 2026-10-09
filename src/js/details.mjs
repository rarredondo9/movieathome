import ExternalServices from './ExternalServices.mjs';
import MovieDetails from './MovieDetails.mjs';
import { qs, getParam} from './utils.mjs';

const services = new ExternalServices();
const details = new MovieDetails(
    getParam('type'),
    getParam('id'),
    qs('#details'),
    qs('#status'),
    services
);

details.init();