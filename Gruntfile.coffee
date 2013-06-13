module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    bower: grunt.file.readJSON 'bower.json'

    uglify:
      modernizr:
        options:
          mangle: false
        src: ['components/modernizr/modernizr.js']
        dest: 'src/files/vendor/modernizr.min.js'

    cssmin:
      normalize:
        src: ['components/normalize-css/normalize.css']
        dest: 'src/files/vendor/normalize.min.css'

    copy:
      components:
        files: [
          {
            src: ['components/jquery/jquery.min.js']
            dest: 'src/files/vendor/'
            expand: true
            flatten: true
            filter: 'isFile'
          }
          {
            src: ['components/highlightjs/highlight.pack.js',
              'components/highlightjs/styles/tomorrow-night.css']
            dest: 'src/files/vendor/highlightjs/'
            expand: true
            flatten: true
            filter: 'isFile'
          }
          {
            cwd: 'components/font-awesome/build/assets/font-awesome/'
            src: ['css/**', 'font/**']
            dest: 'src/files/vendor/font-awesome/'
            expand: true
          }
        ]

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['vendor']

  grunt.registerTask 'vendor', ['uglify:modernizr', 'cssmin:normalize', 'copy:components']