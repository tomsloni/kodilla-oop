$(function() {

	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		var i = 0;
		for (i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.lenght)];
		}
		return str;
	}

	function addBoard(boardNew) { 
		$('.main').append(boardNew.$element); 
		initColSortable();
	}


// BOARD

	function Board(name) {
		var self = this;

		this.id = randomString();
		this.name = name;
		this.$element = createBoard();

		
		$element: $('.board .column-container');
		
		function createBoard() {
			var $board = $('<div>').addClass('board col-m-11 col-s-11');
			var $boardHead = $('<div>').addClass('board-head col-m-12 col-s-12');
			var $boardCntrLeft = $('<div>').addClass('boardCntrLeft col-m-2 col-s-12');
			var $boardCntrCenter = $('<div>').addClass('boardCntrCenter col-m-8 col-s-12');
			var $boardCntrRight = $('<div>').addClass('boardCntrRight col-m-2 col-s-12');
			var $boardAddColumn = $('<button>').addClass('create-column').text('Dodaj kolumnę');
			var $boardTitle = $('<h1>').text('Tablica ' + self.name);
			var $boardDelete = $('<button>').addClass('delete-board').text('x');
			var $boardColumns = $('<ul>').addClass('column-container');


			$boardDelete.click(function() {
				self.removeBoard();
			});

			$boardAddColumn.click(function() {
				self.addColumn(new Column(prompt('Wpisz nazwę kolumny')));
			});

			$boardHead.append(
					$boardCntrLeft.append($boardAddColumn)
				)
				.append(
					$boardCntrCenter.append($boardTitle)
					)
				.append(
					$boardCntrRight.append($boardDelete)
					);

			$board.append($boardHead);

				return $board;
		}
	}

	Board.prototype = {
		addColumn: function(column) {
			this.$element.append(column.$element);
			initCardSortable();
		},
		removeBoard: function() {
			this.$element.remove();
		}
	}



// COLUMN

	function Column(name) {
		var self = this;

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			var $column = $('<li>').addClass('column col-m-3 col-s-10 col-offset-s-1');
			var $columnHead = $('<div>').addClass('column-head col-m-12 col-s-12');
			var $columnCntrLeft = $('<div>').addClass('columnCntrLeft col-m-2 col-s-12');
			var $columnCntrCenter = $('<div>').addClass('columnCntrCenter col-m-8 col-s-12');
			var $columnCntrRight = $('<div>').addClass('columnCntrRight col-m-2 col-s-12');
			var $columnTitle = $('<h2>').addClass('column-title').text('Kolumna ' + self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete').text('x');
			var $columnAddCard = $('<button>').addClass('add-card').text('+');

			$columnDelete.click(function() {
				self.removeColumn();
			});

			$columnAddCard.click(function() {
				self.addCard(new Card(prompt('Wpisz nazwę karty')));
			});

			$columnHead.append(
					$columnCntrLeft.append($columnAddCard)
					)
				.append(
					$columnCntrCenter.append($columnTitle)
					)
				.append(
					$columnCntrRight.append($columnDelete)
					);

			$column.append($columnHead)
				.append($columnCardList);

			return $column;
		}
	}

	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	}

// CARD

	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			var $card = $('<li>').addClass('card col-m-10 col-offset-m-1 col-s-10 col-offset-s-1');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete float-right').text('x');

			$cardDelete.click(function() {
				self.removeCard();
			});

			$card.append($cardDelete)
					.append($cardDescription);
				return $card;
		}
	}

	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	}


// ELSE

	function initCardSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}

	function initColSortable() {
		$('.column-container').sortable({
			connectWith: '.column-container',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}

	$('.create-board').click(function() {
			var name = prompt('Wpisz nazwę tablicy');
			var boardNew = new Board(name);
			addBoard(boardNew);
		});

	$('.create-column').click(function() {
			var name = prompt('Wpisz nazwę kolumny');
			var column = new Column(name);
			board.addColumn(column);
		});
});




