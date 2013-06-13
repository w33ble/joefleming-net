create:
	grunt
	docpad generate

install:
	npm install
	bower install

clean:
	rm -Rf out

cleanAll:
	rm -Rf node_modules
	rm -Rf components
	rm -Rf src/files/vendor
	rm -Rf out
