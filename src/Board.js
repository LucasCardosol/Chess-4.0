export default class Board {
    constructor(){
        this.b1 = []
        this.b2 = []
        this.savePositionKing = []
        var color = {0:'burlywood',1:'brown'}

        for(var i=0; i<8; i++) {
            this.b1[i] = []
            this.b2[i] = []
            for(var j=0; j<8; j++) {
                this.b1[i][j] = null
                let div = "<div id='"+((i-7)*(-1)+0) +""+j+"' class='square "+color[(i+j)%2]+"' style='top: "+i*96+"px;left:"+j*96+"px' onClick='clickSq(this)'></div>"
                document.getElementById('board').innerHTML += div}}

        this.updateDOM()

        this.scanPiece= {
            'left': function _left(b1,i,j,piece){
                for(var x=1;x<=piece.left;x++){ 
                    if ((j-x)==-1){break}
                    piece.attOnboard.push([i,j-x])
                    if(b1[i][j-x] != null){break}}},

            'up': function _up(b1,i,j,piece){
                for(var x=1;x<=piece.up;x++){ 
                    if ((i+x)==8){break}
                    if (piece.type=='p' && piece.color=='w' && b1[i+x][j]!=null){break}
                    piece.attOnboard.push([i+x,j])
                    if(b1[i+x][j] != null){break}}},

            'right': function _right(b1,i,j,piece){
                for(var x=1;x<=piece.right;x++){ 
                    if ((j+x)==8){break}
                    piece.attOnboard.push([i,j+x])
                    if(b1[i][j+x] != null){break}}},

            'down': function _down(b1,i,j,piece){
                for(var x=1;x<=piece.down;x++){ 
                    if ((i-x)==-1){break}
                    if (piece.type=='p' && piece.color=='d' && b1[i-x][j]!=null){break}
                    piece.attOnboard.push([i-x,j])
                    if(b1[i-x][j] != null){break}}},

            'leftup': function _leftup(b1,i,j,piece){
                for(var x=1;x<=piece.leftup;x++){ 
                    if ((i+x)==8 || (j-x)==-1){break}
                    piece.attOnboard.push([i+x,j-x])
                    if(b1[i+x][j-x] != null){break}}},

            'rightup': function _rightup(b1,i,j,piece){
                for(var x=1;x<=piece.rightup;x++){ 
                    if ((i+x)==8 || (j+x)==8){break}
                    piece.attOnboard.push([i+x,j+x])
                    if(b1[i+x][j+x] != null){break}}},

            'rightdown': function _rightdown(b1,i,j,piece){
                for(var x=1;x<=piece.rightdown;x++){ 
                    if ((i-x)==-1 || (j+x)==8){break}
                    piece.attOnboard.push([i-x,j+x])
                    if(b1[i-x][j+x] != null){break}}},

            'leftdown': function _leftdown(b1,i,j,piece){
                for(var x=1;x<=piece.leftdown;x++){ 
                    if ((i-x)==-1 || (j-x)==-1){break}
                    piece.attOnboard.push([i-x,j-x])
                    if(b1[i-x][j-x] != null){break}}},

            'knight': function _knight(b1,i,j,piece){
                for(var x=0;x<4;x++){ 
					var row = piece.additions[x][0]
                    var col = piece.additions[x][1]
					if (i+row <= 7 && 0<=j+col && j+col<=7){
                        piece.attOnboard.push([i+row,j+col])}
					if (i-row >= 0 && 0<=j+col && j+col<=7){
                        piece.attOnboard.push([i-row,j+col])}}}}   
    }
    update(actualTurn){
        this.savePositionKing = []
        for(var i =0;i<8;i++){
            for(var j=0;j<8;j++){
                if(this.b1[i][j]!=null){
                    var piece = this.b1[i][j]
                    var loc = i.toString()+j.toString()
                    piece.attOnboard = []
                    piece.loc = loc
                    piece.row = i
                    piece.col = j
                    piece.actualTurn = actualTurn
                    if(piece.type=='p'){
                        piece.exceptions(this.b1)}
                    if(piece.type=='k'){
                        this.savePositionKing.push([i,j,piece.color])
                        piece.castle(this.b1)}       
                    for(var y=0;y<piece.numDirections;y++){
                        this.scanPiece[piece.attackstring[y]](this.b1,i,j,piece)}}}}
        for(var x=0;x<this.savePositionKing.length;x++){
            var i = this.savePositionKing[x][0]
            var j = this.savePositionKing[x][1]
            var king = this.b1[i][j]
            king.checkAndCastleDetect(this.b1)}
        }

    putOn(i,j,piece){
        this.b1[i][j] = piece
        this.b2[i][j].innerHTML = piece.image}

    putOut(i,j){
        this.b1[i][j]= null
        this.b2[i][j].innerHTML = ''}

    updateDOM(){
        for (var i=0;i<8;i++){
            for (var j=0;j<8;j++){
                let loc = i.toString()+j.toString()
                this.b2[i][j] = document.getElementById(loc)}}}

}




