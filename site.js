var swiper1 = new Swiper(".swiper1", {
    effect: "cards",
    grabCursor: true,
    initialSlide: 2,
    speed: 500,
    loop: true,
    rotate: true,
    mousewheel: {
    invert: false,
  },
});

var swiper = new Swiper(".swiper", {
    effect: "cube",
    grabCursor: true,
    loop: true,
    speed: 1000,
    cubeEffect: {
      shadow: false,
      slideShadows: true,
      shadowOffset: 10,
      shadowScale: 0.94,
    },
    autoplay: {
      delay: 2600,
      pauseOnMouseEnter: true,
    },
  });
  
  tsParticles.load("tsparticles", {
    fpsLimit: 60,
    backgroundMode: {
      enable: true,
      zIndex: -1,
    },
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: [
          "#3998D0",
          "#2EB6AF",
          "#A9BD33",
          "#FEC73B",
          "#F89930",
          "#F45623",
          "#D62E32",
        ],
      },
      destroy: {
        mode: "split",
        split: {
          count: 1,
          factor: {
            value: 5,
            random: {
              enable: true,
              minimumValue: 4,
            },
          },
          rate: {
            value: 10,
            random: {
              enable: true,
              minimumValue: 5,
            },
          },
          particles: {
            collisions: {
              enable: false,
            },
            destroy: {
              mode: "none",
            },
            life: {
              count: 1,
              duration: {
                value: 1,
              },
            },
          },
        },
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          sides: 5,
        },
      },
      opacity: {
        value: 1,
        random: false,
        animation: {
          enable: false,
          speed: 1,
          minimumValue: 0.1,
          sync: false,
        },
      },
      size: {
        value: 8,
        random: {
          enable: true,
          minimumValue: 4,
        },
        animation: {
          enable: false,
          speed: 40,
          minimumValue: 0.1,
          sync: false,
        },
      },
      collisions: {
        enable: true,
        mode: "destroy",
      },
      move: {
        enable: true,
        speed: 7,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    detectRetina: true,
  });
  


//  Skills

var skills = [
  {
    "header": "Programming Languages",
    "captions": [
      "C++",
      "Java",
      "C#",
      "Python"
    ],
    "values": [
      0.85,
      0.90,
      0.80,
      0.75
    ]
  },
  {
    "header": "Frontend",
    "captions": [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap"
    ],
    "values": [
      0.95,
      0.90,
      0.85,
      0.80
    ]
  },
  {
    "header": "Frameworks",
    "captions": [
      "ASP.NET Core",
      "MVC",
      "Entity Framework",
      "Ado.Net"
    ],
    "values": [
      0.85,
      0.90,
      0.80,
      0.75
    ]
  },
  {
    "header": "Tools & IDEs",
    "captions": [
      "Visual Studio",
      "VS Code",
      "SSMS",
      "GitHub"
    ],
    "values": [
      0.90,
      0.85,
      0.80,
      0.85
    ]
  },
  {
    "header": "Database",
    "captions": [
      "MySQL"
    ],
    "values": [
      0.85
    ]
  }
];

var pentagonIndex = 0;
var valueIndex = 0;
var width = 0;
var height = 0;
var radOffset = Math.PI / 2;
var sides = 5; // Maximum number of skills per category
var theta = 2 * Math.PI / sides; // radians per section

function getXY(i, radius) {
  return {
    "x": Math.cos(radOffset + theta * i) * radius * width + width / 2,
    "y": Math.sin(radOffset + theta * i) * radius * height + height / 2
  };
}

var hue = [];
var hueOffset = 25;

for (var s in skills) {
  $(".skills").append('<div class="pentagon" id="category-' + s + '"><div class="header"></div><div class="pentCanvas"/></div>');
  hue[s] = (hueOffset + s * 255 / skills.length) % 255;
}

$(".pentagon").each(function (index) {
  width = $(this).width();
  height = $(this).height();
  var ctx = $(this).find('canvas')[0].getContext('2d');
  
  ctx.font = "15px Monospace";
  ctx.textAlign = "center";

  /*** LABEL ***/
  color = "hsl(" + hue[pentagonIndex] + ", 100%, 50%)";
  ctx.fillStyle = color;
  ctx.fillText(skills[pentagonIndex].header, width / 2, 15);

  ctx.font = "13px Monospace";

  /*** PENTAGON BACKGROUND ***/
  for (var i = 0; i < skills[pentagonIndex].captions.length; i++) {
    ctx.beginPath();
    xy = getXY(i, 0.3);
    colorJitter = 25 + theta * i * 2;
    color = "hsl(" + hue[pentagonIndex] + ",100%," + colorJitter + "%)";
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.moveTo(0.5 * width, 0.5 * height); // center
    ctx.lineTo(xy.x, xy.y);
    xy = getXY(i + 1, 0.3);
    ctx.lineTo(xy.x, xy.y);
    xy = getXY(i, 0.37);
    ctx.fillText(skills[pentagonIndex].captions[valueIndex], xy.x, xy.y + 5);
    valueIndex++;
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  valueIndex = 0;
  ctx.beginPath();
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
  ctx.lineWidth = 5;
  var value = skills[pentagonIndex].values[valueIndex];
  xy = getXY(i, value * 0.3);
  ctx.moveTo(xy.x, xy.y);

  /*** SKILL GRAPH ***/
  for (var i = 0; i < skills[pentagonIndex].captions.length; i++) {
    xy = getXY(i, value * 0.3);
    ctx.lineTo(xy.x, xy.y);
    valueIndex++;
    value = skills[pentagonIndex].values[valueIndex];
  }
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  valueIndex = 0;
  pentagonIndex++;
});