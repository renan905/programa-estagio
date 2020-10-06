import Axios from "axios";

import axios from 'axios'

export default function api() {
    axios.post(
        'http://api.olhovivo.sptrans.com.br/v2.1' + '/Login/Autenticar?token=' + '76bd104cd2796d33c0b675d8e9e0bd8527b89c820f3cc01da33863d91ff7ab3b'
    ).then(res => {
        console.log(res);
    });
}