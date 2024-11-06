format:
	@echo "Formatting code..."
	@npx prettier --write "./server/**/*.js" --ignore-path 'node_modules'
	@npx prettier --write "./frontend/**/*.tsx" --ignore-path 'node_modules'
	@npx prettier --write "./frontend/**/*.ts" --ignore-path 'node_modules'

rebuild:
	@echo "Rebuilding docker images..."
	@docker-compose down
	@docker-compose up --build -d
	@docker-compose logs
