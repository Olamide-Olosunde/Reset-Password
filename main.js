//undecided on the dark theme color scheme, so will comment all this for now


// const savedTheme = localStorage.getItem('theme');
// const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// //use user's previously saved theme, else use their system default theme
// if( savedTheme )
// {
//     document.documentElement.setAttribute('data-theme', savedTheme);
// } else{
//     document.documentElement.setAttribute('data-theme', systemTheme);
// }

// var mobile_sun = document.getElementById('mobile-sun');
// var normal_sun = document.getElementById('normal-sun');
// var mobile_moon = document.getElementById('mobile-moon');
// var normal_moon = document.getElementById('normal-moon');

// var mobile_sun_display = window.getComputedStyle(mobile_sun).display;
// var mobile_moon_display = window.getComputedStyle(mobile_moon).display;
// var normal_sun_display = window.getComputedStyle(normal_sun).display;
// var normal_moon_display = window.getComputedStyle(normal_moon).display;

// if( localStorage.getItem('theme') === 'dark' )
// {
//     //if mobile
//     if( mobile_moon_display === 'flex' )//it means the moon's there
//     {
//         mobile_moon.style.display = 'none';
//         mobile_sun.style.display = 'flex';
//     }else{
//         //if not mobile
//         if( normal_moon_display === 'flex' )
//         {
//             normal_moon.style.display = 'none';
//             normal_sun.style.display = 'flex';
//         }
//     }
// } else if( localStorage.getItem('theme') === 'light' ){
//     //if mobile
//     if( mobile_sun_display === 'flex' )
//     {
//         mobile_sun.style.display = 'none';
//         mobile_moon.style.display = 'flex';
//     }else{
//         //if not mobile
//         if( normal_sun_display === 'flex' )
//         {
//             normal_sun.style.display = 'none';
//             normal_moon.style.display = 'flex';
//         }
//     }
// }

// function toggle(){
//     //now, when they toggle
//     const currentTheme = document.documentElement.getAttribute('data-theme');
//     const newTheme = currentTheme === 'light' ? 'dark' : 'light';

//     var mobile_sun = document.getElementById('mobile-sun');
//     var normal_sun = document.getElementById('normal-sun');
//     var mobile_moon = document.getElementById('mobile-moon');
//     var normal_moon = document.getElementById('normal-moon');
    
//     var mobile_sun_display = window.getComputedStyle(mobile_sun).display;
//     var mobile_moon_display = window.getComputedStyle(mobile_moon).display;
//     var normal_sun_display = window.getComputedStyle(normal_sun).display;
//     var normal_moon_display = window.getComputedStyle(normal_moon).display;

//     if( newTheme != currentTheme )
//     {
//         if( newTheme === 'light' )
//         {
//             //if mobile
//             if( mobile_sun_display === 'flex' )
//             {
//                 mobile_sun.style.display = 'none';
//                 mobile_moon.style.display = 'flex';
//             }else{
//                 //if not mobile
//                 if( normal_sun_display === 'flex' )
//                 {
//                     normal_sun.style.display = 'none';
//                     normal_moon.style.display = 'flex';
//                 }
//             }
//         } else if( newTheme === 'dark' )
//         {
//             //if mobile
//             if( mobile_moon_display === 'flex' )//it means the moon's there
//             {
//                 mobile_moon.style.display = 'none';
//                 mobile_sun.style.display = 'flex';
//             }else{
//                 //if not mobile
//                 if( normal_moon_display === 'flex' )
//                 {
//                     normal_moon.style.display = 'none';
//                     normal_sun.style.display = 'flex';
//                 }
//             }
            
//         }
//     }

//     document.documentElement.setAttribute('data-theme', newTheme);
//     localStorage.setItem('theme', newTheme);

// }

// document.addEventListener('DOMContentLoaded', () => {
    
// })
const supabaseClient = supabase.createClient(
    'https://treegevvjjvsvwtjjxlx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyZWVnZXZ2amp2c3Z3dGpqeGx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MTE2MDgsImV4cCI6MjA2MzI4NzYwOH0.G2hGE3my0I2dGVSJxy2TlNnaj2jiUgS799VrP5s3cII'
);
function validateEmail(){
    let email = document.getElementById('email');
    let err = document.getElementById('emailError');
    let form = document.getElementById('emailForm');
    
    form.addEventListener("submit", event=>{
        event.preventDefault();

        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if( !email.value )
        {
            //enter an email
            err.innerText = "Enter a email.";
            err.style.display = "flex";
        } else if( !regex.test(email.value) )
        {
            //enter a valid email
            err.innerText = "Enter a valid email.";
            err.style.display = "flex";
        } else
        {
            err.innerText = "";
            err.style.display = "none";
            Password_Reset_Page_Redirect( email.value );
        }

    });
}
function Password_Reset_Page_Redirect( userEmail ){
    console.log(userEmail);
    const {error} = supabaseClient.auth.resetPasswordForEmail( userEmail , {
        redirectTo: 'https://olamide-olosunde.github.io/Reset-Password/Change_Password.html',
    })

    const messageEl = document.getElementById('message')
    if(error)
    {
        // messageEl.textContent = `Error: ${error.message}`;
        alert(`Error: ${error.message}`);
    } else {
        // messageEl.textContent = `Reset link sent to ${userEmail}`;
        alert(`Reset link sent to ${userEmail}`);
    }
}

//Change Password form validation
function validate(){
    let password = document.getElementById('Password');
    let re_enter_password = document.getElementById('Re_enter_Password');
    let error = document.getElementById('PasswordError');

    let form = document.getElementById('form');
    
    // error.style.display = "none";
    form.addEventListener("submit", event=>{
        event.preventDefault();
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{10,}$/;

        if( password.value != re_enter_password.value )
        {
            //don't match
            error.style.display = "flex";
            error.innerText = "Passwords don't match.";
        } else if( !regex.test(password.value) )//not contain required characters
        {
            error.style.display = "none";
            error.innerText = "";

            //less than 10 chars
            if( password.value.length < 10 )
                document.getElementById('req1').style.color = "#D94E4E";//W color
            else
                document.getElementById('req1').style.color = "#272635";

            //Must contain at least 1 lowercase letter
            if( !/[a-z]/.test(password.value) )
                document.getElementById('req2').style.color = "#D94E4E";
            else
                document.getElementById('req2').style.color = "#272635";

            //>Must contain at least 1 uppercase letter
            if( !/[A-Z]/.test(password.value) )
                document.getElementById('req3').style.color = "#D94E4E";
            else
                document.getElementById('req3').style.color = "#272635";

            //Must contain at least 1 numerical digit
            if( !/\d/.test(password.value) )
                document.getElementById('req4').style.color = "#D94E4E";
            else
                document.getElementById('req4').style.color = "#272635";

            //Must contain at least 1 symbol
            if( !/[^a-zA-Z0-9]/.test(password.value) )
                document.getElementById('req5').style.color = "#D94E4E";
            else
                document.getElementById('req5').style.color = "#272635";
        } else
        {
            error.style.display = "none";
            error.innerText = "";
            resetPassword( password.value );
        }

    });
}




async function resetPassword( passedPassword ) {
    const token = new URLSearchParams(window.location.search).get('token');
    // const newPassword = document.getElementById('newPassword').value;
    const newPassword = passedPassword;

    if (!token) {
      document.getElementById('message').textContent = 'Invalid reset link';
      return;
    }
    
    const { error } = await supabaseClient.auth.updateUser({
      password: newPassword
    }, {
      accessToken: token
    });
    
    const messageEl = document.getElementById('message');
    if (error) {
      messageEl.textContent = 'Error: ' + error.message;
    } else {
      messageEl.textContent = 'Password updated successfully! You can now close this page.';
    }
  }