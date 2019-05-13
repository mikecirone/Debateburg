const fs = require('fs');

function makeFile(count) {
  if(count <= 0) {
    return;
  } else {
    fs.writeFile(`file-${count}.txt`, "Hello World!", function() {
      makeFile(--count);
    });
  }
}

makeFile(400);