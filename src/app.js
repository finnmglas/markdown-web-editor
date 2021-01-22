import 'github-markdown-css'
import 'codemirror/lib/codemirror.css'
import './theme-cssedit.css'
import 'highlight.js/styles/github.css'
import './stylesheet.css'

import marked from 'marked'
import Codemirror from 'codemirror'
import hljs from 'highlight.js'
import 'codemirror/mode/markdown/markdown'
import debounce from 'lodash.debounce'

// Initalise variables
var editorDisplayed = false;

document.addEventListener('DOMContentLoaded', () => {
	// Editor and Md rendering
	const output = document.getElementById('output')
	const editor = Codemirror.fromTextArea(document.getElementById('input'), {
		mode: 'markdown',
		theme: 'cssedit',
		lineWrapping: true
	})

	const highlightCode = () => {
		for (const code of output.querySelectorAll('pre > code')) {
			hljs.highlightBlock(code)
		}
	}
	const debouncedHighlightCode = debounce(highlightCode, 200)

	editor.on('change', (cm) => {
		window.onbeforeunload = () => 'Really?'
		output.innerHTML = marked(cm.getValue())
		debouncedHighlightCode()
	})

	output.innerHTML = marked(editor.getValue())
	highlightCode()

	// Mobile editor toggle
	const btn = document.getElementById("mobile-editor-toggle");
	const edt = document.getElementById("editor");
	const viewer = document.getElementById("output");

	viewer.style.display = "block";
	edt.style.display = "none";
	btn.innerHTML = '<i class="fas fa-pen"></i>';

	btn.onclick = function() {
		editorDisplayed = !editorDisplayed;
		if (editorDisplayed) { // show editor
			viewer.style.display = "none";
			edt.style.display = "block";
			btn.innerHTML = '<i class="fas fa-eye"></i>';
		} else { // hide editor
			viewer.style.display = "block";
			edt.style.display = "none";
			btn.innerHTML = '<i class="fas fa-pen"></i>';
		}
	};
})
