format:
	@echo "Formatting code..."
	@find ./server -type f -name '*.js' -not -path '*/node_modules/*' -exec js-beautify -r {} \;

rebuild:
	@echo "Rebuilding docker images..."
	@docker-compose down
	@docker-compose up --build -d
