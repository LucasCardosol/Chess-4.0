/* the mechanic of the pieces is simple, there will be piece classes
that will receive , type , color , row... and most important will
receive a list of directions and the range for each direction, for example:
rook:
    list = ['up','left','right','down']
    up=7
    left=7
    right=7
    down=7
This properties will be read in another function in board class that
will interact with the board and another pieces
*/

export class Piece {
    constructor (color){
        this.color = color 
        this.row = null
        this.col = null
        this.attackstring = null //> A list of directions,Ex: rook = [up,right,left,down].
        this.numDirections = null //> attackstring.length.
        this.attOnboard = [] //> A list of attacks on the board, Ex: knight = [[2,2],[1,3]...].
        this.loc='' //>row.toString + col.toString.
        this.actualTurn = null 
        this.lastMove = null //> Ex: rook[0,0,0,1].
        this.stopped = true //> if piece moves, stopped = false.
        switch(color){ // enemy = color of the enemy.
            case 'd': this.enemy = 'w';break;
            case 'w': this.enemy = 'd';break;}}}

//All the classes extends to class Piece.

export class Pawn extends Piece{
    constructor(color){
        super(color)
        this.type = 'p'
        this.numDirections = 3
        this.twoSteps = false //if pawm move 2 squares forward.
        this.passant = [] // passant movement like: [4,3,5,2]. -->[4,3]previous position, [5,2]actual position
        if(color =='w'){
            this.up = 2
            this.rightup = 0
            this.leftup = 0
            this.attackstring = ['up','rightup','leftup']
            this.image = "<img class= 'piece'src='./imagens/wpawn.png'>"
            this.startLine = 1 //initial row.
            this.finalLine = 7 //promotion row.
            this.add = 1 // add is to diference the front of black pawns and white pawns, if:color=='d' add=-1.
        }else if(color =='d'){
            this.down = 2
            this.rightdown = 0
            this.leftdown = 0
            this.attackstring = ['down','rightdown','leftdown']
            this.image = "<img class= 'piece'src='./imagens/dpawn.png'>"
            this.startLine = 6
            this.finalLine = 0
            this.add = -1}}

    //pawns configuration always needs to update
    exceptions(b1){//b1 is a property of the class board, board.b1 = 8x8 matrix
        var add = this.add
        var i = this.row
        var j = this.col
        var front = 2 
        var left = 0
        var right = 0
        this.passant = []
        if(this.row != this.startLine){front = 1}//after first move, pawns only move 1 square forward

        if (-1<i+add && i+add<8){
            if(b1[i+add][j+1]!=null){right = 1}else{right=0}//pawns can attack 1 square diagonally
            if(b1[i+add][j-1]!=null){left = 1}else{left=0}}

        if(j+1<8){//passant code right
            if(b1[i][j+1]!=null){
                var piece = b1[i][j+1]
                if(piece.type =='p' && piece.color==this.enemy){
                    if(piece.twoSteps == true && Math.abs(this.actualTurn-piece.lastMove[0])==0){
                        right=1;this.passant = [i,j,i+add,j+1]}}}}
        if(j-1>-1){//passant code left
            if(b1[i][j-1]!=null){
                var piece = b1[i][j-1]
                if(piece.type =='p' && piece.color==this.enemy){
                    if(piece.twoSteps == true && Math.abs(this.actualTurn-piece.lastMove[0])==0){
                        left=1;this.passant = [i,j,i+add,j-1]}}}}
        
        if(this.color=='w'){//pass the new configuration of this pawn
            this.up = front
            this.rightup = right
            this.leftup = left}
        else{
            this.down = front
            this.rightdown = right
            this.leftdown = left}
        /*
        if(i==this.finalLine){//promotion code , if pawn is on the final row , a div with pieces will appear
            var left = j*96
            var top = null
            if(this.color=='w'){top=0}else{top=4*96}
            var board = document.getElementById('board')
            var div = "<div class='crownedPawn' style='top:"+top+"px;left:"+left+"px;'>"
            +"<div id='q"+this.color+this.loc+"' class='square'  onClick='sqPromotion(this)'><img class='piece' src='./imagens/"+this.color+"queen.png'></div>"
            +"<div id='r"+this.color+this.loc+"' class='square' style='top: 96px;' onClick='sqPromotion(this)'><img class='piece' src='./imagens/"+this.color+"rook.png'></div>"
            +"<div id='b"+this.color+this.loc+"' class='square' style='top: 192px;' onClick='sqPromotion(this)'><img class='piece' src='./imagens/"+this.color+"bishop.png'></div>"
            +"<div id='n"+this.color+this.loc+"' class='square' style='top: 288px;' onClick='sqPromotion(this)'><img class='piece' src='./imagens/"+this.color+"knight.png'></div></div>"
            board.innerHTML += div}*/
        }}


export class Rook extends Piece{
    constructor(color){
        super(color)
        this.type = 'r'
        this.up = 7
        this.right = 7
        this.down = 7
        this.left = 7
        this.attackstring = ['up','left','right','down']
        this.numDirections = 4
        if(color == 'w'){
            this.image = "<img class= 'piece'src='./imagens/wrook.png'>"
        }else if(color == 'd'){
            this.image = "<img class= 'piece'src='./imagens/drook.png'>"}}}


export class Knight extends Piece{
    constructor(color){
        super(color)
        this.type = 'n'
        this.attackstring = ['knight'] //knight needs a special moviment
        this.numDirections = 1
        this.additions = [[1,2],[2,1],[2,-1],[1,-2]]//this values will add with the row and col of the knight, Ex:i+1,j+2
        if(color == 'w'){
            this.image = "<img class= 'piece'src='./imagens/wknight.png'>"
        }else if (color == 'd'){
            this.image = "<img class= 'piece'src='./imagens/dknight.png'>"}}}


export class Bishop extends Piece{
    constructor(color){
        super(color)
        this.type = 'b'
        this.rightup = 7
        this.leftup = 7
        this.rightdown = 7
        this.leftdown = 7
        this.attackstring = ['rightup','leftup','rightdown','leftdown']
        this.numDirections = 4
        if(color == 'w'){
            this.image = "<img class= 'piece'src='./imagens/wbishop.png'>"
        }else if (color == 'd'){
            this.image = "<img class= 'piece'src='./imagens/dbishop.png'>"}}}


export class Queen extends Piece{
    constructor(color){
        super(color)
        this.type = 'q'
        this.rightup = 7
        this.leftup = 7
        this.rightdown = 7
        this.leftdown = 7
        this.up = 7
        this.right = 7
        this.down = 7
        this.left = 7
        this.attackstring = ['up','left','right','down','rightup','leftup','rightdown','leftdown']
        this.numDirections = 8
        if(color == 'w'){
            this.image = "<img class= 'piece'src='./imagens/wqueen.png'>"
        }else if (color == 'd'){
            this.image = "<img class= 'piece'src='./imagens/dqueen.png'>"}}}


export class King extends Piece{
    constructor(color){
        super(color)
        this.type = 'k'
        this.leftup = 1
        this.rightup = 1
        this.rightdown = 1
        this.leftdown = 1
        this.up = 1
        this.right = 1
        this.down = 1
        this.left = 1
        this.attackstring = ['up','left','right','down','rightup','leftup','rightdown','leftdown']
        this.numDirections = 8
        this.check = false // if king in check, check = true
        this.castleQueenSide = true //if king can castle on the queen's side
        this.castleKingSide = true //if king can castle on the king's side
        if(color == 'w'){
            this.image = "<img class= 'piece'src='./imagens/wking.png'>"
            this.startLine = 0 // var to differentiate the black king's row from the white king's row
        }else if (color == 'd'){
            this.image = "<img class= 'piece'src='./imagens/dking.png'>"
            this.startLine = 7}}   
        
    castle(b1){// rules of castle
        var cKs = null
        var cQs = null
        var r = null
        var l = null
        var line = this.startLine
        if(this.stopped==true && b1[line][7]!=null){
            if(b1[line][7].type=='r' && b1[line][7].stopped==true){
                if(b1[line][5]==null && b1[line][6]==null){
                    cKs=true
                    r = 2
                }else{cKs=false;r=1}
            }else{cKs=false;r=1}
        }else{cKs=false;r=1}
        if(this.stopped==true && b1[line][0]!=null){
            if(b1[line][0].type=='r' && b1[line][0].stopped==true){
                if(b1[line][3]==null && b1[line][2]==null && b1[line][1]==null){
                    cQs=true
                    l = 2
                }else{cQs=false;l=1}
            }else{cQs=false;l=1}
        }else{cQs=false;l=1}
        this.castleKingSide = cKs; this.right = r
        this.castleQueenSide = cQs; this.left = l
    }

        
    checkAndCastleDetect(b1){// will detect if there is an attack on the king and the castle squares
        var noCheck = true
        var line = this.startLine
        var cKsPassedCondition = false
        var cQsPassedCondition = false
        for(var i=0;i<8;i++){
            for(var j=0;j<8;j++){
                if(b1[i][j]!=null){
                    if(b1[i][j].color==this.enemy){
                        var piece = b1[i][j]
                        var range = piece.attOnboard.length
                        for(var z=0;z<range;z++){
                            var i2 = piece.attOnboard[z][0]
                            var j2 = piece.attOnboard[z][1]
                            var eneAttack = [i2,j2].toString()
                            if(eneAttack == [this.row,this.col].toString()){
                                this.check=true
                                noCheck = false}
                            if(eneAttack==[line,5].toString() || eneAttack==[line,6].toString()){
                                cKsPassedCondition = true
                                this.castleKingSide = false}
                            if(eneAttack==[line,3].toString() || eneAttack==[line,2].toString()){
                                cQsPassedCondition = true
                                this.castleQueenSide = false}}}}}}
        if(noCheck==true){this.check=false}
        if(cKsPassedCondition==false){this.castleKingSide=true}
        if(cQsPassedCondition==false){this.castleQueenSide=true}
    }
}

