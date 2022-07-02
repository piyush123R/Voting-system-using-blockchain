
$ (document).ready(function(){

    $('#btn-signup').click(function (event){
        event.preventDefault(); 
        $.ajax({
            type: 'POST',
            url:"http://127.0.0.1:5000/setvoter",
            headers: {
				"content-type":"application/x-www-form-urlencoded"
			},  
            data: {
                "username": $('#name').val(),
                "password":  $('#password').val(),
                "usertype": $('#myselect').val()
            },
            success: function (data){
                console.log("data: ", data);
            }
        })
        console.log("Type: " , $('#myselect').val()+ " pass:  " + $('#password').val() + " User: "+ $('#name').val()  )
    });


    $('#btn-login').click(function (event){
        event.preventDefault(); 
        $.ajax({
            type: 'POST',
            url:"http://127.0.0.1:5000/loginvoter ",
            headers: {
				"content-type":"application/x-www-form-urlencoded"
			},
            data: {
                "typeofstk": $('#myselect').val(),
                "sid": $('#login-userid').val(),
                "pass":  $('#login-password').val()
            },
            success: function (data){
                console.log("data: ", data);
                alert(JSON.stringify(data));
                // if(data == true)
                    window.location.href = "dash.html";
            }
        })
    });

        $('#castvote').click(function (event){
            event.preventDefault(); 
            $.ajax({
                type: 'POST',
                url:"http://127.0.0.1:5000/castvote ",
                headers: {
                    "content-type":"application/x-www-form-urlencoded"
                },
                data: {
                    "sid": $('#s_id').val(),
                    "phonetype": $('#phonetype').val(),
                    "namephone":  $('#phonename').val(),
                    "specs":  $('#specs').val(),
                },
                success: function (data){
                    console.log("data: ", data);
                    // alert(JSON.stringify(data));
                    // window.location.href = "dash.html";
                }
            })
        });


    $("#displayMobile").hide();
    $('#voterdetail').click(function(event){
        event.preventDefault();
        
        let data;

        $.ajax({
            type: 'POST',
            url:"http://127.0.0.1:5000/voter",
            header: {
                "content-type":"application/x-www-form-urlencoded"
            },
            data: {
                    "mid" : $("#m_id").val()
            },
            success: function (data){
                    console.log(data);
                    $("#displayMobile").show();
                    $('#type').html(data[0]); 
                    $('#name').html(data[1]); 
                    $('#specs').html(data[2]); 
                    $('#owner').html(data[3]); 
            },
            error: function (err){
                console.log(err);
            }
        })
    })

    $('#changevote').click(function(event){
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url:"http://127.0.0.1:5000/editvote",
            header: {
                "content-type":"application/x-www-form-urlencoded"
            },
            data: {
                    "stk1": $("#s1_id").val(),
                    "stk2": $("#s2_id").val(),
                    "mid" : $("#m_id").val()
            },
            success: function (data){
                console.log(data);
                // data = data1;
                
            }
        })
    })

    $('#countvote').click(function(event){
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url:"http://127.0.0.1:5000/votecount",
            header: {
                "content-type":"application/x-www-form-urlencoded"
            },
            data: {
                   "mid" : $("#m_id").val()
            },
            success: function (data)
            {
                // console.log("HEY   " , data) ; 
                var t = data.a ; 
                //console.log(t[0].ownerid);
                console.log("Vote of BJP=" +t[0].BJP +"\n");
                console.log("Vote of INC=" +t[0].INC +"\n");
                console.log("Vote of AAP=" +t[0].AAP +"\n");
                console.log("Vote of TMC=" +t[0].TMC +"\n");
                $('#chip_id_display').html(t[0].msg)
            }
        })
    })




})