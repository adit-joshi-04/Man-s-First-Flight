let windyTextSketch = function(p) {
  let myParagraph = "After spending a few days flying, the brothers realised there was something wrong. The glider was not generating as much lift as they had expected. The data they had from early experimenters was off!";
  let windChars = [];
  let startX = 50; // X position for the paragraph
  let startY = 50; // Y position for the paragraph
  let maxShift = 5; // Maximum horizontal shift in pixels
  let textColor = '#29291E'; // Text color
  let charsPerLine = 47; // Number of characters per line

  p.preload = function() {
    // Load Baskerville font if needed (consider loading from your own server or local files)
    // baskervilleFont = p.loadFont('path/to/Baskerville.ttf'); // Uncomment and set the correct path if loading a local font
  };

  p.setup = function() {
    // Select the div with class 'chapter-5' and attach canvas to it
    let canvasParent = p.select('.text-holder');
    let myCanvas = p.createCanvas(800, 800);
    myCanvas.parent(canvasParent); // Attach the canvas to the div

    myCanvas.addClass('my-custom-canvas');
    p.textFont("Baskerville", 24); // Set font to Baskerville after it's loaded
    p.textAlign(p.CENTER, p.TOP);

    // Randomly choose which characters will be affected by wind
    chooseWindChars();
  };

  p.draw = function() {
    p.clear();

    p.fill(textColor);
    // Split the paragraph into lines based on the number of characters
    let lines = splitByCharacters(myParagraph, charsPerLine);

    let y = startY; // Use startY for the initial Y position
    let lineHeight = 26; // Line height for text spacing

    for (let l = 0; l < lines.length; l++) {
      let currentLine = lines[l];
      let x = startX; // Start X position for the current line

      // Loop through each character in the current line
      for (let i = 0; i < currentLine.length; i++) {
        let myChar = currentLine.charAt(i);

        // Get the width of the current character
        let charWidth = p.textWidth(myChar);

        // Apply wind effect to randomly selected characters
        if (windChars.includes(myChar)) {
          let windSpeed = 0.3; // Lower speed to control movement
          let noiseValue = (p.noise(p.frameCount * 0.01 + i) - 0.5) * 2; // Normalize noise to range [-1, 1]
          let shift = noiseValue * maxShift * windSpeed; // Scale the shift and apply wind speed
          x += shift; // Apply the shift to the x-position
        }

        // Draw the character at the calculated position
        p.text(myChar, x, y);

        // Move the x position to the right by the width of the current character to prevent overlap
        x += charWidth;
      }

      // Move to the next line
      y += lineHeight;
    }
  };

  function splitByCharacters(paragraph, charsPerLine) {
    // Split the paragraph into lines with a maximum number of characters
    let result = [];
    for (let i = 0; i < paragraph.length; i += charsPerLine) {
      result.push(paragraph.slice(i, i + charsPerLine));
    }
    return result;
  }

  function chooseWindChars() {
    // Pick random characters from the paragraph that will be affected by wind
    for (let i = 0; i < myParagraph.length; i++) {
      let char = myParagraph.charAt(i);
      if (p.random(1) < 0.2 && char != ' ') { // 20% chance to select a character, excluding spaces
        windChars.push(char);
      }
    }
};
};

// Create a new p5 instance and link it to the container
// new p5(windyTextSketch, 'windy-text-container');