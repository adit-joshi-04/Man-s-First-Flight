document.addEventListener('DOMContentLoaded', () => {
const envelope = document.querySelector (".letter-envelope");
const letter1 = document.querySelector (".letter-letter");
const letter2 = document.querySelector (".letter-letter-2");
const coin = document.getElementById ('coin');
let show = false;

envelope.addEventListener('click', e => {
    const currentOpacity1 = window.getComputedStyle(letter1).opacity;
    const currentOpacity2 = window.getComputedStyle(letter2).opacity;

    if (currentOpacity1 == '0') {
        letter1.style.opacity = '1'
        // letter.style.scale = '1'
        letter1.offsetHeight;

        letter2.style.opacity = '1'
        letter2.offsetHeight;

    }

    if (currentOpacity1 == '1') {
        letter1.style.opacity = '0'
        letter1.offsetHeight;

        letter2.style.opacity = '0'
        letter2.offsetHeight;
    }

        
        
});

letter1.addEventListener('click', e => {
    letter1.style.zIndex = '+3'
    letter2.style.zIndex = '+2'
    // letter.style.scale = '0.9'
    letter1.offsetHeight;
    letter2.offsetHeight;
});

letter2.addEventListener('click', e => {
    letter1.style.zIndex = '+2'
    letter2.style.zIndex = '+3'

    letter1.offsetHeight;
    letter2.offsetHeight;
});

const jumpText = document.querySelector('.text-run');

        jumpText.addEventListener('mouseenter', () => {
            // Get random values for top and left positions in vh and vw
            const randomTop = Math.random() * (100 - (jumpText.offsetHeight / window.innerHeight * 100)); // Ensure it stays within view height
            const randomLeft = Math.random() * (100 - (jumpText.offsetWidth / window.innerWidth * 100)); // Ensure it stays within view width
            
            // Set the new positions
            jumpText.style.top = `${randomTop}vh`;
            jumpText.style.left = `${randomLeft}vw`;

            jumpText.textContent = "AHHHHH!! One night in the summer of 1901, The Wright brothers were attacked by a huge swarm of mosquitoes! It was as though the devil had it out for them!";


        });




// Trying to get audio to play only when in viewport
// function isInViewport(element) {
//     const rect = element.getBoundingClientRect();
//     return (
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
// }

// const audio = document.getElementById('audio');
// const targetDiv = document.querySelector('.chapter-5');

// Event listener for scrolling
// window.addEventListener('scroll', function() {
//     if (isInViewport(targetDiv)) {
//         if (audio.paused) {
//             audio.play();
//         }
//     } else {
//         if (!audio.paused) {
//             audio.pause();
//         }
//     }
// });

const stickySections = [...document.querySelectorAll('.sticky')]


window.addEventListener('scroll', (e) => {
    for(let i=0; i < stickySections.length; i++) {
        transform(stickySections[i])
    }
})

function transform(section){
    const offsetTop = section.parentElement.offsetTop;
    const scrollSection = section.querySelector('.scroll-section');
    let percentage = ((window.scrollY - offsetTop)/window.innerHeight) * 100;
    percentage = percentage < 0 ? 0 : percentage > 400 ? 400: percentage; 
    scrollSection.style.transform = `translate3d(${-(percentage)}vw, 0, 0)`
}

jQuery(document).ready(function($){

    $('#coin').on('click', function(){
      var flipResult = Math.random();
      $('#coin').removeClass();
      setTimeout(function(){
        if(flipResult <= 0.5){
          $('#coin').addClass('heads');
          show = true;
          console.log(show);
          console.log('it is head');
            if(show == true){
                wilburWin.style.opacity = '1';
            }
            else{
                wilburWin.style.opacity = '0';
            }
        }
        else{
          $('#coin').addClass('tails');
          show = true;
          console.log(show);
          console.log('it is tails');
            if(show == true){
                wilburWin.style.opacity = '1';
            }
            else{
                wilburWin.style.opacity = '0';
            }
        }
      }, 100);
    });
  });

  console.log(show)

  const wilburWin = document.getElementById('fade');
console.log(wilburWin)

coin.addEventListener('click', () => {

if(show == true){
    wilburWin.style.opacity = '1';
}
else{
    wilburWin.style.opacity = '0';
}
});

let canvasCreated = false; // Flag to track if the canvas has been created

const observer2 = new IntersectionObserver((entries, observer2) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !canvasCreated) {
      console.log('Section is in view! Creating p5 canvas'); // Log when section is visible and canvas is being created
      
      const windyTextContainer = entry.target.querySelector('#windy-text-container');
      const neverFly = entry.target.querySelectorAll('.wilbur-quote');

      if (windyTextContainer && !windyTextContainer.hasChildNodes()) {
        new p5(windyTextSketch, 'windy-text-container');
        canvasCreated = true; // Set the flag to true after the canvas is created
      }

      const myCanvas = document.querySelector('.my-custom-canvas');
      if (myCanvas) {
        myCanvas.classList.add('windy-disappear'); // Add the class to trigger the fade-out
      }

      neverFly.forEach(textElement => {
        textElement.classList.add('wilbur-appear'); // Apply class to each 'neverFly' element
      });

      observer2.unobserve(entry.target); // Unobserve after triggering once
    }
  });
}, { threshold: 0.5 }); // Adjust threshold if needed

const targetSection2 = document.querySelector('.sticky');
if (targetSection2) {
  observer2.observe(targetSection2);
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const typeTextElements = entry.target.querySelectorAll('.type-text');
        
        // Add the class to each line to trigger the animation
        typeTextElements.forEach(textElement => {
          textElement.classList.add('animate-text');
        });
        
        // Unobserve once animation starts
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 }); // Adjust threshold if needed (0.5 means half the element is visible)

  const targetSection = document.querySelector('.chapter-12');
  if (targetSection) {
    observer.observe(targetSection);
  }
// Select the element to animate
// const animatedElement = document.querySelector('.m-plane');

// // Create the IntersectionObserver
// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('in-view'); // Add class to start animation
//     } else {
//       entry.target.classList.remove('in-view'); // Optionally remove class when out of view
//     }
//   });
// }, {
//   threshold: 0.1 // Trigger when 10% of the element is visible
// });

// // Observe the element
// observer.observe(animatedElement);

// These are important
});