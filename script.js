 let box = document.querySelectorAll(".box")
    let reset = document.querySelector("#reset")
    let message = document.querySelector(".message")//i could also use getElementByID but not classname
    let newgame = document.querySelector("#newgame")
    let turnO = true;
    let count = 0
    //specifying winning conditions
    const winpatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ]

    //adding eventListeners to each box
    box.forEach(element => {
        element.addEventListener("click", startgame)
        function startgame() {
            if (turnO) {
                element.innerHTML = "<div class='circle'></div>"//player O
                turnO = false
            }
            else {
                element.innerHTML = "<div class='cross'></div>"//player X
                turnO = true
            }
            element.disabled = true
            count++
            console.log(count)
            if (count === 9) {
                count = 0
                turnO = true
                message.innerText = "DRAW!"
                message.classList.remove("hidemessage")
                message.classList.add("messageproperties")
            }
            CheckWinner();

        }
    })


    //checking winner after every move
    function CheckWinner() {
        for (let patterns of winpatterns) {
            /* console.log(patterns[0], patterns[1], patterns[2])
             console.log(
                 box[patterns[0]].innerHTML,
                 box[patterns[1]].innerHTML,
                 box[patterns[2]].innerHTML) */

            let Pos1Val = box[patterns[0]].innerHTML
            let Pos2Val = box[patterns[1]].innerHTML
            let Pos3Val = box[patterns[2]].innerHTML

            if (Pos1Val != "" && Pos2Val != "" && Pos3Val != "") {
                if (Pos1Val === Pos2Val && Pos2Val === Pos3Val) {
                    if (turnO) {
                        Pos1Val = "X"
                    }
                    else {
                        Pos1Val = "O"
                    }
                    showwinner(Pos1Val)
                }

            }


        }
    }


    //disables all boxes after winning
    function disableall() {
        for (let allboxes of box) {
            allboxes.disabled = true
        }
    }

    //enables all boxes to reset game
    function enableall() {
        for (const allboxes of box) {
            allboxes.disabled = false
            allboxes.innerText = ""
        }
    }

    //announcing the winner
    function showwinner(winner) {
        message.innerText = `The winner is ${winner}`
        disableall()
        reset.classList.add("hidereset")
        newgame.classList.remove("hidenewgame")
        message.classList.remove("message")
        message.classList.remove("hidemessage")
        message.classList.add("messageproperties")
    }

    //reset button: reset the game
    reset.addEventListener("click", resetgame)
    function resetgame() {
        count = 0
        turnO = true
        message.innerText = ""
        enableall()
        message.classList.remove("messageproperties")
        message.classList.add("hidemessage")
        /* box.forEach(element=>{
             element.innerText=""
         }) 
             i could also do this instead of allboxes.innerText="" in enableall() */
    }
    newgame.addEventListener("click", after_clicking_newgame)
    function after_clicking_newgame() {
        turnO = true
        count = 0
        message.innerText = ""
        newgame.classList.add("hidenewgame")
        reset.classList.remove("hidereset")
        message.classList.remove("messageproperties")
        enableall()
    }
