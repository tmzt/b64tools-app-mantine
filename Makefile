
app_env := beta

site_name := base64
app_path := /$(app_env)/base64io-app-mantine

s3_uri := s3://appsub-static-bucket/sites/$(site_name)/apps/$(app_path)

cloudfront_id := E25SJY04OD0MC1

check:
	@(./node_modules/.bin/tsc --noEmit --strict --pretty --jsx react --skipLibCheck true && echo "Passed") || echo "Failed"

addtext:
	# Add text to the beginning of every tsx file
	@find ./src -name "*.tsx" -exec sed -i '' '1s/^/\nimport React from "react";\n\n/' {} \;

build:
	APP_ENV=$(app_env) npm run build

run-local:
	APP_ENV=$(app_env) VITE_PORT=5178 npm run dev

deploy:
	aws s3 sync ./dist/ $(s3_uri) --delete
	aws cloudfront create-invalidation --distribution-id $(cloudfront_id) --paths "$(app_path)/*"
