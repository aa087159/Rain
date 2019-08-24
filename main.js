const moonPath = 'M21.5 35C21.5 54.33 35 70 35 70C15.67 70 0 54.33 0 35C0 15.67 15.67 0 35 0C35 0 21.5 15.67 21.5 35Z'
const buttonPath = 'M70 35C70 54.33 54.33 70 35 70C15.67 70 0 54.33 0 35C0 15.67 15.67 0 35 0C54.33 0 70 15.67 70 35Z'
const greyCloud = document.querySelector("#greyCloud");
const timeline = anime.timeline({
    duration: 1750
});
$('.text').mouseover(()=>{
    $('.text').css("color","#fff")
})

timeline.add({
    targets: ".drop1",
    delay: anime.stagger(300, {from: 4}),
    easing: 'easeInOutBack',
    translateY: [120,300],
    opacity: {
        value: [0, 1],
        duration: 1600
    }
})
.add({
    targets: ".drop1",
    duration: 2500,
    opacity: {
        value: [1, 0],
        duration: 2500
    }
    },"-= 1500")
    
.add({
    targets: '#greyCloud path',
    fill: 'rgb(45,152,223)'
},"-= 2000")
.add({
    targets: '#sun',
    translateY: 300,
    translateX: 15,
    opacity: {
        value: [0, 1],
        duration: 1500
    }
},"-= 2000")
.add({
    targets: '#sun path',
    d:[{ value: moonPath }]
},"-= 1500")
.add({
    targets: '#sun',
    rotate: 320
},"-= 1500")
.add({
    targets: '.polymorph',
    opacity: 1,
    duration: 60
},"-= 2500")
.add({
    targets: 'nav, #logo',
    opacity: 1
})
.add({
    targets: '#logo path',
    strokeDashoffset: 0,
    duration: 1500
},"-= 1700")
.add({
    targets: '#sun path',
    d:[{ value: buttonPath }],
    easing: 'easeInExpo',
    fill: '#19f6e8',
    duration: 1000
},"-= 3000")
.add({
    targets: '#firstClick',
    d:[{ value: buttonPath }]
})
.add({
    targets: '#hideAll',
    opacity:1
},"-= 3500")

$('#logo').on('mouseover', ()=>{
    anime({
        targets: '#logo path',
        stroke: '#fff',
        duration: 100
        })
})

$('#logo').on('mouseout', ()=>{
    anime({
        targets: '#logo path',
        stroke: '#19f6e8',
        duration: 100
        })
})

$('.inputDiv, .main, #goBack').hide()

timeline.finished.then(()=>{
    $('#hideAll').click(()=>{
        $('nav, #drops, #sun, #greyCloud, #hideAll').hide();
        anime({
                targets: '.polymorph polygon',
                points: [
                    { value:"215,105.5 63.5,37.25 113,110 0,110 0,0 215,0 "},
                    { value:"215,110 63.5,37.25 24.25,43.25 0,110 0,0 215,0 "},
                    { value:"106.25,0 63.5,37.25 24.25,43.25 0,110 0,0 215,0 "}
                ],         
                easing: 'easeOutQuad',
                duration: 1200,
                loop: false,
                complete: function(){
                    $('.inputDiv, .main, nav, #goBack').show()
                    $('.text').css("color","#000")
                    $('.text').mouseover(()=>{
                        $('.text').css("color","#000")
                    })

                    $('#goBack').click(()=>{
                        $('.inputDiv, .main, nav, #goBack').hide()
                        $('.text').mouseover(()=>{
                            $('.text').css("color","#fff")
                        })
                        anime({
                            targets: '.polymorph polygon',
                            easing: 'easeOutQuad',
                            points: [
                                { value:"215,110 63.5,37.25 24.25,43.25 0,110 0,0 215,0 "},
                                { value:"215,105.5 63.5,37.25 113,110 0,110 0,0 215,0 "},
                                { value:"215,0 216.25,110 90.75,110 0,110 0,0 215,0  "}
                            ],
                            complete: function(){
                                $('nav, #drops, #sun, #greyCloud, #hideAll').show();
                                $('.text').css("color","#fff")
                            }         
                        })

                    })

                    $('.navInput').on('keyup', (e)=>{
                        $(window).keydown(function(event){
                            if(event.keyCode == 13) {
                              event.preventDefault()
                              return false
                            }
                          });
                        let city = e.target.value;
                
                        $.ajax({
                            url: 'https://community-open-weather-map.p.rapidapi.com/weather',
                            type: 'get',
                            data: {
                                'q': city
                            },
                            headers: {
                                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                                "x-rapidapi-key": "e212016256msh74eb3221ee479c5p1b1cacjsn2955c64290ee"
                            }
                        }).done(function(res){
                            console.log(res)
                            $.ajax({
                                url: 'https://api.unsplash.com/photos/random',
                                data: {
                                    client_id: "3aab5b05ce9593fcc79c02d5225215ace5d00375a155a974b7691ba982bfd07f",
                                    secret: "9f7aef52065b577d27648666cff2631ad06db10bd8116576cde4c12173e25f3e"
                                },
                                headers: {
                                    'Accept-Version': 'v1'
                                }
                            }).done(function(unsplash){
                                console.log(unsplash);
                                var photo = unsplash.links.download
                                
                                let { coord, weather, main, name, timezone } = res
                                let lon = `Longitude: ${coord[Object.keys(coord)[0]]}`
                                let lat = `Latitude: ${coord[Object.keys(coord)[1]]}`
                                let middleData = Object.values(main)
                                function difftimezone(offset) {
                                    var d = new Date();
                                    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
                                    var nd = new Date(utc + (3600000*offset));
                                    return nd.toLocaleString();
                                }
                
                                let output = 
                                `
                                <div class="jumbotron text-light mt-5 mr-5" style="background: url(${photo}); background-size: cover; z-index: 2;position: relative">
                                        <div class="overlay"></div>
                                        <div><span class='display-3'>${name}</span>&nbsp;<span class='lead'>${difftimezone(timezone/3600).toString()}</span></div>
                                        <hr>
                                        <p>${' '}${' '}${lon}${', '}${lat}</p>
                                        <p class='h4'>${weather[0][Object.keys(weather[0])[2]]}</p>
                                        <div>
                                            <p class="h1">${`${Math.round(main[Object.keys(main)[0]]-273.15)}℃`}</p>
                                            <div>Humidity: ${middleData[2]}%</div>
                                            <div>Lowest Temperature: ${Math.round(middleData[3]-273.15)}</div>
                                            <div>Highest Temperature: ${Math.round(middleData[4]-273.15)}</div>
                                        </div>
                                </div>
                                `
                            $('.info').html(output)
                            })
                        }
                )})
                }
            });
    });
    
})