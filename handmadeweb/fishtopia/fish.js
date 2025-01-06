consoleText([
    `o                 o          
             o               
         o    ____       o  
           _/  (   \\_      
  _       _/  (       \\_  O 
 | \\_   _/  (   (    0  \\  
 |== \\_/  (   (          | 
 |=== _ (   (   (         | 
|==_/ \\_ (   (         |
 |_/     \\_ (   (    \\__/  
          \\_ (      _/      
            |  |___/         
            /__/             `,



`U                            
,~~| |\\                               ,
 \`~~| |=\\                       . ~ ~ . 
          | |__\\                    .'@ )) U  '..~
]-------,|_|__,>---                > - ~\`\`  '~\\{
\\=====o==o===.'                                \\
           [|___>^<.___.'\`.                                  __,,-,._
_,-' \` .   \` .  .._          ___,.....,---......,--''''\` .  '\`\`
,-' .  '  .  '  .  '  .\`....---'''  .  '  .  '  .  '  .  '  .  '  .
.-''  \`\` .  \`\` .  \`\` .  \`\` .  \`\`--..__'\` .  \`\` .  \`\` .  \`\` .  \`\` .  '\`
.  MJP.  '  .  '  .  '  .  '  .  '  '\\.  '  .  '  .  '  .  '  .  '  .
'\` .  \`\` .  \`\` .  \`\` .  \`\` .  \`\` .  \`\` .\`.  \`\` .  \`\` .  \`\` .  \`\` .  \`\`
`,

`                              
o   o                          
              /^^^^^7          
'  '     ,oO))))))))Oo,        
       ,'))))))))))))))), /{   
  '  ,'o  ))))))))))))))))={   
     >    ))))))))))))))))={   
     \`,   ))))))\\ \\)))))))={
       ',))))))))\\/)))))' \\{ 
             '*O))))))))O*'          
`
], 'text', ['#00FF00']);
  
  function consoleText(words, id, colors) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id);
    target.setAttribute('style', 'color:' + colors[0]);
  
    window.setInterval(function () {
      if (letterCount === 0 && waiting === false) {
        waiting = true;
        target.innerHTML = '<pre>' + words[0].substring(0, letterCount) + '</pre>';
        window.setTimeout(function () {
          var usedColor = colors.shift();
          colors.push(usedColor);
          var usedWord = words.shift();
          words.push(usedWord);
          x = 1;
          target.setAttribute('style', 'color:' + colors[0]);
          letterCount += x;
          waiting = false;
        }, 500);
      } else if (letterCount === words[0].length + 1 && waiting === false) {
        waiting = true;
        window.setTimeout(function () {
          x = -1;
          letterCount += x;
          waiting = false;
        }, 500);
      } else if (waiting === false) {
        target.innerHTML = '<pre>' + words[0].substring(0, letterCount) + '</pre>';
        letterCount += x;
      }
    }, 7);
  
    window.setInterval(function () {
      if (visible === true) {
        con.className = 'console-underscore hidden';
        visible = false;
      } else {
        con.className = 'console-underscore';
        visible = true;
      }
    }, 300);
  }  