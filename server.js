var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var express = require('express');
var app = express();
var cors = require('cors');
var Web3 = require('web3');
var web3 = new Web3();
var path = require('path');
var http = require('http');
web3.setProvider(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

var abi =[
	{
		"constant": false,
		"inputs": [
			{
				"name": "sid",
				"type": "uint256"
			},
			{
				"name": "types",
				"type": "string"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "specs",
				"type": "string"
			}
		],
		"name": "CastVote",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "u_id1",
				"type": "uint256"
			},
			{
				"name": "u_id2",
				"type": "uint256"
			},
			{
				"name": "_cid",
				"type": "uint256"
			}
		],
		"name": "EditVote",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getparty",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "pass",
				"type": "string"
			},
			{
				"name": "types",
				"type": "string"
			}
		],
		"name": "login",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "pass",
				"type": "string"
			},
			{
				"name": "Add",
				"type": "address"
			},
			{
				"name": "typeuser",
				"type": "string"
			}
		],
		"name": "setcurrent_user",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getcurrent_users",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getID",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getvote_id",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "users",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "password",
				"type": "string"
			},
			{
				"name": "USERAddress",
				"type": "address"
			},
			{
				"name": "type_user",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "VoteCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "Voterdetail",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"name": "voter_aadhar",
				"type": "string"
			},
			{
				"name": "party_name",
				"type": "string"
			},
			{
				"name": "party_code",
				"type": "string"
			},
			{
				"name": "ownership",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
var contadd = "0xa85cfF09fFc7BbB88a9271FC7549e551bDd78322";
var con = web3.eth.contract(abi).at(contadd);
app.use(cors());
// app.use(bodyparser.json()); //utilizes the body-parser package
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, '/public')));

// API for the functions in the Smart Contract.
app.post('/setvoter', function (req, res) {
	// try{
	var usr = req.body.username;
	var pass = req.body.password; 
	var addr = web3.personal.newAccount("qwerty");
	var type = req.body.usertype;
	var p = con.setcurrent_user(usr, pass, addr , type, { from: web3.eth.accounts[0], gas: 0x493E0 });
	web3.eth.sendTransaction({ from: web3.eth.coinbase, to: addr, value: web3.toWei(1, "ether") })
	var z = con.getID() ; 
	console.log(p);
	var val=z.c;
	console.log("U:", usr, " :", pass, ": ", type, ": ",val);
	console.log(z.c) ;
	if (val >= 100) {
		//console.log("HELLO");
		res.send("Registeration Successful \n" + " Note Your Voting-ID: " + val );
	} else {
		res.send("Already registered");
	}
});


app.post('/loginvoter', function (req, res) {
	try {
		var types = req.body.typeofstk;
		var stkid = parseInt(req.body.sid);
		console.log(stkid);
		console.log(types);
		var password = req.body.pass;
		console.log(password);
		var p = con.login.call(stkid, password, types);
		console.log("T:", types, " :", stkid, " ", password, "P: ", p);
		if (p == true) {
			let a = "Login Successful. \n" + "Please Note Your Address: " + web3.eth.accounts[0];
			res.send(a);
		} else {
			res.send("Login Failed. Please try again.");
		}

	} catch (error) {
		console.log(error.toString());
		res.send("Some error occured. :(");
	}
});

app.post('/castvote', function (req, res) {
	try {
		let id = parseInt(req.body.sid);
		let typeofphone = req.body.phonetype;
		let _namephone = req.body.namephone;
		let _specs = req.body.specs;
		//console.log(web3.personal.unlockAccount(address1, "qwerty"));

		
		var p = con.CastVote.call(id, typeofphone, _namephone, _specs, { from: web3.eth.accounts[0], gas: 0x493E0 });
		var t = con.CastVote(id, typeofphone, _namephone, _specs, { from: web3.eth.accounts[0], gas: 0x493E0 });

		
	  
	//console.log("U:", usr, " :", pass, ": ", type, ": ",val);
	//console.log(z.c) ;
	

		if (t >= 100) {
			res.send("Your Vote is Casted.\n"+"You Vote-ID: " + p);
		} else {
			res.send("Not able to register.")
		}
	} catch (error) {
		res.send("Some error occured.")
	}
});


app.post('/votecount', function (req, res) {
	try {
		// console.log("HEY");
		let _mid = req.body.mid;
		console.log(_mid);
		// var length = con.getLength.call(_mid);
		var obj = {};
		var a = [];
		obj.a = a;
		
        	let p = con. VoteCount.call(_mid);

			var m = {
					
					"BJP": p[0],
					"INC": p[1],
					"AAP": p[2],
					"TMC": p[3],
					"msg": p[4]
				}
				console.log("HEY1    " , m);
			obj.a.push(m);

		res.send(obj);
	} catch (error) {
		console.log(error.toString());
		res.send("Some error occured. :(");
	}
});

app.post('/editvote', function (req, res) {
	// try {
	let _stk1 = parseInt(req.body.stk1);
	let _stk2 = parseInt(req.body.stk2);
	console.log(_stk1);
	console.log(_stk2);
	let a = con.getcurrent_users.call(_stk1);
	let address1 = a[2];
	console.log(address1)
	console.log(web3.personal.unlockAccount(address1, "qwerty"));

	let _mid = parseInt(req.body.mid);
	console.log(_stk1, _stk2, _mid);

	let p = con.EditVote.call(_stk1, _stk2, _mid, { from: address1, gas: 0x493E0 });
	let t = con.EditVote(_stk1, _stk2, _mid, { from: address1, gas: 0x493E0 });
	
	
	console.log(p) ; 
	if (p == true)
		res.send("success: " + p);
	else
		res.send("Not Transfered. :( " + p)
	// } catch(error) {
	// 	console.log(error.toString())
	// 	res.send("Some error occured. :(");
	// }
});

app.post('/voter', (req, res) => {
	console.log("HEY");
	let _mid = parseInt(req.body.mid);
	console.log(_mid);
	let m = con.Voterdetail.call(_mid);
	console.log(m);
	let voter = [];
	voter.push(m[0]);
	voter.push(m[1]);
	voter.push(m[2]);
	voter.push(m[3]);

	res.send(voter);
});

app.post('/getvoter', (req, res) => {
	let _uid = req.body.uid;
	let p = con.getcurrent_user.call(_uid);

	res.send(web3.toAscii(p[0]).replace(/\0/g, '') + "Pass: " + web3.toAscii(p[1]).replace(/\0/g, '') +
		"Address: " + (p[2]) + "Type: " + web3.toAscii(p[3])).replace(/\0/g, '');
})

app.post('/getvote', (req, res) => {
	let _mid = req.body.mid;
    console.log(_mid) ;
	let p = con.getChip.call(_mid) ;
	res.send(p);
});


// Server
var server = app.listen(5000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://%s:%s", host, port);
});