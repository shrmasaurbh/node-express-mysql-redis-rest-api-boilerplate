const esClient = require('../../config/esconfig');


module.exports = {

	async getAutocomplete(queryStr) {
        var restResponse = {};
        var queryString = queryStr.trim().replace(/-/g, "");
        queryString = queryString.replace(/[()]/g, ' ');
        var error = {	is_error:0};
        try{
        	const esResponse = await new Promise(function(resolve, reject) { 
		        esClient.search({
		            "index": "homesfy_search",
		            "type": "projects",
		            "body": {
		                "query": {
		                    "bool": {
		                        "must": {
		                            "multi_match": {
		                                "fields": ["tags"],
		                                "query": queryString.toLowerCase(),
		                                "analyzer": "standard",
		                                "operator": "and",
		                                // "fuzziness": "AUTO"
		                            }
		                        },
		                        /*"filter": {
		                            "bool": {
		                                "must": [{
		                                    "term": {
		                                        "is_active": 1
		                                    }
		                                }]
		                            }
		                        }*/
		                    }
		                }
		            }
		        },function(error, results, fields) {
	                if (error) {
	                    reject(error);
	                } else {
	                    resolve(results);
	                    // return results;
	                }
	            });
		    }).catch(function(err){
		    	var error = {	message:err.message,
			    			is_error:1,
			    		}; 
	            console.log("err.message1");
	        });
	        
	        if(error.is_error){
	        	console.log("err.message2",error);
	        	var msg = error.message ? error.message : "No data is found"; 
		    	return {message:msg,is_error:1,data:[]}
	        }else{
	        	
		        var msg = esResponse['hits']['total']> 0 ? "success" : "No data is found"; 
		    	return {message:msg,is_error:0,data:esResponse['hits']['hits']}
	        }


        }catch (err) {

        	// console.log(err);
		    return {message:err.message,is_error:1,data:[]}
            //throw error in json response with status 500.
            // return err;

        }
        
    },

    async getSearchData(queryStr, bhk_filter = null) {

        var restResponse = {};
        var queryString = queryStr.trim().replace(/-/g, "");
        queryString = queryString.replace(/[()]/g, ' ');

        var filter = [];

        filter.push(JSON.parse('{"term": {"is_active": 1 } }'));


        if(bhk_filter){
        	filter.push(JSON.parse('{"term": {"configuration": "'+bhk_filter.toLowerCase()+'" } }'));
        }

        const esResponse = await new Promise(function(resolve, reject) { 
	        esClient.search({
	            "index": "homesfy_search",
	            "type": "projects",
	            "body": {
	                "query": {
	                    "bool": {
	                        "must": {
	                            "multi_match": {
	                                "fields": ["tags", "name"],
	                                "query": queryString,
	                                "analyzer": "standard",
	                                "operator": "and"
	                            }
	                        },
			                "filter":{
								"bool": {
									"must": filter
								}
							}
	                    }
	                },
	            }
	        },function(error, results, fields) {
                if (error) {
                    reject(error);
                } else {

                    resolve(results);
                    // return results;
                }
            });
	    }).catch(function(err){
            console.log(err);
        });

        return JSON.stringify(esResponse['hits']['hits']);
    },
}