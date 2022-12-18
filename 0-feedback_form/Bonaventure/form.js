//const panel = document.querySelector('#panel')
//const sendBtn = document.querySelector('#send')
var form = document.getElementById('codetrybe_form');
        form.addEventListener("submit", e => {
          e.preventDefault();
          fetch(form.action, {
              method : "POST",
              body: new FormData(document.getElementById("codetrybe_form")),
          }).then(
              response => response.json()
          ).then((html) => {
            window.open('form2.html', '_blank');
            
           // sendBtn.addEventListener('click', (e) => {
            //  panel.innerHTML = `
                  
             //     Thank You For Your Feedback!
            //  `
         // })

          });
        });
        

        

        