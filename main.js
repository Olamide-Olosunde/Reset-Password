const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

//use user's previously saved theme, else use their system default theme
if( savedTheme )
{
    document.documentElement.setAttribute('data-theme', savedTheme);
} else{
    document.documentElement.setAttribute('data-theme', systemTheme);
}

var mobile_sun = document.getElementById('mobile-sun');
var normal_sun = document.getElementById('normal-sun');
var mobile_moon = document.getElementById('mobile-moon');
var normal_moon = document.getElementById('normal-moon');

var mobile_sun_display = window.getComputedStyle(mobile_sun).display;
var mobile_moon_display = window.getComputedStyle(mobile_moon).display;
var normal_sun_display = window.getComputedStyle(normal_sun).display;
var normal_moon_display = window.getComputedStyle(normal_moon).display;

if( localStorage.getItem('theme') === 'dark' )
{
    //if mobile
    if( mobile_moon_display === 'flex' )//it means the moon's there
    {
        mobile_moon.style.display = 'none';
        mobile_sun.style.display = 'flex';
    }else{
        //if not mobile
        if( normal_moon_display === 'flex' )
        {
            normal_moon.style.display = 'none';
            normal_sun.style.display = 'flex';
        }
    }
} else if( localStorage.getItem('theme') === 'light' ){
    //if mobile
    if( mobile_sun_display === 'flex' )
    {
        mobile_sun.style.display = 'none';
        mobile_moon.style.display = 'flex';
    }else{
        //if not mobile
        if( normal_sun_display === 'flex' )
        {
            normal_sun.style.display = 'none';
            normal_moon.style.display = 'flex';
        }
    }
}

function toggle(){
    //now, when they toggle
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    var mobile_sun = document.getElementById('mobile-sun');
    var normal_sun = document.getElementById('normal-sun');
    var mobile_moon = document.getElementById('mobile-moon');
    var normal_moon = document.getElementById('normal-moon');
    
    var mobile_sun_display = window.getComputedStyle(mobile_sun).display;
    var mobile_moon_display = window.getComputedStyle(mobile_moon).display;
    var normal_sun_display = window.getComputedStyle(normal_sun).display;
    var normal_moon_display = window.getComputedStyle(normal_moon).display;

    if( newTheme != currentTheme )
    {
        if( newTheme === 'light' )
        {
            //if mobile
            if( mobile_sun_display === 'flex' )
            {
                mobile_sun.style.display = 'none';
                mobile_moon.style.display = 'flex';
            }else{
                //if not mobile
                if( normal_sun_display === 'flex' )
                {
                    normal_sun.style.display = 'none';
                    normal_moon.style.display = 'flex';
                }
            }
        } else if( newTheme === 'dark' )
        {
            //if mobile
            if( mobile_moon_display === 'flex' )//it means the moon's there
            {
                mobile_moon.style.display = 'none';
                mobile_sun.style.display = 'flex';
            }else{
                //if not mobile
                if( normal_moon_display === 'flex' )
                {
                    normal_moon.style.display = 'none';
                    normal_sun.style.display = 'flex';
                }
            }
            
        }
    }

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

}