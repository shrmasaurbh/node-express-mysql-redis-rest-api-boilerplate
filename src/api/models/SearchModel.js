const esClient = require('../../config/esconfig');
const index = "homesfy_search";
const type = "projects";

module.exports = {

	async getAutocomplete(queryStr) {
        var queryString = queryStr.trim().replace(/-/g, "");
        queryString = queryString.replace(/[()]/g, ' ');
        var err = {	is_error:0};
        // try{
        	const esResponse = await new Promise(function(resolve, reject) { 
		        esClient.search({
		            "index": index,
		            "type": type,
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
	                	console.log("in reject")
	                    reject(error);
	                } else {
	                    resolve(results);
	                    // return results;
	                }
	            });
		    }).catch(function(err){
		    	// var err = {	message:err.message,
			    // 			is_error:1,
			    // 		}; 
		    	return {message:err.message,is_error:1,data:[]}
	        });


	        if(esResponse.is_error){
	        	console.log("err.message2",esResponse);
	        	var msg = esResponse.message ? esResponse.message : "No data is found"; 
		    	return {message:msg,is_error:1,data:[]}
	        }else{
		        var msg = esResponse['hits']['total']> 0 ? "success" : "No data is found"; 
		    	return {message:msg,is_error:0,data:esResponse['hits']['hits']}
	        }
	        
	        console.log(esResponse, "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx");


      //   }catch (err) {

      //   	console.log("err", err);
		    // return {message:err.message,is_error:1,data:[]}
      //       //throw error in json response with status 500.
      //       // return err;

      //   }

    },
    async getDetailsById(id) {
        var err = {	is_error:0};
        try{
	        const esResponse = await esClient.get({
	            "index": index,
	            "type": type,
	            "id": id,
	            "ignore":404
	        });

	        if(esResponse.found){
		    	return {message:"success",is_error:0,data:esResponse._source}

	        }else{
		    	return {message:"Data Not Found",is_error:1,data:[]}
	        }
	        console.log("esResponse",esResponse);

        }catch (err) {

        	console.log("err", err);
		    return {message:err.message,is_error:1,data:[]}
            //throw error in json response with status 500.
            // return err;

        }

    },

    async getSearchListing(queryStr, bhk_filter = null) {

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