const esClient = require('../../config/esconfig');
const index = "homesfy_new";
const indexType = "new_projects";

module.exports = {

	async getAutocomplete(queryStr) {
        var queryString = queryStr.trim().replace(/-/g, "");
        queryString = queryString.replace(/[()]/g, ' ');
        var err = {	is_error:0};
        // try{
        	const esResponse = await new Promise(function(resolve, reject) { 
		        esClient.search({
		            "index": index,
		            "type": indexType,
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
	            "type": indexType,
	            "id": id,
	            "ignore":404
	        });

	        if(esResponse.found){
		    	return {message:"success",is_error:0,data:esResponse._source}

	        }else{
		    	return {message:"Data Not Found",is_error:1,data:[]}
	        }

        }catch (err) {
		    return {message:err.message,is_error:1,data:[]}
        }

    },

    async getSearchListing(urlObj) {

         var restResponse = {};
        restResponse.message = [];
        // var queryString = urlObj.query.trim().replace(/[^a-zA-Z0-9\ ]/g, ' ')
        var queryString = urlObj.query.trim().replace(/-/g, "");
        queryString = queryString.replace(/[()]/g, ' ');

        // var esQuery = '{"must":{"multi_match":{"fields" : ["tags", "name"], "query" : "'+queryString+'", "type": "cross_fields", "analyzer": "standard", "operator": "and", "fuzziness": "AUTO"} },';
        var esQuery = '{"must":{"multi_match":{"fields" : ["tags", "name"], "query" : "' + queryString.toLowerCase() + '", "analyzer": "standard", "operator": "and"} },';

        console.log("esQuery",esQuery);
        // esQuery += '"filter":{ "bool" : { "must" : [{"term": {"is_active": 1 }},';
        esQuery += '"filter":{ "bool" : { "must" : [';
        if (urlObj.filters) {

            if (urlObj.filters.bed_config) {
                esQuery += '{"terms":{"bed_config":' + JSON.stringify(urlObj.filters.bed_config) + ' }},';
            }

            if (urlObj.filters.property_type) {
                esQuery += '{"terms":{"property_type":' + JSON.stringify(urlObj.filters.property_type) + ' }},';
            }

            if (urlObj.filters.sale_type) {
                esQuery += '{"terms":{"sale_type":' + JSON.stringify(urlObj.filters.sale_type) + ' }},';
            }

            var priceRange = '';
            if (urlObj.filters.price) {
                if (urlObj.filters.price.length === 1) {
                    esQuery += '{"range" : {"price" : {"gte" : ' + urlObj.filters.price[0].from + ', "lte" : ' + urlObj.filters.price[0].to + '}}}';
                } 
                /*else {
                    let firstPrice = urlObj.filters.price[0];
                    let lastPrice = urlObj.filters.price[urlObj.filters.price.length - 1];

                    esQuery += '{"range" : {"price" : {"gte" : ' + firstPrice.from + ', "lte" : ' + lastPrice.to + '}}}';
                }*/
            }
        }
        esQuery += ']}}'

        esQuery = esQuery.replace("},]", "}]");

        esQuery += '}'
        esQuery = esQuery.replace("},}", "}}");
        console.log("esQuery",esQuery)
        // try{

	        const esResponse = await new Promise(function(resolve, reject) { 
	        	esClient.search({
		            "index": index,
		            "type": indexType,
		            "from": urlObj.fromData,
		            "size": urlObj.size,
		            "body": {
		                "query": {
		                    "bool": JSON.parse(esQuery)
		                },
		                // "aggs": {
		                //     "max_price": { "max": { "field": "price" } },
		                //     "min_price": { "min": { "field": "price" } },
		                //     "origin": { "terms": { "field": "type" } },
		                //     "brands": { "terms": { "field": "brand_id" } },
		                //     "compatibility": { "terms": { "field": "model_id" } }
		                // }
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

        console.log("esResponse......",esResponse)

	        if(esResponse.is_error){
	        	console.log("err.message2",esResponse);
	        	var msg = esResponse.message ? esResponse.message : "No data is found"; 
		    	return {message:msg,is_error:1,data:[]}
	        }else{
		        var msg = esResponse['hits']['total']> 0 ? "success" : "No data is found"; 
		    	return {message:msg,is_error:0,data:esResponse['hits']}
	        }

    },


    async getListBySection(section) {
        var err = {	is_error:0};

	        const esResponse = await new Promise(function(resolve, reject) { 
	        	esClient.search({
		            "index": index,
		            "type": indexType,
		            "size": 8,
		            "body": {
		                "query": {
		                	"match_all":{

		                	}
		                },
		                // "aggs": {
		                //     "max_price": { "max": { "field": "price" } },
		                //     "min_price": { "min": { "field": "price" } },
		                //     "origin": { "terms": { "field": "type" } },
		                //     "brands": { "terms": { "field": "brand_id" } },
		                //     "compatibility": { "terms": { "field": "model_id" } }
		                // }
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

    },
}