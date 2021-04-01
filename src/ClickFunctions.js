export default class clickFunctions {
    constructor(){
        this.dotSquares = []
        this.greenSquares = []
        this.varSaveState = [[]]
        this.saveB1 = [[]]
        this.saveB2 = [[]]
        this.countTurn = 1
        this.setTurn = 0
        this.translate_row = ['1','2','3','4','5','6','7','8']
        this.translate_col = ['a','b','c','d','e','f','g','h']
        this.whatColorTurn = ['d','w']
        this.checkMate = false
        this.promotionChoiceClick = false
        }
    


    click(elem,b1,b2,board){
        var iPast = parseInt(elem.id[0])
        var jPast = parseInt(elem.id[1])
        if(elem.childNodes.length==1){
        var sqState = elem.childNodes[0].className}
        else{var sqState = null}

        if(sqState==null){
            this.clear(b1,b2)}

        else if(elem.className=='square green'){
            var iFut = iPast
            var jFut = jPast
            iPast = parseInt(elem.id[2])
            jPast = parseInt(elem.id[3])
            var piece = b1[iPast][jPast]
            this.clear(b1,b2)
            this.move(iPast,jPast,iFut,jFut,piece,board)}

        else if(sqState == 'piece'){
            this.clear(b1,b2)
            var piece = b1[iPast][jPast]
            if(this.whatColorTurn[this.countTurn%2]==piece.color){
                for(var x=0;x<piece.attOnboard.length;x++){
                    var iFut = piece.attOnboard[x][0]
                    var jFut = piece.attOnboard[x][1]
                    if(b2[iFut][jFut].innerHTML==''){
                        this.dotSquares.push([iFut,jFut])
                        b2[iFut][jFut].innerHTML = "<span id = 'd"+piece.loc+"'class='dot'><span>"}
                    else if(b1[iFut][jFut].color == piece.enemy){
                        this.greenSquares.push([b2[iFut][jFut].id,b2[iFut][jFut].className])
                        b2[iFut][jFut].className = "square green"
                        b2[iFut][jFut].id += iPast.toString()+jPast.toString()}}}}

        else if(sqState=='dot'){
            var iFut = iPast
            var jFut = jPast
            iPast = parseInt(elem.childNodes[0].id[1])
            jPast = parseInt(elem.childNodes[0].id[2])
            var piece = b1[iPast][jPast]
            this.clear(b1,b2)
            this.move(iPast,jPast,iFut,jFut,piece,board)}}
                 
      
            
    clear(b1,b2){
        for(var x=0;x<this.dotSquares.length;x++){
            let i = this.dotSquares[x][0]
            let j = this.dotSquares[x][1]
            b2[i][j].innerHTML = ''}
        this.dotSquares = []

        for(var x=0;x<this.greenSquares.length;x++){
            let i = parseInt(this.greenSquares[x][0][0])
            let j = parseInt(this.greenSquares[x][0][1])
            let id = this.greenSquares[x][0]
            let cName = this.greenSquares[x][1]
            b2[i][j].className = cName
            b2[i][j].id = id}
        this.greenSquares = []
        
        var divBoard = document.getElementById('board')
        if(divBoard.childElementCount>64){
            divBoard.removeChild(document.getElementById('promotionDiv'))}}
    


    move(iPast,jPast,iFut,jFut,piece,board){
        if(this.setTurn+1 == this.countTurn){
            piece.lastMove = [this.countTurn,iPast,jPast,iFut,jFut]
            if(piece.type=='p'){
                if(Math.abs(iPast-iFut)==2){piece.twoSteps = true}else{piece.twoSteps = false}
                if([iPast,jPast,iFut,jFut].toString() == piece.passant.toString()){board.putOut(iPast,jFut)}
                if(iFut==piece.finalLine){
                    this.appearPromotionDiv(piece.color,iPast,jPast,iFut,jFut)
                    board.updateDOM()
                    return}}

            if(piece.type=='k' && (jFut==jPast+2 || jFut == jPast-2)){
                if(piece.castleKingSide==true && jFut == jPast+2){
                    board.b1[iFut][7].stopped = false
                    piece.stopped = false
                    board.putOn(iFut,jFut-1,board.b1[iFut][7])
                    board.putOut(iFut,7)
                    board.putOn(iFut,jFut,piece)
                    board.putOut(iPast,jPast)
                    board.update(this.countTurn)
                    this.saveState(board.b1,board.b2)
                    this.writePlay(piece,iFut,jFut)
                    this.setTurn = this.countTurn
                    this.countTurn++}
                if(piece.castleQueenSide==true && jFut == jPast-2){
                    board.b1[iFut][0].stopped = false
                    piece.stopped = false
                    board.putOn(iFut,jFut+1,board.b1[iFut][0])
                    board.putOut(iFut,0)
                    board.putOn(iFut,jFut,piece)
                    board.putOut(iPast,jPast)
                    board.update(this.countTurn)
                    this.saveState(board.b1,board.b2)
                    this.writePlay(piece,iFut,jFut)
                    this.setTurn = this.countTurn
                    this.countTurn++}
                if(this.kingInCheck(board.b1,board.savePositionKing,piece.enemy)){
                    if(this.checkMateValidation(board,piece.enemy,this.countTurn)){
                        var colorWin = {w:'white',d:'black'}
                        document.getElementById('board').innerHTML+="<div class = menssageWins>"+colorWin[piece.color]+" wins</div>"}}
                return}

            piece.stopped = false
            board.putOn(iFut,jFut,piece)
            board.putOut(iPast,jPast)
            board.update(this.countTurn)
            this.saveState(board.b1,board.b2)
            this.writePlay(piece,iFut,jFut)
            this.setTurn = this.countTurn
            this.countTurn++
            
            if(this.kingInCheck(board.b1,board.savePositionKing,piece.color)){
                var box = document.getElementById('box')
                var range2 = document.getElementById('box').childElementCount
                box.removeChild(box.childNodes[range2-1])
                this.setState(this.countTurn-3,board.b1,board.b2)
                this.countTurn--
                return;}
            
            if(this.kingInCheck(board.b1,board.savePositionKing,piece.enemy)){
                if(this.checkMateValidation(board,piece.enemy,this.countTurn)){
                    var colorWin = {w:'white',d:'black'}
                    document.getElementById('board').innerHTML+="<div class = menssageWins>"+colorWin[piece.color]+" wins</div>"
                }}}}
        


    saveState(b1,b2){
        if(this.countTurn == this.varSaveState.length+1)
            this.varSaveState.push([])
            this.saveB1.push([])
            this.saveB2.push([])
            var range = this.varSaveState.length
            for(var i=0;i<8;i++){
                this.varSaveState[range-1][i] = []
                this.saveB1[range-1][i]=[]
                this.saveB2[range-1][i]=[]
                for(var j=0;j<8;j++){
                    this.saveB1[range-1][i][j] = b1[i][j]
                    this.saveB2[range-1][i][j] = b2[i][j].innerHTML
                    if(b1[i][j]!=null){
                        this.varSaveState[range-1][i][j] = Object.assign({},b1[i][j])}
                    else{this.varSaveState[range-1][i][j] = b1[i][j]}}}}
    


    writePlay(piece,iFut,jFut){
        if(piece.type != 'p'){var play = piece.type.toUpperCase()+this.translate_col[jFut]+this.translate_row[iFut]}
        else{var play = this.translate_col[jFut]+this.translate_row[iFut]}

        if(this.countTurn%2==1){document.getElementById("box").innerHTML += "<span class='playPast' onClick='setPlayState("+(this.countTurn-1)+")'>"+play+" "+"</span>"}
        else{document.getElementById("box").innerHTML += "<span class='playPast' style='left:96px' onClick='setPlayState("+(this.countTurn-1)+")'>"+play+"<br></span>"}}
    

        
    setState(turn,b1,b2){
        this.setTurn = turn+1
        for(var i=0;i<8;i++){
            for(var j=0;j<8;j++){
                b1[i][j]=this.saveB1[turn][i][j]
                b2[i][j].innerHTML=this.saveB2[turn][i][j]
                if(b1[i][j]!=null){
                    Object.assign(b1[i][j],this.varSaveState[turn][i][j])}}}}   
    


    kingInCheck(b1,PositionKing,color){
        for(var x=0;x<PositionKing.length;x++){
            if(PositionKing[x][2]==color){
                var i = PositionKing[x][0]
                var j = PositionKing[x][1]
                return b1[i][j].check}}}



    checkMateValidation(board,color,turn){
        var letSaveb1 = []
        var letStateObj = []
        var possibleMoves = []
        for(let x=0;x<8;x++){
            letSaveb1[x] = []
            letStateObj[x] = []
            for(let y=0;y<8;y++){
                letSaveb1[x][y] = board.b1[x][y]
                if(board.b1[x][y]!=null){
                    letStateObj[x][y] = Object.assign({},board.b1[x][y])}
                else{letStateObj[x][y] = board.b1[x][y]}}}

        for(var i=0;i<8;i++){
            for(var j=0;j<8;j++){
                if(board.b1[i][j] != null){
                    if(board.b1[i][j].color==color){
                        for(var x=0; x<board.b1[i][j].attOnboard.length ;x++){
                            var piece = board.b1[i][j]
                            var type = piece.type
                            var iPast = i;var jPast = j;
                            var iFut = piece.attOnboard[x][0]
                            var jFut = piece.attOnboard[x][1]

                            if(board.b1[iFut][jFut]==null || board.b1[iFut][jFut].color==piece.enemy){
                                board.b1[iFut][jFut] = piece
                                board.b1[iPast][jPast] = null
                                if(type=='p'){
                                    if([iPast,jPast,iFut,jFut].toString()==piece.passant.toString()){
                                        board.b1[iPast][jFut]=null}}
                                board.update(turn)}else{continue}
                            
                            if(!this.kingInCheck(board.b1,board.savePositionKing,color)){
                                console.log([type,iPast,jPast,iFut,jFut])
                                possibleMoves.push([type,iPast,jPast,iFut,jFut])}

                            for(var y=0;y<8;y++){
                                for(var z=0;z<8;z++){
                                    board.b1[y][z] = letSaveb1[y][z]
                                    if(board.b1[y][z]!=null){
                                        board.b1[y][z] = Object.assign(board.b1[y][z],letStateObj[y][z])}}}}}}}}
        
        if(possibleMoves.length==0){return true}else{return false}                                
    }

    appearPromotionDiv(color,iPast,jPast,iFut,jFut){
        var left = jFut*96
        var top = null
        var loc = iPast.toString()+jPast.toString()+iFut.toString()+jFut.toString()
        if(color=='w'){top=0}else{top=4*96}
        var board = document.getElementById('board')
        var div = "<div id= 'promotionDiv' class='crownedPawn' style='top:"+top+"px;left:"+left+"px;'>"
        +"<div id='q"+color+loc+"' class='square'  onClick='sqPromotion(this)'><img class='piece' src='./imagens/"+color+"queen.png'></div>"
        +"<div id='r"+color+loc+"' class='square' style='top: 96px;' onClick='sqPromotion(this)'><img class='piece' src='./imagens/"+color+"rook.png'></div>"
        +"<div id='b"+color+loc+"' class='square' style='top: 192px;' onClick='sqPromotion(this)'><img class='piece' src='./imagens/"+color+"bishop.png'></div>"
        +"<div id='n"+color+loc+"' class='square' style='top: 288px;' onClick='sqPromotion(this)'><img class='piece' src='./imagens/"+color+"knight.png'></div></div>"
        board.innerHTML += div
    }

    pawnPromotion(elem,board,p){
        console.log(elem.id)
        var iPast = parseInt(elem.id[2])
        var jPast = parseInt(elem.id[3])
        var iFut = parseInt(elem.id[4])
        var jFut = parseInt(elem.id[5])
        var color = elem.id[1]
        var type = elem.id[0]
        var choice = {
            'q': new p.Queen(color),
            'r': new p.Rook(color),
            'b': new p.Bishop(color),
            'n': new p.Knight(color)
        }
        var piece = choice[type]
        board.putOn(iPast,jPast,piece)
        this.move(iPast,jPast,iFut,jFut,piece,board)
        this.clear(board.b1,board.b2)}}

    
