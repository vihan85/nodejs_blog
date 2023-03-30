document.addEventListener('DOMContentLoaded', function() {
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
})
