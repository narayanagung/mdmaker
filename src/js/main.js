// Function to update preview and save content to local storage
function updatePreview() {
	const markdownContent = document.getElementById("markdownInput").value;
	const markdownPreview = document.getElementById("markdownPreview");

	if (markdownContent.trim() === "") {
		markdownPreview.innerHTML = `
            <h2>Live preview</h2>
            <p class="note">Simple markdown template front matter (put this at the top of your markdown document)</p>
            <pre id="template">---
title: Title Of The Article
description: Brief description
date: "12-31-2031"
categories:
    - tag 1
    - tag 2
published: true
---
# Write your content here<button type="button" class="copyBtn" onclick="copyContent()" title="Copy"><i data-lucide="copy"></i></button><div id="message" class="message"></div></pre>`;
	} else {
		markdownPreview.innerHTML = marked(markdownContent);
	}

	// Save content to local storage
	localStorage.setItem("markdownContent", markdownContent);
}

// Function to load content from local storage on page load
document.addEventListener("DOMContentLoaded", function () {
	const storedContent = localStorage.getItem("markdownContent");
	if (storedContent) {
		document.getElementById("markdownInput").value = storedContent;
		updatePreview(); // Update preview with stored content
	}
});

// Function to convert content to Markdown and save to local storage
function convertToMarkdown() {
	const markdownContent = document.getElementById("markdownInput").value;

	// Extract title front matter if present
	const titleMatch = markdownContent.match(/^---\n(?:.|\n)*?title:\s*([^\n]+)\n(?:.|\n)*?---/);
	let title = titleMatch ? titleMatch[1] : "untitled";

	// Convert title to lowercase, replace spaces with dashes, and trim trailing spaces
	title = title.toLowerCase().replace(/\s+/g, "-").replace(/-$/, "");

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

	// Save content to local storage
	localStorage.setItem("markdownContent", markdownContent);
}

// Function to copy content to clipboard and display message
function copyContent() {
	var content = document.getElementById("template").innerText;
	var tempTextarea = document.createElement("textarea");
	tempTextarea.value = content;
	document.body.appendChild(tempTextarea);
	tempTextarea.select();
	document.execCommand("copy");
	document.body.removeChild(tempTextarea);
	displayMessage();

	// Save content to local storage
	localStorage.setItem("markdownContent", document.getElementById("markdownInput").value);
}

// Function to display copied message
function displayMessage() {
	var messageDiv = document.getElementById("message");
	messageDiv.textContent = "Copied!";
	messageDiv.style.display = "block";
	messageDiv.style.color = "white";
	messageDiv.style.fontWeight = "bold";
	setTimeout(function () {
		messageDiv.style.display = "none";
	}, 3000);
}

// Load library for Markdown rendering
document.addEventListener("DOMContentLoaded", function () {
	const script = document.createElement("script");
	script.src = "https://cdnjs.cloudflare.com/ajax/libs/marked/2.0.3/marked.min.js";
	document.body.appendChild(script);
});
