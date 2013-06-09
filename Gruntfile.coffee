module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    bower: grunt.file.readJSON 'bower.json'

    uglify:
      modernizr:
        options:
          mangle: false
        src: ['src/files/vendor/modernizr/modernizr.js']
        dest: 'src/files/js/modernizr.min.js'

    cssmin:
      normalize:
        src: ['src/files/vendor/normalize-css/normalize.css']
        dest: 'src/files/css/normalize.min.css'

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['vendor']

  grunt.registerTask 'vendor', ['uglify:modernizr', 'cssmin:normalize']