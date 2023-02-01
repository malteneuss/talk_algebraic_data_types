# Autorecompile on file changes
watchexec -e md "pandoc --to revealjs --filter pandoc-plantuml --standalone talk-algebraic-data-types.md --output talk-algebraic-data-types.html"
# pandoc --to revealjs --filter pandoc-plantuml --standalone talk-immutability-pure-functions.md --output talk-immutability-pure-functions.html --mathjax
