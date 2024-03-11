function updatePreview() {
	const markdownContent = document.getElementById("markdownInput").value;
	const markdownPreview = document.getElementById("markdownPreview");
	markdownPreview.innerHTML = marked(markdownContent);
}

function convertToMarkdown() {
	const markdownContent = document.getElementById("markdownInput").value;

	// Extract title front matter if present
	const titleMatch = markdownContent.match(/^---\n(?:.|\n)*?title:\s*([^\n]+)\n(?:.|\n)*?---/);
	const title = titleMatch ? titleMatch[1] : "untitled";

	const blob = new Blob([markdownContent], { type: "text/markdown" });
	const url = URL.createObjectURL(blob);

	// Save the file
	const fileName = `${title}.md`;
	const filePath = `${fileName}`;

	// Create anchor element to trigger download
	const a = document.createElement("a");
	a.href = url;
	a.download = fileName;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);

	saveFileInFolder(filePath, markdownContent);
}

// Load library for Markdown rendering
document.addEventListener("DOMContentLoaded", function () {
	const script = document.createElement("script");
	script.src = "https://cdnjs.cloudflare.com/ajax/libs/marked/2.0.3/marked.min.js";
	document.body.appendChild(script);
});

function copyContent() {
	var content = document.getElementById("template").innerText;
	var tempTextarea = document.createElement("textarea");
	tempTextarea.value = content;
	document.body.appendChild(tempTextarea);
	tempTextarea.select();
	document.execCommand("copy");
	document.body.removeChild(tempTextarea);
	displayMessage();
}

// Messages
function displayMessage() {
	var messageDiv = document.getElementById("message");
	messageDiv.textContent = "Copied!";
	messageDiv.style.display = "block";
	setTimeout(function () {
		messageDiv.style.display = "none";
	}, 3000);
}
