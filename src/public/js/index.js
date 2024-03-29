document.addEventListener('DOMContentLoaded', function() {
    
    $(document).ready(function(){
        var socket = io();
        const inputElm = $('#input')
        const form = $('#form')
        form.submit(function(e){
            e.preventDefault()
            socket.emit("Client-sent-data", inputElm.val());
            inputElm.val('')
        })
        socket.on("Server-sent-data", function(data)
			{
                console.log(data)
                const message = $("<li></li>").text(data);  
				$("#messages").append(message);
			});
        
        const loginElm = $('.login')
        //submit form login
        $('#myForm').submit(function(e){
            e.preventDefault()
            const password = $('#password').val()
            const email = $('#email').val()
            fetch('http://localhost:3210/auth/login',{
                method: "POST",
                body: JSON.stringify({email:email,password:password,token: document.cookie}),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(function(res){
                return res.json()
            })
            .then(function(res){
                //store acceptToken into cookie
                const maxAge= 24*60*60
                document.cookie=`acceptToken=${res.acceptToken}; max-age=${maxAge}`;
                if(res.ok){
                    window.location.href = '/myPage?log&key=ok'
                }
            })
            .catch(function(err){
                console.log(err)
            })
            })
            const logoutElm = $('.logout')
            logoutElm.click(function(e) {
                document.cookie = 'acceptToken=123';
                window.location.href = '/auth?login'
        })
        
        // croll menu

        $(window).scroll(function(){
            const scrollTop = $(this).scrollTop(); //current scroll position
            const heaerElm = $('.header')
            if(scrollTop > 400) {
                heaerElm.addClass('scroll-header')
            } else if(scrollTop <400) {
                heaerElm.removeClass('scroll-header')

            }
        })
    })

})
