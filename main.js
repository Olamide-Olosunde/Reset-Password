// require("dotenv").config();
// import {} from 'dotenv/config';
// console.log(process.env.API_KEY);

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
// import * as supabase_js from "@supabase/supabase-js";

const supabaseUrl = "https://treegevvjjvsvwtjjxlx.supabase.co"
const supabaseAnonKey = 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyZWVnZXZ2amp2c3Z3dGpqeGx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MTE2MDgsImV4cCI6MjA2MzI4NzYwOH0.G2hGE3my0I2dGVSJxy2TlNnaj2jiUgS799VrP5s3cII"

// import { createClient } from "https://unpkg.com/@supabase/supabase-js@2";
// import { createClient } from "@supabase/supabase-js@2";
const supabase = window.supabase.createClient(
    supabaseUrl, supabaseAnonKey,
    //^ is safe. It's just the projectID and anon key. Just enable RLS in the db and you're fine
    {
        auth:{
            storage: localStorage,
            // persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    }
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
//what it does: resetPassword( password.value );




async function resetPassword( passedPassword ) {

    const messageEl = document.getElementById('message');
    const { data, error } = await supabase.auth.getSession();

    alert(data);

    if( error )
    {
        // alert(error.message);
        messageEl.textContent = 'Error: ' + error.message;
    }

    const { error: passwdError } = await supabase.auth.updateUser({ password: passedPassword });
    if( passwdError )
    {
        // alert(passwdError.message);
        messageEl.textContent = 'Error: ' + passwdError.message;
    } else
    alert('Password Changed successfully!');
    

    //Actually Change Password is supposed to be a settings thing that the user does when they're already signed in...
    //What we're supposed to do is resetPasswordForEmail() --as already done before now,-- then verifyOtp()

    // const { data, error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: 'email'});

    // For password reset via email link
    // async function handlePasswordReset(newPassword) {
    // Get token from URL (different from change password)
    // const urlParams = new URLSearchParams(window.location.search);
    // const token = urlParams.get('token');
    
    // if (!token) {
    //   return { error: { message: 'Missing token in URL' } };
    // }
  
    // // First verify the token to establish session
    // const { error: verifyError } = await supabase.auth.verifyOtp({
    //   type: 'recovery',
    //   token
    // });
  
    // if (verifyError) return { error: verifyError };
  
    // // Now update password
    // const { error: updateError } = await supabase.auth.updateUser({
    //   password: newPassword
    // });
  
    // return { error: updateError };
    // }


    // I think we're supposed to lead it back to the app, then updateUser 
    // (OR actually just take their password there. That is, make a ChangePassword Screen and collect the user's new password there?) in the app.
    // However, how do we redirect user && pass the password along?
    
    // let email = document.getElementById('email').value;
    // const messageEl = document.getElementById('message');

    // const { data, error } = await supabase.auth.updateUser({ password: passedPassword });

    // if (error) {
    //   messageEl.textContent = 'Error: ' + error.message;
    //   alert(error.message);
    // } else {
    //   messageEl.textContent = 'Password updated successfully! You can now close this page.';
    //   window.location.href = 'exp://192.168.0.4:8081';
    // }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //gotta get the session first. Maybe use a magic link?
    // const {error} = await supabaseClient.auth.updateUser({ password: passedPassword });
    // console.log(error);

    // if (!error) {
    //     // Redirect back to app using deep link
    //     window.location.href = 'exp://192.168.0.4:8081';//you'd have to change this to the actual apps URL upon production
    //     alert('Password updated successfully! You can now close this page.');
        
    //     // Fallback in case deep link fails
    //     // setTimeout(() => {
    //     //   window.location.href = 'https://yourapp.com/download'; // Or your App Store link
    //     // }, 500);
    // } else
    // {
    //     alert(error.message);
    // }

    // console.log('Works');////////////////////////////////////////////////////////////////////////////
    
    // const token = new URLSearchParams(window.location.search).get('token');
    // // const newPassword = document.getElementById('newPassword').value;
    // const newPassword = passedPassword;

    // if (!token) {
    //   document.getElementById('message').textContent = 'Invalid reset link';
    //   return;
    // }
    
    // const { error } = await supabaseClient.auth.updateUser({
    //   password: newPassword
    // }, {
    //   accessToken: token
    // });
    
    // const messageEl = document.getElementById('message');
    // if (error) {
    //   messageEl.textContent = 'Error: ' + error.message;
    // } else {
    //   messageEl.textContent = 'Password updated successfully! You can now close this page.';
    // }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    // Extract token from URL
    // const token = new URLSearchParams(window.location.search).get('token');
    // const newPassword = passedPassword;
    
    // if (!token) {
    //     document.getElementById('message').textContent = 'Invalid reset link: Missing token';
    //     return;
    // }
    
    // try {
    //     // First verify the token and establish a session
    //     const { error: verifyError } = await supabaseClient.auth.verifyOtp({
    //     type: 'recovery',
    //     token_hash: token,
    //     });
    
    //     if (verifyError) {
    //     throw verifyError;
    //     }
    
    //     // Now update the password (user will have a session)
    //     const { error: updateError } = await supabaseClient.auth.updateUser({
    //     password: newPassword
    //     });
    
    //     if (updateError) {
    //     throw updateError;
    //     }
    
    //     document.getElementById('message').textContent = 'Password updated successfully!';
    // } catch (error) {
    //     console.error('Password reset error:', error);
    //     document.getElementById('message').textContent = `Error: ${error.message}`;
    // }
}