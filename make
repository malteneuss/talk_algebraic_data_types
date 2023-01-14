# Autorecompile on file changes
watchexec -e md "pandoc --to revealjs --filter pandoc-plantuml --standalone talk-algebraic-data-types.md --output talk-algebraic-data-types.html"
