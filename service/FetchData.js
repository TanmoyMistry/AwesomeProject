const URI = 'https://customerapp.toniapharmacy.com.ng/dev/api/authentication';

export default {
    async fetchUsers() {
        try {
                let response = await fetch(URI + '/get_issue');
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    }
}