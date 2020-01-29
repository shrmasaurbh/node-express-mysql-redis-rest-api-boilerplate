const esClient = require('../../config/esconfig');


module.exports = {

	async getAutocomplete(queryStr) {
        var restResponse = {};
        var queryString = queryStr.trim().replace(/-/g, "");
        queryString = queryString.replace(/[()]/g, ' ');

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
            console.log(err);
        });
        return esResponse['hits']['hits'];
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