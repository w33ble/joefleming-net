create:
	grunt
	docpad generate

install:
	npm install
	bower install

static:
	rm -Rf out
	grunt dist
	docpad generate --env static

clean:
	rm -Rf out

cleanAll:
	rm -Rf node_modules
	rm -Rf components
	rm -Rf src/files/vendor
	rm -Rf out
