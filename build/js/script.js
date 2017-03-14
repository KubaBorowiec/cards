// Objects:Card, Waist, 

(function() {

/* Poniewaz w Javascripcie unika sie tworzenia zmiennych globalnych (tutaj te dwie ponizej) caly skrypt ujmujemy w wywolanie anonimowej funkcji umieszczajac te zmienne w jej closure.
 * (Ten pattern jest opisany w ksiazce Javascript Reference str. 21)
 */

            var figureArray=[2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
            var colorArray=['pik','trefl','dzwonek','czerwo'];
        			
/*************************************************************************************************/
        			
			function Card(color,figure) {
               this.color = color;
               this.figure = figure;
			}

            Card.prototype.toString = function() {
                //return 'color' + this.color + 'figure' + this.figure;
                return figureArray[this.figure] + ' ' + colorArray[this.color];
            };

            function Waist() {
             	this._waist = [];
                for(var i = 0; i < figureArray.length; i++) {
                    for(var j = 0; j < colorArray.length; j++) {
                    	this._waist.push( new Card( j, i ) );
                    }
                }
             };

             Waist.prototype.shift = function(){
             	return this._waist.shift();
             };

             Waist.prototype.shuffling = function(){
             	for (var i=0; i < this._waist.length; i++) {
             		var n = Math.floor( ( Math.random() * this._waist.length ) );	
             		var tempT = this._waist[i]; 
             		this._waist[i] = this._waist[n];
             		this._waist[n] = tempT;
             	}
            };

            Waist.prototype.display = function() {
            	document.getElementById("cards").innerHTML = '';
 				this._waist.forEach( function(element) {
                 	var div = document.createElement("div");
					var t = document.createTextNode("Hello World");
					//var text = document.createTextNode(figureArray[element.figure]);
                 	var text = document.createTextNode( element.toString() );
                    div.setAttribute("class",'fig' + figureArray[element.figure] +' col' + colorArray[element.color] + ' card');
                    div.appendChild(text);
                    document.getElementById("cards").appendChild(div);
                    console.log(element.toString());
 				});
            };

            Waist.prototype.sort = function(first, second){
                this._waist = this._waist.sort( function( a, b ) {
                
                      if(a[first] > b[first]){
                      	return 1;
                      }
                      if(a[first] < b[first]){
                      	return -1;
                      }
                      if(a[second] > b[second]){
                      	return 1;	  
                      }
                      if(a[second] < b[second]){
                      	return -1;
                      }
                      return 0;
                      
            	});

            };
            
            //dodane do tego zeby uzyskac lepsza enkapsulacje
            Waist.prototype.getTopCard = function() {
            	//tutaj moglaby byc np. modyfikacja interfejsu uzytkownika
            	return this._waist.shift();
            };
            
            //dodane do tego zeby uzyskac lepsza enkapsulacje
            Waist.prototype.getNumberOfCards = function() {
            	return this._waist.length;
            };

/*************************************************************************************************/
          
            function Handcards(){
                this.handCards = [];
            }
            
            Handcards.prototype.addnewcard = function() {
            	var color = Math.floor( ( Math.random() * colorArray.length ) );
            	var figure= Math.floor( ( Math.random() * figureArray.length ) );
            	console.log( color + ' ' + figure );
            	this.handCards.push( new Card( color, figure ) );
            };

            Handcards.prototype.getfromwaist = function( waist, n ) {
            	//
                if ( waist.getNumberOfCards() >= n ) {
	                for (var i = 0; i < n; i++) {
	                	//NARUSZENIE ENKAPSULACJI
	                	/*
	                	 * Ogolnie to co tutaj jest zroboine to dobranie sie do skladowej tablicy (waist) INNEJ klasy. Na takie miejsca nalezy uwazac, poniewaz
	                	 * ta klasa ktora zawiera taka skladowa moze chciec robic rozne dodatkowe rzeczy w trakcie modyfikacji takiej skladowej - np. klasa Waist moglaby
	                	 * przy pobieraniu karty modyfikowac interfejs uzytkownika (np. zmieniajac informacje o tym ile kart jest w talii gdzies w html). Teraz tego nie robi, 
	                	 * ale w przyszlosci przy rozbudowywaniu takiej klasy mozna chciec dodac taka funkcjonalnosc i wtedy trzeba by przejsc wszystkie wykorzystania tej klasy 
	                	 * w innym kodzie i je modyfikowac. Dlatego bezposrednie dobieranie sie do skladowych innej klasy nie jest dobrym pomyslem i lepiej to zrobic przez metody - 
	                	 * getNumberOfCard, getTopCard. W np. Javie mozna taki dostep zablokowac definiujac skladowa waist klasy Waist jako skladowa prywatna.
	                	 * W javascripcie nie ma skladowych typu protected czy private, wszystkie sa publiczne. Istnieje konwencja, ktora mowi, ze skladowe prywatne w javacripcie poprzedza sie
	                	 * underscorem _ i tak tez przerobilem ten program (zmieniajac waist na _waist) i dodajac funkcje getTopCard i getNumberOfCards w klasie Waist.
	                	 */
	                	//this.handCards.push( waist.waist.shift() );
	                	this.handCards.push( waist.getTopCard() );
	            	}
                } else {
                	document.getElementById('error').innerHTML = "";
                	//Po co tu jest timeout?
                	setTimeout(
                		function() {
                			document.getElementById('error').innerHTML = "You can't get " + n + " cards";
                		},
                		1000
                	); 
                } 
                document.getElementById('panel').innerHTML = 'Cards on hand: <strong>' + this.handCards.length + '</strong>&nbsp;|&nbsp;Cards in waist: ' + waist.getNumberOfCards(); 
            };
             
    	    Handcards.prototype.display = function(displaybox) {
            	document.getElementById(displaybox).innerHTML = '';
 				this.handCards.forEach( function(element) {
                 	var div = document.createElement("div");
                 	var text = document.createTextNode(element.toString());
                    div.setAttribute("class",'fig' + figureArray[element.figure] + ' col' + colorArray[element.color] + ' card');
                    div.appendChild(text);
                    document.getElementById("cards").appendChild(div);
                    console.log(element.toString());
 				});
            };

            Handcards.prototype.sort = function( first, second ) {
 				this.handCards = this.handCards.sort( function( a, b ) {
                    
                      if(a[first] > b[first]){
                      	return 1;
                      }
                      if(a[first] < b[first]){
                      	return -1;
                      }
                      if(a[second] > b[second]){
                      	return 1;	  
                      }
                      if(a[second] < b[second]){
                      	return -1;
                      }
                      return 0;
            	});
            	
            };

            Handcards.prototype.displaycolor = function(color) {
            	var temp = this.handCards.filter( function(element) {
                    return element.color == color;
            	});
            	document.getElementById('cards').innerHTML ='';
 				temp.forEach( function(element) {
                 	var div = document.createElement("div");
                 	//var text = document.createTextNode(figureArray[element.figure]);
                 	var text = document.createTextNode( element.toString() );
                    div.setAttribute( "class", 'fig' + figureArray[element.figure] + ' col' + colorArray[element.color] + ' card' );
                    div.appendChild(text);
                    document.getElementById("cards").appendChild(div);   
                });         	
            };

			/*
			 * Funkcja toString wedlug konwencji powinna zwracac stringa i nic nie wypisywac na konsoli. To zwrocony wynik moze byc wypisany na konsole.
			 */
            Handcards.prototype.toString = function() {
                //console.log( this.handCards.join(",") );
                return this.handCards.join(",");
            };

            Handcards.prototype.getColors = function() {
            	var temp0  =  this.handCards.map( function(element) {
            		return element.color;
            	});
                var temp1 = temp0.filter( function(element, index) {   	
                	return temp0.indexOf(element) == index;
                });
                return temp1;
            };

/*************************************************************************************************/


			            var testTalia = new Waist();
			            testTalia.shuffling(); 		
			            var reka = new Handcards();
			            reka.addnewcard();
			            reka.getfromwaist(testTalia, 3);
			            reka.display('cards');
			            console.log(reka.getColors());
			            
						document.getElementById("shuffling").onclick = function() {
						    	testTalia.shuffling();    	
						};
						document.getElementById("getCards").onclick = function() {
						    	reka.getfromwaist(testTalia,3);
						    	//reka.toString();
						    	console.log( reka.toString() );
						    	reka.display('cards');
						};
						document.getElementById("sortFig").onclick = function() {  
							    reka.sort('figure','color');
						    	reka.display('cards');
						};
						document.getElementById("sortCol").onclick = function() {
			 					reka.sort('color', 'figure');
						    	reka.display('cards');
						};
						document.getElementById("showRed").onclick = function() {
						    	reka.displaycolor(2);
						};   

})();
