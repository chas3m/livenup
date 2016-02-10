// JavaScript Document
//helpers
function randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveText(text, filename){
  var a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
  a.setAttribute('download', filename);
  a.click()
}

///
$.apiUrl = "http://api.mygarden.org/";
$.oauthAuthorizeUrl = 'http://www.mygarden.org/oauth/authorize';
$.consumerKey = '1485d3d4e4ba47e4d79f88daee47a91b';
$.consumerSecret = '5268af10c273c5d061f79a992f65e4a6';
$.signatureMethod = 'HMAC-SHA1';
$.endPointLocation = 'plants/all';

function oauthRequestToken(callback) {
	var accessor = { consumerSecret: $.consumerSecret
		, tokenSecret: null };
	var message = { action: $.apiUrl + 'oauth/request_token'
		, method: 'GET'
		, parameters: { oauth_consumer_key: $.consumerKey
		, oauth_signature_method: $.signatureMethod }
	};
	OAuth.setTimestampAndNonce(message);
	OAuth.SignatureMethod.sign(message, accessor);
	var parameters = OAuth.getParameterMap(message.parameters);
	$.get(message.action, parameters, function(data) {
		var token = data.match(/^oauth_token=([^&]*)&oauth_token_secret=([^&]*)$/);
		if (token) {
			$.requestToken = token[1];
			$.requestTokenSecret = token[2];
			callback(true);
		} else {
			callback(false);
		}
	});
}

function oauthAuthorize(email, password, callback) {
	$.post($.oauthAuthorizeUrl + '?oauth_token=' + $.requestToken, { email: email, password: password }, function(data) {
		if (!data.match(/Invalid token/) && !data.match(/Invalid username or password/)) {
			var token = data.match(/^oauth_token=([^&]*)&oauth_verifier=([^&]*)$/);
			if (token) {
				$.verifier = token[2];
				if (token[1] == $.requestToken && $.verifier) {
					callback(true);
				} else {
					callback(false);
				}
			} else {
				callback(false);
			}
		} else {
			callback(false);
		}
	});
}



function oauthAccessToken(callback) {
	var accessor = { consumerSecret: $.consumerSecret
		, tokenSecret: $.requestTokenSecret };
	var message = { action: $.apiUrl + 'oauth/access_token'
		, method: 'GET'
		, parameters: { oauth_consumer_key: $.consumerKey
			, oauth_token: $.requestToken
			, oauth_verifier: $.verifier
			, oauth_signature_method: $.signatureMethod }
	};
	OAuth.setTimestampAndNonce(message);
	OAuth.SignatureMethod.sign(message, accessor);
	var parameters = OAuth.getParameterMap(message.parameters);
	$.get(message.action, parameters, function(data) {
		var token = data.match(/^oauth_token=([^&]*)&oauth_token_secret=([^&]*)$/);
		if (token) {
			$.accessToken = token[1];
			$.accessTokenSecret = token[2];
			callback(true);
		} else {
			callback(false);
		}
	});
}

function apiAjax(uri, parameters, method, callback) {
	var accessor = { consumerSecret: $.consumerSecret
		, tokenSecret: $.accessTokenSecret };
	if(method == undefined) {
		method = 'GET';
	}
	parameters.oauth_consumer_key = $.consumerKey;
	parameters.oauth_token = $.accessToken;
	parameters.oauth_signature_method = $.signatureMethod;
  parameters.per_page = 291;
	var message = { action: $.apiUrl + uri
		, method: method
		, parameters: parameters
	};
	OAuth.setTimestampAndNonce(message);
	OAuth.SignatureMethod.sign(message, accessor);
	var parameters = OAuth.getParameterMap(message.parameters);
	$.ajax({
		  type: method,
		  url: message.action,
		  data: parameters,
		  success: callback,
		  dataType: 'json'
		});
}

//call oauthRequestToken
oauthRequestToken(function(isRequestTokenFound){
  //call oauthAuthorize
  oauthAuthorize('USER', 'PASSWORD', function(isAuthorize) {
    oauthAccessToken(function(isAccessTokenFound) {
      var parameters = {};
      apiAjax($.endPointLocation, parameters, 'GET', function(data) {
        saveText( JSON.stringify(data), "plants.json" );
      });

    });
  });
});
