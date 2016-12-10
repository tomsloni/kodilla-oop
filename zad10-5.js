function Button(text) {
	this.text = text || 'Hello';
}

Button.prototype = {
	create: function() {
		var self = this;
		this.$element = $('<button>');
		this.$element.text(self.text);
		this.$element.click(function() {
			alert(self.text);
			createBtn();
		});
		$('body').append(self.$element);
	}
}

var btn1 = new Button('Hello!');

btn1.create();

function createBtn() {
	btn = new Button(window.prompt('A man have to tell a name.'));
	btn.create();
}