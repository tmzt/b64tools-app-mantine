
app_env := beta

site_name := b64tools
app_path := $(app_env)/b64tools-app-mantine

s3_path := sites/$(site_name)/apps/$(app_path)
s3_uri := s3://b64tools-static/$(s3_path)

cloudfront_id := E13ZV7D8VAYE0R

check:
	@(./node_modules/.bin/tsc --noEmit --strict --pretty --jsx react --skipLibCheck true && echo "Passed") || echo "Failed"

build:
	APP_ENV=$(app_env) npm run build

licenses:
	@echo "Generating licenses"
	@npm run dep-licenses
	@mkdir -p ./src/gen
	@cat ./src/content/License.header.md ./src/gen/dependencies.txt \
		| sed 's/</\&lt;/g' \
		| sed 's/>/\&gt;/g' \
		| sed 's/@/\&commat;/g' \
		> ./src/gen/licenses.md

run-local:
	APP_ENV=$(app_env) VITE_PORT=5178 npm run dev

deploy:
	@echo "Deploying to $(s3_uri)"
	@aws s3 sync ./dist/ $(s3_uri) --delete
	@aws cloudfront create-invalidation --distribution-id $(cloudfront_id) --paths "/$(s3_path)/*"

invalidate:
	@aws cloudfront create-invalidation --distribution-id $(cloudfront_id) --paths "/$(s3_path)/*"
