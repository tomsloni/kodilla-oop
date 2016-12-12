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
	}

// COLUMN

	function Column(name) {
		var self = this;

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text('Kolumna ' + self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete').text('x');
			var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');

			$columnDelete.click(function() {
				self.removeColumn();
			});

			$columnAddCard.click(function() {
				self.addCard(new Card(prompt('Wpisz nazwę karty')));
			});

			$column.append($columnTitle)
				.append($columnDelete)
				.append($columnAddCard)
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
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('x');

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

// BOARD

	function Board(name) {
		var self = this;

		this.id = randomString();
		this.name = name;
		this.$element = createBoard();

		
		$element: $('.board .column-container');
		
		function createBoard() {
			var $board = $('<div>').addClass('board');
			var $boardTitle = $('<h1>').text('Tablica ' + self.name);
			var $boardDelete = $('<button>').addClass('delete-board').text('x');
			var $boardAddColumn = $('<button>').addClass('create-column').text('Dodaj kolumnę');
			var $boardColumns = $('<div>').addClass('column-container');

			$boardDelete.click(function() {
				self.removeBoard();
			});

			$boardAddColumn.click(function() {
				self.addColumn(new Column(prompt('Wpisz nazwę kolumny')));
			});

			$board.append($boardTitle)
				.append($boardDelete)
				.append($boardAddColumn);

				return $board;
		}
	}

	Board.prototype = {
		addColumn: function(column) {
			this.$element.append(column.$element);
		},
		removeBoard: function() {
			this.$element.remove();
		}
	}

// ELSE

	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
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




