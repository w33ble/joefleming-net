create:
	grunt
	docpad generate

install:
	npm install
	bower install

clean:
	rm -Rf out

cleanAll:
	rm -Rf out
	rm -Rf node_modules
	rm -Rf src/files/vendor

