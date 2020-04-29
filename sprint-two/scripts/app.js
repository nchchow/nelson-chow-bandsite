const comments = [
	{
		userName: "Theodore Duncan",
		datePosted: "11/15/2018",
		content:
			"How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!",
	},
	{
		userName: "Gary Wong",
		datePosted: "12/12/2018",
		content:
			"Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
	},
	{
		userName: "Micheal Lyons",
		datePosted: "12/18/2018",
		content:
			"They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.",
	},
];

/*
	TAKES COMMENTS, BUILDS HTML ELEMENTS AND RENDERS ON SCREEN
*/
// DOM elements
const commentsList = document.querySelector(".comments__list");
const newCommentForm = document.querySelector(".new-comment__form");

// event listeners
newCommentForm.addEventListener("submit", (e) => {
	// prevent page refresh
	e.preventDefault();
	// construct a new comment and push to comments array
	comments.push(newComment(e.target));
	// clear all comments on screen
	removePageComments();
	// render comments
	render(comments);
	// clear input fields
	clearInputs(e.target);
});

// run script
render(comments);

// renders comments to screen in reverse chrono order
function render(comments) {
	for (let i = comments.length - 1; i >= 0; i--) {
		commentsList.append(displayComment(comments[i]), divider());
	}
}

// helper function to create element and add class, returns the element
function classElement(classStr, elementStr) {
	const elem = document.createElement(elementStr);
	elem.classList.add(classStr);
	return elem;
}

// contructs comment elem and returns it
function displayComment(comment) {
	// user icon
	const userIcon = classElement("comment__user-icon", "div");

	const commentElem = classElement("comment", "article");
	commentElem.append(userIcon, textWrapper(comment));

	return commentElem;
}

// construct line divider between comments and returns it
function divider() {
	const dividerElem = classElement("divider", "hr");

	return dividerElem;
}

// constructs text wrapper for comments and returns it
function textWrapper(comment) {
	// comment content
	const commentElem = classElement("comment__content", "p");
	commentElem.textContent = comment.content;

	const textWrapper = classElement("text-wrapper", "div");
	textWrapper.append(textWrapperTop(comment), commentElem);

	return textWrapper;
}

// constructs top text wrapper and returns it
function textWrapperTop(comment) {
	const nameElem = classElement("comment__name", "p");
	nameElem.textContent = comment.userName;

	const dateElem = classElement("comment__date", "p");
	dateElem.textContent = comment.datePosted;

	const textWrapperTop = classElement("text-wrapper--top", "div");
	textWrapperTop.append(nameElem, dateElem);

	return textWrapperTop;
}

/*
	FORM FUNCTIONS
 */

// get current date string in mm/dd/yyyy
function getFormattedDate() {
	const date = new Date();
	const m = date.getMonth() + 1;
	const d = date.getDate();
	const y = date.getFullYear();
	return `${m}/${d}/${y}`;
}

// create new comment object from form target and returns it
function newComment(target) {
	return {
		userName: target.name.value,
		datePosted: getFormattedDate(),
		content: target.content.value,
	};
}

// removes all comments and dividers on page
function removePageComments() {
	commentsList.innerHTML = "";
	// let elems = commentsList.childNodes;
	// console.log(elems);
	// for (e of elems) {
	// 	console.log(e);
	// 	commentsList.removeChild(e);
	// }

	// const commentElems = document.querySelectorAll(".comment");
	// const dividers = document.querySelectorAll(".divider");
	// commentElems.forEach((comment) => {
	// 	commentsList.removeChild(comment);
	// });
	// // remove all except first divider
	// for (let i = 1; i < dividers.length; i++) {
	// 	commentsList.removeChild(dividers[i]);
	// }
}

// clear input fields
function clearInputs(target) {
	target.name.value = "";
	target.content.value = "";
}
