
app_env := beta

site_name := base64io
app_path := $(app_env)/base64io-app-mantine

s3_path := sites/$(site_name)/apps/$(app_path)
s3_uri := s3://appsub-static-bucket/$(s3_path)

cloudfront_id := E25SJY04OD0MC1

check:
	@(./node_modules/.bin/tsc --noEmit --strict --pretty --jsx react --skipLibCheck true && echo "Passed") || echo "Failed"

build:
	APP_ENV=$(app_env) npm run build

licenses:
	@npm run licenses

run-local:
	APP_ENV=$(app_env) VITE_PORT=5178 npm run dev

deploy:
	@echo "Deploying to $(s3_uri)"
	@aws s3 sync ./dist/ $(s3_uri) --delete
	@aws cloudfront create-invalidation --distribution-id $(cloudfront_id) --paths "/$(s3_path)/*"
